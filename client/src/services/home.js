import { httpMethods } from '../utils/constants/global';
import { api } from './api';

function getLastThreeArticles() {
  return fetch(`${api.home}/articles`, {
    method: httpMethods.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(err => console.error(err));
};

export default {
  getLastThreeArticles,
};
