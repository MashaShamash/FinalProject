'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    static associate({ User, Order }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.hasMany(Order, { foreignKey: 'basketId' });
    }
  }
  Basket.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'cascade',
    },
  }, {
    sequelize,
    modelName: 'Basket',
  });
  return Basket;
};