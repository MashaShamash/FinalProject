const router = require("express").Router();
const { BasketLine, Basket, Figure } = require("../../db/models");
const verifyAccessToken = require("../../middleware/verifyAccessToken");

router.get("/:id", verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  console.log(888, id);
  try {
    const basketsInDB = await Basket.findOne({
      where: { userId: +id, cartStatus: false },
      include: BasketLine,
    });
    console.log(777, basketsInDB);

    res.json({ message: "success", basket: basketsInDB });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

// Удалить корзину по ID

router.delete("/basket/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Basket.destroy({ where: { id } });
    res.json({ message: "success" });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

// Обновить корзину по ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Basket.update(
      { cartStatus: true, orderStatus: "Оформлен" },
      { where: { id } }
    );
    const basketsInDB = await Basket.findAll({
      where: { userId: id },
      include: BasketLine,
    });
    res.json({ message: "success", baskets: basketsInDB });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

// Обновить количество товаров в строке корзины
router.put("/basketLine/:id", async (req, res) => {
  const { basketLine, action } = req.body;
  try {
    let newCount;
    const figure = await Figure.findOne({ where: { id: basketLine.figureId } });
    const basket = await Basket.findOne({ where: { id: basketLine.basketId } });
    let totalAmount;
    if (action === "increase") {
      newCount = basketLine.count + 1;
      totalAmount = basket.totalAmount + figure.amount;
    } else {
      newCount = basketLine.count - 1;
      totalAmount = basket.totalAmount - figure.amount;
      if (newCount === 0) {
        await BasketLine.destroy({ where: { id: basketLine.id } });
        await Basket.update(
          { totalAmount },
          { where: { id: basketLine.basketId } }
        );
        const basketsInDB = await Basket.findAll({
          where: { userId: basket.userId },
          include: BasketLine,
        });
        res.json({ message: "success", baskets: basketsInDB });
        return;
      }
    }
    await Basket.update(
      { totalAmount },
      { where: { id: basketLine.basketId } }
    );
    await BasketLine.update(
      { count: newCount },
      { where: { id: basketLine.id } }
    );
    const basketsInDB = await Basket.findAll({
      where: { userId: basket.userId },
      include: BasketLine,
    });
    res.json({ message: "success", baskets: basketsInDB });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

// Удалить строку корзины по ID
router.delete("/basketLine/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const basketLine = await BasketLine.findOne({ where: { id } });
    const figure = await Figure.findOne({ where: { id: basketLine.figureId } });
    const basket = await Basket.findOne({
      where: { userId: +res.locals.user.id, cartStatus: false },
      include: BasketLine,
    });
    await BasketLine.destroy({ where: { id } });
    if (basket.BasketLines.length) {
      const totalAmount = figure.amount * basketLine.count;
      await Basket.update(
        { totalAmount: basket.totalAmount - totalAmount },
        { where: { id: basket.id } }
      );
    } else {
      await Basket.destroy({
        where: { userId: +req.locals.user.id, cartStatus: false },
      });
    }
    const basketsInDB = await Basket.findAll({
      where: { userId: basket.userId },
      include: BasketLine,
    });
    res.json({ message: "success", basket: basketsInDB });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post("/:id", verifyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const figure = await Figure.findOne({ where: { id } });

    // console.log(figure, 'FIIIIIG');

    let basket;
    console.log(res.locals.user, "------");
    basket = await Basket.findOne({
      where: { userId: res.locals.user.id, cartStatus: false },
    });
    console.log(223344, basket);
    if (!basket) {
      basket = await Basket.create({
        userId: res.locals.user.id,
        cartStatus: false,
        totalAmount: 0,
        orderStatus: "Не оформлен",
      });

      console.log(basket, 2222);
    }

    let basketLine;

    basketLine = await BasketLine.create({
      figureId: figure.id,
      basketId: basket.id,
      count: 1,
    });
    console.log(basketLine);

    if (basketLine) {
      basketLine = await BasketLine.findOne({
        where: { id: basketLine.id },
        include: Figure,
      });
      res.json({ message: "create", basketLine });
    }
  } catch ({ message }) {
    console.log(500, message);
    res.status(500).json({ message });
  }
});

module.exports = router;

// 106 строка вопролс по s
