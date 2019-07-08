'use strict';
/**
 * Модуль рендеринга объявлений
 */

/**
 * @return {function}
 */
window.renderAnnouncements = (function () {
  var MAP = document.querySelector('.map');
  var PIN = document.querySelector('#pin').content.querySelector('.map__pin');
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
  return function (data) {
    var fragment = document.createDocumentFragment();
    var announcement = null;
    var announcementElement = null;

    clearAnnouncements();

    for (var i = 0; i < data.length; i++) {
      announcement = data[i];
      announcementElement = PIN.cloneNode(true);
      announcementElement.querySelector('img').src = announcement.author.avatar;
      announcementElement.querySelector('img').alt = announcement.offer.type;
      announcementElement.style.left = announcement.location.x + 'px';
      announcementElement.style.top = announcement.location.y + 'px';
      fragment.appendChild(announcementElement);
    }
    MAP.appendChild(fragment);
  };
})();
