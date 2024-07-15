const router = require("express").Router();
const { Profile, User} = require("../../db/models");
const verifyAccessToken = require("../../middleware/verifyAccessToken");

router.get("/", async (req, res) => {
  try {
    const profUsers = await Profile.findAll({include: User});
    res.status(200).json({ message: "success", profUsers });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

router.get("/:profileId", async (req, res) => {
  try {
    const { profileId } = req.params;
    const profUser = await Profile.findOne({ where: { id: profileId } });
    res.status(200).json({ message: "success", profUser });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});

router.post("/",verifyAccessToken, async (req, res) => {
  try {
    const { user } = res.locals;
    const { pseudonym, activity, biography } = req.body;
    const profUserGet = await Profile.findOne({ where: { id: user.id } })

    if(profUserGet) {
      res.status(400).json({ message: 'Такой пользователь уже зарегистрирован' });
    }
    const profUser = await Profile.create({
      pseudonym,
      activity,
      biography,
      userId: user.id,
    });

    if (profUser) {
      res.status(200).json({ message: "success", profUser });
      return;
    }
  } catch ({ message }) {
    res.json({ error: message });
  }
});

router.put("/:profileId",verifyAccessToken, async (req, res) => {
  try {
    const { user } = res.locals;
    const { profileId } = req.params;
    const { pseudonym, activity, biography, name, lastName} = req.body;
    const result = await Profile.update(
      { pseudonym, activity, biography, name, lastName},
      { where: { id: profileId, userId: user.id } }
    );
    if (result[0] > 0) {
      const profUser = await Profile.findOne({ where: { id: profileId } });
      res.status(200).json({ message: "success", profUser });
    }
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});
module.exports = router;