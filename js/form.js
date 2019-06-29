'use strict';
/**
 * Валидация формы
 */
(function () {
  var FORM = document.querySelector('.ad-form');
  var FORM_SELECT_TIMEIN = FORM.querySelector('#timein');
  var FORM_SELECT_TIMEOUT = FORM.querySelector('#timeout');
  var FORM_PRICE = FORM.querySelector('#price');
  var FORM_SELECT_TYPE = FORM.querySelector('#type');
  /**
   * Добавление нимимального значение и изменения placeholder
   * @param {string} type
   */
  var onChangePriceOfNight = function (type) {
    FORM_PRICE.setAttribute('min', window.constants.priceTypes[type]);
    FORM_PRICE.placeholder = window.constants.priceTypes[type];
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
})();

