import { httpMethods } from '../utils/constants/global';
import { api } from './api';
import { requester } from './requester';

function create(diaryId, name, gender, birthDate, birthTime, height, weight, picture) {
  return requester(api.babies, httpMethods.POST, { diaryId, name, gender, birthDate, birthTime, height, weight, picture })
    .then(res => res.json())
    .catch(err => console.error(err));
}

function getById(id) {
  return requester(`${api.babies}/${id}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
};

function update(id, name, gender, birthDate, birthTime, height, weight, picture) {
  return requester(`${api.babies}/${id}`, httpMethods.PUT, { name, gender, birthDate, birthTime, height, weight, picture })
    .then(res => res.json())
    .catch(err => console.error(err));
};

export default {
  create,
  getById,
  update,
};
