'use strict';
/**
 * Модуль рендеринга объявлений и карточки объявления
 * Зависимости utils.js, pin.js, card.js
 * Методы pin, card в window.rendering доступены для других модулей
 */
(function () {
  var MAP = document.querySelector('.map');
  var CONTAINER_PINS = MAP.querySelector('.map__pins');
  /**
   * Удаляет все пины и открытую карточку объявления для рендеринга новых
   */
  var clearMap = function () {
    var pins = CONTAINER_PINS.querySelectorAll('.map__pin:not(.map__pin--main)');

    if (pins) {
      pins.forEach(function (element) {
        window.util.clearDomElement(element);
      });
      window.card.removeForRendering();
    }
  };

  window.rendering = {
    /**
     * Сначало удаляет если есть существующие пины объявлений а затем рендерит новые в DOM из полученных данных
     * и подписывается на событие click после рендеринга
     * @param {object} data
     */
    pin: function (data) {
      var fragment = document.createDocumentFragment();

      clearMap();

      data.forEach(function (item) {
        if (item.offer) {
          fragment.appendChild(window.pin.create(item));
        }
      });

      CONTAINER_PINS.appendChild(fragment);
      window.pin.onClickMap();
    },
    /**
    * Рендерит карточку объявления в DOM
    * @param {object} info
    */
    card: function (info) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(window.card.create(info));
      MAP.appendChild(fragment);
    }
  };

})();
