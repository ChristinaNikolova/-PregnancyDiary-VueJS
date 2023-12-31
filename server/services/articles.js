const Article = require("../models/Article");
const {
  articleListViewModel,
  articleAdminViewModel,
} = require("../utils/mapper/article");
const {
  Types: { ObjectId },
} = require("mongoose");

async function all(take, skip, searchedQuery) {
  return (
    await Article.find(
      searchedQuery ? { title: { $regex: searchedQuery, $options: "i" } } : {}
    )
      .populate("category", "name")
      .sort({ createdAt: -1, title: 1 })
      .skip(skip)
      .limit(take)
  ).map(articleListViewModel);
}

async function allAdmin() {
  return (
    await Article.find({})
      .populate("category", "name")
      .sort({ createdAt: -1, title: 1 })
  ).map(articleAdminViewModel);
}


async function getTotalCount(searchedQuery) {
  return (
    await Article.find(
      searchedQuery ? { title: { $regex: searchedQuery, $options: "i" } } : {}
    )
  ).length;
}

async function create(title, content, picture, category) {
  let article = await getByTitle(title);
  if (article) {
    throw new Error(errors.TITEL_TAKEN);
  }
  article = new Article({
    title,
    content,
    picture,
    category,
  });

  await article.save();
  return article;
}

async function getByTitle(title) {
  return await Article.findOne({ title }).collation({
    locale: "en",
    strength: 2,
  });
}

module.exports = {
  all,
  getTotalCount,
  create,
  allAdmin,
};
