const router = require("express").Router();
// const { hasUser } = require("../middlewares/guards");
const { all, getTotalCount } = require("../services/articles");
const { pagination } = require("../utils/constants/global");
const { mapErrors } = require("../utils/parser");

router.get("/:page/:query?", async (req, res) => {
  try {
    const currentPage = req.params.page;
    const searchedQuery = req.params.query || "";

    const skip = (currentPage - 1) * pagination.ARTICLES_PER_PAGE;
    const totalArticles = await getTotalCount(searchedQuery);
    const pagesCount = Math.ceil(totalArticles / pagination.ARTICLES_PER_PAGE);

    const articles = await all(
      pagination.ARTICLES_PER_PAGE,
      skip,
      searchedQuery
    );
    res.json({ articles, pagesCount, currentPage });
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;