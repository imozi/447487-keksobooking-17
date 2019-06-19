'use strict';

var MAP = document.querySelector('.map');
var PIN = document.querySelector('#pin').content.querySelector('.map__pin');
var PIN_MAIN = document.querySelector('.map__pin--main');
var FORM = document.querySelector('.ad-form');
var FORM_FIELDSETS = FORM.querySelectorAll('fieldset');
var MAP_FILTER = document.querySelector('.map__filters');
var MAP_FILTER_SELECTS = MAP_FILTER.querySelectorAll('select');
var MAP_FILTER_FIELDSET = MAP_FILTER.querySelector('fieldset');
var INPUT_ADDRESS = document.querySelector('input[name="address"]');
var PIN_MAIN_WIDTH = 65;
var PIN_MAIN_HEIGHT = 87;
var isShowAnnouncements = false;
var isActiveMode = false;

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

var addAttr = function (elements, attr) {
  if (elements.length >= 0) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute(attr, '');
    }
  } else {
    elements.setAttribute(attr, '');
  }
};

var clearAttr = function (elements, attr) {
  if (elements.length >= 0) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute(attr);
    }
  } else {
    elements.removeAttribute(attr);
  }
};

var getCurrentAddress = function () {
  var coordinatePinX = PIN_MAIN.offsetLeft;
  var coordinatePinY = PIN_MAIN.offsetTop;
  var coordinatePinCenter = PIN_MAIN_WIDTH * 0.5;

  return {
    x: Math.round(coordinatePinX + coordinatePinCenter),
    y: Math.round(coordinatePinY + (isActiveMode ? PIN_MAIN_HEIGHT : coordinatePinCenter))
  };
};

var setInputAddressCoordinate = function () {
  INPUT_ADDRESS.value = getCurrentAddress().x + ', ' + getCurrentAddress().y;
  return INPUT_ADDRESS.value;
};

var getActiveMode = function () {
  removeClass('.map', 'map--faded');
  removeClass('.ad-form', 'ad-form--disabled');
  clearAttr(FORM_FIELDSETS, 'disabled');
  clearAttr(MAP_FILTER_SELECTS, 'disabled');
  clearAttr(MAP_FILTER_FIELDSET, 'disabled');

  if (!isShowAnnouncements) {
    renderAnnouncements(quantityAnnouncements);
  }

  isActiveMode = true;
};

addAttr(FORM_FIELDSETS, 'disabled');
addAttr(MAP_FILTER_SELECTS, 'disabled');
addAttr(MAP_FILTER_FIELDSET, 'disabled');
setInputAddressCoordinate(getCurrentAddress().x, getCurrentAddress().y);

PIN_MAIN.addEventListener('click', getActiveMode);
PIN_MAIN.addEventListener('mouseup', setInputAddressCoordinate);
