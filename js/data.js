'use strict';
/**
 * Модуль обработки данных с сервера и отправки данных на сервер
 * Зависимости backend.js, rendering.js, page.js, filter.js
 * Методы load, save в window.data доступны для других модулей
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
   * и вызвает один раз рендерит объявления из полученных данных, и переводит в активное состояние форму фильтра,
   * подписывается на события change формы фильтра если страница находится в активном состоянии
   * @param {array} data
   */
  var saveDataToGlobalArea = function (data) {
    window.dataAnnouncements = data;

    if (window.page.isActiveMode) {
      window.rendering.pin(window.filter());
      window.form.toggleState(window.form.filterElements, false);
      window.form.filter.addEventListener('change', window.form.onChangeFilterValue);
    }
  };
  /**
   * Отправление данных на сервер
   * @param {object} data
   */
  var save = function (data) {
    window.backend.load(window.message.successSave, window.message.error, data);
  };
  /**
   * Экспорт в глобальную область видимости
   */
  window.data = {
    load: load,
    save: save,
  };

})();
