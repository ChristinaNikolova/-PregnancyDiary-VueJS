const router = require("express").Router();
const { all } = require("../services/comments");
const { mapErrors } = require("../utils/parser");

router.get("/:id", async (req, res) => {
  try {
    const articleId = req.params.id;
    const comments = await all(articleId);
    res.json(comments);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
