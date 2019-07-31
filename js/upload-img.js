'use strict';
/**
 * Модуль загрузки изображений аватара и изображений жилья
 * Методы setEventListeners, removeEventListeners, доступны для других модулей
 */
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooserAvatar = document.querySelector('#avatar');
  var fileChooserPhoto = document.querySelector('#images');
  var avatarDropZone = document.querySelector('.ad-form-header__drop-zone');
  var photoDropZone = document.querySelector('.ad-form__upload');
  var photoPreview = document.querySelector('.ad-form__photo');
  var containerPhoto = document.querySelector('.ad-form__photo-container');
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
          window.form.avatarPreview.src = reader.result;
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
   * Подсвечивает зону в которую можно переместить изображения для загрузки на сервер
   * @param {HTMLElement} element
   */
  var dropZoneActive = function (element) {
    element.style.backgroundColor = '#2ecc71';
    element.style.color = '#ffffff';
  };
  /**
   * Убирает подсветку с зоны в которую можно переместить изображения для загрузки на сервер
   * @param {HTMLElement} element
   */
  var dropZoneNotActive = function (element) {
    element.style.backgroundColor = '';
    element.style.color = '';
  };
  /**
   * При событии dragenter подствечивает зону в которую можно переместить изображения для загрузки на сервер
   * @param {ObjectEvent} evt
   */
  var onDragenterDropZone = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    dropZoneActive(evt.target);
  };
  /**
   * При событии dragover подсвечивает зону в которую можно переместить изображения для загрузки на сервер
   * @param {ObjectEvent} evt
   */
  var onDragoverDropZone = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    dropZoneActive(evt.target);
  };
  /**
   * При событии draleave убирает подсветку с зоны в которую можно переместить изображения
   * @param {ObjectEvent} evt
   */
  var onDragleaveDropZone = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    dropZoneNotActive(evt.target);
  };
  /**
   * При событии drop на области куда можно переместить изображение аватара (для загрузки его на сервер)
   * показывает это изображение
   * @param {ObjectEvent} evt
   */
  var onDropAvatarDropZone = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    dropZoneNotActive(evt.target);
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
    evt.preventDefault();
    evt.stopPropagation();
    dropZoneNotActive(evt.target);
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
    avatarDropZone.addEventListener('dragenter', onDragenterDropZone);
    avatarDropZone.addEventListener('dragover', onDragoverDropZone);
    avatarDropZone.addEventListener('dragleave', onDragleaveDropZone);
    avatarDropZone.addEventListener('drop', onDropAvatarDropZone);
    photoDropZone.addEventListener('dragenter', onDragenterDropZone);
    photoDropZone.addEventListener('dragover', onDragoverDropZone);
    photoDropZone.addEventListener('dragleave', onDragleaveDropZone);
    photoDropZone.addEventListener('drop', onDropPhotoDropZone);
    fileChooserAvatar.addEventListener('change', onChangeAvatarInput);
    fileChooserPhoto.addEventListener('change', onChangePhotoInput);
  };
  /**
   * Удаляет всех слушателей событий загрузки изображений аватара и изображений жилья
   */
  var removeEventListeners = function () {
    avatarDropZone.removeEventListener('dragenter', onDragenterDropZone);
    avatarDropZone.removeEventListener('dragover', onDragoverDropZone);
    avatarDropZone.removeEventListener('dragleave', onDragleaveDropZone);
    avatarDropZone.removeEventListener('drop', onDropAvatarDropZone);
    photoDropZone.removeEventListener('dragenter', onDragenterDropZone);
    photoDropZone.removeEventListener('dragover', onDragoverDropZone);
    photoDropZone.removeEventListener('dragleave', onDragleaveDropZone);
    photoDropZone.removeEventListener('drop', onDropPhotoDropZone);
    fileChooserAvatar.removeEventListener('change', onChangeAvatarInput);
    fileChooserPhoto.removeEventListener('change', onChangePhotoInput);
  };
  /**
   * Экспорт в глобальную область видимости
   */
  window.uploadImg = {
    setEventListeners: setEventListeners,
    removeEventListeners: removeEventListeners,
  };

})();

