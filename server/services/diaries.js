const Diary = require("../models/Diary");
const {
  Types: { ObjectId },
} = require("mongoose");
const { errors } = require("../utils/constants/global");
const { compareDate } = require("../utils/parser");

async function create(
  title,
  description,
  positiveTestDate,
  dueDate,
  gender,
  userId
) {
  const validDates = compareDate(positiveTestDate, dueDate);
  if (!validDates) {
    throw new Error(errors.INVALID_DATE);
  }
  const diary = new Diary({
    title,
    description,
    positiveTestDate,
    dueDate,
    gender,
    creator: userId,
  });
  await diary.save();
  return diary;
}

async function all(userId) {
  return await Diary.find({ creator: new ObjectId(userId) });
}

module.exports = {
  create,
  all,
};
