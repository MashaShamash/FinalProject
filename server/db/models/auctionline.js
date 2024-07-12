'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuctionLine extends Model {
    static associate({ Auction, Figure }) {
      this.belongsTo(Auction, { foreignKey: 'auctionId' });
      this.belongsTo(Figure, { foreignKey: 'figureId' });
   
    }
  }
  AuctionLine.init({
    auctionId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Auctions',
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
    modelName: 'AuctionLine',
  });
  return AuctionLine;
};