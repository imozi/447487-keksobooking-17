'use strict';
/**
 * Модуль добавления таймаута к выполняемой функции
 * Доступен для других модулей
 */
(function () {
  var DEBOUNCE_INTERVAL = 500;

  window.debounce = function (cb) {
    var timeout = null;

    return function () {
      var parameters = arguments;
      if (timeout) {
        window.clearTimeout(timeout);
      }
      timeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

})();
