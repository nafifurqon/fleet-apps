const { consume } = require('./src/rabbitmq/consumer');

async function handleGeofenceEvent(message) {
  console.log('Geofence Alert:', message);
}

(async () => {
  try {
    const queues = [{
      exchange: 'fleet.events',
      routingKey: 'geofence.entry',
      queueName: 'geofence_alerts',
      handler: handleGeofenceEvent,
    }];

    for (const { exchange, routingKey, queueName, handler } of queues) {
      await consume({ exchange, routingKey, queueName, handler });
    }
  } catch (err) {
    console.error('Worker failed to start:', err);
  }
})();
