export const global = {
  TITLE(min, max) {
    return `Title should be between ${min} and ${max} characters long`;
  },
  //   DESC(min, max) {
  //     return `Description should be between ${min} and ${max} characters long`;
  //   },
  NAME(min, max) {
    return `Name should be between ${min} and ${max} characters long`;
  },
  CONTENT(min, max) {
    return `Content should be between ${min} and ${max} characters long`;
  },
  REQUIRED: 'Field is required',
  URL: 'Invalid URL',
  DEFAULT: 'Error',
};

export const article = {
  CATEGORY: 'Please select category',
};

export const auth = {
  EMAIL: 'Invalid email',
  PASSWORD(min, max) {
    return `Password should be between ${min} and ${max} characters long`;
  },
  REPEAT_PASSWORD: 'Password und repeat password are not equal',
};
