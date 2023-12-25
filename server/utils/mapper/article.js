function articleListViewModel(article) {
  return {
    id: article._id,
    title: article.title,
    shortContent: article.content.slice(0, 200) + "...",
    picture: article.picture,
  };
}

module.exports = {
  articleListViewModel,
};
