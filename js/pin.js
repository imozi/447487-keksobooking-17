'use strict';
/**
 * Модуль создания метки объявления
 * Зависимости модуль card.js
 * Методы createPin, onClickPin в window.pin доступны для других модулей
 */
(function () {
  var PIN = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinSize = {
    width: 50,
    height: 70
  };
  /**
   * Функция-коснтруктор для создания пинов
   * @param {object} data
   * @constructor
   */
  var Pin = function (data) {
    this.pin = PIN.cloneNode(true);
    this.positionX = data.location.x - pinSize.height * 0.5 + 'px';
    this.positionY = data.location.y - pinSize.width + 'px';
    this.img = data.author.avatar;
    this.alt = data.offer.description;
    this.setData = data;
  };

  Pin.prototype.card = function (item) {
    return window.card.createCard(item);
  };
  /**
   * Создает ментку на основе конструктора
   * @param {object} announcement
   * @return {HTMLElement}
   */
  var createPin = function (announcement) {
    var pin = new Pin(announcement);
    var pinNode = pin.pin;
    pinNode.style.left = pin.positionX;
    pinNode.style.top = pin.positionY;
    pinNode.querySelector('img').src = pin.img;
    pinNode.querySelector('img').alt = pin.alt;
    pinNode.querySelector('img').fullData = pin.setData;
    pinNode.querySelector('img').card = pin.card;
    return pinNode;
  };
  /**
   * Подписывается на события клик по пину
   * Показывает соответствующию данным карточку
   */
  var onClickPin = function () {
    var pins = document.querySelectorAll('button[type = button]');

    pins.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        item.classList.add('map__pin--active');
        window.card.showCard(evt.target.fullData);
      });
    });
  };

  window.pin = {
    createPin: createPin,
    onClickPin: onClickPin
  };

})();
