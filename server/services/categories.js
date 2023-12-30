const Category = require("../models/Category");
const { errors } = require("../utils/constants/global");
const { categoryListViewModel } = require("../utils/mapper/category");

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

async function getById(id) {
  return Category.findById(id);
}

async function all() {
  return (await Category.find({}).sort({ name: 1 })).map(categoryListViewModel);
}

async function deleteById(id) {
  return Category.findByIdAndDelete(id);
}

async function getByName(name) {
  return await Category.findOne({ name }).collation({
    locale: "en",
    strength: 2,
  });
}

module.exports = {
  create,
  all,
  deleteById,
  getById,
};
