require('dotenv').config();
const express = require('express');
const vehiclesRoutes = require('./src/modules/vehicles/vehicles.route');

const app = express();
const PORT = process.env.FLEET_API_PORT || 3000;

// middleware
app.use(express.json());

// routes
app.use('/vehicles', vehiclesRoutes);

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
