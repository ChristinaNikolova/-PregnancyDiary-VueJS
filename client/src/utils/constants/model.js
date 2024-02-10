export const article = {
  TITLE_MIN_LEN: 5,
  TITLE_MAX_LEN: 100,
  CONTENT_MIN_LEN: 100,
  CONTENT_MAX_LEN: 3000,
};

export const auth = {
  NAME_MIN_LEN: 1,
  NAME_MAX_LEN: 50,
  PASSWORD_MIN_LEN: 6,
  PASSWORD_MAX_LEN: 50,
};

export const baby = {
  NAME_MIN_LEN: 1,
  NAME_MAX_LEN: 100,
  HEIGHT_MIN: 0,
  WEIGHT_MIN: 0,
};

export const category = {
  NAME_MIN_LEN: 3,
  NAME_MAX_LEN: 30,
};

export const comment = {
  CONTENT_MIN_LEN: 10,
  CONTENT_MAX_LEN: 1000,
};

export const diary = {
  TITLE_MIN_LEN: 5,
  TITLE_MAX_LEN: 100,
  DESC_MIN_LEN: 10,
  DESC_MAX_LEN: 1000,
};

export const moment = {
  TITLE_MIN_LEN: 3,
  TITLE_MAX_LEN: 100,
  CONTENT_MIN_LEN: 10,
  CONTENT_MAX_LEN: 1000,
};

export const date = {
  DATE_REGEX: /^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)[0-9]{2}$/g,
};
