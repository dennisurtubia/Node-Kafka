/**
 * Author: Dennis Felipe Urtubia
 * Configuration for Kafka producer/consumer
 */

const { Kafka } = require('kafkajs');
const { sale } = require('./controller');

const kafka = new Kafka({
  brokers: ['localhost:9092'],
  clientId: 'card-module',
});

const topic = 'card-module';
const consumer = kafka.consumer({ groupId: 'card-module-group' });

const producer = kafka.producer();

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
      console.log(`- ${prefix} ${message.key}#${message.value}`);

      const payload = JSON.parse(message.value);

      const sale_response = await sale(payload);
      console.log(sale_response)

      producer.send({
        topic: 'card-module-response',
        messages: [
          { value: JSON.stringify(sale_response) }
        ]
      });
    }
  });
}

run().catch(console.error);
