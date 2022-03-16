// import { getData } from './data.js';
// import { renderImg } from './thumbnailRendering.js';
// renderImg();

const bigPicture = document.querySelector('.big-picture');
const scroll = document.querySelector('body');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialComments = document.querySelector('.social__comments');

const closeImg = () => {
  bigPicture.classList.add('hidden');
  scroll.classList.remove('modal-open');
};

const onEscCloseBigImg = () => {
  closeImg();
  scroll.removeEventListener('keydown', onEscCloseBigImg);
};

const onCancelCloseBigImg = () => {
  closeImg();
  scroll.removeEventListener('keydown', onEscCloseBigImg);
  bigPictureCancel.removeEventListener('click', onCancelCloseBigImg);
};

const openImg = (dataImg) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = dataImg.url;
  bigPicture.querySelector('.likes-count').textContent = dataImg.likes;
  bigPicture.querySelector('.comments-count').textContent = dataImg.comments.length;
  socialComments.appendChild(creatingCommentList(dataImg));
  bigPicture.querySelector('.social__caption').textContent = dataImg.description;
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  scroll.classList.add('modal-open');
  scroll.addEventListener('keydown', onEscCloseBigImg);
  bigPictureCancel.addEventListener('click', onCancelCloseBigImg);
};

function creatingCommentList(index) {
  const listComment = document.createElement('li');
  listComment.classList.add('social__comment');
  const picture = document.createElement('img');
  picture.classList.add('social__picture');
  picture.src = index.comments[0].avatar;
  picture.alt = index.comments[0].name;
  picture.width = 35;
  picture.height = 35;
  listComment.appendChild(picture);
  const socialText = document.createElement('p');
  socialText.classList.add('social__text');
  socialText.textContent = index.comments[0].message;
  listComment.appendChild(socialText);
  return listComment;
}

export { openImg };
