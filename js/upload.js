'use strict';
/**
 * Модуль получния данных с сервера
 * Зависимости rendering.js
 * Методы getData, successUpLoadData, errorUploadData в window.uploadDataServer доступны для других модулей
 */
(function () {
  var SERVER_URL = 'https://js.dump.academy/keksobooking/data';
  var MAIN = document.querySelector('main');
  var ERROR = document.querySelector('#error').content.querySelector('.error');

  window.uploadDataServer = {
    /**
     * Получение данных с сервера
     */
    getData: function () {
      window.backend.load(SERVER_URL, successUpLoadData, errorUploadData);
    },
    /**
     * Записывает данные с сервера в глобальную область видимости при успешной загрузки и вызвает один раз рендерит объявления
     * @param {array} data
     */
    successUpLoadData: function (data) {
      window.dataAnnouncements = data;
      window.rendering(window.sortData());
    },
    /**
     * Выводит ошибки если данные не загрузились
     * @return {HTMLElement}
     */
    errorUploadData: function () {
      return MAIN.appendChild(ERROR.cloneNode(true));
    }
  };

  var successUpLoadData = window.uploadDataServer.successUpLoadData;
  var errorUploadData = window.uploadDataServer.errorUploadData;

})();
