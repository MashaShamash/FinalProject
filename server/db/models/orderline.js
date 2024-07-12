'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderLine extends Model {
    static associate({ Order, Figure }) {
      this.belongsTo(Order, { foreignKey: 'orderId' });
      this.belongsTo(Figure, { foreignKey: 'figureId' });
   
    }
  }
  OrderLine.init({
    orderId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Orders',
        key: 'id',
      },
      onDelete: 'cascade',
    },
    figureId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Figures',
        key: 'id',
      },
      onDelete: 'cascade',
    },
  }, {
    sequelize,
    modelName: 'OrderLine',
  });
  return OrderLine;
};