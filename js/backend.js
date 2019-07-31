'use strict';
/**
 * Модуль загрузки данных с сервера и отправки данных на сервер
 * Зависимости data.js
 * Методы load, переменная isLoadError (флаг для опереления что ошибка произошла именно на стадии загрузки данных с сервера)
 * в window.backend доступны для других модулей
 */
(function () {
  var LOAD_DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var SAVE_DATA_URL = 'https://js.dump.academy/keksobooking';
  var SUCCESS_STATUS_CODE = 200;
  /**
   * При выгрузке данных на сервер выводит сообщение если были ошибки, если нет ошибок выполняет
   * @param {object} xhr
   * @param {function} onLoad функция которую нужно выполнить при успешной загрузки данных
   * @param {function} onError функция которую нужоно выполнить если произошла ошибка загрузки данных
   */
  var upload = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS_CODE) {
        onLoad();
      } else {
        onError('Ошибка загрузки данных на сервер.');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения с сервером при отправке данных.');
    });
  };
  /**
   * Загрузка данных с сервера, если произошла ошибка во время загрузки меняет флаг isLoadError на true
   * @param {object} xhr
   * @param {function} onLoad функция которую нужно выполнить при успешной загрузки данных
   * @param {function} onError функция которую нужоно выполнить если произошла ошибка загрузки данных
   */
  var download = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка загрузки данных с сервера.');
        window.backend.isLoadError = true;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения с сервером при загрузки данных.');
      window.backend.isLoadError = true;
    });
  };
  /**
   * Выгрузка(Загрузка) данных на(с) сервер(а)
   * @param {function} onLoad функция которую нужно выполнить
   * @param {function} onError функция которую нужоно выполнить
   * @param {object} data данные для загрузки данных на сервер
   */
  var load = function (onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    if (data) {
      upload(xhr, onLoad, onError);
      xhr.open('POST', SAVE_DATA_URL);
      xhr.send(data);
    } else {
      download(xhr, onLoad, onError);
      xhr.open('GET', LOAD_DATA_URL);
      xhr.send();
    }

  };
  /**
   * Экспорт в глобальную область видимости
   */
  window.backend = {
    load: load,
    isLoadError: false
  };

})();
