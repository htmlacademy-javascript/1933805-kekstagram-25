// import { getData } from './data.js';
// import { renderImg } from './thumbnailRendering.js';
// renderImg();

const bigPicture = document.querySelector('.big-picture');
const scroll = document.querySelector('body');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialComments = document.querySelector('.social__comments');
const socialCommentCount = document.querySelector('.social__comment-count');
const socialCommentsLoader = document.querySelector('.social__comments-loader');
const STEP_COMMENTS = 5;

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
  socialComments.innerHTML = '';
  bigPicture.querySelector('.social__caption').textContent = dataImg.description;
  bigPicture.classList.remove('hidden');
  scroll.classList.add('modal-open');
  scroll.addEventListener('keydown', onEscCloseBigImg);
  bigPictureCancel.addEventListener('click', onCancelCloseBigImg);
  const onShowComment = creatingCommentList(dataImg);
  onShowComment();
  socialCommentsLoader.addEventListener('click', onShowComment);
};

function creatingCommentList(index) {
  let start = 0;
  let end = 5;
  let counter = 0;
  return () => {
    if (index.comments.length < 5) {
      end = index.comments.length;
    }
    for (let i = start; i < end; i++, counter++) {
      const listComment = document.createElement('li');
      listComment.classList.add('social__comment');
      const picture = document.createElement('img');
      picture.classList.add('social__picture');
      picture.src = index.comments[i].avatar;
      picture.alt = index.comments[i].name;
      picture.width = 35;
      picture.height = 35;
      listComment.appendChild(picture);
      socialComments.appendChild(listComment);
      const socialText = document.createElement('p');
      socialText.classList.add('social__text');
      socialText.textContent = index.comments[i].message;
      listComment.appendChild(socialText);
    }
    socialCommentCount.innerHTML = `${end} из <span class="comments-count">${index.comments.length}</span> комментариев`;
    start = end;
    end += STEP_COMMENTS;
    if (end > index.comments.length) {
      end = index.comments.length;
    }
    if (counter === index.comments.length) {
      socialCommentsLoader.classList.add('hidden');
    }
  };
}


export { openImg };

