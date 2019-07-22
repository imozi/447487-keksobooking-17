'use strict';
/**
 * Утилиты, хэлперы.
 * Зависимости form.js, upload.js, rendering.js, drag.js
 * Методы removeClass, clearDomElement, isEscEvent , onKeyPressDocument, isActiveMode, activeMode, noActiveMode доступны для других модулей
 */
(function () {
  var ESC_CODE = 27;

  window.util = {
    /**
     * Удалить нужный класс
     * @param {selector} element
     * @param {className} classRemove
     */
    removeClass: function (element, classRemove) {
      var classListElement = document.querySelector(element).classList;
      classListElement.remove(classRemove);
    },
    /**
     * Добавляет нужный класс
     * @param {selector} element
     * @param {className} classAdd
     */
    addClass: function (element, classAdd) {
      var classListElement = document.querySelector(element).classList;
      classListElement.add(classAdd);
    },
    /**
     * Удаление нужного элементов из DOM
     * @param {HTMLElement} element
     */
    clearDomElement: function (element) {
      element.remove();
    },
    /**
     * Проверяет если нажата клавиша ESC то выполняет переданую функцию
     * @param {ObjectEvent} evt
     * @param {function} func - функция котокую нужно выполнить
     */
    isEscEvent: function (evt, func) {
      if (evt.keyCode === ESC_CODE) {
        func();
      }
    },
    /**
     * По нажатию на кнопку ESC на документе выполняет переданую функцию
     * @param {ObjectEvent} evt
     * @param {function} func - функция
     */
    onKeyPressDocument: function (evt, func) {
      window.util.isEscEvent(evt, func);
    },
    /**
     * Выполняет функцию по событию click на документе
     * @param {function} func - функция которую нужно выполнить
     */
    onClickDocument: function (func) {
      func();
    },
    /**
     * Флаг для определения активного режима
     */
    isActiveMode: false,
    /**
     * Перевод карты, формы в активный режим и получение данных с сервера
     */
    activeMode: function () {
      window.util.removeClass('.map', 'map--faded');
      window.util.removeClass('.ad-form', 'ad-form--disabled');
      window.form.toggleState(false);
      window.uploadDataServer.load();
      window.util.isActiveMode = true;
    },
    /**
     * Перевод карты, формы в неактивный режим
     */
    noActiveMode: function () {
      window.util.addClass('.map', 'map--faded');
      window.util.addClass('.ad-form', 'ad-form--disabled');
      window.rendering.clearMap();
      window.mainPin.mainPosition();
      window.form.toggleState(true);
      window.form.setInputAddressCoordinate();
      window.util.isActiveMode = false;
    }
  };

})();
