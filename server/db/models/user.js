'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Show, Like, Basket, Message, Profile, Figure }) {
      this.hasMany(Show, { foreignKey: 'userId' });
      this.hasMany(Like, { foreignKey: 'userId' });
      this.hasMany(Figure, { foreignKey: 'userId' });
      this.hasOne(Basket, { foreignKey: 'userId' });
      this.hasOne(Message, { foreignKey: 'userId' });
      this.hasOne(Profile, { foreignKey: 'userId' });
     
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.TEXT
      },
      lastName: {
        type: DataTypes.TEXT
      },
      email: {
        type: DataTypes.TEXT
      },
      password: {
        type: DataTypes.TEXT
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
