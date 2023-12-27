import { httpMethods } from '../utils/constants/global';
import { api } from './api';

// import { requester } from './requester';

function all(currentPage = 1, query = '') {
  return fetch(`${api.articles}/${currentPage}/${query}`, {
    method: httpMethods.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(err => console.error(err));
}

export default {
  all,
};
