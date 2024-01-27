const important = {
  CONNECTION_STRING: "mongodb://localhost:27017/pregnancydiary",
  SECRET: "my-very-secret",
};

const pagination = {
  ARTICLES_PER_PAGE: 6,
};

const emails = {
  ADMIN: "admin@pregnancy-diary.com",
};

const messages = {
  REST_STARTED: "REST service started",
  REST_OPERATED: "REST service operational",
  DATABASE_CONNECTED: "Database connected",
};

// todo check this messages
const errors = {
  REQUEST: "Request error",
  INVALID_URL: "Invalid url",
  INVALID_EMAIL: "Invalid email",
  PASSWORD(min, max) {
    return `Password should be between ${min} and ${max} characters long`;
  },
  //   SELECT_CATEGORY: "Please select category",
  NAME_TAKEN: "Name is already taken",
  TITEL_TAKEN: "Title is already taken",
  EMAIL_TAKEN: "Email is already taken",
  LOGIN: "Incorrect email or password",
  NOT_LOGGED_IN: "Please log in",
  ALREADY_LOGGED_IN: "You are already logged in",
  TOKEN_EXIST: "Token is blacklisted",
  TOKEN_INVALID: "Invalid authorization token",
  DATABASE: "Database error",
  DATABASE_CONNECTION: "Error connecting to database",
};

const date = {
  DATE_PATTERN:
    /^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)[0-9]{2}$/,
};

module.exports = {
  important,
  pagination,
  emails,
  messages,
  errors,
  date,
};
