'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Auction extends Model {
    static associate({ CurrentPrice, Message, AuctionLine }) {
      this.belongsTo(CurrentPrice, { foreignKey: 'currentPriceId' });
      this.belongsTo(Message, { foreignKey: 'messageId' });
      this.hasMany(AuctionLine, { foreignKey: 'actionLineId' });
    }
  }
  Auction.init({
    title: {
      type: DataTypes.TEXT
    },
    startPrice: {
      type: DataTypes.INTEGER
    },
    time: {
      type: DataTypes.INTEGER
    },
    step: {
      type: DataTypes.INTEGER
    },
      messageId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Messages',
        key: 'id',
      },
      onDelete: 'cascade',
    },
      currentPriceId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'CurentPrices',
        key: 'id',
      },
      onDelete: 'cascade',
    },
    endPrice: {
      type: DataTypes.INTEGER
    },
    statusAuction: {
      type: DataTypes.BOOLEAN
    },
  }, {
    sequelize,
    modelName: 'Auction',
  });
  return Auction;
};