'use strict';
/**
 * Модуль создания метки объявления
 * Зависимости модуль card.js
 * Методы create, onClickMap в window.pin доступны для других модулей
 */
(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  /**
   * Функция-конструктор для создания пинов
   * @param {object} data
   * @constructor
   */
  var Pin = function (data) {
    this.pin = pinTemplate.cloneNode(true);
    this.positionX = data.location.x - PIN_WIDTH * 0.5 + 'px';
    this.positionY = data.location.y - PIN_HEIGHT + 'px';
    this.img = data.author.avatar;
    this.alt = data.offer.description;
    this.offer = data.offer;
    this.offer.avatar = data.author.avatar;
  };

  Pin.prototype.card = function (offer) {
    window.card.open(offer);
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
      pinNode.offer = pin.offer;
      pinNode.card = pin.card;
      return pinNode;
    },
    /**
     * Подписывается на событие click по блоку map__pin
     * Если клик был на пине или на картинке пина то сначала закрывает (если была уже открыта другая карточка) карточку
     * а потом рендерит соответствующию карточку текущего пина на которым произошло событие
     */
    onClickPinMap: function () {
      /**
       * @param {ObjectEvent} evt
       */
      mapPins.addEventListener('click', function (evt) {
        if (evt.target.closest('.map__pin:not(.map__pin--main)')) {
          window.card.close();
          if (evt.target.tagName === 'IMG') {
            evt.target.parentElement.classList.add('map__pin--active');
            evt.target.parentElement.card(evt.target.parentElement.offer);
          } else {
            evt.target.classList.add('map__pin--active');
            evt.target.card(evt.target.offer);
          }
        }
      });
    }
  };

})();
