const Category = require("../models/Category");
const { errors } = require("../utils/constants/global");

async function create(name, picture) {
  let category = await getByName(name);
  if (category) {
    throw new Error(errors.NAME_TAKEN);
  }
  category = new Category({
    name,
    picture,
  });

  await category.save();
  return category;
}

async function getByName(name) {
  return await Category.findOne({ name }).collation({
    locale: "en",
    strength: 2,
  });
}

module.exports = {
  create,
};
