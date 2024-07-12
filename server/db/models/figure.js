'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Figure extends Model {
    static associate({ User, ShowLine, OrderLine, Like, AuctionLine, Category }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Category, { foreignKey: 'categoryId' });
      this.hasMany(ShowLine, { foreignKey: 'figureId' });
      this.hasMany(OrderLine, { foreignKey: 'figureId' });
      this.hasMany(Like, { foreignKey: 'figureId' });
      this.hasMany(AuctionLine, { foreignKey: 'figureId' });
    }
  }
  Figure.init({
    title: {
      type: DataTypes.TEXT
    },
    date: {
      type: DataTypes.DATE
    },
    img: {
      type: DataTypes.TEXT
    },
    materials: {
      type: DataTypes.TEXT
    },
    heigth: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.INTEGER
    },
    width: {
      type: DataTypes.INTEGER
    },
      categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id',
      },
      onDelete: 'cascade',
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
    sell: {
      type: DataTypes.BOOLEAN
    },
  }, {
    sequelize,
    modelName: 'Figure',
  });
  return Figure;
};