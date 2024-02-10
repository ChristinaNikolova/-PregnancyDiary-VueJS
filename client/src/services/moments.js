import { httpMethods } from '../utils/constants/global';
import { api } from './api';
import { requester } from './requester';

function create(weekId, date, title, content) {
  return requester(api.moments, httpMethods.POST, { weekId, date, title, content })
    .then(res => res.json())
    .catch(err => console.error(err));
}

function deleteById(id) {
  return requester(`${api.moments}/${id}`, httpMethods.DELETE)
    .then((res) => {
      if (res.status !== 204) {
        return res.json();
      }
    })
    .catch(err => console.error(err));
};

export default {
  create,
  deleteById,
};
