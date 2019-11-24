
/**
 * Author: Dennis Felipe Urtubia
 * Products routes
 */

const router = require('express').Router();
const controller = require('../controllers/product');
const validations = require('../validations/product');

router.get('/', controller.getAll);
router.get('/:productId', controller.getById);
router.post('/', validations.add(), controller.add);
router.delete('/:productId', controller.delete);

module.exports = router;