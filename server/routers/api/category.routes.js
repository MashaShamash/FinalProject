const router = require('express').Router();
const { Category, Figure } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    console.log(1);
    const categories = await Category.findAll({
      include: { model: Figure },
    });
    console.log(555, categories);
    res.status(200).json({ message: 'success', categories });
  } catch ({ message }) {
    console.log(message, 111);
    res.json({ error: message });
  }
});

module.exports = router;
