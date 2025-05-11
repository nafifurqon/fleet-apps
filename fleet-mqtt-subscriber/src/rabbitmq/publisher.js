const { initRabbitMQConnection } = require('./client');

async function publishEvent({ exchange, routingKey = '', message }) {
  const { channel } = await initRabbitMQConnection();

  await channel.assertExchange(exchange, 'topic', { durable: true });

  channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));

  console.log(`Published message to: ${exchange}, ${routingKey} with message: ${JSON.stringify(message)}`);
}

module.exports = { publishEvent };
