const mqtt = require('mqtt');
require('dotenv').config();

const client = mqtt.connect(`mqtt://${process.env.MQTT_BROKER_URL}`);

client.on('connect', () => {
  console.log('MQTT connected');
});

client.on('error', (err) => {
  console.error('MQTT connection error:', err);
});

client.on('close', () => console.error('MQTT connection closed'));

client.on('offline', () => console.error('MQTT client is offline'));

module.exports = client;
