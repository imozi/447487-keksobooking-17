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
  // var featuresMap = {
  //   wifi: 'popup__feature--wifi',
  //   dishwasher: 'popup__feature--dishwasher',
  //   parking: 'popup__feature--parking',
  //   washer: 'popup__feature--washer',
  //   elevator: 'popup__feature--elevator',
  //   conditioner: 'popup__feature--conditioner'
  // };

  var checkFeatures = function (node, array) {
    node.forEach(function (element) {
      features.forEach(function (item) {
        // array.includes(item) ? element.style.display = 'inline' : element.style.display = 'none';
      });
    });
  };
  // var setFeatures = function (currentOffer) {
  //   var featuresNode = blockTemplate.querySelector('.popup__features');
  //   var currentFeatures = currentOffer.offer.features;

  //   allHouseFeatures.forEach(function (element) {
  //     if (currentFeatures.includes(element)) {
  //       featuresNode.querySelector('.' + featuresMap[element]).style.display = 'inline-block';
  //     } else {
  //       featuresNode.querySelector('.' + featuresMap[element]).style.display = 'none';
  //     }
  //   });
  // };
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
    checkFeatures(cardNode.querySelectorAll('.popup__feature'), data.offer.features);
    cardNode.fullData = data;
    return cardNode;
  };
  /**
   * Если данные полученные от текущего пина одинаковые с карточкой то показывает ее
   * @param {object} data
   */
  var showCard = function (data) {
    var cards = document.querySelectorAll('.map__card');

    cards.forEach(function (element) {
      if (element.fullData === data) {
        element.classList.remove('hidden');
      }
    });
  };

  window.card = {
    showCard: showCard,
    createCard: createCard
  };

})();
