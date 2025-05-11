const mqttClient = require('./src/mqtt/client');
const topics = require('./src/mqtt/topic');
const { initRabbitMQConnection } = require('./src/rabbitmq/client');

function topicToRegex(topicPattern) {
  return new RegExp('^' + topicPattern.replace('+', '[^/]+') + '$');
}

topics.forEach(({ topic, handler }) => {
  console.log('topic', topic)
  mqttClient.subscribe(topic, (err) => {
    if (err) {
      console.error(`Failed to subscribe to ${topic}`, err);
    } else {
      console.log(`Subscribed to ${topic}`);
    }
  });

  mqttClient.on('message', (msgTopic, message) => {
    if (msgTopic.match(topicToRegex(topic))) {
      handler(msgTopic, message);
    }
  });
});

process.on('SIGINT', async () => {
  const { connection, channel } = await initRabbitMQConnection();
  await channel.close();
  await connection.close();
  console.log('RabbitMQ connection closed');
  process.exit(0);
});
