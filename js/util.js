import {
  RERENDER_DELAY,REG_EXP_FOR_HASHTAGS_ARRAY,GET_DATA_ERROR_SHOWING_TIME,GET_RANDOM_INTEGER_DEFAULT_END, GET_RANDOM_INTEGER_DEFAULT_START} from './data.js';
import { returnToDefault } from './photo_filter.js';
import { imgUploadOverlay } from './forms.js';

const imageFilters = document.querySelector('.img-filters');

const getRandomIntegerNumber = (startNumber = GET_RANDOM_INTEGER_DEFAULT_START, lastNumber = GET_RANDOM_INTEGER_DEFAULT_END) => {
  if (startNumber < 0) {
    throw new Error('Ошибка генерации случайного числа ,число ниже нуля');
  }
  if (startNumber >= lastNumber) {
    throw new Error('Ошибка генерации случайного числа ,число больше конечного');
  }
  const auxStartNumber = Math.ceil(startNumber);
  const auxLastNumber = Math.floor(lastNumber) + 1;
  return Math.floor(Math.random() * (auxLastNumber - auxStartNumber)) + auxStartNumber;
};

const checkStringLength = (currentString, maxLength) => currentString.length <= maxLength;

function getHashtagsArray (hashtagsString) {
  return hashtagsString.split(REG_EXP_FOR_HASHTAGS_ARRAY);
}

const getRandomArrayElement = (array) => array[getRandomIntegerNumber(0, array.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const getDataError = (errorText) => {
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('get-Data__error');
  errorMessage.textContent = errorText;
  document.body.append(errorMessage);
  setTimeout(() => errorMessage.remove(), GET_DATA_ERROR_SHOWING_TIME);
};

const closeMessage = (message) => {
  message.remove();
  returnToDefault();
};

const showFinalMessage = (messageProps) => {
  const messageTemplate = document.querySelector(messageProps.TEMPLATE_ID).content;
  const newMesage = messageTemplate.querySelector(messageProps.TEMPLATE_CLASS);
  const message = newMesage.cloneNode(true);
  const button = message.querySelector(messageProps.CLOSE_BUTTON_CLASS);
  const messageContainer = message.querySelector(messageProps.MESSAGE_CONTAINER_CLASS);
  button.addEventListener('click', () => closeMessage(message));
  message.addEventListener('click', (evt) => {
    if (evt.target !== messageContainer) {
      closeMessage(message);
    }
  });
  document.body.append(message);
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

function debounce (callback, timeoutDelay = RERENDER_DELAY) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const showImageFilters = () => {
  imageFilters.classList.remove('img-filters--inactive');
};

export {
  getRandomIntegerNumber,checkStringLength,getRandomArrayElement,getHashtagsArray,isEscapeKey, getDataError, showFinalMessage, debounce,showImageFilters
};
