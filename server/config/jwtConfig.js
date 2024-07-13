const jwtConfig = {
    // настроили "восковый" токен
    access: {
      expiresIn: `${1000 * 5}`,
    },
    // настроили "чек" токен
    refresh: {
      expiresIn: `${1000 * 60 * 60 * 12}`,
    },
  };
  
  module.exports = jwtConfig;