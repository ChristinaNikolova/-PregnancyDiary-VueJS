import { diary } from '../constants/model';

function validDate(value) {
  return value.match(diary.DATE_REGEX);
};

export default {
  validDate,
};
