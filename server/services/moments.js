const Moment = require("../models/Moment");
const Week = require("../models/Week");

async function create(weekId, date, title, content) {
  const moment = new Moment({
    date,
    title,
    content,
  });
  const result = await moment.save();
  const week = await Week.findById(weekId);
  week.moments.push(result._id);
  await week.save();
  return result;
}

module.exports = {
  create,
};
