'use strict';
/**
 * Модуль утилит, хэлперов.
 * Методы removeClass, addClass, clearDomElement, onKeyPressDocument, onClickDocument доступны для других модулей
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
  var onEscPressDocument = function (evt, func) {
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
   * Экспорт в глобальную область видимости
   */
  window.util = {
    removeClass: removeClass,
    addClass: addClass,
    clearDomElement: clearDomElement,
    onEscPressDocument: onEscPressDocument,
    onClickDocument: onClickDocument
  };

})();
