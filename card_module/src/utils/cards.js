/**
 * Author: Dennis Felipe Urtubia
 * Util for card validation
 */

module.exports = {
  cardValidation: {
    Visa: /^4[0-9]{12}(?:[0-9]{3})/,
    Mastercard: /^5[1-5][0-9]{14}/,
    Amex: /^3[47][0-9]{13}/,
    DinersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
    Discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
    JCB: /^(?:2131|1800|35\d{3})\d{11}/,
  },
};