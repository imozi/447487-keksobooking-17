'use strict';
/**
 * Модуль загрузки дынных с сервера и отправки данных на сервер
 */
window.data = (function () {
  return {
    /**
     * Загрузка данных с сервера
     * @param {string} url
     * @param {function} onLoad функция которую нужно выполнить при успешной загрузки данных
     * @param {function} onError функция которую нужоно выполнить если произошла ошибка загрузки данных
     */
    load: function (url, onLoad, onError) {
      var urlServer = url;
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError();
        }
      });

      xhr.addEventListener('error', function () {
        onError();
      });

      xhr.open('GET', urlServer);
      xhr.send();
    }
  };
})();
