'use strict';
/**
 * Модуль добавления таймаюта к выполняемой функции.
 * Доступен для других модулей.
 */
(function () {
  var debounceInterval = 500;

  window.debounce = function (cb) {
    var timeout = null;

    return function () {
      var parameters = arguments;
      if (timeout) {
        window.clearTimeout(timeout);
      }
      timeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, debounceInterval);
    };
  };

})();
