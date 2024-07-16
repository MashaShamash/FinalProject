const router = require("express").Router();
const { Show } = require("../../db/models");
const verifyAccessToken = require("../../middleware/verifyAccessToken");

router.get("/", async (req, res) => {
  try {
    const show = await Show.findAll();
    res.status(200).json({ message: "success", show });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

router.get("/:id", verifyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;
    const show = await Show.findOne({ where: { id: id } });
    res.status(200).json({ message: "success", show });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

router.post("/", verifyAccessToken, async (req, res) => {
  try {
    const { user } = res.locals;
    const { id, title, description, date, userId } = req.body;
    const figure = await Show.create({
        id, title, description, date, userId
    });
    if (figure) {
      res.status(200).json({ message: "success", figure });
      return;
    }
    res.status(400).json({ message: "Что-то пошло не так" });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

router.put("/:id", verifyAccessToken, async (req, res) => {
  try {
    const { user } = res.locals;
    const { id } = req.params;
    const { id, title, description, date, userId  } =
      req.body;
    const result = await Show.update(
      { id, title, description, date, userId  },
      { where: { id: id, userId: user.id } }
    );
    if (result[0] > 0) {
      const show = await Show.findOne({ where: { id: id } });
      res.status(200).json({ message: "success", show });
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
    const result = await Show.destroy({ where: { id: id, userId: user.id } });
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
