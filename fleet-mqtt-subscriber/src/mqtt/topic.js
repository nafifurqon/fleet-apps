const { handleVehicleLocation } = require('../modules/vehicles/vehicles.service');

module.exports = [
  {
    topic: '/fleet/vehicle/+/location',
    handler: handleVehicleLocation,
  },
];
