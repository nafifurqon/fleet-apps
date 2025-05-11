const express = require('express');
const { getLatestLocationHandler, getVehicleHistory } = require('./vehicles.controller');

const router = express.Router();

router.get('/:vehicle_id/location', getLatestLocationHandler);
router.get('/:vehicle_id/history', getVehicleHistory);

module.exports = router;
