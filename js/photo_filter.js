import { previewImage, uploadedImage } from './forms.js';
import { photoFilters, SCALE_MAX_SIZE, SCALE_MIN_SIZE, SCALE_STEP, NON_EFFECT_FIELD_ID } from './data.js';
import { imgUploadEffectLevel } from './forms.js';
import { uploadForm } from './forms.js';
const sliderElement = document.querySelector('.effect-level__slider');
const effectsList = document.querySelectorAll('.effects__radio');
const effectLevelValue = document.querySelector('.effect-level__value');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
let scale = 1;

scaleBiggerButton.addEventListener('click', () => {
  if(scale < SCALE_MAX_SIZE){
    scale +=SCALE_STEP;
    scaleControlValue.value = `${scale*100}%`;
    previewImage.style.transform = `scale(${scale})`;
  }
});

scaleSmallerButton.addEventListener('click', () => {
  if(scale > SCALE_MIN_SIZE){
    scale -=SCALE_STEP;
    scaleControlValue.value = `${scale*100 }%`;
    previewImage.style.transform = `scale(${scale})`;
  }
});

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
  previewImage.style.filter = photoFilters.getTotalString(sliderElement.noUiSlider.get());
  effectLevelValue.value = sliderElement.noUiSlider.get();
});

const updateFilterSetting = (photoFilter) => {
  previewImage.style.filter = 'none';
  photoFilters.property = photoFilters[photoFilter].name;
  sliderElement.noUiSlider.updateOptions(photoFilters[photoFilter]);
  imgUploadEffectLevel.classList.remove('hidden');
};

effectsList.forEach((effect) => {
  effect.addEventListener('click', (evt) => {
    const photoFilter = evt.target.id.split('-')[1];
    updateFilterSetting(photoFilter);
    if (evt.target.id === NON_EFFECT_FIELD_ID){
      previewImage.style.filter = 'none';
      imgUploadEffectLevel.classList.add('hidden');
    }
  });
});

const returnToDefault = () => {
  uploadForm.reset();
  previewImage.style.transform = 'scale(1)';
  previewImage.style.filter = 'none';
  uploadedImage.value = '';
};

export { returnToDefault };

