'use strict';
/**
 * Состояние полей формы, валидация формы, присовение адреса метки
 * Зависимости drag.js, upload.js, utils.js
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
  var formSelectRoomNumber = form.querySelector('#room_number');
  var formSelectCapacity = form.querySelector('#capacity');
  var formSubmitButton = form.querySelector('.ad-form__submit');
  var formResetBtn = form.querySelector('.ad-form__reset');
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
      var currentAddress = window.mainPin.getCurrentAddress(mode);
      formInputAddress.value = currentAddress.x + ', ' + currentAddress.y;
    },
    reset: function () {
      form.reset();
    }
  };
  window.form.toggleState(true);
  window.form.setInputAddressCoordinate();
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
   * @param {ObjectEvent} evt
   */
  var onChangeTime = function (evt) {
    formSelectTimeOut.value = evt.target.value;
    formSelectTimeIn.value = evt.target.value;
  };
  /**
   * Проверка количество гостей количеству комнат
   * @return {boolean}
   */
  var checkGuestsForRooms = function () {
    var valueRooms = formSelectRoomNumber.value;
    var valueGuest = formSelectCapacity.value;

    if (valueRooms < valueGuest) {
      return false;
    }
    return valueRooms === '100' && valueGuest === '0' || valueRooms !== '100' && valueGuest !== '0';
  };
  /**
   * Проверяет, если количество гостей не соответствует количеству комнат то выводит сообщение о неверном количестве
   */
  var onClickSubmitButton = function () {
    var isGuests = checkGuestsForRooms();

    if (!isGuests) {
      formSelectCapacity.setCustomValidity('Количество гостей не соответствует количеству комнат :(');
    } else {
      formSelectCapacity.setCustomValidity('');
    }
  };

  onChangePriceOfNight(formSelectType.value);

  formSelectType.addEventListener('change', function (evt) {
    onChangePriceOfNight(evt.target.value);
  });

  formSelectTimeIn.addEventListener('change', onChangeTime);
  formSelectTimeOut.addEventListener('change', onChangeTime);
  formSubmitButton.addEventListener('click', onClickSubmitButton);
  formResetBtn.addEventListener('click', function () {
    window.form.reset();
    window.util.noActiveMode();
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.uploadDataServer.save(new FormData(form));
  });
})();

