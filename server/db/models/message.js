'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate({ Auction, CurrentPrice, User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(CurrentPrice, { foreignKey: 'messageId' });
      this.hasMany(Auction, { foreignKey: 'messageId' });
    }
  }
  Message.init({
    message: {
      type: DataTypes.TEXT
    },
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
    modelName: 'Message',
  });
  return Message;
};