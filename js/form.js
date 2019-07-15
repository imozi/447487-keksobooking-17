'use strict';
/**
 * Состояние полей формы, валидация формы, присовение адреса метки
 * Зависимости drag.js
 * Методы toggleState, setInputAddressCoordinate в window.form доступны для дргуих модулей
 */
(function () {
  var form = document.querySelector('.ad-form');
  var formInputAddress = form.querySelector('#address');
  var formSelectTimeIn = form.querySelector('#timein');
  var formSelectTimeOut = form.querySelector('#timeout');
  var formPrice = form.querySelector('#price');
  var formSelectType = form.querySelector('#type');
  var formFieldsets = Array.from(form.querySelectorAll('fieldset'));
  var mapFilterSelects = Array.from(document.querySelectorAll('select'));
  var mapFilterFieldset = document.querySelector('fieldset');
  var formElements = [].concat(formFieldsets, mapFilterSelects, mapFilterFieldset);
  var priceTypesMap = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  window.form = {
    /**
     * Переводит поля формы в указанное состояние (активное или неактивное)
     * @param {boolean} disabled
     */
    toggleState: function (disabled) {
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
      formInputAddress.value = currentAddress.x + ', ' + currentAddress.y;
    }
  };
  /**
   * Добавление нимимального значение и изменения placeholder
   * @param {string} type
   */
  var onChangePriceOfNight = function (type) {
    formPrice.setAttribute('min', priceTypesMap[type]);
    formPrice.placeholder = priceTypesMap[type];
  };
  /**
   * Изменения значений в полях заезда/выезда
   * @param {string} time
   */
  var changeTime = function (time) {
    formSelectTimeOut.value = time;
    formSelectTimeIn.value = time;
  };
  /**
   * Получение текущего элемента в таргете
   * @param {ObjectEvent} evt
   */
  var onChangeSelectOption = function (evt) {
    changeTime(evt.target.value);
  };

  onChangePriceOfNight(formSelectType.value);

  formSelectType.addEventListener('change', function () {
    onChangePriceOfNight(formSelectType.value);
  });

  formSelectTimeIn.addEventListener('change', onChangeSelectOption);
  formSelectTimeOut.addEventListener('change', onChangeSelectOption);

  window.form.toggleState(true);
  window.form.setInputAddressCoordinate();

})();

