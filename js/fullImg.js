import { getData } from './data.js';
import { renderImg } from './thumbnailRendering.js';
renderImg();


const smallImages = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const scroll = document.querySelector('body');
const socialComments = document.querySelector('.social__comments');

function creatingCommentList(index) {
  const listComment = document.createElement('li');
  listComment.classList.add('social__comment');
  const picture = document.createElement('img');
  picture.classList.add('social__picture');
  picture.src = getData()[index].comments[0].avatar;
  picture.alt = getData()[index].comments[0].name;
  picture.width = 35;
  picture.height = 35;
  listComment.appendChild(picture);
  const socialText = document.createElement('p');
  socialText.classList.add('social__text');
  socialText.textContent = getData()[index].comments[0].message;
  listComment.appendChild(socialText);
  return listComment;
}

function getFullImg() {
  smallImages.forEach((smallImage, index) => {
    smallImage.addEventListener('click', () => {
      bigPicture.querySelector('.big-picture__img').querySelector('img').src =
        getData()[index].url;
      bigPicture.querySelector('.likes-count').textContent =
        getData()[index].likes;
      bigPicture.querySelector('.comments-count').textContent =
        getData()[index].comments.length;
      socialComments.appendChild(creatingCommentList(index));
      bigPicture.querySelector('.social__caption').textContent =
        getData()[index].description;
      bigPicture.classList.remove('hidden');
      bigPicture
        .querySelector('.social__comment-count')
        .classList.add('hidden');
      bigPicture.querySelector('.comments-loader').classList.add('hidden');
      scroll.classList.add('modal-open');
    });

    bigPictureCancel.addEventListener('click', () => {
      bigPicture.classList.add('hidden');
      scroll.classList.remove('modal-open');
    });

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        bigPicture.classList.add('hidden');
        scroll.classList.remove('modal-open');
      }
    });
  });
}

export { getFullImg };
