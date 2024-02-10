const router = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const { create, deleteById } = require("../services/moments");
const { mapErrors } = require("../utils/parser");

router.post("/", hasUser(), async (req, res) => {
  try {
    const weekId = req.body.weekId;
    const moment = await create(
      weekId,
      req.body.date,
      req.body.title,
      req.body.content
    );
    res.json(moment);
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
