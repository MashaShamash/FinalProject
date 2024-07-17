const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, Profile, Basket } = require("../../db/models");
const generateTokens = require("../../utils/authUtils");
const jwtConfig = require("../../config/jwtConfig");
const { where } = require("sequelize");

router.post("/registration", async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      lastName.trim() === ""
    ) {
      res.status(400).json({ message: "заполните все поля" });
      return;
    }
    const isUser = await User.findOne({ where: { email } });

    if (isUser) {
      res
        .status(400)
        .json({ message: "Такой пользователь уже зарегистрирован" });
      return;
    }

    const bcryptPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      lastName,
      email,
      password: bcryptPassword,
    });

    delete user.dataValues.password;

    const { accessToken, refreshToken } = generateTokens({ user });

    if (user) {
      res
        .status(201)
        .cookie("refresh", refreshToken, { httpOnly: true })
        .json({ message: "success", user, accessToken });
      return;
    }

    res.status(400).json({ message: "попробуйте еще раз" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/authorization", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email.trim() === "" || password.trim() === "") {
      res.status(400).json({ message: "заполните все поля" });
      return;
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(400).json({ message: "email или пароль не совпадают" });
      return;
    }

    const bcryptPassword = await bcrypt.compare(password, user.password);

    if (!bcryptPassword) {
      res.status(400).json({ message: "неверный пароль" });
      return;
    }

    delete user.dataValues.password;
    const basket = await Basket.findOne({
      where: { userId: user.id },
    });
    console.log(basket);
    if (basket) {
      user.basketId = basket.id;
      console.log(user);
    }

    const { accessToken, refreshToken } = generateTokens({ user });

    res
      .status(200)
      .cookie("refresh", refreshToken, { httpOnly: true })
      .json({ message: "success", user, accessToken });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.get("/logout", (req, res) => {
  res.locals.user = undefined;

  res.status(200).clearCookie("refresh").json({ message: "success" });
});

module.exports = router;
