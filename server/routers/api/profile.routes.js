const router = require("express").Router();
const { Profile } = require("../../db/models");

router.get("/profileId", async (req, res) => {
  try {
    const { profileId } = req.params;
    const profUser = await Profile.findOne({ where: { id: profileId } });
    res.status(200).json({ message: "success", profUser });
  } catch ({ message }) {
    res.json({ error: message });
  }
});

router.post("/profile", verifyAccessTokenasync, async (req, res) => {
  try {
    const { user } = res.locals;
    const { pseudonym, activity, biography } = req.body;
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

router.put("/:profileId", async (req, res) => {
  try {
    const { user } = res.locals;
    const { profileId } = req.params;
    const { pseudonym, activity, biography, userId } = req.body;
    const result = await Profile.update(
      { pseudonym, activity, biography },
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