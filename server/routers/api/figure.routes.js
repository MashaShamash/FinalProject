const router = require('express').Router();
const { Figure } = require('../../db/models');
const verifyAccessToken = require('../../middleware/verifyAccessToken');
const upload = require('../../middleware/multerMiddleware')


router.get('/',async (req, res) => {
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

router.post('/', verifyAccessToken, upload.single('imageFile'), async (req, res) => {
    try {
            const { user } = res.locals;
            const img = `/img/${req.file.filename}`
            console.log(img);
            const { title, date, height, price, width, categoryId, pseudonym, materials, biography} = req.body;
        const figure = await Figure.create({name: user.name ,lastName: user.lastName, title, date, img, height, price, width, sell: false, categoryId, userId: user.id, pseudonym, materials, biography});
        if (figure) {
            res.status(200).json({ message: 'success', figure });
            return;
        }
        res.status(400).json({ message: 'Что-то пошло не так' });
    } catch ({ message }) {
        console.log(message);
        res.status(500).json({ error: message })
    }
});

router.put('/:id', verifyAccessToken,upload.single('imageFile'), async (req, res) => {
    try {
        const { user } = res.locals;
        const { id } = req.params;
        console.log(7777777, id);
        // Инициализируем переменную для пути к изображению
        let img = '';

        // Проверяем, загружен ли новый файл
        if (req.file) {
            img = `/img/${req.file.filename}`; // Задаем путь к новому изображению
        } else {
            // Если новый файл не был загружен, сохраняем текущий путь из базы данных
            const figure = await Figure.findOne({ where: { id } });
            if (figure) {
                img = figure.img; // Используем текущий путь к изображению из базы данных
            }
        }
        const {title, date, height, materials, price, pseudonym, biography, width, sell, categoryId } = req.body;
        const result = await Figure.update({materials, pseudonym, title, biography, date, img, height, price, width, sell, categoryId  }, { where: { id: id, userId: user.id } });
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