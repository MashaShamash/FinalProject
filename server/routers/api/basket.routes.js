const router = require('express').Router();
const { Basket,Figure} = require('../../db/models');
const verifyAccessToken = require('../../middleware/verifyAccessToken');

router.get('/', verifyAccessToken, async (req, res) => {
  try {
    const { user } = res.locals;
    if (user) {
      const basketFigure = await Basket.findOne({
        where: { userId: user.id },
        include: [
          {
            model: Figure,
            through: {
              attributes: [],
            },
          },
        ],
      });

      res.status(200).json({ message: 'success', basketFigure });
      return;
    }
    res.status(400).json({ message: 'что-то пошло не так' });
  } catch ({ message }) {
    res.status(500).json({ error: message });
  }
});
// создание OrderLine
// router.post('/', verifyAccessToken, async (req, res) => {
//   const { orderId, figureId } = req.body;
//   const { user } = res.locals;
//   let order;
//   try {
//     order = await Basket.findOne({ where: { id: orderId:{basketId:userId} } });
//     if (!basket) {
//       basket = await Basket.create({ userId: user.id });
//     }
//     if (basket && cardId) {
//       const basketLine = await BasketLine.create({
//         cardId,
//         basketId: basket.id,
//       });
//       res.status(201).json({ message: 'success', basketLine });
//       return;
//     }
//     res.status(400).json({ message: 'что-то пошло не так' });
//   } catch ({ message }) {
//     res.status(500).json({ error: message });
//   }
// });

//удаление BasketLine

// router.delete(
//   '/basketLines/:basketLinesId',
//   verifyAccessToken,
//   async (req, res) => {
//     const { basketLinesId } = req.params;
//     try {
//       const { user } = res.locals;
//       const basket = await Basket.findOne({
//         where: { userId: user.id },
//       });
//       const basketLine = await BasketLine.findOne({
//         where: { basketId: basketLinesId },
//       });
//       console.log(basketLine);
//       if (basket && basketLine) {
//         const result = await BasketLine.destroy({
//           where: { basketId: basketLinesId },
//         });
//         if (result > 0) {
//           res.status(200).json({ message: 'success', result });
//           return;
//         }
//       }
//       res.status(400).json({ message: 'что-то пошло не так' });
//     } catch ({ message }) {
//       res.status(500).json({ error: message });
//     }
//   }
// );

module.exports = router;



