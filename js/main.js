'use strict';

var MAP = document.querySelector('.map');
var PIN = document.querySelector('#pin').content.querySelector('.map__pin');
var PIN_MAIN = document.querySelector('.map__pin--main');
var FORM_FIELDSETS = document.querySelector('.ad-form').children;
var MAP_FILTERS = document.querySelector('.map__filters').children;
var INPUT_ADDRESS = document.querySelector('input[name="address"]');
var PIN_MAIN_WIDTH = 65;
var PIN_MAIN_HEIGHT = 87;
var isShowAnnouncements = false;

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
  isShowAnnouncements = true;
  MAP.appendChild(fragment);
};

var clearAttrDisabled = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled');
  }
};

var getAddress = function () {
  INPUT_ADDRESS.value = Math.round((parseInt(PIN_MAIN.style.left, 10)) - PIN_MAIN_WIDTH * 0.5) + ', '
  + Math.round((parseInt(PIN_MAIN.style.top, 10) - PIN_MAIN_HEIGHT));

  return INPUT_ADDRESS.value;
};

var activeMode = function () {
  removeClass('.map', 'map--faded');
  removeClass('.ad-form', 'ad-form--disabled');
  clearAttrDisabled(FORM_FIELDSETS);
  clearAttrDisabled(MAP_FILTERS);

  if (!isShowAnnouncements) {
    renderAnnouncements(quantityAnnouncements);
  }
};

PIN_MAIN.addEventListener('click', activeMode);
PIN_MAIN.addEventListener('mouseup', getAddress);
