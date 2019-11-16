const { Joi, celebrate } = require('celebrate');

module.exports = {
  add() {
    return celebrate({
      body: Joi.object().keys({
        name: Joi.string().required(),
        qtd_stock: Joi.number().min(1).required(),
        unitary_value: Joi.number().required(),
      }),
    });
  },
};
