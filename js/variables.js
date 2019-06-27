'use strict';
/**
 * Необходимые переменные
 */

/**
 * @return {object}
 */
window.variables = (function () {
  return {
    pinSize: {
      width: 50,
      height: 70
    },
    locations: {
      minX: 0,
      maxX: 1200,
      minY: 130,
      maxY: 630
    },
    priceTypes: {
      bungalo: 0,
      flat: 1000,
      house: 5000,
      palace: 10000
    },
  };
})();
