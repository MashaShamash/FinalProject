'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Figure extends Model {
    static associate({
      User,
      ShowLine,
      BasketLine,
      Like,
      AuctionLine,
      Category,
    }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Category, { foreignKey: 'categoryId' });
      this.hasMany(ShowLine, { foreignKey: 'figureId' });
      this.hasMany(BasketLine, { foreignKey: 'figureId' });
      this.hasMany(Like, { foreignKey: 'figureId' });
      this.hasMany(AuctionLine, { foreignKey: 'figureId' });
    }
  }
  Figure.init(
    {
      title: {
        type: DataTypes.TEXT,
      },
      date: {
        type: DataTypes.INTEGER,
      },
      img: {
        type: DataTypes.TEXT,
      },
      materials: {
        type: DataTypes.TEXT,
      },
      height: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.TEXT,
      },
      lastName: {
        type: DataTypes.TEXT,
      },
      width: {
        type: DataTypes.INTEGER,
      },
      pseudonym: {
        type: DataTypes.TEXT,
      },
      biography: {
        type: DataTypes.TEXT,
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
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'Figure',
    }
  );
  return Figure;
};
