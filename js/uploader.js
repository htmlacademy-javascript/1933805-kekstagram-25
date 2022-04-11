import { showImgUpload } from './forms.js';

const loadImageToUpload = (previewImage, fileReader, effectsImagesList) => {
  previewImage.src = fileReader.result;
  effectsImagesList.forEach((effect) => {
    effect.style.backgroundImage = `url("${fileReader.result }")`;
  });
  showImgUpload();
};

export {loadImageToUpload};
