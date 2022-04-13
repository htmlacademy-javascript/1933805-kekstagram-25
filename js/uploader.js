import { showImgUpload } from './forms.js';

const loadImageToUpload = (uploadPreviewElement, fileReader, effectsImagesList) => {
  uploadPreviewElement.src = fileReader.result;
  effectsImagesList.forEach((effect) => {
    effect.style.backgroundImage = `url("${fileReader.result}")`;
  });
  showImgUpload();
};

export { loadImageToUpload };
