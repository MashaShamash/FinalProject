const jwt = require('jsonwebtoken');
const { User } = require('../db/models');

async function verifyRefreshToken(req, res, next) {
  try {
    // проверяем куку на наличие токена
    const { refresh } = req.cookies;

    let { user } = jwt.verify(refresh, process.env.REFRESH_TOKEN);
   
    // опционально
    user = await User.findOne({
      where: { id: user.id },
      attributes: ['id', 'name','lastName', 'email'],
    });

    res.locals.user = user;

    next();
  } catch (error) {
    console.log('Invalid refresh token');
    res.clearCookie('refreshToken').sendStatus(401);
  }
}

module.exports = verifyRefreshToken;
