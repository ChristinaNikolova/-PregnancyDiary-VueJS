import { httpMethods } from '../utils/constants/global';
import { api } from './api';
import { requester } from './requester';

function create(title, description, positiveTestDate, dueDate, gender) {
  return requester(api.diaries, httpMethods.POST, { title, description, positiveTestDate, dueDate, gender })
    .then(res => res.json())
    .catch(err => console.error(err));
}

function all() {
  return requester(`${api.diaries}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
};

export default {
  create,
  all,
};