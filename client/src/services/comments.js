import { httpMethods } from '../utils/constants/global';
import { api } from './api';
import { requester } from './requester';

function all(articleId) {
  return requester(`${api.comments}/${articleId}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
}

function create(content, articleId) {
  return requester(`${api.comments}/${articleId}/`, httpMethods.POST, { content })
    .then(res => res.json())
    .catch(err => console.error(err));
}

function like(id, articleId) {
  return requester(`${api.comments}/${articleId}/${id}`, httpMethods.POST)
    .then(res => res.json())
    .catch(err => console.error(err));
}

function deleteById(id) {
  return requester(`${api.comments}/${id}`, httpMethods.DELETE)
    .then((res) => {
      if (res.status !== 204) {
        return res.json();
      }
    })
    .catch(err => console.error(err));
};

export default {
  all,
  create,
  like,
  deleteById,
};
