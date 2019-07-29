'use strict';
/**
 * Модуль загрузки изображений аватара и изображений жилья
 * Зависимости utils.js
 * Методы setEventListeners, removeEventListeners, reset доступны для других модулей
 */
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooserAvatar = document.querySelector('#avatar');
  var fileChooserPhoto = document.querySelector('#images');
  var avatarDropZone = document.querySelector('.ad-form-header__drop-zone');
  var photoDropZone = document.querySelector('.ad-form__upload');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoPreview = document.querySelector('.ad-form__photo');
  var containerPhoto = document.querySelector('.ad-form__photo-container');
  var dragDropEvents = ['dragenter', 'dragover', 'dragleave', 'drop'];
  var standartAvatar = 'img/muffin-grey.svg';
  /**
   * Показывает загруженное изображение аватара
   * @param {ObjectEvent} evt
   */
  var previewAvatar = function (evt) {
    var file = evt.dataTransfer ? evt.dataTransfer.files[0] : fileChooserAvatar.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();
      var reader = new FileReader();
      reader.readAsDataURL(file);

      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      reader.onloadend = function () {
        if (matches) {
          avatarPreview.src = reader.result;
        }
      };
    }
  };
  /**
   * Создает контайнер с картинкой в вставляет в DOM
   * @param {dataUrl} src
   */
  var createPhotoElements = function (src) {
    var img = document.createElement('img');
    img.src = src;
    img.style.width = photoPreview.offsetWidth + 'px';
    img.style.height = photoPreview.offsetHeight + 'px';

    if (photoPreview.firstChild) {
      var containerImg = photoPreview.cloneNode(false);
      containerImg.appendChild(img);
      containerPhoto.appendChild(containerImg);
    } else {
      photoPreview.appendChild(img);
    }

  };
  /**
   * Удаляет все загруженные изображение, возвращает аватару стандатное изображение
   */
  var reset = function () {
    var photos = document.querySelectorAll('.ad-form__photo');
    var containerImg = photoPreview.cloneNode(false);
    avatarPreview.src = standartAvatar;
    photos.forEach(function (element) {
      window.util.clearDomElement(element);
    });
    containerPhoto.appendChild(containerImg);
  };
  /**
   * Показывает загруженные изображения фотографий
   * @param {ObjectEvent} evt
   */
  var previewPhoto = function (evt) {
    var files = Array.from(evt.dataTransfer ? evt.dataTransfer.files : fileChooserPhoto.files);

    if (files.length) {
      files.forEach(function (file) {
        var reader = new FileReader();
        var itemName = file.name.toLowerCase();
        reader.readAsDataURL(file);

        var matches = FILE_TYPES.some(function (type) {
          return itemName.endsWith(type);
        });

        reader.onloadend = function () {
          if (matches) {
            createPhotoElements(reader.result);
          }
        };
      });
    }
  };
  /**
   * Отменяется действие по умолчанию и оставливает распростанение события
   * @param {ObjectEvent} evt
   */
  var preventDefaults = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  };
  /**
   * Подсвечивает зону в которую можно переместить изображения для загрузке на сервер
   * @param {ObjectEvent} evt
   */
  var DropZoneActive = function (evt) {
    evt.target.style.backgroundColor = '#2ecc71';
    evt.target.style.color = '#ffffff';
  };
  /**
   * Убирает подстветку с зоны в которую можно переместить изображения для загрузке на сервер
   * @param {ObjectEvent} evt
   */
  var DropZoneNotActive = function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.style.color = '';
  };
  /**
   * Отменяет действие по умолчанию и останавливает распростронение событий drag&drop (dragenter, dragover, dragleave, drop)
   * для области загруки изображения аватара и фотографий жилья
   */
  var dropZonePreventDefaults = function () {
    dragDropEvents.forEach(function (eventName) {
      avatarDropZone.addEventListener(eventName, preventDefaults);
      photoDropZone.addEventListener(eventName, preventDefaults);
    });
  };
  /**
   * Подсвечитвает зону, когда переносимое изображение находится в области куда можно поместить его для загрузки на сервер
   * (обсласть загрузки изображения аватара и фотографий жилья) при событии (dragenter, dragover)
   */
  var dropZoneActive = function () {
    dragDropEvents.slice(0, 2).forEach(function (eventName) {
      avatarDropZone.addEventListener(eventName, DropZoneActive);
      photoDropZone.addEventListener(eventName, DropZoneActive);
    });
  };
  /**
   * Уберает подсветку зоны, когда переносимое изображение покидают область куда можно поместить его для загрузки на сервер
   * (обсласть загрузки изображения аватара и фотографий жилья) при событии (dragleave, drop)
   */
  var dropZoneNotActive = function () {
    dragDropEvents.slice(2, 4).forEach(function (eventName) {
      avatarDropZone.addEventListener(eventName, DropZoneNotActive);
      photoDropZone.addEventListener(eventName, DropZoneNotActive);
    });
  };
  /**
   * Подписывается на событие drop на области куда можно переместить изображение аватара для загрузки его на сервер
   * и показывает это изображение
   */
  var onDropAvatarDropZone = function () {
    avatarDropZone.addEventListener('drop', previewAvatar);
  };
  /**
   * Подписывается на событие change при загрузке изображения аватара и показывает это изображение
   */
  var onChangeAvatarInput = function () {
    fileChooserAvatar.addEventListener('change', previewAvatar);
  };
  /**
   * Подписывается на событие drop на области куда можно переместить изображения жилья для загрузки его на сервер
   * и показывает эти изображения
   */
  var onDropPhotoDropZone = function () {
    photoDropZone.addEventListener('drop', previewPhoto);
  };
  /**
   * Подписывается на событие change при загрузке изображения жилья и показывает это изображение
   */
  var onChangePhotoInput = function () {
    fileChooserPhoto.addEventListener('change', previewPhoto);
  };
  /**
   * Добавляет все слушатели событий для загрузки изображений аватара и изображений жилья
   */
  var setEventListeners = function () {
    dropZonePreventDefaults();
    dropZoneActive();
    dropZoneNotActive();
    onDropAvatarDropZone();
    onChangeAvatarInput();
    onChangePhotoInput();
    onDropPhotoDropZone();
  };
  /**
   * Удаляет всех слушателей событий для загрузки изображений аватара и изображений жилья
   */
  var removeEventListeners = function () {
    dragDropEvents.forEach(function (eventName) {
      avatarDropZone.removeEventListener(eventName, preventDefaults);
      photoDropZone.removeEventListener(eventName, preventDefaults);
    });
    dragDropEvents.slice(0, 2).forEach(function (eventName) {
      avatarDropZone.removeEventListener(eventName, DropZoneActive);
      photoDropZone.removeEventListener(eventName, DropZoneActive);
    });
    dragDropEvents.slice(2, 4).forEach(function (eventName) {
      avatarDropZone.removeEventListener(eventName, DropZoneNotActive);
      photoDropZone.removeEventListener(eventName, DropZoneNotActive);
    });

    avatarDropZone.removeEventListener('drop', previewAvatar);
    fileChooserAvatar.removeEventListener('change', previewAvatar);
    photoDropZone.removeEventListener('drop', previewPhoto);
    fileChooserPhoto.removeEventListener('change', previewPhoto);
  };
  /**
   * Экспорт в глобальную область видимости
   */
  window.uploadImg = {
    setEventListeners: setEventListeners,
    removeEventListeners: removeEventListeners,
    reset: reset
  };

})();

