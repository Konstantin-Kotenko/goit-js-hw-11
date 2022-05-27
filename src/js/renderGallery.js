import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './refs';
import template from '../template/template.hbs';

let lightbox = new SimpleLightbox('.gallery a', { captionsDelay: '250ms' });

export const renderGallery = hits => {
  refs.gallery.insertAdjacentHTML('beforeend', template(hits));
  lightbox.refresh();
};
