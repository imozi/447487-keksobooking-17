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
   * Удаляет все пины и карточки объявлений для рендеринга новых
   */
  var clearMaps = function () {
    var pins = Array.from(CONTAINER_PINS.querySelectorAll('button[type = button]'));
    var cards = Array.from(MAP.querySelectorAll('.map__card'));
    var mapItems = [].concat(pins, cards);

    mapItems.forEach(function (element) {
      window.util.clearDomElement(element);
    });
  };
  /**
   * Получает пины объявлений
   * @param {object} data
   * @return {HTMLAllCollection}
   */
  var getPins = function (data) {
    var fragment = document.createDocumentFragment();

    clearMaps();

    data.forEach(function (item) {
      fragment.appendChild(window.pin.create(item));
    });

    return fragment;
  };
  /**
   * Получет карточки объявлений
   * @return {HTMLAllCollection}
   */
  var getCards = function () {
    var pins = CONTAINER_PINS.querySelectorAll('button[type = button]');
    var fragment = document.createDocumentFragment();

    pins.forEach(function (item) {
      fragment.appendChild(item.firstChild.card);
    });

    return fragment;
  };
  /**
   * Рендерит пины и карточки и вешает обработчик события click на родительский блок пинов
   * @param {object} data
   */
  window.rendering = function (data) {
    CONTAINER_PINS.appendChild(getPins(data));
    MAP.appendChild(getCards());
    window.pin.onClickMap();
  };

})();
