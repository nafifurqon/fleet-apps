require('dotenv').config();
const { vehicles } = require('./src/mqtt/mock');
const { publishLocation } = require('./src/mqtt/publisher');

setInterval(() => {
  vehicles.forEach(publishLocation);
}, 2000);
