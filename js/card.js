'use strict';
/**
 * Модуль создания карточки объявления
 * Зависимости utils.js
 * Методы create, close, onClickCloseBtn, onEscCloseCard в window.card доступны для других модулей
 */
(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
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
     * @param {object} offer
     * @return {HTMLElement}
     */
    create: function (offer) {
      var cardNode = cardTemplate.cloneNode(true);
      cardNode.querySelector('.popup__avatar').src = offer.avatar;
      cardNode.querySelector('.popup__title').textContent = offer.title;
      cardNode.querySelector('.popup__title').textContent = offer.title;
      cardNode.querySelector('.popup__text--address').textContent = offer.address;
      cardNode.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
      cardNode.querySelector('.popup__type').textContent = typesMap[offer.type];
      cardNode.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
      cardNode.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ' выезд до ' + offer.checkin;
      cardNode.querySelector('.popup__description').textContent = offer.description;
      checkFeatures(cardNode.querySelector('.popup__features'), offer.features);
      setImages(cardNode.querySelector('.popup__photos'), cardNode.querySelector('.popup__photo'), offer.photos);
      return cardNode;
    },
    /**
     * Рендерит карточку объявления
     * @param {object} info
     */
    open: function (info) {
      window.rendering.card(info);
    },
    /**
     * Удаляет открутую карточку объявления и отписывается от события keydown на документе
     */
    close: function () {
      var currentCard = document.querySelector('.map__card');
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      if (currentCard) {

        window.util.clearDomElement(currentCard);
        pins.forEach(function (item) {
          item.classList.remove('map__pin--active');
        });

        document.removeEventListener('keydown', window.card.onEscCloseCard);
      }
    },
    /**
     * Удаляет карточку по событию click на кнопке "закрыть карточку"
     */
    onClickCloseBtn: function () {
      var closeBtn = document.querySelector('.popup__close');
      closeBtn.addEventListener('click', window.card.close);
    },
    /**
     * Закрывает карточку по нажатию клавиши ESC
     * @param {ObjectEvent} evt
     */
    onEscCloseCard: function (evt) {
      window.util.onKeyPressDocument(evt, window.card.close);
    }
  };

})();
