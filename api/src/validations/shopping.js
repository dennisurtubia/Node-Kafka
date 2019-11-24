
const { Joi, celebrate } = require('celebrate');

module.exports = {
  sale() {
    return celebrate({
      body: Joi.object().keys({
        product_id: Joi.number().required(),
        amount_purchased: Joi.number().min(1).required(),
        card: Joi.object().required().keys({
          cardholder: Joi.string().required(),
          number: Joi.string().required(),
          expiration_date: Joi.string().required(),
          banner: Joi.string().required(),
          cvv: Joi.string().required(),
        }),
      }),
    });
  },
};
