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
    var Announcement = null;
    var AnnouncementElement = null;

    for (var i = 0; i < data.length; i++) {
      Announcement = data[i];
      AnnouncementElement = PIN.cloneNode(true);
      AnnouncementElement.querySelector('img').src = Announcement.author.avatar;
      AnnouncementElement.querySelector('img').alt = Announcement.offer.type;
      AnnouncementElement.style.left = Announcement.location.x + 'px';
      AnnouncementElement.style.top = Announcement.location.y + 'px';
      fragment.appendChild(AnnouncementElement);
    }
    MAP.appendChild(fragment);
  };
  return renderAnnouncements;
})();
