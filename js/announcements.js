'use strict';
/**
 * Рендеринг похожих объявлений
*/

/**
 * @param {number} quantity
 * @return {function}
*/
window.renderAnnouncements = (function () {
  var MAP = document.querySelector('.map');
  var PIN = document.querySelector('#pin').content.querySelector('.map__pin');

  /**
  * Создает объект с данными объявления из полученных данных
  * @param {array} data
  * @param {number} index
  * @return {object}
  */
  var createAnnouncement = function (data, index) {
    var location = {
      x: window.util.getRandomNumber(window.data.locations.minX, window.data.locations.maxX),
      y: window.util.getRandomNumber(window.data.locations.minY, window.data.locations.maxY)
    };

    var address = {
      x: location.x + window.data.dataAnnouncement.pinSize.width * 0.5,
      y: location.y + window.data.dataAnnouncement.pinSize.height
    };

    return {
      author: {avatar: data.avatar + (index + 1) + '.png'},
      offer: {type: window.util.getRandomValue(data.housingTypes)},
      location: location,
      address: address
    };
  };
  /**
   * Рендеринг нужного количества похожих объявлений
   * @param {number} quantity
   */
  var renderAnnouncements = function (quantity) {
    var fragment = document.createDocumentFragment();
    var Announcement = null;
    var AnnouncementElement = null;

    for (var i = 0; i < quantity; i++) {
      Announcement = createAnnouncement(window.data.dataAnnouncement, i);
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
