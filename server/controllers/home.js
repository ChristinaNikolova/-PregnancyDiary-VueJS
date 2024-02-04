const { messages } = require("../utils/constants/global");
const { getLastThree } = require("../services/articles");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: messages.REST_OPERATED });
});

router.get("/articles", async (req, res) => {
  try {
    const articles = await getLastThree();
    res.json(articles);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
