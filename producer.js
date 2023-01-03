const kafkaConfig = require('./kafka-config');

const producer = kafkaConfig.producer();

const run = async (topic, message) => {
  try {
    await producer.connect();
    await producer.send({
      topic,
      messages: [{
        value: message,
      }],
    });
  } catch (e) {
    throw e;
  }
};

module.exports = {
  run,
};
