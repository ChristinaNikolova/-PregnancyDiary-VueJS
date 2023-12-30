import { httpMethods } from '../utils/constants/global';
import { api } from './api';
import { requester } from './requester';

function create(name, picture) {
  return requester(api.adminCategory, httpMethods.POST, { name, picture })
    .then(res => res.json())
    .catch(err => console.error(err));
};

function all() {
  return fetch(api.categories, {
    method: httpMethods.GET,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(err => console.error(err));
};

function deleteById(id) {
  return requester(`${api.adminCategory}/${id}`, httpMethods.DELETE)
    .then((res) => {
      if (res.status !== 204) {
        return res.json();
      }
    })
    .catch(err => console.error(err));
};

function getById(id) {
  return requester(`${api.adminCategory}/${id}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
};

export default {
  create,
  all,
  deleteById,
  getById,
};
