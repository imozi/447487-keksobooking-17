'use strict';
/**
 * Модуль получния данных с сервера
 * Зависимости rendering.js, utils.js
 * Методы load, save, loadTimeout в window.uploadDataServer доступны для других модулей
 */
(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  /**
   * Записывает данные с сервера в глобальную область видимости при успешной загрузки и вызвает один раз рендерит объявления
   * @param {array} data
   */
  var successLoad = function (data) {
    window.dataAnnouncements = data;
    window.rendering.pin(window.sortingData());
  };
  /**
   * Выводить сообщение об успешном сохранении объявления на сервере, сбрасывает форму и подписывается на события keydown, click на документе
   * для закрытия сообщения
   */
  var successSave = function () {
    main.appendChild(successTemplate.cloneNode(true));
    window.form.reset();
    window.util.noActiveMode();
    document.addEventListener('keydown', onEscCloseMessageSusuccess);
    document.addEventListener('click', onClickCloseMessageSusuccess);
  };
  /**
   * Показывает сообщение об ошибке если данные не загрузились и подписывается на событие keydown, click на документе
   * и на события click по кнопке для закрытия ошибки
   * @param {string} message
   */
  var error = function (message) {
    var errorNode = errorTemplate.cloneNode(true);
    errorNode.querySelector('.error__message').textContent = message;
    main.appendChild(errorNode);

    onClickCloseBtnMessageError();
    document.addEventListener('keydown', onEscCloseMessageError);
    document.addEventListener('click', onClickCloseMessageError);
  };
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
   * Закрывает сообщение об ошибке, вызывает еще раз получение данных с сервера (если не загрузились)
   * и отписывается от событий click, keydown на документе
   */
  var closeMessageError = function () {
    var message = document.querySelector('.error');
    message.remove();

    if (!window.dataAnnouncements) {
      window.uploadDataServer.loadTimeout();
    }

    document.removeEventListener('keydown', onEscCloseMessageError);
    document.removeEventListener('click', onClickCloseMessageError);
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

  window.uploadDataServer = {
    /**
     * Получение данных с сервера
     */
    load: function () {
      window.backend.load(successLoad, error);
    },
    /**
     * Отправление данных на сервер
     * @param {object} data
     */
    save: function (data) {
      window.backend.save(data, successSave, error);
    },
    /**
     * Вызов функции load каждые 5 секунд (вызывается когда произошла ошибка при загрузке данных с сервера)
     */
    loadTimeout: function () {
      window.setTimeout(function () {
        window.uploadDataServer.load();
      }, 5000);
    }
  };

})();
