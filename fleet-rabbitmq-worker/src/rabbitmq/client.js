const amqp = require('amqplib');

let connection = null;
let channel = null;

async function initRabbitMQConnection() {
  if (connection && channel) {
    return { connection, channel };
  }

  const RABBITMQ_URL = `amqp://${process.env.RABBITMQ_URL || 'localhost'}`;
  connection = await amqp.connect(RABBITMQ_URL);
  channel = await connection.createChannel();

  return { connection, channel };
}

module.exports = { initRabbitMQConnection };
