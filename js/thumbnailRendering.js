import {getData} from './data.js';
const imgItemTmp = document.querySelector('#picture');
const imgContainer =document.querySelector('.pictures');

const renderImg =()=>{
  const fragment = document.createDocumentFragment();
  getData().forEach((item) => {
    const cloneImgItemTmp = imgItemTmp.content.cloneNode(true);
    const pictureImg = cloneImgItemTmp.querySelector('.picture__img');
    pictureImg.src= item.url;
    cloneImgItemTmp.querySelector('.picture__comments').textContent=item.comments.length;
    cloneImgItemTmp.querySelector('.picture__likes').textContent= item.likes;
    fragment.append(cloneImgItemTmp);
  });
  imgContainer.append(fragment);
};

export {imgItemTmp, renderImg};
