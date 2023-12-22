const mongoose = require("mongoose");
const { messages, errors, important } = require("../utils/constants/global");
require("../models/Article");
require("../models/Baby");
require("../models/Category");
require("../models/Comment");
require("../models/TokenBlacklist");
require("../models/Diary");
require("../models/Moment");
require("../models/User");
require("../models/Week");

module.exports = async (app) => {
  try {
    await mongoose.connect(important.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(messages.DATABASE_CONNECTED);

    mongoose.connection.on("error", (err) => {
      console.error(errors.DATABASE);
      console.error(err);
    });
  } catch (err) {
    console.error(errors.DATABASE_CONNECTION);
    process.exit(1);
  }
};
