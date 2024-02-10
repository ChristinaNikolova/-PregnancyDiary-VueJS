export const global = {
  TITLE(min, max) {
    return `Title should be between ${min} and ${max} characters long`;
  },
  DESC(min, max) {
    return `Description should be between ${min} and ${max} characters long`;
  },
  NAME(min, max) {
    return `Name should be between ${min} and ${max} characters long`;
  },
  CONTENT(min, max) {
    return `Content should be between ${min} and ${max} characters long`;
  },
  DATE: 'Date should be in format DD.MM.YYYY',
  REQUIRED: 'Field is required',
  URL: 'Invalid URL',
  DEFAULT: 'Error',
};

export const auth = {
  EMAIL: 'Invalid email',
  PASSWORD(min, max) {
    return `Password should be between ${min} and ${max} characters long`;
  },
  REPEAT_PASSWORD: 'Password und repeat password are not equal',
};

export const baby = {
  WEIGHT: 'Weight should be a positive number',
  HEIGHT: 'Height should be a positive number',
};
