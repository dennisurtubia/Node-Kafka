/* eslint-disable no-console */
const express = require('express');
const { Kafka, logLevel } = require('kafkajs');
const cors = require('cors');
const apiRouter = require('./src/routes');

const app = express();
app.use(cors({ credentials: true }));

// Connection w/ Kafka
const kafka = new Kafka({
  clientId: 'api',
  brokers: ['localhost:9092'],
  logLevel: logLevel.WARN,
  retry: {
    initialRetryTime: 300,
    retries: 10,
  },
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'card-module-group-receiver' });

// Make the producer available for all routes
app.use((req, res, next) => {
  req.producer = producer;

  return next();
});

app.use('/api', apiRouter);

/**
 * Run Kafka producer and consumer
 * Subscribe in card-module response topic
 * Server listen on port 3000
 */
async function run() {
  await producer.connect();
  await consumer.connect();

  await consumer.subscribe({ topic: 'card-module-response' });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Response card-module', String(message.value));
    },
  });

  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}

run().catch(console.error);
