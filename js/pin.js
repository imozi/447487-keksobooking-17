'use strict';
/**
 * Модуль создания метки объявления
 * Зависимости модуль card.js
 * Методы createPin в window.pin доступны для других модулей
 */
(function () {
  var PIN = document.querySelector('#pin').content.querySelector('.map__pin');
  var MAP_PINS = document.querySelector('.map__pins');
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

  Pin.prototype.card = function (info) {
    return window.card.create(info);
  };

  window.pin = {
    /**
     * Создает пин на основе конструктора
     * @param {object} announcement
     * @return {HTMLElement}
     */
    create: function (announcement) {
      var pin = new Pin(announcement);
      var pinNode = pin.pin;
      pinNode.style.left = pin.positionX;
      pinNode.style.top = pin.positionY;
      pinNode.querySelector('img').src = pin.img;
      pinNode.querySelector('img').alt = pin.alt;
      pinNode.querySelector('img').card = pin.card(pin.setData);
      return pinNode;
    },
    /**
     * Подписывается на события click по блоку map__pin
     * Если клик был на пине то показывает соответствующию карточку
     */
    onClickMap: function () {
      MAP_PINS.addEventListener('click', function (evt) {
        if (evt.target.parentElement.classList.contains('map__pin') && !evt.target.parentElement.classList.contains('map__pin--main')) {
          evt.target.parentElement.classList.add('map__pin--active');
          window.card.open(evt.target.card);
        }
      });
    }
  };

})();
