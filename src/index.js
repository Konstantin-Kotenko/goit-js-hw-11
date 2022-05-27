import './sass/main.scss';
import axios from 'axios';
import Notiflix from 'notiflix';
import { refs } from './js/refs';
import { renderGallery } from './js/renderGallery';
import { resetGallery } from './js/resetGallery';

let page = 1;
let limit = 40;
let totalPages = 500 / limit;

let name = '';

const fetchImagesGallery = async name => {
  const params = new URLSearchParams({
    per_page: limit,
    page: page,
  });

  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=27599331-8560efaac28dff02d691a7952&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&${params}`,
    );
    if (response.data.hits == 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    } else if (page === 1 && response.data.hits.length !== 0) {
      Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    }
    totalPages = response.data.totalHits / limit;
    return response.data.hits;
  } catch (error) {
    console.error(error);
  }
};

const onSearchImages = e => {
  e.preventDefault();
  name = e.currentTarget.elements[0].value;
  if (name === '') {
    Notiflix.Notify.info('Please enter name your search.');
    resetGallery();
    return;
  }
  resetGallery();

  fetchImagesGallery(name).then(renderGallery);
};

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && name !== '') {
      page += 1;
      fetchImagesGallery(name).then(renderGallery);
      if (page > totalPages) {
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
      }
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '100px',
});

observer.observe(refs.div);
refs.form.addEventListener('submit', onSearchImages);
