const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
getRandomNumber();

const getStringLength = (checkString, maxLength) => {
  const yes = true;
  const no = false;
  return checkString.length <= maxLength ? yes : no;
};

getStringLength();

