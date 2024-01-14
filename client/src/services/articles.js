import { httpMethods, search } from '../utils/constants/global';
import { api } from './api';
import { requester } from './requester';

function all(currentPage = 1, query = search.NO_SEARCH) {
  return fetch(`${api.articles}/${currentPage}/${query}`, {
    method: httpMethods.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(err => console.error(err));
}

function allAdmin() {
  return requester(`${api.adminArticle}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
}

function getById(id) {
  return requester(`${api.articles}/${id}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
};

function getByIdAdmin(id) {
  return requester(`${api.adminArticle}/${id}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
};

function create(title, content, picture, category) {
  return requester(api.adminArticle, httpMethods.POST, { title, content, picture, category })
    .then(res => res.json())
    .catch(err => console.error(err));
}

function deleteById(id) {
  return requester(`${api.adminArticle}/${id}`, httpMethods.DELETE)
    .then((res) => {
      if (res.status !== 204) {
        return res.json();
      }
    })
    .catch(err => console.error(err));
};

function update(id, title, content, picture, category) {
  return requester(`${api.adminArticle}/${id}`, httpMethods.PUT, { title, content, picture, category })
    .then(res => res.json())
    .catch(err => console.error(err));
};

function like(id) {
  return requester(`${api.articles}/${id}`, httpMethods.POST)
    .then(res => res.json())
    .catch(err => console.error(err));
}

export default {
  all,
  allAdmin,
  create,
  deleteById,
  getById,
  getByIdAdmin,
  update,
  like,
};
