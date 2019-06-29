'use strict';
/**
 * Рендеринг похожих объявлений
 */

/**
 * @return {function}
 */
window.renderAnnouncements = (function () {
  var MAP = document.querySelector('.map');
  var PIN = document.querySelector('#pin').content.querySelector('.map__pin');
  /**
   * Рендеринг нужного количества похожих объявлений
   * @param {number} data
   */
  var renderAnnouncements = function (data) {
    var fragment = document.createDocumentFragment();
    var announcement = null;
    var announcementElement = null;

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
  return renderAnnouncements;
})();
