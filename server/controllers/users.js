const router = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const { allFavArticles } = require("../services/users");
const { mapErrors } = require("../utils/parser");

//todo check if all hasUser
router.get("/articles", hasUser(), async (req, res) => {
  try {
    const userId = req.user._id;
    const articles = await allFavArticles(userId);
    res.json(articles);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
