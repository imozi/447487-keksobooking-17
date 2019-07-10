'use strict';
/**
 * Состояние полей формы, валидация формы, присовение адреса метки
 * Зависимости drag.js
 * Методы toggleStateFroms, setInputAddressCoordinate в window.form доступны для дргуих модулей
 */
(function () {
  var FORM = document.querySelector('.ad-form');
  var FORM_INPUT_ADDRESS = FORM.querySelector('#address');
  var FORM_SELECT_TIMEIN = FORM.querySelector('#timein');
  var FORM_SELECT_TIMEOUT = FORM.querySelector('#timeout');
  var FORM_PRICE = FORM.querySelector('#price');
  var FORM_SELECT_TYPE = FORM.querySelector('#type');
  var FORM_FIELDSETS = Array.from(FORM.querySelectorAll('fieldset'));
  var MAP_FILTER_SELECTS = Array.from(document.querySelectorAll('select'));
  var MAP_FILTER_FIELDSET = document.querySelector('fieldset');
  var formElements = [].concat(FORM_FIELDSETS, MAP_FILTER_SELECTS, MAP_FILTER_FIELDSET);
  var priceTypes = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  /**
   * Добавление нимимального значение и изменения placeholder
   * @param {string} type
   */
  var onChangePriceOfNight = function (type) {
    FORM_PRICE.setAttribute('min', priceTypes[type]);
    FORM_PRICE.placeholder = priceTypes[type];
  };
  /**
   * Изменения значений в полях заезда/выезда
   * @param {string} time
   */
  var changeTime = function (time) {
    FORM_SELECT_TIMEOUT.value = time;
    FORM_SELECT_TIMEIN.value = time;
  };
  /**
   * Получение текущего элемента в таргете
   * @param {event} evt
   */
  var onChangeSelectOption = function (evt) {
    changeTime(evt.target.value);
  };

  onChangePriceOfNight(FORM_SELECT_TYPE.value);

  FORM_SELECT_TYPE.addEventListener('change', function () {
    onChangePriceOfNight(FORM_SELECT_TYPE.value);
  });

  FORM_SELECT_TIMEIN.addEventListener('change', onChangeSelectOption);
  FORM_SELECT_TIMEOUT.addEventListener('change', onChangeSelectOption);

  window.form = {
    /**
     * Переводит поля формы в указанное состояние (активное или неактивное)
     * @param {boolean} disabled
     */
    toggleStateFroms: function (disabled) {
      formElements.forEach(function (element) {
        element.disabled = disabled ? true : false;
      });
    },
    /**
     * Присваевание текущего адресса метки в поле адресса
     * @param {boolean} mode
     */
    setInputAddressCoordinate: function (mode) {
      var currentAddress = window.getCurrentAddressPin(mode);
      FORM_INPUT_ADDRESS.value = currentAddress.x + ', ' + currentAddress.y;
    }
  };

  window.form.toggleStateFroms(true);
  window.form.setInputAddressCoordinate();

})();

