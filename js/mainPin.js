'use strict';
/**
 * Перемещение главной метки, перевод карты и формы в активный режим
 * Зависимости utils.js, form.js, upload.js
 * Метод getCurrentAddress в window.mainPin доступен для других модулей
 */
(function () {
  var PIN_MAIN = document.querySelector('.map__pin--main');
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 87;
  var isActiveMode = false;
  var locations = {
    minX: 0,
    maxX: 1200,
    minY: 130,
    maxY: 630
  };
  /**
   * Получение текущей позиции метки
   * @param {boolean} mode
   * @return {object}
   */
  var getCurrentAddress = function (mode) {
    var coordinatePinX = PIN_MAIN.offsetLeft;
    var coordinatePinY = PIN_MAIN.offsetTop;
    var coordinatePinCenter = PIN_MAIN_WIDTH * 0.5;

    return {
      x: Math.round(coordinatePinX + coordinatePinCenter),
      y: Math.round(coordinatePinY + (mode === true ? PIN_MAIN_HEIGHT : coordinatePinCenter))
    };
  };
  /**
   * Перевод карты, формы в активный режим и получение данных с сервера
   */
  var activeMode = function () {
    window.util.removeClass('.map', 'map--faded');
    window.util.removeClass('.ad-form', 'ad-form--disabled');
    window.form.toggleStateFroms(false);
    window.uploadDataServer.getData();
    isActiveMode = true;
  };
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

      if (currentCoordinateX >= locations.minX && currentCoordinateX <= locations.maxX - PIN_MAIN_WIDTH) {
        PIN_MAIN.style.left = currentCoordinateX + 'px';
      }

      if (currentCoordinateY >= locations.minY && currentCoordinateY <= locations.maxY) {
        PIN_MAIN.style.top = currentCoordinateY + 'px';
      }
      window.form.setInputAddressCoordinate(true);
    };
    /**
     * Прекращение перемещения и отписка от событий mousemove и mouseup
     * @param {event} mouseUp
     */
    var onMouseUp = function (mouseUp) {
      mouseUp.preventDefault();

      if (!isActiveMode) {
        activeMode();
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  PIN_MAIN.addEventListener('mousedown', onMouseDown);

  window.mainPin = {
    getCurrentAddress: getCurrentAddress
  };
})();
