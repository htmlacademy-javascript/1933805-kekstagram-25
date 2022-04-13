import { getRandomIntegerNumber, isEscapeKey } from './util.js';
import { COMMENTS_TO_SHOW, FIRSTABLE_SHOWN_COMMENTS, NUMBER_OF_RANDOM_POSTS, UserFilter } from './data.js';
import { debounce } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImageElement = bigPicture.querySelector('.big-picture__img img');
const bigPictureNumberOfLikesElement = bigPicture.querySelector('.likes-count');
const bigPictureNumberOfCommentsElement = bigPicture.querySelector('.comments-count');
const bigPictureCommentsElement = bigPicture.querySelector('.social__comments');
const bigPictureDescriptionElement = bigPicture.querySelector('.social__caption');
const bigPictureCancelElement = bigPicture.querySelector('.big-picture__cancel');
const bigPictureCommentsLoaderElement = bigPicture.querySelector('.social__comments-loader');
const bigPictureShownCommentsCountElement = bigPicture.querySelector('.comments-shown');

const pictureTemplate = document.querySelector('#picture').content;
const sortingFilter = document.querySelectorAll('.img-filters__button');

const onCloseBtnClick = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onEscapeKeydown=(evt)=> {
  if (isEscapeKey(evt)) {
    onCloseBtnClick();
    document.removeEventListener('keydown', onEscapeKeydown);
  }
};

const showCommentLoader = () => {
  bigPictureCommentsLoaderElement.classList.remove('hidden');
};

const showBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureCancelElement.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onEscapeKeydown);
  showCommentLoader();
};

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
  const commentsToClear = bigPictureCommentsElement.querySelectorAll('li');
  commentsToClear.forEach((comment) => comment.remove());
};
const renderBigPicture = (postData) => {
  const allCommentsOfPost = document.createDocumentFragment();
  bigPictureImageElement.src = postData.url;
  bigPictureNumberOfLikesElement.textContent = postData.likes;
  bigPictureNumberOfCommentsElement.textContent = postData.comments.length;
  bigPictureDescriptionElement.textContent = postData.description;
  postData.comments.forEach((commentItem, i) => {
    const comment = renderComment(commentItem);
    if (i > FIRSTABLE_SHOWN_COMMENTS - 1) {
      comment.classList.add('hidden');
    }
    allCommentsOfPost.append(comment);
  });
  clearComments();
  if (postData.comments.length > FIRSTABLE_SHOWN_COMMENTS - 1) {
    bigPictureShownCommentsCountElement.textContent = FIRSTABLE_SHOWN_COMMENTS;
  } else {
    bigPictureShownCommentsCountElement.textContent = postData.comments.length;
    bigPictureCommentsLoaderElement.classList.add('hidden');
  }

  bigPictureCommentsElement.append(allCommentsOfPost);
};

const hideCommentLoader = () => {
  bigPictureCommentsLoaderElement.classList.add('hidden');
};

const onLoadMoreClick = () => {
  let shownComments = Number(bigPicture.querySelector('.comments-shown').textContent);
  const allComments = Number(bigPicture.querySelector('.comments-count').textContent);
  const comments = bigPictureCommentsElement.querySelectorAll('.social__comment');
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
  bigPictureShownCommentsCountElement.textContent = String(shownComments);
};
bigPictureCommentsLoaderElement.addEventListener('click', onLoadMoreClick);

const createPost = (postData) => {
  const pictureTemplateRender = pictureTemplate.cloneNode(true);
  const nodeImage = pictureTemplateRender.querySelector('.picture__img');
  const formLikes = pictureTemplateRender.querySelector('.picture__likes');
  const postComments = pictureTemplateRender.querySelector('.picture__comments');
  const postLink = pictureTemplateRender.querySelector('a');
  nodeImage.src = postData.url;
  formLikes.textContent = postData.likes;
  postComments.textContent = postData.comments.length;
  postLink.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture();
    renderBigPicture(postData);
  });
  return pictureTemplateRender;
};
const renderPosts = (postData) => {
  const postsContainer = document.querySelector('.pictures');
  const allPosts = document.createDocumentFragment();
  postData.forEach((post) => {
    allPosts.append(createPost(post));
  });

  postsContainer.append(allPosts);
};
const randomSorting = (indexA, indexB) => {
  const newIndexA = getRandomIntegerNumber() + indexA.id;
  const newIndexB = getRandomIntegerNumber() + indexB.id;
  return newIndexA - newIndexB;
};

const sortByComments = (postA, postB) => postB.comments.length - postA.comments.length;

const clearPosts = () => {
  const postData = document.querySelectorAll('.picture');
  postData.forEach((post) => post.remove());
};

const reRenderPosts = (postData, option) => {
  clearPosts();
  switch (true) {
    case (option === UserFilter.RANDOM):
      renderPosts(postData
        .slice(0, NUMBER_OF_RANDOM_POSTS)
        .sort(randomSorting));
      break;
    case (option === UserFilter.DISCUSSED):
      renderPosts(postData
        .slice()
        .sort(sortByComments));
      break;
    case (option === UserFilter.DEFAULT):
      renderPosts(postData);
      break;
  }
};
const makeFilterVissuallyActive = (clickedFilter) => {
  sortingFilter.forEach((filter) => filter.classList.remove('img-filters__button--active'));
  clickedFilter.classList.add('img-filters__button--active');
};

const setFiltersClick = (postData) => {
  sortingFilter.forEach((filter) => {
    filter.addEventListener('click', debounce((evt) => {
      reRenderPosts(postData, evt.target.id);
    }));
    filter.addEventListener('click', (evt) => {
      makeFilterVissuallyActive(evt.target);
    });
  });
};

export { renderPosts, renderBigPicture, setFiltersClick };
