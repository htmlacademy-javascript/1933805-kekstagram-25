

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
const pristine = new Pristine(form);
const MINSIZE = 25;
const MAXSIZE = 100;
const STEP = 25;
scaleControlValue.value = `${MAXSIZE}%`;
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;


//пристин

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid && re.test(hashtags.value)) {
    //console.log('Можно отправлять');
  } else {
    //console.log('Форма невалидна');
  }

});

//открытие загрузки изображения.
function clickAddImg() {
  buttonLoadImg.addEventListener('click', () => {
    formRedactImg.classList.remove('hidden');
    body.classList.add('modal-open');
  });
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
