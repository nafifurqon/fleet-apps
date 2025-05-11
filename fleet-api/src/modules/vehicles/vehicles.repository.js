const pool = require('../../config/db');

async function getLatestLocation(vehicleId) {
  const query = `
    SELECT vehicle_id, latitude, longitude, timestamp
    FROM vehicle_locations
    WHERE vehicle_id = $1
    ORDER BY timestamp DESC
    LIMIT 1
  `;
  const result = await pool.query(query, [vehicleId]);
  return result.rows[0] || null;
}

async function getVehicleLocationHistory(payload) {
  const { vehicle_id, start, end, page, limit } = payload;
  const offset = (page - 1) * limit;

  const selectData = 'SELECT vehicle_id, latitude, longitude, timestamp';

  const query = `
    FROM vehicle_locations
    WHERE vehicle_id = $1 AND timestamp BETWEEN $2 AND $3
  `;
  const values = [vehicle_id, start, end];

  const [
    result,
    totalCount,
  ] = await Promise.all([
    pool.query(`
      ${selectData}
      ${query}
      ORDER BY timestamp ASC
      LIMIT $4 OFFSET $5
    `, [...values, limit, offset]),
    pool.query(`SELECT COUNT(*) AS count ${query}`, [...values]),
  ]);

  return {
    data: result.rows,
    totalCount: totalCount.rows[0].count
  };
}

module.exports = { getLatestLocation, getVehicleLocationHistory };
