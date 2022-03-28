
import { getData } from './data.js';
import { renderImg } from './thumbnailRendering.js';
import{clickAddImg} from './formWorcks.js';
const data = getData();
renderImg(data);
clickAddImg();
