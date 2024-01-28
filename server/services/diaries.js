const Diary = require("../models/Diary");
const Week = require("../models/Week");
const {
  Types: { ObjectId },
} = require("mongoose");
const { errors } = require("../utils/constants/global");
const { compareDate, getTrimesterName } = require("../utils/parser");
const { diaryListViewModel } = require("../utils/mapper/diary");
const { subTitle, text } = require("../utils/constants/week");

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
  const weeks = await getWeeks();
  const diary = new Diary({
    title,
    description,
    positiveTestDate,
    dueDate,
    gender,
    creator: userId,
    weeks,
  });
  await diary.save();
  return diary;
}

async function all(userId) {
  return (await Diary.find({ creator: new ObjectId(userId) })).map(
    diaryListViewModel
  );
}

async function getWeeks() {
  let weeks = [];
  for (let i = 0; i < 40; i++) {
    const weekNumber = i + 1;
    const weekTitle = weekNumber.toString();
    const week = new Week({
      title: weekTitle,
      subTitle: subTitle[weekTitle],
      text: text[weekTitle],
      trimester: getTrimesterName(weekNumber),
    });
    weeks.push(week);
    await week.save();
  }
  return weeks;
}

module.exports = {
  create,
  all,
};
