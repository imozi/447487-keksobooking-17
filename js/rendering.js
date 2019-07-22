'use strict';
/**
 * Модуль рендеринга объявлений и карточки объявления
 * Зависимости utils.js, pin.js, card.js
 * Методы pin, card в window.rendering доступены для других модулей
 */
(function () {
  var map = document.querySelector('.map');
  var containerPins = map.querySelector('.map__pins');


  window.rendering = {
    /**
     * Сначало удаляет если есть существующие пины объявлений а затем рендерит новые в DOM из полученных данных
     * и подписывается на событие click после рендеринга
     * @param {object} data
     */
    pin: function (data) {
      var fragment = document.createDocumentFragment();

      window.rendering.clearMap();

      data.forEach(function (item) {
        if (item.offer) {
          fragment.appendChild(window.pin.create(item));
        }
      });

      containerPins.appendChild(fragment);
      window.pin.onClickPinMap();
    },
    /**
     * Рендерит карточку объявления в DOM и подписывается на событие click по кнопке "закрыть карточку" и keydown на документе
     * для закрытия карточки по нажатию клавиши ESC
     * @param {object} info
     */
    card: function (info) {
      var fragment = document.createDocumentFragment();
      fragment.appendChild(window.card.create(info));
      map.appendChild(fragment);

      window.card.onClickCloseBtn();
      document.addEventListener('keydown', window.card.onEscCloseCard);
    },
    /**
     * Удаляет все пины и открытую карточку объявления для рендеринга новых
     */
    clearMap: function () {
      var pins = containerPins.querySelectorAll('.map__pin:not(.map__pin--main)');

      if (pins) {
        pins.forEach(function (element) {
          window.util.clearDomElement(element);
        });
        window.card.close();
      }
    }
  };

})();
