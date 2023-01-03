const kafkaConfig = require('./kafka-config');

const consumer = kafkaConfig.consumer({
  groupId: 'todo',
});

const run = async (topic, callback) => {
  try {
    await consumer.connect();
    await consumer.subscribe({
      topic,
      fromBeginning: true,
    })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          topic,
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });
        callback(message, topic, partition);
      }
    })
  } catch (e) {
    throw e;
  }
};

module.exports = {
  run,
};
