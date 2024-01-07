const { errors } = require("./constants/global");

function mapErrors(err) {
  if (Array.isArray(err)) {
    return err;
  } else if (err.name == "ValidationError") {
    return Object.values(err.errors).map((e) => ({ msg: e.message }));
  } else if (typeof err.message == "string") {
    return [{ msg: err.message }];
  } else {
    return [{ msg: errors.REQUEST }];
  }
}

function formatCreatedAt(createdAt) {
  return (
    monthNames[createdAt.getMonth() + 1] +
    " " +
    createdAt.getDate() +
    ", " +
    createdAt.getFullYear()
  );
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

module.exports = {
  mapErrors,
  formatCreatedAt,
};
