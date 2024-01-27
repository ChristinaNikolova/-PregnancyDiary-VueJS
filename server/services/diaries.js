const Diary = require("../models/Diary");
const { errors } = require("../utils/constants/global");
const { compareDate } = require("../utils/parser");

async function create(positiveTestDate, dueDate, gender, userId) {
  const validDates = compareDate(positiveTestDate, dueDate);
  if (!validDates) {
    throw new Error(errors.INVALID_DATE);
  }
  const diary = new Diary({
    positiveTestDate,
    dueDate,
    gender,
    creator: userId,
  });
  await diary.save();
  return diary;
}

module.exports = {
  create,
};
