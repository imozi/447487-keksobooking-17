'use strict';
/**
 * Модуль изменения форм страницы, валидация главной формы, присовение адреса метки
 * Зависимости main-pin.js, upload.js, page.js
 * Методы toggleState, setInputAddressCoordinate, reset, переменные filterElements, mainFieldsets в window.form доступны для дргуих модулей
 */
var formFilter = document.querySelector('.map__filters');
(function () {
  var formMain = document.querySelector('.ad-form');

  var formMainFieldsets = formMain.querySelectorAll('fieldset');
  var formMainInputAddress = formMain.querySelector('#address');
  var formMainSelectTimeIn = formMain.querySelector('#timein');
  var formMainSelectTimeOut = formMain.querySelector('#timeout');
  var formMainPrice = formMain.querySelector('#price');
  var formMainSelectType = formMain.querySelector('#type');
  var formMainSelectRoomNumber = formMain.querySelector('#room_number');
  var formMainSelectCapacity = formMain.querySelector('#capacity');
  var formMainSubmitButton = formMain.querySelector('.ad-form__submit');
  var formMainResetBtn = formMain.querySelector('.ad-form__reset');
  var formFilterSelects = Array.from(formFilter.querySelectorAll('select'));
  var formFilterFieldset = formFilter.querySelector('fieldset');
  var formFilterElements = [].concat(formFilterSelects, formFilterFieldset);
  var priceTypesMap = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  /**
   * Подписывает на событие change формы фильтра, при изменении значений показывает соответсвующие объявления
   */
  var onChangeFilterValue = function () {
    formFilter.addEventListener('change', window.rendering.filteredPin);
  };
  /**
   * Отписывается от события change на форме фильтра
   */
  var removeOnChangeFilterValue = function () {
    formFilter.removeEventListener('change', window.rendering.filteredPin);
  };
  /**
   * Сбрасывает главную форму и форму фильтра объявлений
   */
  var reset = function () {
    formMain.reset();
    formFilter.reset();
  };
  /**
   * Перевод переданных полей формы в указанное состояние (активное или неактивное)
   * @param {HTMLCollection} formElements
   * @param {boolean} disabled
   */
  var toggleState = function (formElements, disabled) {
    formElements.forEach(function (element) {
      element.disabled = disabled ? true : false;
    });
  };
  /**
   * Присваевание текущего адресса метки в поле адресса
   * @param {boolean} mode
   */
  var setInputAddressCoordinate = function (mode) {
    var currentAddress = window.mainPin.getCurrentAddress(mode);
    formMainInputAddress.value = currentAddress.x + ', ' + currentAddress.y;
  };
  /**
   * Добавление минимального значение и изменения placeholder
   * @param {string} type
   */
  var onChangePriceOfNight = function (type) {
    formMainPrice.setAttribute('min', priceTypesMap[type]);
    formMainPrice.placeholder = priceTypesMap[type];
  };
  /**
   * Изменения значений в полях заезда/выезда
   * @param {ObjectEvent} evt
   */
  var onChangeTime = function (evt) {
    formMainSelectTimeOut.value = evt.target.value;
    formMainSelectTimeIn.value = evt.target.value;
  };
  /**
   * Проверка количество гостей количеству комнат
   * @return {boolean}
   */
  var checkGuestsForRooms = function () {
    var valueRooms = formMainSelectRoomNumber.value;
    var valueGuest = formMainSelectCapacity.value;

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
      formMainSelectCapacity.setCustomValidity('Количество гостей не соответствует количеству комнат :(');
    } else {
      formMainSelectCapacity.setCustomValidity('');
    }
  };
  /**
   * Переводит поля форм в неактивное состояние, добавляет значение в поле адреса, изменяет цену за ночь
   * Начальное состояние на момент открытия сайта
   */
  var formInitialState = function () {
    toggleState(formMainFieldsets, true);
    toggleState(formFilterElements, true);
    setInputAddressCoordinate();
    onChangePriceOfNight(formMainSelectType.value);
  };

  formInitialState();

  formMainSelectType.addEventListener('change', function (evt) {
    onChangePriceOfNight(evt.target.value);
  });
  formMainSelectTimeIn.addEventListener('change', onChangeTime);
  formMainSelectTimeOut.addEventListener('change', onChangeTime);
  formMainSubmitButton.addEventListener('click', onClickSubmitButton);
  formMainResetBtn.addEventListener('click', function () {
    reset();
    window.page.notActiveMode();
  });

  formMain.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.uploadDataServer.save(new FormData(formMain));
  });
  /**
   * Экспорт в глобальную область видимости
   */
  window.form = {
    toggleState: toggleState,
    setInputAddressCoordinate: setInputAddressCoordinate,
    reset: reset,
    filterElements: formFilterElements,
    mainFieldsets: formMainFieldsets,
    onChangeFilterValue: onChangeFilterValue,
    removeOnChangeFilterValue: removeOnChangeFilterValue
  };

})();
