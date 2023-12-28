const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { isAdmin } = require("../../middlewares/guards");
const { create } = require("../../services/categories");
const { mapErrors } = require("../../utils/parser");
const {
  category,
  errors: globalErrors,
} = require("../../utils/constants/global");

router.post(
  "/",
  // todo fix this isAdmin(),
  body("picture").isURL().withMessage(globalErrors.INVALID_URL),
  async (req, res) => {
    try {
      const { errors } = validationResult(req);

      if (errors.length > 0) {
        throw mapErrors(errors);
      }

      const category = await create(req.body.name, req.body.picture);
      res.json(category);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

module.exports = router;
