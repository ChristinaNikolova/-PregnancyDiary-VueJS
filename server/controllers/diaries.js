const router = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const { create, all, deleteById } = require("../services/diaries");
const { mapErrors } = require("../utils/parser");
const { validationResult } = require("express-validator");

router.post("/", hasUser(), async (req, res) => {
  try {
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      throw mapErrors(errors);
    }
    const userId = req.user._id;
    const diary = await create(
      req.body.title,
      req.body.description,
      req.body.positiveTestDate,
      req.body.dueDate,
      req.body.gender,
      userId
    );
    res.json(diary);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.get("/", hasUser(), async (req, res) => {
  try {
    const userId = req.user._id;
    const diaries = await all(userId);
    res.json(diaries);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

router.delete("/:id", hasUser(), async (req, res) => {
  try {
    const id = req.params.id;
    await deleteById(id);
    res.status(204).end();
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
