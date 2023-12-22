const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");
const { week } = require("../utils/constants/model");

const weekSchema = new Schema({
  number: {
    type: Number,
    required: [true, "Week is required"],
    min: [week.WEEK_MIN, "Week should be a number between 0 and 45"],
    max: [week.WEEK_MAX, "Week should be a number between 0 and 45"],
  },
  mood: {
    type: String,
    required: [true, "Mood is required"],
    enum: ["happy", "sad", "angry", "melancholic", "surprised"],
  },
  myWeight: {
    type: Number,
  },
  myBellySize: {
    type: Number,
  },
  babyWeight: {
    type: Number,
  },
  babyHeight: {
    type: Number,
  },
  moments: {
    type: [ObjectId],
    ref: "Moment",
    default: [],
  },
});

const Week = model("Week", weekSchema);
module.exports = Week;
