const router = require("express").Router();
const { where } = require("sequelize");
const { Like, Figure } = require("../../db/models");
const verifyAccessToken = require("../../middleware/verifyAccessToken");

router.get("/", verifyAccessToken, async (req, res) => {
  try {
    const likes = await Like.findAll({
      where: { userId: res.locals.user.id, include: { model: Figure } },
    });
    if (likes) {
      res.status(200).json({ message: "success", likes });
      return;
    }
    res.status(400).json({ message: "увы и ах" });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

router.post("/", verifyAccessToken, async (req, res) => {
  try {
    const { user } = res.locals;
    const { figureId } = req.body;
    let like;
    like = await Like.findOne({ where: { userId: user.id, figureId } });
    if (!like) {
      like = await Like.create({ userId: user.id, figureId });
      if (like) {
        res.status(201).json({ message: "success", like });
        return;
      }
    }
    const result = await Like.destroy({ where: { userId: user.id, figureId } });
    if (result > 0) {
      res.status(200).json({ message: "успешно удалено" });
      return;
    }
    res.status(400).json({ message: "что-то пошло не так" });
    return;
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

module.exports = router;
