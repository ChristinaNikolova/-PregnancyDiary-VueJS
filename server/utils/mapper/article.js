function articleListViewModel(article) {
  return {
    id: article._id,
    title: article.title,
    shortContent: article.content.slice(0, 200) + "...",
    picture: article.picture,
  };
}

function articleAdminViewModel(article) {
  return {
    id: article._id,
    title: article.title,
    category: article.category.name,
    likes: article.likes.length,
    comments: article.comments.length,
  };
}

module.exports = {
  articleListViewModel,
  articleAdminViewModel,
};
