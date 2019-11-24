/* eslint-disable camelcase */
const { CompressionTypes } = require('kafkajs');

module.exports = {
  async sale(req, res) {
    const { product_id, amount_purchased, card } = req.body;
    const { producer } = req;

    const message = {
      product_id,
      amount_purchased,
      card,
    };

    await producer.send({
      topic: 'card-module',
      compression: CompressionTypes.GZIP,
      messages: [
        { value: JSON.stringify(message) },
      ],
    });

    res.status(201).json({ ok: true });
  },
};
