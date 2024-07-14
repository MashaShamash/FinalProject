const router = require("express").Router();

const authRouter = require("./api/auth.routes");
const tokensRouter = require("./api/tokens.routes");
const categoryRouter = require("./api/category.routes");
const figureRouter = require("./api/figure.routes");
const likeRouter = require("./api/like.routes");
const profileRouter = require("./api/profile.routes");


router.use("/figures", figureRouter);
router.use("/categories", categoryRouter);
router.use("/auth", authRouter);
router.use("/tokens", tokensRouter);
router.use("/like", likeRouter);
router.use("/profile", profileRouter);

module.exports = router;


