'use strict';
/**
 * Модуль создания карточки объявления
 * Методы showCard, createCard в window.card доступны для других модулей
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

  var featuresMap = {
    wifi: 'popup__feature--wifi',
    dishwasher: 'popup__feature--dishwasher',
    parking: 'popup__feature--parking',
    washer: 'popup__feature--washer',
    elevator: 'popup__feature--elevator',
    conditioner: 'popup__feature--conditioner'
  };
  /**
   * Скрывает преимущества которых нет у объявления
   * @param {HTMLElement} node
   * @param {array} array
   */
  var checkFeatures = function (node, array) {
    features.forEach(function (element) {
      if (!array.includes(element)) {
        node.querySelector('.' + featuresMap[element]).style.display = 'none';
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
        if (index > 1) {
          var elementClone = element.cloneNode();
          elementClone.src = item;
          fragment.appendChild(elementClone);
        }
      });
      node.appendChild(fragment);
    }
  };
  /**
   * Создает карточку объявления на основе полученных данных от пина
   * @param {object} data
   * @return {HTMLElement}
   */
  var createCard = function (data) {
    var cardNode = CARD.cloneNode(true);
    cardNode.classList.add('hidden');
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
  };
  /**
   * Показывает нужную карточку объявления
   * @param {HTMLElement} card
   */
  var showCard = function (card) {
    var cards = document.querySelectorAll('.map__card');

    cards.forEach(function (element) {
      if (element === card) {
        element.classList.remove('hidden');
      }
    });
  };

  window.card = {
    showCard: showCard,
    createCard: createCard
  };

})();
