/**
 * Author: Dennis Felipe Urtubia
 * Index for all routes of API
 */

const express = require('express');
const { errors } = require('celebrate');
const validationMiddleware = require('../middlewares/validations');

const productsRoutes = require('./products');
const shoppingRoutes = require('./shopping');

const router = express.Router();
router.use(express.json());

router.use('/products', productsRoutes);
router.use('/shopping', shoppingRoutes);

router.use('/', validationMiddleware.validation);
router.use(errors());

module.exports = router;