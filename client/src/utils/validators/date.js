import { date } from '../constants/model';

function validDate(value) {
  return value.match(date.DATE_REGEX);
};

export default {
  validDate,
};
