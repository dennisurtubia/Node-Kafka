/* eslint-disable camelcase */
const knex = require('../../db/knex');
const { cards } = require('../utils/cards');

async function rejectTransaction(product_id, amount_purchased, unitary_value) {
  await knex('transactions').insert({
    product_id,
    sale_value: amount_purchased * unitary_value,
    date_sale: knex.fn.now(),
    status: 'REJECTED',
  });
}

module.exports = {
  async sale(req, res) {
    try {
      const { product_id, amount_purchased, card } = req.body;

      const product = await knex
        .select('*')
        .from('products')
        .where('id', product_id)
        .first();

      if (!(card.banner in cards) || !card.number.match(cards[card.banner])) {
        rejectTransaction(product_id, amount_purchased, product.unitary_value);
        throw new Error('INVALID_CARD');
      }

      if (product.qtd_stock < amount_purchased) {
        rejectTransaction(product_id, amount_purchased, product.unitary_value);
        throw new Error('PRODUCT_NOT_IN_STOCK');
      }

      await knex('transactions').insert({
        product_id,
        sale_value: amount_purchased * product.unitary_value,
        date_sale: knex.fn.now(),
        status: 'APPROVED',
      });

      await knex('products')
        .where('id', product_id)
        .update({ qtd_stock: product.qtd_stock - 1 });

      res.status(201).json({
        message: 'Venda realizada com sucesso',
      });
    } catch (error) {
      console.log(error.message);
      if (error.message === 'INVALID_CARD' || error.message === 'PRODUCT_NOT_IN_STOCK') {
        res.status(412).json({
          message: 'Os valores informados não são válidos.',
        });
      } else {
        res.status(400).json({
          message: 'Ocorreu um erro desconhecido',
          data: null,
        });
      }
    }
  },
};