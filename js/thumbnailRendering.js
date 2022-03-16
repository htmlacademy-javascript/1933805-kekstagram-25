import { openImg } from './fullImg.js';
const imgItemTmp = document.querySelector('#picture');
const imgContainer = document.querySelector('.pictures');

const renderImg = (dataImg) => {
  const fragment = document.createDocumentFragment();
  dataImg.forEach((item) => {
    const cloneImgItemTmp = imgItemTmp.content.cloneNode(true);
    const pictureImg = cloneImgItemTmp.querySelector('.picture__img');
    pictureImg.src = item.url;
    cloneImgItemTmp.querySelector('.picture__comments').textContent = item.comments.length;
    cloneImgItemTmp.querySelector('.picture__likes').textContent = item.likes;

    pictureImg.addEventListener('click', () => {
      openImg(item);
    });

    fragment.append(cloneImgItemTmp);
  });
  imgContainer.append(fragment);
};

export { imgItemTmp, renderImg };
