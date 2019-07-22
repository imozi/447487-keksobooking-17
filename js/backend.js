'use strict';
/**
 * Модуль загрузки дынных с сервера и отправки данных на сервер
 */
(function () {
  var LOAD_DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var SAVE_DATA_URL = 'https://js.dump.academy/keksobooking';

  window.backend = {
    /**
     * Загрузка данных с сервера
     * @param {function} onLoad функция которую нужно выполнить при успешной загрузки данных
     * @param {function} onError функция которую нужоно выполнить если произошла ошибка загрузки данных
     */
    load: function (onLoad, onError) {
      var urlServer = LOAD_DATA_URL;
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
    },
    /**
     * Загрузка данных на сервер
     * @param {object} data данные объявления которые нужно отправить
     * @param {function} onLoad функция которую нужно выполнить при успешной загрузки данных
     * @param {function} onError функция которую нужоно выполнить если произошла ошибка загрузки данных
     */
    save: function (data, onLoad, onError) {
      var urlServer = SAVE_DATA_URL;
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad();
        } else {
          onError();
        }
      });

      xhr.open('POST', urlServer);
      xhr.send(data);
    }
  };

})();
