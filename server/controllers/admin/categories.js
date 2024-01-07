const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const { isAdmin } = require("../../middlewares/guards");
const {
  getById,
  create,
  update,
  deleteById,
} = require("../../services/categories");
const { mapErrors } = require("../../utils/parser");
const { errors: globalErrors } = require("../../utils/constants/global");

router.post(
  "/",
  isAdmin(),
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

router.delete("/:id", isAdmin(), async (req, res) => {
  try {
    const id = req.params.id;
    await deleteById(id);
    res.status(204).end();
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.get("/:id", isAdmin(), async (req, res) => {
  try {
    const id = req.params.id;
    const category = await getById(id);
    res.json(category);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.put(
  "/:id",
  isAdmin(),
  body("picture").isURL().withMessage(globalErrors.INVALID_URL),
  async (req, res) => {
    try {
      const { errors } = validationResult(req);
      if (errors.length > 0) {
        throw mapErrors(errors);
      }
      const id = req.params.id;
      const category = await update(id, req.body.name, req.body.picture);
      res.json(category);
    } catch (error) {
      const message = mapErrors(error);
      res.status(400).json({ message });
    }
  }
);

module.exports = router;
