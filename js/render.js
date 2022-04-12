import { getRandomIntegerNumber, isEscapeKey } from './util.js';
import { COMMENTS_TO_SHOW, FIRSTABLE_SHOWN_COMMENTS, NUMBER_OF_RANDOM_POSTS, UserFilter } from './data.js';
import { debounce } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureNumberOfLikes = bigPicture.querySelector('.likes-count');
const bigPictureNumberOfComments = bigPicture.querySelector('.comments-count');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const pictureTemplate = document.querySelector('#picture').content;
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

function onEscapeKeydown(evt) {
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
const renderbigPicture = (postData) => {
  const allCommentsOfPost = document.createDocumentFragment();
  bigPictureImage.src = postData.url;
  bigPictureNumberOfLikes.textContent = postData.likes;
  bigPictureNumberOfComments.textContent = postData.comments.length;
  bigPictureDescription.textContent = postData.description;
  postData.comments.forEach((commentItem, i) => {
    const comment = renderComment(commentItem);
    if (i > FIRSTABLE_SHOWN_COMMENTS - 1) {
      comment.classList.add('hidden');
    }
    allCommentsOfPost.append(comment);
  });
  clearComments();
  if (postData.comments.length > FIRSTABLE_SHOWN_COMMENTS - 1) {
    shownCommentsCount.textContent = FIRSTABLE_SHOWN_COMMENTS;
  } else {
    shownCommentsCount.textContent = postData.comments.length;
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
    renderbigPicture(postData);
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

export { renderPosts, renderbigPicture, setFiltersClick };
