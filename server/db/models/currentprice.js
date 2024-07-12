'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CurrentPrice extends Model {
    static associate({ Message, Auction}) {
      this.hasMany(Auction, { foreignKey: 'currentPriceId' });
      this.belongsTo(Message, { foreignKey: 'messageId' });
     
    }
  }
  CurrentPrice.init({
    messageId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Messages',
        key: 'id',
      },
      onDelete: 'cascade',
    },
    price: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'CurrentPrice',
  });
  return CurrentPrice;
};