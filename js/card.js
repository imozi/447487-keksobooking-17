'use strict';
/**
 * Модуль создания карточки объявления
 * Зависимости utils.js
 * Методы create, rendering, removeForRendering в window.card доступны для других модулей
 */
(function () {
  var CARD = document.querySelector('#card').content.querySelector('.map__card');
  var typesMap = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  /**
   * Скрывает преимущества которых нет у объявления
   * @param {HTMLElement} node
   * @param {array} array
   */
  var checkFeatures = function (node, array) {
    features.forEach(function (element) {
      if (!array.includes(element)) {
        node.querySelector('.popup__feature--' + element).style.display = 'none';
      }
    });
  };
  /**
   * Добавляет фотографии в объявление
   * @param {HTMLElement} node
   * @param {HTMLElement} element
   * @param {array} photo
   */
  var setImages = function (node, element, photo) {
    var fragment = document.createDocumentFragment();
    if (photo.length === 0) {
      element.remove();
    } else {
      element.src = photo[0];

      photo.forEach(function (item, index) {
        if (index >= 1) {
          var elementClone = element.cloneNode();
          elementClone.src = item;
          fragment.appendChild(elementClone);
        }
      });
      node.appendChild(fragment);
    }
  };

  window.card = {
    /**
     * Создает карточку объявления на основе полученных данных от пина
     * @param {object} data
     * @return {HTMLElement}
     */
    create: function (data) {
      var cardNode = CARD.cloneNode(true);
      cardNode.querySelector('.popup__avatar').src = data.author.avatar;
      cardNode.querySelector('.popup__title').textContent = data.offer.title;
      cardNode.querySelector('.popup__title').textContent = data.offer.title;
      cardNode.querySelector('.popup__text--address').textContent = data.offer.address;
      cardNode.querySelector('.popup__text--price').textContent = data.offer.price + ' ₽/ночь';
      cardNode.querySelector('.popup__type').textContent = typesMap[data.offer.type];
      cardNode.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
      cardNode.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkin;
      cardNode.querySelector('.popup__description').textContent = data.offer.description;
      checkFeatures(cardNode.querySelector('.popup__features'), data.offer.features);
      setImages(cardNode.querySelector('.popup__photos'), cardNode.querySelector('.popup__photo'), data.offer.photos);
      return cardNode;
    },
    /**
     * Рендерит карточку объявления
     * @param {object} info
     */
    show: function (info) {
      window.rendering.card(info);
    },
    /**
     * Удаляет открутую карточку объявления (необходимо для рендеринга новой)
     */
    removeForRendering: function () {
      var currentCard = document.querySelector('.map__card');
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      if (currentCard) {
        window.util.clearDomElement(currentCard);
        pins.forEach(function (item) {
          item.classList.remove('map__pin--active');
        });
      }
    }
  };

})();
