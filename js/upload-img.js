'use strict';
/**
 * Модуль загрузки изображений аватара и изображений жилья
 * Методы setEventListeners, removeEventListeners доступны для других модулей
 */
(function () {
  var fileChooserAvatar = document.querySelector('#avatar');
  var fileChooserPhoto = document.querySelector('#images');
  var avatarDropZone = document.querySelector('.ad-form-header__drop-zone');
  var photoDropZone = document.querySelector('.ad-form__upload');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoPreview = document.querySelector('.ad-form__photo');
  var containerPhoto = document.querySelector('.ad-form__photo-container');
  var fileTypes = ['gif', 'jpg', 'jpeg', 'png'];
  var dragAndDropEvents = {
    enter: ['dragenter', 'dragover'],
    leave: ['dragleave', 'drop']
  };
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

      var matches = fileTypes.some(function (item) {
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
   * Создает контайнер с изображением жилья и добавляет в DOM
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
   * Показывает загруженные изображения жилья
   * @param {ObjectEvent} evt
   */
  var previewPhoto = function (evt) {
    var files = Array.from(evt.dataTransfer ? evt.dataTransfer.files : fileChooserPhoto.files);

    if (files.length) {
      files.forEach(function (file) {
        var reader = new FileReader();
        var itemName = file.name.toLowerCase();
        reader.readAsDataURL(file);

        var matches = fileTypes.some(function (type) {
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
   * Отменяет действие по умолчанию и оставливает распространение события
   * @param {ObjectEvent} evt
   */
  var preventDefaults = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  };
  /**
   * Подсвечивает зону в которую можно переместить изображения для загрузки на сервер
   * @param {ObjectEvent} evt
   */
  var dropZoneEnter = function (evt) {
    evt.target.style.backgroundColor = '#2ecc71';
    evt.target.style.color = '#ffffff';
  };
  /**
   * Убирает подстветку с зоны в которую можно переместить изображения для загрузки на сервер
   * @param {ObjectEvent} evt
   */
  var dropZoneLeave = function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.style.color = '';
  };
  /**
   * При событии drop на области куда можно переместить изображение аватара (для загрузки его на сервер)
   * показывает это изображение
   * @param {ObjectEvent} evt
   */
  var onDropAvatarDropZone = function (evt) {
    previewAvatar(evt);
  };
  /**
   * При событии change на input (загрузка изображения аватара) показывает изображения аватара
   * @param {ObjectEvent} evt
   */
  var onChangeAvatarInput = function (evt) {
    previewAvatar(evt);
  };
  /**
   * При событии drop на области куда можно переместить изображения жилья (для загрузки его на сервер)
   * показывает эти изображения
   * @param {ObjectEvent} evt
   */
  var onDropPhotoDropZone = function (evt) {
    previewPhoto(evt);
  };
  /**
   * При событии change на input (загрузка изображений жилья) показывает изображения жилья
   * @param {ObjectEvent} evt
   */
  var onChangePhotoInput = function (evt) {
    previewPhoto(evt);
  };
  /**
   * Добавляет все слушатели событий для загрузки изображений аватара и изображений жилья
   */
  var setEventListeners = function () {
    [].concat(dragAndDropEvents.enter, dragAndDropEvents.leave).forEach(function (eventName) {
      avatarDropZone.addEventListener(eventName, preventDefaults);
      photoDropZone.addEventListener(eventName, preventDefaults);
    });
    dragAndDropEvents.enter.forEach(function (eventName) {
      avatarDropZone.addEventListener(eventName, dropZoneEnter);
      photoDropZone.addEventListener(eventName, dropZoneEnter);
    });
    dragAndDropEvents.leave.forEach(function (eventName) {
      avatarDropZone.addEventListener(eventName, dropZoneLeave);
      photoDropZone.addEventListener(eventName, dropZoneLeave);
    });

    avatarDropZone.addEventListener('drop', onDropAvatarDropZone);
    fileChooserAvatar.addEventListener('change', onChangeAvatarInput);
    photoDropZone.addEventListener('drop', onDropPhotoDropZone);
    fileChooserPhoto.addEventListener('change', onChangePhotoInput);
  };
  /**
   * Удаляет всех слушателей событий загрузки изображений аватара и изображений жилья
   */
  var removeEventListeners = function () {
    [].concat(dragAndDropEvents.enter, dragAndDropEvents.leave).forEach(function (eventName) {
      avatarDropZone.removeEventListener(eventName, preventDefaults);
      photoDropZone.removeEventListener(eventName, preventDefaults);
    });
    dragAndDropEvents.enter.forEach(function (eventName) {
      avatarDropZone.removeEventListener(eventName, dropZoneEnter);
      photoDropZone.removeEventListener(eventName, dropZoneEnter);
    });
    dragAndDropEvents.leave.forEach(function (eventName) {
      avatarDropZone.removeEventListener(eventName, dropZoneLeave);
      photoDropZone.removeEventListener(eventName, dropZoneLeave);
    });

    avatarDropZone.removeEventListener('drop', onDropAvatarDropZone);
    fileChooserAvatar.removeEventListener('change', onChangeAvatarInput);
    photoDropZone.removeEventListener('drop', onDropPhotoDropZone);
    fileChooserPhoto.removeEventListener('change', onChangePhotoInput);
  };
  /**
   * Экспорт в глобальную область видимости
   */
  window.uploadImg = {
    setEventListeners: setEventListeners,
    removeEventListeners: removeEventListeners
  };

})();

