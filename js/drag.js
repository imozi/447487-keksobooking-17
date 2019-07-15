'use strict';
/**
 * Перемещение главной метки, перевод карты и формы в активный режим
 * Зависимости utils.js, form.js, upload.js
 * Метод getCurrentAddress в window.mainPin доступен для других модулей
 */
(function () {
  var pinMain = document.querySelector('.map__pin--main');
  var pinMainWidth = 65;
  var pinMainHeight = 87;
  var isActiveMode = false;
  var locations = {
    minX: 0,
    maxX: 1200,
    minY: 130,
    maxY: 630
  };
  /**
   * Перевод карты, формы в активный режим и получение данных с сервера
   */
  var activeMode = function () {
    window.util.removeClass('.map', 'map--faded');
    window.util.removeClass('.ad-form', 'ad-form--disabled');
    window.form.toggleState(false);
    window.uploadDataServer.load();
    isActiveMode = true;
  };
  /**
   * Получение координат метки
   * @param {ObjectEvent} downEvt
   */
  var onMouseDown = function (downEvt) {
    downEvt.preventDefault();

    var startCoordinate = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };
    /**
     * Перемещение метки по карте
     * @param {ObjectEvent} moveEvt
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

      var currentCoordinateX = pinMain.offsetLeft - shift.x;
      var currentCoordinateY = pinMain.offsetTop - shift.y;

      if (currentCoordinateX >= locations.minX && currentCoordinateX <= locations.maxX - pinMainWidth) {
        pinMain.style.left = currentCoordinateX + 'px';
      }

      if (currentCoordinateY >= locations.minY && currentCoordinateY <= locations.maxY) {
        pinMain.style.top = currentCoordinateY + 'px';
      }
      window.form.setInputAddressCoordinate(true);
    };
    /**
     * Прекращение перемещения и отписка от событий mousemove и mouseup
     * @param {ObjectEvent} mouseUp
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

  pinMain.addEventListener('mousedown', onMouseDown);

  /**
   * Получение текущей позиции метки
   * @param {boolean} mode
   * @return {object}
   */
  window.getCurrentAddressPin = function (mode) {
    var coordinatePinX = pinMain.offsetLeft;
    var coordinatePinY = pinMain.offsetTop;
    var coordinatePinCenter = pinMainWidth * 0.5;

    return {
      x: Math.round(coordinatePinX + coordinatePinCenter),
      y: Math.round(coordinatePinY + (mode === true ? pinMainHeight : coordinatePinCenter))
    };
  };

})();
