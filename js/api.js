import { getDataError } from './util.js';
import { UPLOAD_URL, DOWNLOAD_URL } from './data.js';
import { showImageFilters } from './util.js';

const getData = (onSuccess) => {
  fetch(DOWNLOAD_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        getDataError('Что-то не так, так ответил сервер');
      }
    })
    .catch(() => {
      getDataError('Что-то не так, сервер ничего не отвечает');
    })
    .then((data) => {
      onSuccess(data);
      showImageFilters();
    });

};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    UPLOAD_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};
export {
  getData,
  sendData
};
