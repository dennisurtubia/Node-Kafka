const knex = require('../db/knex');
const { cardValidation } = require('./utils/cards');

async function rejectTransaction(product_id, amount_purchased, unitary_value) {
  await knex('transactions').insert({
    product_id,
    sale_value: amount_purchased * unitary_value,
    date_sale: knex.fn.now(),
    status: 'REJECTED',
  });
}

module.exports = {
    async sale(payload) {
      try {
        const { product_id, amount_purchased, card } = payload;
  
        const product = await knex
          .select('*')
          .from('products')
          .where('id', product_id)
          .first();
  
        if (!(card.banner in cardValidation) || !card.number.match(cardValidation[card.banner])) {
          rejectTransaction(product_id, amount_purchased, product.unitary_value);
          throw new Error('INVALID_CARD');
        }
  
        if (product.qtd_stock < amount_purchased) {
          rejectTransaction(product_id, amount_purchased, product.unitary_value);
          throw new Error('PRODUCT_NOT_IN_STOCK');
        }
  
        const transaction_id = await knex('transactions').insert({
          product_id,
          sale_value: amount_purchased * product.unitary_value,
          date_sale: knex.fn.now(),
          status: 'APPROVED',
        });
  
        await knex('products')
          .where('id', product_id)
          .update({ qtd_stock: product.qtd_stock - 1 });
  
        return {
          message: `Venda ${transaction_id} realizada com sucesso`,
        };
      } catch (error) {
        console.log(error.message);
        if (error.message === 'INVALID_CARD' || error.message === 'PRODUCT_NOT_IN_STOCK') {
          return {
            message: 'Os valores informados não são válidos.',
          };
        } else {
          return {
            message: 'Ocorreu um erro desconhecido',
            data: null,
          };
        }
      }
    },
  };