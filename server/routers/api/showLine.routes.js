const router = require("express").Router();
const { ShowLine, Show } = require("../../db/models");
const verifyAccessToken = require("../../middleware/verifyAccessToken");

router.get("/", async (req, res) => {
  try {
    const showLine = await ShowLine.findAll();
    res.status(200).json({ message: "success", show });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

router.get("/:id", verifyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;
    const showLine = await ShowLine.findOne({ where: { id: id } });
    res.status(200).json({ message: "success", showLine });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

router.post("/", verifyAccessToken, async (req, res) => {
  try {
    const { user } = res.locals;
    const { showId, figureId } = req.body;
    const showLine = await ShowLine.create({
      showId,
      figureId,
    });
    if (showLine) {
      res.status(200).json({ message: "success", showLine });
      return;
    }
    res.status(400).json({ message: "Что-то пошло не так" });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

// дописать инклюдс
router.put("/:id", verifyAccessToken, async (req, res) => {
  try {
    const { user } = res.locals;
    const { id } = req.params;
    const { showId, figureId } = req.body;
    const result = await ShowLine.update(
      { showId, figureId },
      { where: { id: id, userId: user.id }},
      include: { model: Show }
      
    );
    if (result[0] > 0) {
      const showLine = await ShowLine.findOne({ where: { id: id } });
      res.status(200).json({ message: "success", showLine });
      return;
    }
    res.status(400).json({ message: "Что-то пошло не так" });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

router.delete("/:id", verifyAccessToken, async (req, res) => {
  try {
    const { user } = res.locals;
    const { id } = req.params;
    const result = await ShowLine.destroy({
      where: { id: id, userId: user.id },
    });
    if (result > 0) {
      res.status(200).json({ message: "success" });
      return;
    }
    res.status(400).json({ message: "Что-то пошло не так" });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

module.exports = router;
