const Article = require("../models/Article");
const { commentViewModel } = require("../utils/mapper/comment");

async function all(articleId) {
  const article = await Article.findById(articleId).populate({
    path: "comments",
    populate: {
      path: "creator",
    },
  });

  return article.comments
    .sort((a, b) => b.createdAt - a.createdAt)
    .map(commentViewModel);
}

module.exports = {
  all,
};
