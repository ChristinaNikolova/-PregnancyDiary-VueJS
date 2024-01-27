const Diary = require("../models/Diary");

async function create(positiveTestDate, dueDate, gender, userId) {
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
