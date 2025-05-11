const client = require('./client');

function publishLocation(vehicle) {
  const topic = `/fleet/vehicle/${vehicle.vehicle_id}/location`;
  const message = JSON.stringify({
    vehicle_id: vehicle.vehicle_id,
    latitude: vehicle.latitude + Math.random() * 0.01,
    longitude: vehicle.longitude,
    timestamp: Math.floor(Date.now() / 1000),
  });

  client.publish(topic, message, {}, (err) => {
    if (err) {
      console.error(`Failed to publish to ${topic}`, err);
    } else {
      console.log(`Published to ${topic}: ${message}`);
    }
  });
}

module.exports = { publishLocation };
