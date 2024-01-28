const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");
const { week } = require("../utils/constants/model");

const weekSchema = new Schema({
  title: {
    type: String,
  },
  subTitle: {
    type: String,
  },
  text: {
    type: String,
  },
  trimester: {
    type: String,
    enum: ["first", "second", "third"],
  },
  mood: {
    type: String,
    enum: [
      "happy",
      "sad",
      "angry",
      "melancholic",
      "surprised",
      "excited",
      "optimistic",
      "sentimental",
      "cheerful",
      "hopeful",
      "hopeless",
      "pessimistic",
      "romantic",
      "calm",
      "emotional",
      "safe",
      "warm",
      "unconfortable",
      "incertain",
      "scared",
      "refreshing",
      "relaxed",
      "suspicious",
      "terrified",
      "powerful",
      "playful",
      "peaceful",
      "panicked",
      "nostalgic",
      "lonely",
      "isolated",
      "grateful",
      "dreamy",
      "depressed",
      "confortable",
    ],
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
