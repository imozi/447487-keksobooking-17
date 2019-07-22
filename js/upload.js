'use strict';
/**
 * Модуль получния данных с сервера
 * Зависимости rendering.js
 * Методы load, save, successLoad, successSave, errorLoad, errorSave в window.uploadDataServer доступны для других модулей
 */
(function () {
  var main = document.querySelector('main');
  var error = document.querySelector('#error').content.querySelector('.error');
  var success = document.querySelector('#success').content.querySelector('.success');
  var form = document.querySelector('.ad-form');
  /**
   * Закрывает сообщение об успешном сохранении данных и отписывается от событий click, keydown на документе
   */
  var closeMessageSusuccessSave = function () {
    var message = document.querySelector('.success');
    message.remove();
    document.removeEventListener('keydown', onEscCloseMessageSusuccess);
    document.removeEventListener('click', onClickCloseMessageSusuccess);
  };
  /**
   * Закрывает сообщение об успешном сохранении данных по нажатию клавиши ESC
   * @param {ObjectEvent} evt
   */
  var onEscCloseMessageSusuccess = function (evt) {
    window.util.onKeyPressDocument(evt, closeMessageSusuccessSave);
  };
  /**
   * Закрывает сообщение об успешном сохранении данных по собитию click на произвольную область
   */
  var onClickCloseMessageSusuccess = function () {
    window.util.onClickDocument(closeMessageSusuccessSave);
  };
  /**
   * Закрывает сообщение об ошибке и отписывается от событий click, keydown на документе,
   * и еще раз пытается загрузить данные после закрытия
   */
  var closeMessageError = function () {
    var message = document.querySelector('.error');
    message.remove();
    document.removeEventListener('keydown', onEscCloseMessageError);
    document.removeEventListener('click', onClickCloseMessageError);
    window.uploadDataServer.load();
  };
  /**
   * Закрывает сообщение об ошибке по событию сlick на кнопке
   */
  var onClickCloseBtnMessageError = function () {
    var closeBtn = document.querySelector('.error').querySelector('.error__button');
    closeBtn.addEventListener('click', closeMessageError);
  };
  /**
   * Закрывает сообщение об ошибке по нажатию клавиши ESC
   * @param {ObjectEvent} evt
   */
  var onEscCloseMessageError = function (evt) {
    window.util.onKeyPressDocument(evt, closeMessageError);
  };
  /**
   * Закрывает сообщение об ошибке по собитию click на произвольную область
   */
  var onClickCloseMessageError = function () {
    window.util.onClickDocument(closeMessageError);
  };
  /**
   * Показывает сообщение об ошибке если данные не загрузились и подписывается на событие keydown, click на документе
   * и на события click по кнопке для закрытия ошибки
   */
  var showError = function () {
    main.appendChild(error.cloneNode(true));
    onClickCloseBtnMessageError();
    document.addEventListener('keydown', onEscCloseMessageError);
    document.addEventListener('click', onClickCloseMessageError);
  };

  window.uploadDataServer = {
    /**
     * Получение данных с сервера
     */
    load: function () {
      window.backend.load(window.uploadDataServer.successLoad, window.uploadDataServer.errorLoad);
    },
    /**
     * Отправляет данные на сервер
     * @param {object} data
     */
    save: function (data) {
      window.backend.save(data, window.uploadDataServer.successSave, window.uploadDataServer.errorSave);
    },
    /**
     * Записывает данные с сервера в глобальную область видимости при успешной загрузки и вызвает один раз рендерит объявления
     * @param {array} data
     */
    successLoad: function (data) {
      window.dataAnnouncements = data;
      window.rendering.pin(window.sortingData());
    },
    /**
     * Выводить сообщение об успешном сохранении объявления на сервере, сбрасывает форму и подписывается на события keydown, click на документе
     */
    successSave: function () {
      main.appendChild(success.cloneNode(true));
      form.reset();
      window.util.noActiveMode();
      document.addEventListener('keydown', onEscCloseMessageSusuccess);
      document.addEventListener('click', onClickCloseMessageSusuccess);
    },
    /**
     * Выводит ошибку если данные не загрузились и переводит станицу в неактивный режим
     */
    errorLoad: function () {
      showError();
    },
    /**
     * Выводит ошибку если данные не отправились на сервер
     */
    errorSave: function () {
      showError();
    }
  };

})();
