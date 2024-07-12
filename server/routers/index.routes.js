const router = require('express').Router();


const userRouter = require('./api/user.routes');
const authRouter = require('./api/auth.routes');
const tokensRouter = require('./api/tokens.routes')
const categoryRouter = require('./api/category.routes');



router.use('/categories', categoryRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/tokens', tokensRouter);



module.exports = router;