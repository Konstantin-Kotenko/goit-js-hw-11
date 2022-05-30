import { searchImages, fetchImgParams } from '../apis/getImages';
import { renderGallery } from './renderGallery';

export const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && fetchImgParams.q !== '') {
      fetchImgParams.page += 1;
      searchImages(fetchImgParams).then(renderGallery);
    }
  });
};

export const observer = new IntersectionObserver(onEntry, {
  rootMargin: '100px',
});
