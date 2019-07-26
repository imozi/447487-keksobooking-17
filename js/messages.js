'use strict';
/**
 * Модуль показа сообщений при загруке данных с сервера и отправки данных на сервер
 * Зависимости backend.js, page.js, utils.js
 * Методы successSave, error в window.message доступны для других модулей
 */
(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var TIME_OUT_LOAD = 5000;
  /**
   * Показывает сообщение об успешном сохранении объявления на сервере, переводит странцу в неактивное состояние
   * и подписывается на события keydown, click на документе для закрытия сообщения
   */
  var successSave = function () {
    main.appendChild(successTemplate.cloneNode(true));
    window.page.notActiveMode();
    document.addEventListener('keydown', onEscCloseMessageSusuccess);
    document.addEventListener('click', onClickCloseMessageSusuccess);
  };
  /**
   * Показывает сообщение об ошибке если данные не загрузились/не отправились и подписывается на событие keydown, click на документе
   * и на события click по кнопке для закрытия ошибки
   * @param {string} text
   */
  var error = function (text) {
    var errorNode = errorTemplate.cloneNode(true);
    errorNode.querySelector('.error__message').textContent = text;
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
    window.util.onEscPressDocument(evt, closeMessageSusuccessSave);
  };
  /**
   * Закрывает сообщение об успешном сохранении данных по собитию click на произвольную область
   */
  var onClickCloseMessageSusuccess = function () {
    window.util.onClickDocument(closeMessageSusuccessSave);
  };
  /**
   * Закрывает сообщение об ошибке, вызывает еще раз функцию получение данных с сервера (если ошибка произошла во время загрузки данных с сервера)
   * которая выполнится через 5 секунд и отписывается от событий click, keydown на документе
   */
  var closeMessageError = function () {
    var message = document.querySelector('.error');
    message.remove();

    if (window.backend.isLoadError) {
      window.setTimeout(function () {
        window.uploadDataServer.load();
      }, TIME_OUT_LOAD);
      window.backend.isLoadError = false;
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
    window.util.onEscPressDocument(evt, closeMessageError);
  };
  /**
   * Закрывает сообщение об ошибке по собитию click на произвольную область
   */
  var onClickCloseMessageError = function () {
    window.util.onClickDocument(closeMessageError);
  };
  /**
   * Экспорт в глобальную область видимости
   */
  window.message = {
    successSave: successSave,
    error: error
  };

})();
