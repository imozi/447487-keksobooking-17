'use strict';
/**
 * Модуль утилит, хэлперов.
 * Зависимости form.js, upload.js, rendering.js, drag.js
 * Методы removeClass, addClass, clearDomElement, onKeyPressDocument, onClickDocument, clearMap, pageActiveMode, pageNotActiveMode доступны для других модулей
 * переменная isPageActiveMode (флаг для определения активного режима),
 * переменная isLoadError (флаг для определения что ошибка произошла именно при загрузке данных с сервера)
 */
(function () {
  var ESC_CODE = 27;
  /**
   * Удалить нужный класс
   * @param {selector} element
   * @param {className} classRemove
   */
  var removeClass = function (element, classRemove) {
    var classListElement = document.querySelector(element).classList;
    classListElement.remove(classRemove);
  };
  /**
   * Добавляет нужный класс
   * @param {selector} element
   * @param {className} classAdd
   */
  var addClass = function (element, classAdd) {
    var classListElement = document.querySelector(element).classList;
    classListElement.add(classAdd);
  };
  /**
   * Удаление нужного элементов из DOM
   * @param {HTMLElement} element
   */
  var clearDomElement = function (element) {
    element.remove();
  };
  /**
   * Проверяет если нажата клавиша ESC то выполняет переданую функцию
   * @param {ObjectEvent} evt
   * @param {function} func - функция котокую нужно выполнить
   */
  var isEscEvent = function (evt, func) {
    if (evt.keyCode === ESC_CODE) {
      func();
    }
  };
  /**
   * По нажатию на кнопку ESC на документе выполняет переданую функцию
   * @param {ObjectEvent} evt
   * @param {function} func - функция котокую нужно выполнить
   */
  var onKeyPressDocument = function (evt, func) {
    isEscEvent(evt, func);
  };
  /**
   * Выполняет функцию по событию click на документе
   * @param {function} func - функция которую нужно выполнить
   */
  var onClickDocument = function (func) {
    func();
  };
  /**
   * Очищает карту от пинов и открытой карточки объявления
   */
  var clearMap = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    if (pins) {
      pins.forEach(function (element) {
        clearDomElement(element);
      });
      window.card.close();
    }
  };
  /**
   * Перевод страницы в активный режим и получение данных с сервера
   */
  var pageActiveMode = function () {
    removeClass('.map', 'map--faded');
    removeClass('.ad-form', 'ad-form--disabled');
    window.form.toggleState(window.form.mainFieldsets, false);
    window.form.setInputAddressCoordinate(true);
    window.uploadDataServer.load();
    window.util.isPageActiveMode = true;
  };
  /**
   * Перевод страницы в неактивный режим
   */
  var pageNotActiveMode = function () {
    addClass('.map', 'map--faded');
    addClass('.ad-form', 'ad-form--disabled');
    clearMap();
    window.mainPin.mainPosition();
    window.form.reset();
    window.form.toggleState(window.form.mainFieldsets, true);
    window.form.toggleState(window.form.filterElements, true);
    window.form.setInputAddressCoordinate();
    window.util.isPageActiveMode = false;
  };
  /**
   * Экспорт в глобальную область видимости
   */
  window.util = {
    removeClass: removeClass,
    addClass: addClass,
    clearDomElement: clearDomElement,
    onKeyPressDocument: onKeyPressDocument,
    onClickDocument: onClickDocument,
    clearMap: clearMap,
    pageActiveMode: pageActiveMode,
    pageNotActiveMode: pageNotActiveMode,
    isPageActiveMode: false,
    isLoadError: false
  };

})();
