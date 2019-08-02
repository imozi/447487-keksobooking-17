'use strict';
/**
 * Модуль изменения форм страницы, валидация главной формы
 * Зависимости main-pin.js, rendering.js, page.js, utils.js data.js
 * Методы toggleState, setInputAddressCoordinate, reset, переменные filterElements, mainFieldsets, onChangeFilterValue,
 * removeOnChangeFilterValue, initialState, mainAddEventListeners, removeEventListenerAllMainForm в window.form доступны для дргуих модулей
 */
(function () {
  var STANDART_AVATAR = 'img/muffin-grey.svg';
  var formMain = document.querySelector('.ad-form');
  var formFilter = document.querySelector('.map__filters');
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
  var formAvatarPreview = formMain.querySelector('.ad-form-header__preview img');
  var PriceOfAccomodationType = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
  /**
   * Подписывает на событие change формы фильтра, при изменении значений показывает соответсвующие объявления
   */
  var onChangeFilterValue = function () {
    window.rendering.filteredDataPin();
  };
  /**
   * Отписывается от события change на форме фильтра
   */
  var removeOnChangeFilterValue = function () {
    formFilter.removeEventListener('change', window.form.onChangeFilterValue);
  };
  /**
   * Сбрасывает главную форму и форму фильтра объявлений
   */
  var reset = function () {
    formAvatarPreview.src = STANDART_AVATAR;
    var photos = formMain.querySelectorAll('.ad-form__photo');
    /**
     * Первая проверка: если индекс элемента ровняется 0 и у него есть ребенок то удаляет этого ребенка.
     * Вторая проверка: если индекс больше 0 то удалят лишний элемент
     * (нужно для того чтобы не удалять первый элемент так как у него удалятся только ребенок если он есть)
     */
    photos.forEach(function (item, index) {
      if (index === 0 && item.firstChild) {
        window.util.clearDomElement(item.firstChild);
      }
      if (index > 0) {
        window.util.clearDomElement(item);
      }
    });
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
   * Присваевает текущий адрес метки в поле адреса главной формы
   * @param {boolean} mode
   */
  var setInputAddressCoordinate = function (mode) {
    var currentAddress = window.mainPin.getCurrentAddress(mode);
    formMainInputAddress.value = currentAddress.x + ', ' + currentAddress.y;
  };
  /**
   * Добавление минимального значение и изменения placeholder в соответствии со значение "тип жилья" главной формы
   */
  var onChangePriceOfNight = function () {
    formMainPrice.setAttribute('min', PriceOfAccomodationType[formMainSelectType.value.toUpperCase()]);
    formMainPrice.placeholder = PriceOfAccomodationType[formMainSelectType.value.toUpperCase()];
  };
  /**
   * Изменения значений в полях заезда/выезда главной формы
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
   * Переводит поля форм в неактивное состояние, добавляет значение в поле адреса, изменяет цену за ночь,
   * функция вызывается сразу (начальное состояние полей форм на момент открытия сайта)
   */
  var initialState = function () {
    toggleState(formMainFieldsets, true);
    toggleState(formFilterElements, true);
    setInputAddressCoordinate();
    onChangePriceOfNight();
  };
  initialState();
  /**
   * При событии click по кнопке "очистить" переводит странцу в неактивный режим
   */
  var onClickFormMainResetBtn = function () {
    window.page.notActiveMode();
  };
  /**
   * Сохраняет данные главной формы на сервер
   */
  var saveDataFormOnServer = function () {
    window.data.save(new FormData(formMain));
  };
  /**
   * При событии submit сохраняет данные главной формы на сервер
   * @param {ObjectEvent} evt
   */
  var onSubmitFormMain = function (evt) {
    evt.preventDefault();
    saveDataFormOnServer();
  };
  /**
   * Подписывается на события change, click, submit на полях главной формы
   */
  var mainAddEventListeners = function () {
    formMainSelectType.addEventListener('change', onChangePriceOfNight);
    formMainSelectTimeIn.addEventListener('change', onChangeTime);
    formMainSelectTimeOut.addEventListener('change', onChangeTime);
    formMainSubmitButton.addEventListener('click', onClickSubmitButton);
    formMainResetBtn.addEventListener('click', onClickFormMainResetBtn);
    formMain.addEventListener('submit', onSubmitFormMain);
  };
  /**
   * Удаляет всех слушателей событий с главной формы
   */
  var mainRemoveAllEventListener = function () {
    formMainSelectType.removeEventListener('change', onChangePriceOfNight);
    formMainSelectTimeIn.removeEventListener('change', onChangeTime);
    formMainSelectTimeOut.removeEventListener('change', onChangeTime);
    formMainSubmitButton.removeEventListener('click', onClickSubmitButton);
    formMainResetBtn.removeEventListener('click', onClickFormMainResetBtn);
    formMain.removeEventListener('submit', onSubmitFormMain);
  };
  /**
   * Экспорт в глобальную область видимости
   */
  window.form = {
    toggleState: toggleState,
    setInputAddressCoordinate: setInputAddressCoordinate,
    reset: reset,
    filter: formFilter,
    filterElements: formFilterElements,
    mainFieldsets: formMainFieldsets,
    onChangeFilterValue: onChangeFilterValue,
    removeOnChangeFilterValue: removeOnChangeFilterValue,
    initialState: initialState,
    mainAddEventListeners: mainAddEventListeners,
    mainRemoveAllEventListener: mainRemoveAllEventListener,
    avatarPreview: formAvatarPreview
  };

})();
