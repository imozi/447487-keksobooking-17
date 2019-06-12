'use strict';

var MAP = document.querySelector('.map');
var PIN = document.querySelector('#pin').content.querySelector('.map__pin');

var dataAnnouncement = {
  avatar: 'img/avatars/user0',
  housingTypes: ['place', 'flat', 'house', 'bungalo'],
  locations: {
    minX: 0,
    maxX: 1200,
    minY: 130,
    maxY: 630
  },
  pinSize: {
    width: 50,
    height: 70
  }
};
var quantityAnnouncements = 8;

var removeClass = function (element, nameClass) {
  var classListElement = document.querySelector(element).classList;
  classListElement.remove(nameClass);
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomValue = function (array) {
  return array[getRandomNumber(0, array.length)];
};

var createAnnouncement = function (data, index) {
  return {
    author: {avatar: data.avatar + (index + 1) + '.png'},
    offer: {type: getRandomValue(data.housingTypes)},
    location: {
      x: getRandomNumber(data.locations.minX, data.locations.maxX),
      y: getRandomNumber(data.locations.minY, data.locations.maxY)
    }
  };
};

var renderAnnouncements = function (quantity) {
  var fragment = document.createDocumentFragment();
  var Announcement = null;
  var AnnouncementElement = null;

  for (var i = 0; i < quantity; i++) {
    Announcement = createAnnouncement(dataAnnouncement, i);
    AnnouncementElement = PIN.cloneNode(true);
    AnnouncementElement.querySelector('img').src = Announcement.author.avatar;
    AnnouncementElement.querySelector('img').alt = Announcement.offer.type;
    AnnouncementElement.style = 'left:' + (Announcement.location.x - dataAnnouncement.pinSize.width * 0.5) + 'px; top:' + (Announcement.location.y - dataAnnouncement.pinSize.height) + 'px;';
    fragment.appendChild(AnnouncementElement);
  }
  MAP.appendChild(fragment);
};

removeClass('.map', 'map--faded');
renderAnnouncements(quantityAnnouncements);
