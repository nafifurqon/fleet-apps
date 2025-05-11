async function insertVehicleLocation(payload) {
  const { vehicle_id, latitude, longitude, timestamp, client } = payload;

  const query = `
    INSERT INTO vehicle_locations (vehicle_id, latitude, longitude, timestamp)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [vehicle_id, latitude, longitude, timestamp];

  const res = await client.query(query, values);
  return res.rows[0];
}

module.exports = {
  insertVehicleLocation,
};
