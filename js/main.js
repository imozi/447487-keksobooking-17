'use strict';
/**
 * Перемещение главной метки объявления перевод карты и формы в активный режим
 */
(function () {
  var PIN_MAIN = document.querySelector('.map__pin--main');
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 87;
  var FORM = document.querySelector('.ad-form');
  var FORM_INPUT_ADDRESS = FORM.querySelector('#address');
  var FORM_FIELDSETS = FORM.querySelectorAll('fieldset');
  var MAP_FILTER = document.querySelector('.map__filters');
  var MAP_FILTER_SELECTS = MAP_FILTER.querySelectorAll('select');
  var MAP_FILTER_FIELDSET = MAP_FILTER.querySelector('fieldset');

  var isActiveMode = false;
  /**
   * Получение текущей позиции метки
   * @return {object}
   */
  var getCurrentAddress = function () {
    var coordinatePinX = PIN_MAIN.offsetLeft;
    var coordinatePinY = PIN_MAIN.offsetTop;
    var coordinatePinCenter = PIN_MAIN_WIDTH * 0.5;

    return {
      x: Math.round(coordinatePinX + coordinatePinCenter),
      y: Math.round(coordinatePinY + (isActiveMode ? PIN_MAIN_HEIGHT : coordinatePinCenter))
    };
  };
  /**
   * Присваевание текущего адресса метки в поле адресса
   * @return {string}
   */
  var setInputAddressCoordinate = function () {
    var currentAddress = getCurrentAddress();
    FORM_INPUT_ADDRESS.value = currentAddress.x + ', ' + currentAddress.y;
    return FORM_INPUT_ADDRESS.value;
  };
  /**
   * Перевод карты, формы в неактивный режим
   */
  var notActiveMode = function () {
    window.util.addAttr(FORM_FIELDSETS, 'disabled');
    window.util.addAttr(MAP_FILTER_SELECTS, 'disabled');
    window.util.addAttr(MAP_FILTER_FIELDSET, 'disabled');
    setInputAddressCoordinate();
  };
  /**
   * Перевод карты, формы в активный режим и рендеринг похожих объявлений
   */
  var getActiveMode = function () {
    window.util.removeClass('.map', 'map--faded');
    window.util.removeClass('.ad-form', 'ad-form--disabled');
    window.util.clearAttr(FORM_FIELDSETS, 'disabled');
    window.util.clearAttr(MAP_FILTER_SELECTS, 'disabled');
    window.util.clearAttr(MAP_FILTER_FIELDSET, 'disabled');
    window.uploadDataServer.getData();
    isActiveMode = true;
  };

  notActiveMode();

  /**
   * Получение координат метки
   * @param {event} downEvt
   */
  var onMouseDown = function (downEvt) {
    downEvt.preventDefault();

    var startCoordinate = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };
    /**
     * Перемещение метки по карте
     * @param {event} moveEvt
     */
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
      var locations = window.constants.locations;

      if (currentCoordinateX >= locations.minX && currentCoordinateX <= locations.maxX - PIN_MAIN_WIDTH) {
        PIN_MAIN.style.left = currentCoordinateX + 'px';
      }

      if (currentCoordinateY >= locations.minY && currentCoordinateY <= locations.maxY) {
        PIN_MAIN.style.top = currentCoordinateY + 'px';
      }
      setInputAddressCoordinate();
    };
    /**
     * Прекращение перемещения и отписка от событий mousemove и mouseup
     * @param {event} mouseUp
     */
    var onMouseUp = function (mouseUp) {
      mouseUp.preventDefault();

      if (!isActiveMode) {
        getActiveMode();
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  PIN_MAIN.addEventListener('mousedown', onMouseDown);
})();
