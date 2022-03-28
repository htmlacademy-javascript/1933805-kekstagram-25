
import { getRandomPositiveInteger } from './util.js';
import { NAMES, MESSAGES, DESCRIPTION } from './constants.js';

const getData = () => {
  const data = [];
  for (let i = 1; i <= 25; i++) {
    data.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: DESCRIPTION,
      likes: getRandomPositiveInteger(15, 200),
      comments: [
        {
          id: getRandomPositiveInteger(1, 100),
          avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
          message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
          name: NAMES[getRandomPositiveInteger(0, 4)]
        },
        {
          id: getRandomPositiveInteger(1, 100),
          avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
          message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
          name: NAMES[getRandomPositiveInteger(0, 4)]
        },
        {
          id: getRandomPositiveInteger(1, 100),
          avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
          message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
          name: NAMES[getRandomPositiveInteger(0, 4)]
        },
        {
          id: getRandomPositiveInteger(1, 100),
          avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
          message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
          name: NAMES[getRandomPositiveInteger(0, 4)]
        },
        {
          id: getRandomPositiveInteger(1, 100),
          avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
          message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
          name: NAMES[getRandomPositiveInteger(0, 4)]
        },
        {
          id: getRandomPositiveInteger(1, 100),
          avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
          message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
          name: NAMES[getRandomPositiveInteger(0, 4)]
        },
        {
          id: getRandomPositiveInteger(1, 100),
          avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
          message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
          name: NAMES[getRandomPositiveInteger(0, 4)]
        },
        {
          id: getRandomPositiveInteger(1, 100),
          avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
          message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
          name: NAMES[getRandomPositiveInteger(0, 4)]
        },
        {
          id: getRandomPositiveInteger(1, 100),
          avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
          message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
          name: NAMES[getRandomPositiveInteger(0, 4)]
        },
        {
          id: getRandomPositiveInteger(1, 100),
          avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
          message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
          name: NAMES[getRandomPositiveInteger(0, 4)]
        },
        {
          id: getRandomPositiveInteger(1, 100),
          avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
          message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
          name: NAMES[getRandomPositiveInteger(0, 4)]
        },
        {
          id: getRandomPositiveInteger(1, 100),
          avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
          message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
          name: NAMES[getRandomPositiveInteger(0, 4)]
        },
        {
          id: getRandomPositiveInteger(1, 100),
          avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
          message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length - 1)],
          name: NAMES[getRandomPositiveInteger(0, 4)]
        }
      ],
    });
  }
  return data;
};
export { getData };
