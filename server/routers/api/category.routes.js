const router = require('express').Router();
const { Category, Figure } = require('../../db/models');

router.get('/', async (req, res) => {
    try {
     
      const categories = await Category.findAll({
        include:{
            model: Figure
        }
      });
      res.status(200).json({ message: 'success', categories });
    } catch ({ message }) {
      res.json({ error: message });
    }
  });

  module.exports = router;