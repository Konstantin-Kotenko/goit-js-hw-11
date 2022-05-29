import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './refs';
import template from '../template/template.hbs';
import { fetchImgParams } from '../apis/getImages';

let lightbox = new SimpleLightbox('.gallery a', { captionsDelay: '250ms' });

export const renderGallery = data => {
  refs.gallery.insertAdjacentHTML('beforeend', template(data.hits));
  lightbox.refresh();
  if (data.hits.length === 0) {
    Notiflix.Notify.failure('Sorry, we don`t have this data');
  } else if (fetchImgParams.page === 1 && data.hits.length !== 0) {
    Notiflix.Notify.success(`Hooray! We found ${data.total} images.`);
  }
};
