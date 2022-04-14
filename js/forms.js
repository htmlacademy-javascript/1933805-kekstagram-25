import { isEscapeKey } from './util.js';
import { loadImageToUpload } from './uploader.js';
import { validateHashtags } from './validators.js';
import { sendData } from './api.js';
import { showFinalMessage } from './util.js';
import { SuccessMessage, ErrorMessage } from './data.js';
import { returnToDefault } from './photo_filter.js';
const uploadedImage = document.querySelector('.img-upload__input');
const uploadPreview = document.querySelector('.img-upload__preview');
const uploadPreviewElement = uploadPreview.querySelector('img');
const effectsImagesList = document.querySelectorAll('.effects__preview');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancelButton = document.querySelector('.img-upload__cancel');
const mainWindow = document.querySelector('body');
const hashtagsInput = document.querySelector('.text__hashtags');
const decriptionInput = document.querySelector('.text__description');
const uploadForm = document.querySelector('.img-upload__form');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const uploadFormButton = document.querySelector('.img-upload__submit');


const pristine = new Pristine(uploadForm, {
  classTo: 'text__hashtags-wrapper',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'text__hashtags-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

pristine.addValidator(
  hashtagsInput,
  validateHashtags, 'Не корректное введение хэш-тега ',
  false
);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  uploadFormButton.setAttribute('disabled', true);
  if (pristine.validate()) {
    sendData(
      () => showFinalMessage(SuccessMessage),
      () => showFinalMessage(ErrorMessage),
      new FormData(evt.target)
    );
  }
});

const setRemoveAtribute = () => {
  uploadFormButton.removeAttribute('disabled');
};

const checkFocus = () => document.activeElement !== hashtagsInput && document.activeElement !== decriptionInput;

const onCancelBtnClick = () => {
  imgUploadOverlay.classList.add('hidden');
  mainWindow.classList.remove('modal-open');
  returnToDefault();
};

const onEscape = (evt) => {
  if (isEscapeKey(evt) && checkFocus()) {
    onCancelBtnClick();
    document.removeEventListener('keyup', onEscape);
  }
};

const showImgUpload = () => {
  imgUploadOverlay.classList.remove('hidden');
  imgUploadEffectLevel.classList.add('hidden');
  mainWindow.classList.add('modal-open');
  document.addEventListener('keyup', onEscape);
  imgUploadCancelButton.addEventListener('click', onCancelBtnClick);
};

uploadedImage.addEventListener('change', (evt) => {
  const target = evt.target;
  if (!FileReader) {
    throw new Error('Filereader недоступен');
  }
  if (!target.files.length) {
    throw new Error('Ничего не загружено');
  }
  const fileReader = new FileReader();
  fileReader.addEventListener('load', () => {
    loadImageToUpload(uploadPreviewElement, fileReader, effectsImagesList);
  });
  fileReader.readAsDataURL(target.files[0]);
});

export {
  setRemoveAtribute, showImgUpload, uploadPreviewElement, imgUploadEffectLevel, hashtagsInput, decriptionInput, uploadedImage, imgUploadOverlay, uploadForm
};
