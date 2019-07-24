'use strict';
/**
 * Модуль загрузки данных с сервера и отправки данных на сервер
 * Зависимости upload.js
 * Методы load, save, переменная isLoadError (флаг для опереления что ошибка произошла именно на стадии загрузки данных с сервера)
 * в window.backend доступны для других модулей
 */
(function () {
  var LOAD_DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var SAVE_DATA_URL = 'https://js.dump.academy/keksobooking';
  /**
   * Загрузка данных с сервера, при успешной загрке вызывает функцию, удаляет таймер вызова с функции
   * если произошла ошибка вызывает функцию и меняет флаг на true
   * @param {function} onLoad функция которую нужно выполнить при успешной загрузки данных
   * @param {function} onError функция которую нужоно выполнить если произошла ошибка загрузки данных
   */
  var load = function (onLoad, onError) {
    var urlServer = LOAD_DATA_URL;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
        window.clearTimeout(window.uploadDataServer.loadTimeout);
      } else {
        onError('Ошибка загрузки данных с сервера.');
        window.backend.isLoadError = true;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения с сервером при загрузки данных.');
      window.backend.isLoadError = true;
    });

    xhr.open('GET', urlServer);
    xhr.send();
  };
  /**
   * Загрузка данных на сервер
   * @param {object} data данные объявления которые нужно отправить
   * @param {function} onLoad функция которую нужно выполнить при успешной загрузки данных
   * @param {function} onError функция которую нужоно выполнить если произошла ошибка загрузки данных
   */
  var save = function (data, onLoad, onError) {
    var urlServer = SAVE_DATA_URL;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad();
      } else {
        onError('Ошибка загрузки данных на сервер.');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения с сервером при отправке данных.');
    });
    xhr.open('POST', urlServer);
    xhr.send(data);
  };
  /**
   * Экспорт в глобальную область видимости
   */
  window.backend = {
    load: load,
    save: save,
    isLoadError: false
  };

})();
