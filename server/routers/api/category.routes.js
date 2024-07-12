const router = require('express').Router();
const { Category } = require('../../db/models');

router.get('/', async (req, res) => {
    try {
     
      const categories = await Category.findAll();
      res.status(200).json({ message: 'success', categories });
    } catch ({ message }) {
      res.json({ error: message });
    }
  });