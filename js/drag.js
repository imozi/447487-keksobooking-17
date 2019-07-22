'use strict';
/**
 * Перемещение главной метки, перевод карты и формы в активный режим
 * Зависимости utils.js, form.js, upload.js
 * Метод getCurrentAddress, mainPosition в window.mainPin доступены для других модулей
 */
(function () {
  var pinMain = document.querySelector('.map__pin--main');
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 87;
  var PIN_MAIN_POSITION_X = 570;
  var PIN_MAIN_POSITION_Y = 375;
  var locations = {
    minX: 0,
    maxX: 1200,
    minY: 130,
    maxY: 630
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

      if (currentCoordinateX >= locations.minX && currentCoordinateX <= locations.maxX - PIN_MAIN_WIDTH) {
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

      if (!window.util.isActiveMode) {
        window.util.activeMode();
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  pinMain.addEventListener('mousedown', onMouseDown);


  window.mainPin = {
    /**
     * Получение текущей позиции метки
     * @param {boolean} mode
     * @return {object}
     */
    getCurrentAddress: function (mode) {
      var coordinatePinX = pinMain.offsetLeft;
      var coordinatePinY = pinMain.offsetTop;
      var coordinatePinCenter = PIN_MAIN_WIDTH * 0.5;

      return {
        x: Math.round(coordinatePinX + coordinatePinCenter),
        y: Math.round(coordinatePinY + (mode === true ? PIN_MAIN_HEIGHT : coordinatePinCenter))
      };
    },
    /**
     * Изначальная позиция главного пина
     */
    mainPosition: function () {
      pinMain.style.left = PIN_MAIN_POSITION_X + 'px';
      pinMain.style.top = PIN_MAIN_POSITION_Y + 'px';
    }
  };

})();
