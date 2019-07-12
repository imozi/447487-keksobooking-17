'use strict';
/**
 * Модуль рендеринга объявлений и карточки объявления
 * Зависимости utils.js, pin.js, card.js
 * Метод window.rendering доступен для других модулей
 */
(function () {
  var MAP = document.querySelector('.map');
  var CONTAINER_PINS = MAP.querySelector('.map__pins');
  /**
   * Удаляет все пины и открытую карточку объявления для рендеринга новых
   */
  var clearMaps = function () {
    var pins = Array.from(CONTAINER_PINS.querySelectorAll('.map__pin:not(.map__pin--main)'));

    pins.forEach(function (element) {
      window.util.clearDomElement(element);
    });
    window.card.close();
  };

  window.rendering = {
    /**
     * Рендерит пины объявлений
     * @param {object} data
     */
    pin: function (data) {
      var fragment = document.createDocumentFragment();

      clearMaps();

      data.forEach(function (item) {
        fragment.appendChild(window.pin.create(item));
      });

      CONTAINER_PINS.appendChild(fragment);
      window.pin.onClickMap();
    },
    /**
    * Рендерит карточки объявления
    * @param {object} info
    */
    card: function (info) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(window.card.create(info));
      MAP.appendChild(fragment);
    }
  };

})();
