const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { isAdmin } = require("../../middlewares/guards");
const { create } = require("../../services/articles");
const { mapErrors } = require("../../utils/parser");
const {
  category,
  errors: globalError,
} = require("../../utils/constants/global");

router.post(
  "/",
  //   isAdmin(),
  body("picture").isURL().withMessage(globalError.INVALID_URL),
  async (req, res) => {
    try {
      const { errors } = validationResult(req);

      if (errors.length > 0) {
        throw mapErrors(errors);
      }
      const article = await create(
        req.body.title,
        req.body.content,
        req.body.picture,
        req.body.category
      );
      res.json(article);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

module.exports = router;
