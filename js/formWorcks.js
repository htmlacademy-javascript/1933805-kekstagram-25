

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
//const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const re = new RegExp(/^#(?=.*[^0-9])[a-zа-яё0-9]{1,19}$/i);


//пристин
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
//открытие загрузки изображения.

function clickAddImg() {
  buttonLoadImg.addEventListener('change', () => {
    openForm();
  });
}

function openForm() {
  formRedactImg.classList.remove('hidden');
  body.classList.add('modal-open');
}


//кнопки сброса.
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

// Именьшение и увеличение изображения.
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

export { clickAddImg };
