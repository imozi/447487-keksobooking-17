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
    load: function () {
      window.backend.load(SERVER_URL, window.uploadDataServer.success, window.uploadDataServer.error);
    },
    /**
     * Записывает данные с сервера в глобальную область видимости при успешной загрузки и вызвает один раз рендерит объявления
     * @param {array} data
     */
    success: function (data) {
      window.dataAnnouncements = data;
      window.rendering(window.sortingData());
    },
    /**
     * Выводит ошибки если данные не загрузились
     * @return {HTMLElement}
     */
    error: function () {
      return MAIN.appendChild(ERROR.cloneNode(true));
    }
  };

})();
