const router = require('express').Router();
const { Figure } = require('../../db/models');
const verifyAccessToken = require('../../middleware/verifyAccessToken');


router.get('/', async (req, res) => {
    try {
        const figures = await Figure.findAll();
        res.status(200).json({ message: 'success', figures });
    } catch ({ message }) {
        res.status(500).json({ error: message })
    }
});

router.get('/:id',verifyAccessToken, async (req, res) => {
    try {
        const { id } = req.params;
        const figure = await Figure.findOne({ where: { id: id } });
        res.status(200).json({ message: 'success', figure });
    } catch ({ message }) {
        res.status(500).json({ error: message })
    }
});

router.post('/', verifyAccessToken, async (req, res) => {
    try {
        const { user } = res.locals;
        const { title, date, img, height, price, width, sell, categoryId } = req.body;
        const figure = await Figure.create({name:user.name,name:user.lastName, title, date, img, height, price, width, sell, categoryId, userId: user.id });
        if (figure) {
            res.status(200).json({ message: 'success', figure });
            return;
        }
        res.status(400).json({ message: 'Что-то пошло не так' });
    } catch ({ message }) {
        res.status(500).json({ error: message })
    }
});

router.put('/:id', verifyAccessToken, async (req, res) => {
    try {
        const { user } = res.locals;
        const { id } = req.params;
        const {title, date, img, height, price, width, sell, categoryId } = req.body;
        const result = await Figure.update({ title, date, img, height, price, width, sell, categoryId  }, { where: { id: id, userId: user.id } });
        if (result[0] > 0) {
            const figure = await Figure.findOne({ where: { id: id } });
            res.status(200).json({ message: 'success', figure });
            return;
        }
        res.status(400).json({ message: 'Что-то пошло не так' });
    } catch ({ message }) {
        res.status(500).json({ error: message });
    }
});

router.delete('/:id', verifyAccessToken, async (req, res) => {
    try {
        const { user } = res.locals;
        const { id } = req.params;
        const result = await Figure.destroy({ where: { id: id, userId: user.id } });
        if (result > 0) {
            res.status(200).json({ message: 'success' });
            return;
        }
        res.status(400).json({ message: 'Что-то пошло не так' });
    } catch ({ message }) {
        res.status(500).json({ error: message });
    }
});





module.exports = router;