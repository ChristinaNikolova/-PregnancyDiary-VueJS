const Week = require("../models/Week");
const { weekDetailsViewModel } = require("../utils/mapper/week");

async function getById(id, hasToMap = false) {
  // todo populate moments
  if (hasToMap) {
    return weekDetailsViewModel(await Week.findById(id).populate("moments"));
  }
  return await Week.findById(id);
}

module.exports = {
  getById,
};
