const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");
const { date } = require("../utils/constants/global");

const diarySchema = new Schema({
  positiveTestDate: {
    type: String,
    required: [true, "Date is required"],
    match: [date.DATE_PATTERN, "Date date should be in format DD.MM.YYYY"],
  },
  dueDate: {
    type: String,
    required: [true, "Date is required"],
    match: [date.DATE_PATTERN, "Date should be in format DD.MM.YYYY"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ["male", "female", "i don't know yet", "surprice"],
  },
  isBabyBorn: {
    type: Boolean,
    default: false,
  },
  baby: {
    type: ObjectId,
    ref: "Baby",
  },
  creator: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  week: {
    type: [ObjectId],
    ref: "Week",
    default: [],
  },
});

const Diary = model("Diary", diarySchema);
module.exports = Diary;
