function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function checkStringLength(string, length) {
  return string.length <= length;
}
checkStringLength();

const NAMES = [
  'Атос',
  'Хуан Себастьян',
  'Портос',
  'Арамис',
  'Д`Артаньян',

];
const MESSAGES=[
  ' Всё отлично!',
  ' В целом всё неплохо. Но не всё.',
  ' Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  ' Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];
const DESCRIPTION = 'на отдыхе';

const getData = () => {
  const data=[];
  for(let i=1;i<=25;i++){
    data.push({
      id: i,
      url:`photos/${i}.jpg`,
      description: DESCRIPTION ,
      likes: getRandomPositiveInteger(15, 200),
      comments:[
        {
          id:getRandomPositiveInteger(1,100),
          avtar:`img/avatar-${getRandomPositiveInteger(1,6)}.svg`,
          message:MESSAGES[getRandomPositiveInteger(0,MESSAGES.length -1)] ,
          name:NAMES[getRandomPositiveInteger(0,4)]
        }
      ],
    });
  }
  return data;

};
getData();

