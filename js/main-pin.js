'use strict';
/**
 * Модуль перемещения главного пина
 * Зависимости page.js, form.js, upload.js
 * Метод getCurrentAddress, mainPosition в window.mainPin доступны для других модулей
 */
(function () {
  var pinMain = document.querySelector('.map__pin--main');
  var PIN_MAIN_WIDTH = 65;
  var PIN_MAIN_HEIGHT = 87;
  var PIN_MAIN_POSITION_X = 570;
  var PIN_MAIN_POSITION_Y = 375;
  var MapRestriction = {
    MIN_X: 0,
    MAX_X: 1200,
    MIN_Y: 130,
    MAX_Y: 630
  };
  /**
   * Получение текущей позиции пина
   * @param {boolean} mode
   * @return {object}
   */
  var getCurrentAddress = function (mode) {
    var coordinatePinX = pinMain.offsetLeft;
    var coordinatePinY = pinMain.offsetTop;
    var coordinatePinCenter = PIN_MAIN_WIDTH * 0.5;

    return {
      x: Math.round(coordinatePinX + coordinatePinCenter),
      y: Math.round(coordinatePinY + (mode === true ? PIN_MAIN_HEIGHT : coordinatePinCenter))
    };
  };
  /**
   * Изначальная позиция пина
   */
  var setDefaultPosition = function () {
    pinMain.style.left = PIN_MAIN_POSITION_X + 'px';
    pinMain.style.top = PIN_MAIN_POSITION_Y + 'px';
  };
  /**
   * Переводит в активный режим страницу по нажатию клавиши ENTER на главном пине
   * @param {ObjectEvent} evt
   */
  var onEnterPress = function (evt) {
    window.util.onEnterPressElement(evt, window.page.activeMode);
  };
  /**
   * Подписывается на событие keydown на главном пине для перевода страницы в активный режим
   */
  pinMain.addEventListener('keydown', onEnterPress);
  /**
   * Отписывается от события keydown на главной пине
   */
  var removeOnEnterPress = function () {
    pinMain.removeEventListener('keydown', onEnterPress);
  };
  /**
   * Получение координат пина
   * @param {ObjectEvent} downEvt
   */
  var onMouseDown = function (downEvt) {
    downEvt.preventDefault();

    var startCoordinate = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };
    /**
     * Перемещение пина по карте
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

      if (currentCoordinateX >= MapRestriction.MIN_X && currentCoordinateX <= MapRestriction.MAX_X - PIN_MAIN_WIDTH) {
        pinMain.style.left = currentCoordinateX + 'px';
      }

      if (currentCoordinateY >= MapRestriction.MIN_Y && currentCoordinateY <= MapRestriction.MAX_Y) {
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

      if (!window.page.isActiveMode) {
        window.page.activeMode();
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  pinMain.addEventListener('mousedown', onMouseDown);
  /**
   * Экспорт в глобальную область видимости
   */
  window.mainPin = {
    getCurrentAddress: getCurrentAddress,
    setDefaultPosition: setDefaultPosition,
    removeOnEnterPress: removeOnEnterPress
  };

})();
