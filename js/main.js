import { renderKekstaPosts } from './render.js';
import './forms.js';
import './photo_filter.js';
import './uploader.js';
import { getData } from './api.js';
import { setFiltersClick } from './render.js';

getData((kekstaposts) => { renderKekstaPosts(kekstaposts);setFiltersClick(kekstaposts);});

