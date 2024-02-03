const router = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const { getById } = require("../services/weeks");
const { mapErrors } = require("../utils/parser");

router.get("/:id", hasUser(), async (req, res) => {
  try {
    //todo true is requiered
    const id = req.params.id;
    const week = await getById(id, true);
    res.json(week);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
