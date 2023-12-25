const Article = require("../models/Article");
const { articleListViewModel } = require("../utils/mapper/article");
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

async function getTotalCount(searchedQuery) {
  console.log(searchedQuery);
  return (
    await Article.find(
      searchedQuery ? { title: { $regex: searchedQuery, $options: "i" } } : {}
    )
  ).length;
}

// async function getByTitle(title) {
//   return await Article.findOne({ title }).collation({
//     locale: "en",
//     strength: 2,
//   });
// }

module.exports = {
  all,
  getTotalCount,
};
