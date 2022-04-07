
const getfetchData = (renderFunction) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')

    .then((response) => response.json())
    .then((dataServer) => {
      renderFunction(dataServer);
    });
};


export {getfetchData};
