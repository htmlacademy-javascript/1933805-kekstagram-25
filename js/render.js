import {
  getRandomIntegerNumber,
  isEscapeKey } from './util.js';
import {
  COMMENTS_TO_SHOW,
  FIRSTABLE_SHOWN_COMMENTS,
  NUMBER_OF_RANDOM_POSTS,
  UserFilterProps
} from './data.js';
import { debounce } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureNumberOfLikes = bigPicture.querySelector('.likes-count');
const bigPictureNumberOfComments = bigPicture.querySelector('.comments-count');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const kekstaPostTemplate = document.querySelector('#picture').content;
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
const shownCommentsCount = bigPicture.querySelector('.comments-shown');
const sortingFilter = document.querySelectorAll('.img-filters__button');

const onCloseBtnClick = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeKeydown);
};

const showCommentLoader = () => {
  commentsLoader.classList.remove('hidden');
};

const showBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureCancel.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onEscapeKeydown);
  showCommentLoader();
};

function onEscapeKeydown (evt) {
  if (isEscapeKey(evt)) {
    onCloseBtnClick();
  }
}

const renderComment = (comment) => {
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');
  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.setAttribute('src', comment.avatar);
  commentAvatar.setAttribute('alt', comment.name);
  commentAvatar.style.width = '35px';
  commentAvatar.style.height = '35px';
  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;
  commentItem.append(commentAvatar);
  commentItem.append(commentText);
  return commentItem;
};
const clearComments = () => {
  const commentsToClear = bigPictureComments.querySelectorAll('li');
  commentsToClear.forEach((comment) => comment.remove());
};
const renderbigPicture = (kekstaPost) => {
  const allCommentsOfPost = document.createDocumentFragment();
  bigPictureImage.src = kekstaPost.url;
  bigPictureNumberOfLikes.textContent = kekstaPost.likes;
  bigPictureNumberOfComments.textContent = kekstaPost.comments.length;
  bigPictureDescription.textContent = kekstaPost.description;
  kekstaPost.comments.forEach((commentItem, i) => {
    const comment = renderComment(commentItem);
    if (i > FIRSTABLE_SHOWN_COMMENTS - 1) {
      comment.classList.add('hidden');
    }
    allCommentsOfPost.append(comment);
  });
  clearComments();
  if (kekstaPost.comments.length > FIRSTABLE_SHOWN_COMMENTS - 1) {
    shownCommentsCount.textContent = FIRSTABLE_SHOWN_COMMENTS;
  } else {
    shownCommentsCount.textContent = kekstaPost.comments.length;
    commentsLoader.classList.add('hidden');
  }

  bigPictureComments.append(allCommentsOfPost);
};

const hideCommentLoader = () => {
  commentsLoader.classList.add('hidden');
};

const onLoadMoreClick = () => {
  let shownComments = Number(bigPicture.querySelector('.comments-shown').textContent);
  const allComments = Number(bigPicture.querySelector('.comments-count').textContent);
  const comments = bigPictureComments.querySelectorAll('.social__comment');
  if (allComments - shownComments > COMMENTS_TO_SHOW) {
    shownComments += COMMENTS_TO_SHOW;
    for (let i = 0; i < shownComments; i++) {
      comments[i].classList.remove('hidden');
    }
  } else {
    for (let i = 0; i < allComments; i++) {
      comments[i].classList.remove('hidden');
      shownComments = allComments;
      hideCommentLoader();
    }
  }
  shownCommentsCount.textContent = shownComments;
};
commentsLoader.addEventListener('click', onLoadMoreClick);

const createKekstaPost = (kekstaPost) => {
  const kekstaPostToRender = kekstaPostTemplate.cloneNode(true);
  const kekstaPostImage = kekstaPostToRender.querySelector('.picture__img');
  const kekstaPostLikes = kekstaPostToRender.querySelector('.picture__likes');
  const kekstaPostComments = kekstaPostToRender.querySelector('.picture__comments');
  const kekstaPostToRenderLink = kekstaPostToRender.querySelector('a');
  kekstaPostImage.src = kekstaPost.url;
  kekstaPostLikes.textContent = kekstaPost.likes;
  kekstaPostComments.textContent = kekstaPost.comments.length;
  kekstaPostToRenderLink.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture();
    renderbigPicture(kekstaPost);
  });
  return kekstaPostToRender;
};
const renderKekstaPosts = (kekstaPosts) => {
  const postsContainer = document.querySelector('.pictures');
  const allKekstaPosts = document.createDocumentFragment();
  kekstaPosts.forEach((post) => {
    allKekstaPosts.append(createKekstaPost(post));
  });

  postsContainer.append(allKekstaPosts);
};
const randomSorting = (indexA, indexB) => {
  const newIndexA = getRandomIntegerNumber()+indexA.id;
  const newIndexB = getRandomIntegerNumber()+indexB.id;
  return newIndexA - newIndexB;
};

const sortByComments = (postA, postB) => postB.comments.length - postA.comments.length;

const clearKekstaPosts = () => {
  const kekstaPosts = document.querySelectorAll('.picture');
  kekstaPosts.forEach((post) => post.remove());
};

const reRenderKekstaPosts = (kekstaPost, option) => {
  clearKekstaPosts();
  switch(true) {
    case (option === UserFilterProps.RANDOM):
      renderKekstaPosts(kekstaPost
        .slice(0, NUMBER_OF_RANDOM_POSTS)
        .sort(randomSorting));
      break;
    case (option === UserFilterProps.DISCUSSED):
      renderKekstaPosts(kekstaPost
        .slice()
        .sort(sortByComments));
      break;
    case (option === UserFilterProps.DEFAULT):
      renderKekstaPosts(kekstaPost);
      break;
  }
};
const makeFilterVissuallyActive = (clickedFilter) => {
  sortingFilter.forEach((filter) => filter.classList.remove('img-filters__button--active'));
  clickedFilter.classList.add('img-filters__button--active');
};

const setFiltersClick = (kekstaposts) => {
  sortingFilter.forEach((filter) => {
    filter.addEventListener('click', debounce((evt) => {
      reRenderKekstaPosts(kekstaposts, evt.target.id);
    }));
    filter.addEventListener('click', (evt) => {
      makeFilterVissuallyActive(evt.target);
    });
  });
};

export {renderKekstaPosts, renderbigPicture, setFiltersClick};
