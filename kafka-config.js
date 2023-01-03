const { Kafka, logLevel } = require('kafkajs');

const HOST = process.env.KAFKA_HOST;
const PORT = 9092;

const kafkaConf = new Kafka({
  logLevel: logLevel.INFO,
  clientId: 'kaon-app',
  brokers: [`${HOST}:${PORT}`]
});

module.exports = kafkaConf;
