
const buttonLoadImg = document.querySelector('#upload-file');
const body = document.querySelector('body');
const formRedactImg = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const controlSmaller = document.querySelector('.scale__control--smaller');
const controlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const img = imgUploadPreview.querySelector('img');
const hashtags = document.querySelector('.text__hashtags');
const socialFooterText = document.querySelector('.text__description');
const form = document.querySelector('.img-upload__form');
const MINSIZE = 25;
const MAXSIZE = 100;
const STEP = 25;
scaleControlValue.value = `${MAXSIZE}%`;
const re = new RegExp(/^#(?=.*[^0-9])[a-zа-яё0-9]{1,19}$/i);


//**************Пристин********************
const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',

});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    //console.log('Можно отправлять');
  } else {
    //console.log('Форма невалидна');
  }
});

function validateHashTag(value) {
  const hashtags5 = value.split(' ');
  const valueBad = hashtags5.filter((item, index, array) => !re.test(item) || item.length > 20 || array.indexOf(item) !== index);
  if (value === '') {
    return true;
  }

  if (valueBad.length > 0 || hashtags5.length > 5) {
    return false;
  } else {
    return true;
  }

}


pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashTag,
  'Не корректное введение хэш-тега ',
  false
);
//*************Открытие загрузки изображения.***************

function clickAddImg() {
  buttonLoadImg.addEventListener('change', () => {
    scaleControlValue.value = `${MAXSIZE}%`;
    openForm();
  });
}

function openForm() {
  scaleControlValue.value = `${MAXSIZE}%`;
  formRedactImg.classList.remove('hidden');
  body.classList.add('modal-open');
}


//************Кнопки сброса.**************
uploadCancel.addEventListener('click', () => {
  formRedactImg.classList.add('hidden');

});
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (socialFooterText !== document.activeElement && hashtags !== document.activeElement) {
      formRedactImg.classList.add('hidden');
      body.classList.remove('modal-open');

    }

  }

});

//*************Именьшение и увеличение изображения.***********
controlSmaller.addEventListener('click', () => {
  let size = parseInt(scaleControlValue.value, 10);
  if (size <= MINSIZE) {
    return;
  }
  size -= STEP;
  scaleControlValue.value = `${size}%`;
  img.style.transform = `scale(${size / 100})`;
});
controlBigger.addEventListener('click', () => {
  let size = parseInt(scaleControlValue.value, 10);
  if (size >= MAXSIZE) {
    return;
  }
  size += STEP;
  scaleControlValue.value = `${size}%`;
  img.style.transform = `scale(${size / 100})`;
});

//***********module9-task1/ СЛАЙДЕР ЭФФЕКТОВ.*************
const NON_EFFECT_FIELD_ID = 'effect-none';

const photoFilters = {
  chrome : {
    name: 'grayscale',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  sepia : {
    name: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  },
  marvin : {
    name: 'invert',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  },
  phobos : {
    name: 'blur',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    connect: 'lower',
  },
  heat : {
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
  getTotalString: function (variable){
    switch(true){
      case (photoFilters.property === photoFilters.marvin.name):
        return `${photoFilters.property  }(${  variable  }%)`;
      case (photoFilters.property === photoFilters.phobos.name):
        return `${photoFilters.property  }(${  variable  }px)`;
      default:
        return `${photoFilters.property  }(${  variable  })`;
    }
  }
};

const sliderElement = document.querySelector('.effect-level__slider');
const effectsList = document.querySelectorAll('.effects__radio');
const effectLevelValue = document.querySelector('.effect-level__value');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');


noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  img.style.filter = photoFilters.getTotalString(sliderElement.noUiSlider.get());
  effectLevelValue.value = sliderElement.noUiSlider.get();
});

const updateFilterSetting = (photoFilter) => {
  img.style.filter = 'none';
  photoFilters.property = photoFilters[photoFilter].name;
  sliderElement.noUiSlider.updateOptions(photoFilters[photoFilter]);
  imgUploadEffectLevel.classList.remove('hidden');
};
for (let i = 0; i < effectsList.length; i++) {
  effectsList[i].addEventListener('click', (evt) => {
    const photoFilter = evt.target.id.split('-')[1];
    updateFilterSetting(photoFilter);
    if (evt.target.id === NON_EFFECT_FIELD_ID) {
      img.style.filter = 'none';
      imgUploadEffectLevel.classList.add('hidden');
    }
  });
}

export { clickAddImg };
