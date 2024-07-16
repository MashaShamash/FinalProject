const router = require("express").Router();
const { Profile, User} = require("../../db/models");
const verifyAccessToken = require("../../middleware/verifyAccessToken");
const upload = require('../../middleware/multerMiddleware')

router.get("/", async (req, res) => {
  try {
    const profUsers = await Profile.findAll();
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

router.post("/",verifyAccessToken,upload.single('imageFile'), async (req, res) => {
  try {
    const { user } = res.locals;
    console.log(user, 9999999999);
    const { pseudonym, activity, biography, conDan } = req.body;
    const img = '/public/img/1721150723705.jpeg'
    const profUserGet = await User.findAll()
    const count = profUserGet.length

    const profUser = await Profile.create({
      name: user.name,
      lastName: user.lastName,
      img: img,
      pseudonym,
      activity,
      biography,
      conDan,
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

router.put("/:profileId",verifyAccessToken,upload.single('imageFile'), async (req, res) => {
  try {
    const { user } = res.locals;
    const { profileId } = req.params;
    const img = `/img/${req.file.filename}`
    console.log(img);
    const { pseudonym, activity, biography, name, lastName, conDan} = req.body;
    console.log(777, activity);
    console.log(888, pseudonym, typeof activity, biography, name, lastName, conDan);
    
    const result = await Profile.update(
      { pseudonym, activity, biography, name, lastName, conDan, img},
      { where: { id: profileId, userId: user.id } }
    );
    console.log(7887, result);
    if (result[0] > 0) {
      const profUser = await Profile.findOne({ where: { id: +profileId } });
      res.status(200).json({ message: "success", profUser });
    }
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});
module.exports = router;