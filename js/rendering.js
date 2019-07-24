'use strict';
/**
 * Модуль рендеринга объявлений и карточки объявления
 * Зависимости utils.js, pin.js, card.js, form.js
 * Методы pin, card в window.rendering доступены для других модулей
 */
(function () {
  var map = document.querySelector('.map');
  var containerPins = map.querySelector('.map__pins');
  /**
   * Сначало удаляет если есть существующие пины объявлений а затем рендерит новые в DOM из полученных данных,
   * подписывается на событие click после рендеринга и активирует форму фильтра
   * @param {object} data
   */
  var pin = function (data) {
    var fragment = document.createDocumentFragment();

    window.util.clearMap();

    data.forEach(function (item) {
      if (item.offer) {
        fragment.appendChild(window.pin.create(item));
      }
    });

    containerPins.appendChild(fragment);
    window.pin.onClickPinMap();
    window.form.toggleState(window.form.filterElements, false);
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

    window.card.onClickCloseBtn();
    document.addEventListener('keydown', window.card.onEscCloseCard);
  };
  /**
   * Экспорт в глобальную область видимости
   */
  window.rendering = {
    pin: pin,
    card: card
  };

})();
