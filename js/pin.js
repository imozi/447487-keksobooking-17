'use strict';
/**
 * Модуль создания метки объявления
 * Зависимости модуль card.js
 * Методы create, onClickMap в window.pin доступны для других модулей
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
    window.card.show(info);
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
      pinNode.fullData = pin.setData;
      pinNode.card = pin.card;
      return pinNode;
    },
    /**
     * Подписывается на событие click по блоку map__pin
     * Если клик был на пине или на картинке пина то сначала закрывает (если была уже открыта другая карточка) карточку
     * а потом рендерит соответствующию карточку текущего пина на которым произошло событие
     */
    onClickMap: function () {
      MAP_PINS.addEventListener('click', function (evt) {
        if (evt.target.closest('.map__pin:not(.map__pin--main)')) {
          window.card.removeForRendering();
          if (evt.target.tagName === 'IMG') {
            evt.target.parentElement.classList.add('map__pin--active');
            evt.target.parentElement.card(evt.target.parentElement.fullData);
          } else {
            evt.target.classList.add('map__pin--active');
            evt.target.card(evt.target.fullData);
          }
        }
      });
    }
  };

})();
