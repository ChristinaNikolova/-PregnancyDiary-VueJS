import { httpMethods } from '../utils/constants/global';
import { api } from './api';
import { requester } from './requester';

function getById(id) {
  return requester(`${api.weeks}/${id}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
};

export default {
  getById,
};
