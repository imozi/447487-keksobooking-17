'use strict';
/**
 * Модуль рендеринга объявлений и карточки объявления
 * Зависимости utils.js, pin.js, card.js
 * Методы pin, card, clear, filteredDataPin в window.rendering доступены для других модулей
 */
(function () {
  var map = document.querySelector('.map');
  var containerPins = map.querySelector('.map__pins');
  /**
   * Удаляет пины и открытую карточку объявления
   */
  var clear = function () {
    var pins = containerPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    if (pins) {
      pins.forEach(function (element) {
        window.util.clearDomElement(element);
      });
      window.card.close();
    }
  };
  /**
   * Сначало удаляет если есть существующие пины объявлений а затем рендерит новые в DOM из полученных данных
   * @param {object} data
   */
  var pin = function (data) {
    var fragment = document.createDocumentFragment();

    clear();

    data.forEach(function (item) {
      if (item.offer) {
        fragment.appendChild(window.pin.create(item));
      }
    });

    containerPins.appendChild(fragment);
    containerPins.addEventListener('click', window.pin.onClickMap);
  };
  /**
   * Рендерит карточку объявления в DOM и подписывается на событие click по кнопке "закрыть карточку" и keydown на документе
   * для закрытия карточки по нажатию клавиши ESC
   * @param {object} info
   */
  var card = function (info) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.card.create(info));
    map.appendChild(fragment);

    var closeBtn = document.querySelector('.popup__close');
    closeBtn.addEventListener('click', window.card.onClickCloseBtn);
    document.addEventListener('keydown', window.card.onEscClose);
  };
  /**
   * Рендерит пины по отфильтрованным данным объявления
   */
  var filteredDataPin = window.debounce(function () {
    pin(window.filter());
  });
  /**
   * Экспорт в глобальную область видимости
   */
  window.rendering = {
    pin: pin,
    card: card,
    clear: clear,
    filteredDataPin: filteredDataPin
  };

})();
