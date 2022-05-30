import './sass/main.scss';
import Notiflix from 'notiflix';
import { observer } from './js/observ';
import { refs } from './js/refs';
import { renderGallery } from './js/renderGallery';
import { resetGallery } from './js/resetGallery';
import { fetchImgParams, searchImages } from './apis/getImages';

const onSearchImages = e => {
  observer.disconnect();
  e.preventDefault();
  fetchImgParams.q = e.currentTarget.elements[0].value;
  fetchImgParams.page = 1;
  resetGallery();
  if (fetchImgParams.q === '') {
    return Notiflix.Notify.info('Please enter name your search.');
  }
  searchImages(fetchImgParams).then(data => {
    renderGallery(data);
    observer.observe(refs.sentinel);
  });
};

refs.form.addEventListener('submit', onSearchImages);
