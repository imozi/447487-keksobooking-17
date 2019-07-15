'use strict';
/**
 * Модуль получния данных с сервера
 * Зависимости rendering.js
 * Методы load, success, error в window.uploadDataServer доступны для других модулей
 */
(function () {
  var severUrl = 'https://js.dump.academy/keksobooking/data';
  var main = document.querySelector('main');
  var error = document.querySelector('#error').content.querySelector('.error');

  window.uploadDataServer = {
    /**
     * Получение данных с сервера
     */
    load: function () {
      window.backend.load(severUrl, window.uploadDataServer.success, window.uploadDataServer.error);
    },
    /**
     * Записывает данные с сервера в глобальную область видимости при успешной загрузки и вызвает один раз рендерит объявления
     * @param {array} data
     */
    success: function (data) {
      window.dataAnnouncements = data;
      window.rendering.pin(window.sortingData());
    },
    /**
     * Выводит ошибки если данные не загрузились
     * @return {HTMLElement}
     */
    error: function () {
      return main.appendChild(error.cloneNode(true));
    }
  };

})();
