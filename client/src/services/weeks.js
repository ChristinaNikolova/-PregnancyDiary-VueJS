import { httpMethods } from '../utils/constants/global';
import { api } from './api';
import { requester } from './requester';

function getById(id) {
  return requester(`${api.weeks}/${id}`, httpMethods.GET)
    .then(res => res.json())
    .catch(err => console.error(err));
};

function update(id, mood, myWeight, myBellySize, babyWeight, babyHeight) {
  console.log('mood', mood);
  return requester(`${api.weeks}/${id}`, httpMethods.PUT, { mood, myWeight, myBellySize, babyWeight, babyHeight })
    .then(res => res.json())
    .catch(err => console.error(err));
};

export default {
  getById,
  update,
};
