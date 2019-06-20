'use strict';

var MAP = document.querySelector('.map');
var PIN = document.querySelector('#pin').content.querySelector('.map__pin');
var PIN_MAIN = document.querySelector('.map__pin--main');
var FORM = document.querySelector('.ad-form');
var FORM_FIELDSETS = FORM.querySelectorAll('fieldset');
var FORM_INPUT_ADDRESS = FORM.querySelector('#address');
var FORM_SELECT_TYPE = FORM.querySelector('#type');
var FORM_SELECT_TIMEIN = FORM.querySelector('#timein');
var FORM_SELECT_TIMEOUT = FORM.querySelector('#timeout');
var FORM_PRICE = FORM.querySelector('#price');
var MAP_FILTER = document.querySelector('.map__filters');
var MAP_FILTER_SELECTS = MAP_FILTER.querySelectorAll('select');
var MAP_FILTER_FIELDSET = MAP_FILTER.querySelector('fieldset');
var PIN_MAIN_WIDTH = 65;
var PIN_MAIN_HEIGHT = 87;
var isShowAnnouncements = false;
var isActiveMode = false;

var dataAnnouncement = {
  avatar: 'img/avatars/user0',
  housingTypes: ['palace', 'flat', 'house', 'bungalo'],
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
  var currentAddress = getCurrentAddress();
  FORM_INPUT_ADDRESS.value = currentAddress.x + ', ' + currentAddress.y;
  return FORM_INPUT_ADDRESS.value;
};

var notActiveMode = function () {
  addAttr(FORM_FIELDSETS, 'disabled');
  addAttr(MAP_FILTER_SELECTS, 'disabled');
  addAttr(MAP_FILTER_FIELDSET, 'disabled');
  setInputAddressCoordinate();
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

notActiveMode();

PIN_MAIN.addEventListener('click', getActiveMode);
PIN_MAIN.addEventListener('mouseup', setInputAddressCoordinate);


var onChangePriceOfNight = function (type) {
  if (type === 'bungalo') {
    FORM_PRICE.setAttribute('min', 0);
    FORM_PRICE.placeholder = '0';
  }

  if (type === 'flat') {
    FORM_PRICE.setAttribute('min', 1000);
    FORM_PRICE.placeholder = '1000';
  }

  if (type === 'house') {
    FORM_PRICE.setAttribute('min', 5000);
    FORM_PRICE.placeholder = '5000';
  }

  if (type === 'palace') {
    FORM_PRICE.setAttribute('min', 10000);
    FORM_PRICE.placeholder = '10000';
  }
};

var onChangeTimeIn = function () {
  FORM_SELECT_TIMEOUT.value = FORM_SELECT_TIMEIN.value;
};

var onChangeTimeOut = function () {
  FORM_SELECT_TIMEIN.value = FORM_SELECT_TIMEOUT.value;
};

FORM_SELECT_TYPE.addEventListener('change', function () {
  onChangePriceOfNight(FORM_SELECT_TYPE.value);
});

FORM_SELECT_TIMEIN.addEventListener('change', onChangeTimeIn);
FORM_SELECT_TIMEOUT.addEventListener('change', onChangeTimeOut);
