'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({ Basket, OrderLine }) {
      this.belongsTo(Basket, { foreignKey: 'basketId' });
      this.hasMany(OrderLine, { foreignKey: 'orderId' });
    }
  }
  Order.init({
    basketId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Baskets',
        key: 'id',
      },
      onDelete: 'cascade',
    },
    status: {
      type: DataTypes.BOOLEAN
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};