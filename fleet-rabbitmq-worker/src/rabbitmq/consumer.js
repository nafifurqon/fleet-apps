const { initRabbitMQConnection } = require('./client');

async function consume(payloads) {
  const { exchange, routingKey, queueName, handler } = payloads;
  const { channel } = await initRabbitMQConnection();

  await channel.assertExchange(exchange, 'topic', { durable: true });
  await channel.assertQueue(queueName, { durable: true });
  await channel.bindQueue(queueName, exchange, routingKey); 

  console.log(`Listening to queue: ${queueName}`);

  channel.consume(queueName, async (msg) => {
    if (msg !== null) {
      const content = JSON.parse(msg.content.toString());
      try {
        await handler(content);
        channel.ack(msg);
      } catch (err) {
        console.error(`Error handling message from ${queueName}:`, err);
        channel.nack(msg, false, false);
      }
    }
  });

}

module.exports = { consume };
