const router = require("express").Router();
const { hasUser } = require("../middlewares/guards");
const { create } = require("../services/babies");
const { mapErrors } = require("../utils/parser");

router.post("/", hasUser(), async (req, res) => {
  try {
    const baby = await create(
      req.body.diaryId,
      req.body.name,
      req.body.gender,
      req.body.birthDate,
      req.body.birthTime,
      req.body.height,
      req.body.weight,
      req.body.picture
    );
    res.json(baby);
  } catch (error) {
    const message = mapErrors(error);
    res.status(400).json({ message });
  }
});

module.exports = router;
