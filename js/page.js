'use strict';
/**
 * Модуль состояния страницы
 * Зависимости form.js, rendering.js, main-pin.js, upload-img.js, utils.js, data.js
 * Методы activeMode, notActiveMode в window.page доступны для других модулей
 * переменная isActiveMode (флаг для определения активного режима)
 */
(function () {
  /**
   * Перевод страницы в активное состояние и получение данных с сервера.
   */
  var activeMode = function () {
    window.page.isActiveMode = true;
    window.util.removeClass('.map', 'map--faded');
    window.util.removeClass('.ad-form', 'ad-form--disabled');
    window.form.toggleState(window.form.mainFieldsets, false);
    window.form.setInputAddressCoordinate(true);
    window.form.mainAddEventListeners();
    window.data.load();
    window.mainPin.removeOnEnterPress();
    window.uploadImg.setEventListeners();
  };
  /**
   * Перевод страницы в неактивное состояние
   */
  var notActiveMode = function () {
    window.page.isActiveMode = false;
    window.rendering.clear();
    window.mainPin.setDefaultPosition();
    window.util.addClass('.map', 'map--faded');
    window.util.addClass('.ad-form', 'ad-form--disabled');
    window.form.reset();
    window.form.initialState();
    window.form.removeOnChangeFilterValue();
    window.form.mainRemoveAllEventListener();
    window.uploadImg.removeEventListeners();
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
