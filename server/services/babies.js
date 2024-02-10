const Baby = require("../models/Baby");
const Diary = require("../models/Diary");

async function create(
  diaryId,
  name,
  gender,
  birthDate,
  birthTime,
  height,
  weight,
  picture
) {
  const baby = new Baby({
    name,
    gender,
    birthDate,
    birthTime,
    height,
    weight,
    picture,
  });

  const result = await baby.save();
  const diary = await Diary.findById(diaryId);
  diary.baby = result._id;
  diary.isBabyBorn = true;
  await diary.save();
  return result;
}

module.exports = {
  create,
};
