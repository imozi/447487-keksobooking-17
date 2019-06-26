'use strict';
/**
 * Тестовые данные волшебников
*/

/**
 * @return {object}
*/
window.data = (function () {
  return {
    dataAnnouncement: {
      avatar: 'img/avatars/user0',
      housingTypes: ['palace', 'flat', 'house', 'bungalo'],
      pinSize: {
        width: 50,
        height: 70
      }
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
    }
  };
})();
