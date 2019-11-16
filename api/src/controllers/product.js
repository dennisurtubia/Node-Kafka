/* eslint-disable camelcase */
const knex = require('../../db/knex');

module.exports = {
  async getAll(req, res) {
    try {
      const products = await knex
        .select('name', 'unitary_value', 'qtd_stock')
        .from('products')
        .where('qtd_stock', '>', 0);

      res.status(200).json({
        message: 'SUCCESS',
        data: products,
      });
    } catch (error) {
      res.status(400).json({
        message: 'ERROR',
        data: null,
      });
    }
  },

  async getById(req, res) {
    try {
      const { productId } = req.params;

      let product = await knex
        .select('id', 'name', 'unitary_value', 'qtd_stock')
        .from('products')
        .where('id', productId)
        .first();

      let date_sale, sale_value = null;

      const lastSale = await knex
        .select('sale_value', 'date_sale')
        .from('transactions')
        .where({
          status: 'APPROVED',
          product_id: productId,
        })
        .orderBy('date_sale', 'desc')
        .first();

      if (lastSale) {
        product.date_sale = lastSale.date_sale;
        product.sale_value = lastSale.sale_value;
      }

      res.status(200).json({
        message: 'SUCCESS',
        data: {
          ...product,
          date_sale,
          sale_value,
        },
      });
    } catch (error) {
      res.status(400).json({
        message: 'ERROR',
      });
    }
  },

  async add(req, res) {
    try {
      const { name, unitary_value, qtd_stock } = req.body;

      const productId = await knex('products')
        .insert({
          name,
          unitary_value,
          qtd_stock,
          creation_date: knex.fn.now(),
          update_date: knex.fn.now(),
        });

      const product = await knex
        .select('*')
        .from('products')
        .where('id', productId)
        .first();

      res.status(201).json({
        message: 'SUCCESS',
        data: product,
      });
    } catch (error) {
      res.status(400).json({
        message: 'ERROR',
        data: null,
      });
    }
  },

  async delete(req, res) {
    try {
      const { productId } = req.params;

      await knex('products')
        .where('id', productId)
        .update({ exclusion_date: knex.fn.now(), qtd_stock: 0 });

      res.status(204).json({
        message: 'SUCCES',
      });
    } catch (error) {
      res.status(400).json({
        message: 'ERROR',
      });
    }
  },
};
