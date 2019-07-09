'use strict';
/**
 * Модуль рендеринга объявлений и карточки объявления
 */
(function () {
  var MAP = document.querySelector('.map');
  var PIN = document.querySelector('#pin').content.querySelector('.map__pin');
  var CARD = document.querySelector('#card').content.querySelector('.map__card');
  var pinSize = {
    width: 50,
    height: 70
  };
  /**
   * Удаляет объявления для рендеринга новых
   */
  var clearAnnouncements = function () {
    var MAP_PINS = MAP.querySelectorAll('.map__pin');

    MAP_PINS.forEach(function (element) {
      if (!element.classList.contains('map__pin--main')) {
        window.util.clearDomElements(element);
      }
    });
  };
  /**
   * @param {object} data
   */
  // var renderingPins = function (data) {
  //   var fragment = document.createDocumentFragment();
  //   var announcement = null;
  //   var announcementElement = null;

  //   for (var i = 0; i < data.length; i++) {
  //     announcement = data[i];
  //     announcementElement = PIN.cloneNode(true);
  //     announcementElement.querySelector('img').src = announcement.author.avatar;
  //     announcementElement.querySelector('img').alt = announcement.offer.type;
  //     announcementElement.style.left = announcement.location.x - pinSize.height * 0.5 + 'px';
  //     announcementElement.style.top = announcement.location.y - pinSize.width + 'px';
  //     fragment.appendChild(announcementElement);
  //   }
  //   MAP.appendChild(fragment);
  // };

  var Pin = function (data) {
    this.pin = PIN.cloneNode(true);
    this.positionX = data.location.x - pinSize.height * 0.5 + 'px';
    this.positionY = data.location.y - pinSize.width + 'px';
    this.img = data.author.avatar;
    this.alt = data.offer.description;
    this.fullData = data;
  };

  var createPin = function (data) {

  };

  var renderingCards = function (data) {
    console.log('aga');
  };

  var renderingAnnouncement = function (data) {
    clearAnnouncements();
    renderingPins(data);
    renderingCards(data);
  };
  window.createpin = Pin;
  window.renderingAnnouncement = renderingAnnouncement;
})();
