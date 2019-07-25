'use strict';
/**
 * Модуль состояния страницы
 * Зависимости form.js, filter.js, upload.js, rendering.js, main-pin.js, utils.js
 * Методы activeMode, notActiveMode в window.page доступны для других модулей
 * переменная isActiveMode (флаг для определения активного режима)
 */
(function () {
  /**
   * Перевод страницы в активное состояние и получение данных с сервера
   */
  var activeMode = function () {
    window.page.isActiveMode = true;
    window.util.removeClass('.map', 'map--faded');
    window.util.removeClass('.ad-form', 'ad-form--disabled');
    window.form.toggleState(window.form.mainFieldsets, false);
    window.form.setInputAddressCoordinate(true);
    window.uploadDataServer.load();
  };
  /**
   * Перевод страницы в неактивное состояние
   */
  var notActiveMode = function () {
    window.page.isActiveMode = false;
    window.rendering.clear();
    window.mainPin.mainPosition();
    window.util.addClass('.map', 'map--faded');
    window.util.addClass('.ad-form', 'ad-form--disabled');
    window.form.reset();
    window.form.toggleState(window.form.mainFieldsets, true);
    window.form.toggleState(window.form.filterElements, true);
    window.form.setInputAddressCoordinate();
    window.form.removeOnChangeFilterValue();
  };
  /**
   * Экспорт в глобальную область видимости
   */
  window.page = {
    activeMode: activeMode,
    notActiveMode: notActiveMode,
    isActiveMode: false,
  };

})();
