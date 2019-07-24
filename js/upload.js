'use strict';
/**
 * Модуль обработки данных с сервера и отправки данных на сервер
 * Зависимости backend.js, rendering.js, page.js
 * Методы load, save, loadTimeout в window.uploadDataServer доступны для других модулей
 */
(function () {
  /**
   * Получение данных с сервера
   */
  var load = function () {
    window.backend.load(saveDataToGlobalArea, window.message.error);
  };
  /**
   * Сохраняет данные с сервера в глобальную область видимости при успешной загрузки
   * и вызвает один раз рендерит объявления из полученных данных
   * если страница находится в активном состоянии
   * @param {array} data
   */
  var saveDataToGlobalArea = function (data) {
    window.dataAnnouncements = data;

    if (window.page.isActiveMode) {
      window.rendering.pin(window.sortingData());
    }
  };
  /**
   * Отправление данных на сервер
   * @param {object} data
   */
  var save = function (data) {
    window.backend.save(data, window.message.successSave, window.message.error);
  };
  /**
   * Вызов функции load через 5 секунд (вызывается когда произошла ошибка при загрузке данных с сервера)
   */
  var loadTimeout = function () {
    window.setTimeout(function () {
      load();
    }, 5000);
  };
  /**
   * Экспорт в глобальную область видимости
   */
  window.uploadDataServer = {
    load: load,
    save: save,
    loadTimeout: loadTimeout
  };

})();
