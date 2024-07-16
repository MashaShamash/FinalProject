"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BasketLine extends Model {
    static associate({ Basket, Figure }) {
      this.belongsTo(Basket, { foreignKey: "basketId" });
      this.belongsTo(Figure, { foreignKey: "figureId" });
    }
  }
  BasketLine.init(
    {
      basketId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Baskets",
          key: "id",
        },
        onDelete: "cascade",
      },
      figureId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Figures",
          key: "id",
        },
        onDelete: "cascade",
      },
      count: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "BasketLine",
    }
  );
  return BasketLine;
};
