'use strict';
/**
 * Модуль получния данных с сервера
 * Зависимости rendering.js
 * Методы getData, successUpLoadData, errorUploadData доступны для других модулей
 */
window.uploadDataServer = (function () {
  var SERVER_URL = 'https://js.dump.academy/keksobooking/data';
  var MAIN = document.querySelector('main');
  var ERROR = document.querySelector('#error').content.querySelector('.error');
  /**
   * Записывает данные с сервера в глобальную область видимости при успешной загрузки и вызвает один раз рендерит объявления
   * @param {array} data
   */
  var successUpLoadData = function (data) {
    window.dataAnnouncements = data;
    window.rendering(window.sortData());
  };
  /**
   * Выводит ошибки если данные не загрузились
   * @return {HTMLElement}
   */
  var errorUploadData = function () {
    return MAIN.appendChild(ERROR.cloneNode(true));
  };

  return {
    /**
     * Получение данных с сервера
     */
    getData: function () {
      window.backend.load(SERVER_URL, successUpLoadData, errorUploadData);
    },
    successUpLoadData: successUpLoadData,
    errorUploadData: errorUploadData
  };
})();
