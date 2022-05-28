import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27599331-8560efaac28dff02d691a7952';

export const fetchImgParams = {
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
  page: 1,
};

const customAxios = axios.create({ baseURL: `${BASE_URL}?key=${API_KEY}` });

export const searchImages = async params => {
  try {
    const { data } = await customAxios.get('', { params });
    return data.hits;
  } catch {
    console.log('error');
  }
};

//       if (data.data.hits == 0) {
//         Notiflix.Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.',
//         );
//       } else if (page === 1 && data.hits.length !== 0) {
//         Notiflix.Notify.success(`Hooray! We found ${data.total} images.`);
//       }
//     });
