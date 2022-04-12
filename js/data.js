import { getRandomArrayElement } from './util.js';

const DOWNLOAD_URL = 'https://25.javascript.pages.academy/kekstagram/data';
const UPLOAD_URL = 'https://25.javascript.pages.academy/kekstagram';
const MAX_NUMBER_OF_HASHTAGS = 5;
const FIRSTABLE_SHOWN_COMMENTS = 5;
const COMMENTS_TO_SHOW = 5;
const REG_EXP_FOR_HASHTAGS = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const REG_EXP_FOR_HASHTAGS_ARRAY = /\s+/;
const SCALE_MIN_SIZE = 0.25;
const SCALE_MAX_SIZE = 1;
const SCALE_STEP = 0.25;
const NON_EFFECT_FIELD_ID = 'effect-none';
const GET_DATA_ERROR_SHOWING_TIME = 3000;
const GET_RANDOM_INTEGER_DEFAULT_START = 1;
const GET_RANDOM_INTEGER_DEFAULT_END = 100;
const RERENDER_DELAY = 500;
const NUMBER_OF_RANDOM_POSTS = 10;
const photoFilters = {
  chrome: {
    name: 'grayscale',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  sepia: {
    name: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  marvin: {
    name: 'invert',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  },
  phobos: {
    name: 'blur',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  },
  heat: {
    name: 'brightness',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  },
  none: 'none',
  property: '',
  getTotalString: function (variable) {
    switch (true) {
      case (photoFilters.property === photoFilters.marvin.name):
        return `${photoFilters.property}(${variable}%)`;
      case (photoFilters.property === photoFilters.phobos.name):
        return `${photoFilters.property}(${variable}px)`;
      default:
        return `${photoFilters.property}(${variable})`;
    }
  }
};

const SuccessMessage = {
  TEMPLATE_ID: '#success',
  TEMPLATE_CLASS: '.success',
  CLOSE_BUTTON_CLASS: '.success__button',
  MESSAGE_CONTAINER_CLASS: '.success__inner'
};
const ErrorMessage = {
  TEMPLATE_ID: '#error',
  TEMPLATE_CLASS: '.error',
  CLOSE_BUTTON_CLASS: '.error__button',
  MESSAGE_CONTAINER_CLASS: '.error__inner'
};

 const UserFilter = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
  DEFAULT: 'filter-default'
};

export {
  MAX_NUMBER_OF_HASHTAGS, FIRSTABLE_SHOWN_COMMENTS, COMMENTS_TO_SHOW, photoFilters, getRandomArrayElement,
  REG_EXP_FOR_HASHTAGS_ARRAY, SCALE_MAX_SIZE, SCALE_MIN_SIZE, SCALE_STEP, NON_EFFECT_FIELD_ID, DOWNLOAD_URL, UPLOAD_URL, GET_DATA_ERROR_SHOWING_TIME, SuccessMessage, ErrorMessage, GET_RANDOM_INTEGER_DEFAULT_END, REG_EXP_FOR_HASHTAGS, GET_RANDOM_INTEGER_DEFAULT_START, RERENDER_DELAY, NUMBER_OF_RANDOM_POSTS, UserFilter};
