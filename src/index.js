import './sass/main.scss';
import Notiflix from 'notiflix';
import { refs } from './js/refs';
import { renderGallery } from './js/renderGallery';
import { resetGallery } from './js/resetGallery';
import { fetchImgParams, searchImages } from './apis/getImages';

const onSearchImages = e => {
  e.preventDefault();
  fetchImgParams.q = e.currentTarget.elements[0].value;
  fetchImgParams.page = 1;
  resetGallery();
  if (fetchImgParams.q === '') {
    return Notiflix.Notify.info('Please enter name your search.');
  }
  searchImages(fetchImgParams).then(renderGallery);
};

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && fetchImgParams.q !== '') {
      fetchImgParams.page += 1;
      searchImages(fetchImgParams).then(renderGallery);
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '100px',
});

observer.observe(refs.sentinel);
refs.form.addEventListener('submit', onSearchImages);
