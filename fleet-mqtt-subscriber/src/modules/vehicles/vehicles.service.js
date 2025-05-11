const { pool } = require('../../config/db');
const { GEOFENCE_POINT } = require('../../constants/general.constant');
const { publishEvent } = require('../../rabbitmq/publisher');
const { calculateDistance } = require('../../utils/general.util');
const { insertVehicleLocation } = require("./vehicles.repository");

function isValidLocation(payload) {
  return (
    payload.vehicle_id &&
    payload.latitude &&
    payload.longitude &&
    payload.timestamp &&
    typeof payload.vehicle_id === 'string' &&
    typeof payload.latitude === 'number' &&
    typeof payload.longitude === 'number' &&
    typeof payload.timestamp === 'number' &&
    !isNaN(new Date(payload.timestamp).getTime())
  );
}


async function handleVehicleLocation(topic, message) {
  const dbClient = await pool.connect();

  try {
    const payload = JSON.parse(message.toString());

    if (!isValidLocation(payload)) {
      console.warn('Invalid payload:', payload);
      return;
    }

    const { vehicle_id, latitude, longitude, timestamp } = payload;

    await dbClient.query('BEGIN');

    await insertVehicleLocation({
      vehicle_id,
      latitude,
      longitude,
      timestamp,
      client: dbClient,
    });

    await dbClient.query('COMMIT');
    
    const distance = calculateDistance(
      {
        latitude,
        longitude,
      },
      {
        latitude: GEOFENCE_POINT.latitude,
        longitude: GEOFENCE_POINT.longitude,
      },
    );
    if (distance <= GEOFENCE_POINT.radiusMeters) {
			const payload = {
        exchange: 'fleet.events',
        routingKey: 'geofence.entry',
        message: {
          vehicle_id,
          event: 'geofence_entry',
          location: { latitude, longitude },
          timestamp: Math.floor(Date.now() / 1000),
        }
      };
      await publishEvent(payload);
    }

    console.log(`Location saved for vehicle ${vehicle_id}`);
  } catch (err) {
    await dbClient.query('ROLLBACK');
    console.error('Error handling vehicle location:', err);
  } finally {
    dbClient.release();
  }
};

module.exports = { handleVehicleLocation };
