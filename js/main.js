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
var LOCATIONS = {
  minX: 0,
  maxX: 1200,
  minY: 130,
  maxY: 630
};
var isShowAnnouncements = false;
var isActiveMode = false;

var dataAnnouncement = {
  avatar: 'img/avatars/user0',
  housingTypes: ['palace', 'flat', 'house', 'bungalo'],
  pinSize: {
    width: 50,
    height: 70
  }
};
var quantityAnnouncements = 8;

var priceTypes = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

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
      x: getRandomNumber(LOCATIONS.minX, LOCATIONS.maxX),
      y: getRandomNumber(LOCATIONS.minY, LOCATIONS.maxY)
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

var onChangePriceOfNight = function (type) {
  FORM_PRICE.setAttribute('min', priceTypes[type]);
  FORM_PRICE.placeholder = priceTypes[type];
};

var changeTime = function (time) {
  FORM_SELECT_TIMEOUT.value = time;
  FORM_SELECT_TIMEIN.value = time;
};

var onChangeSelectOption = function (evt) {
  changeTime(evt.target.value);
};

FORM_SELECT_TYPE.addEventListener('change', function () {
  onChangePriceOfNight(FORM_SELECT_TYPE.value);
});

FORM_SELECT_TIMEIN.addEventListener('change', onChangeSelectOption);
FORM_SELECT_TIMEOUT.addEventListener('change', onChangeSelectOption);

// drag pin_main
var onMouseDown = function (downEvt) {
  downEvt.preventDefault();

  var startCoordinate = {
    x: downEvt.clientX,
    y: downEvt.clientY,
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoordinate.x - moveEvt.clientX,
      y: startCoordinate.y - moveEvt.clientY
    };

    startCoordinate = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var currentCoordinateX = PIN_MAIN.offsetLeft - shift.x;
    var currentCoordinateY = PIN_MAIN.offsetTop - shift.y;

    if (currentCoordinateX >= LOCATIONS.minX && currentCoordinateX <= LOCATIONS.maxX - PIN_MAIN_WIDTH) {
      PIN_MAIN.style.left = currentCoordinateX + 'px';
    }

    if (currentCoordinateY >= LOCATIONS.minY && currentCoordinateY <= LOCATIONS.maxY) {
      PIN_MAIN.style.top = currentCoordinateY + 'px';
    }
    setInputAddressCoordinate();
  };

  var onMouseUp = function (mouseUp) {
    mouseUp.preventDefault();

    getActiveMode();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

PIN_MAIN.addEventListener('mousedown', onMouseDown);
