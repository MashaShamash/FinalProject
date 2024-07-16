"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    static associate({ User, BasketLine }) {
      this.belongsTo(User, { foreignKey: "userId" });
      this.hasMany(BasketLine, { foreignKey: "basketLineId" });
    }
  }
  Basket.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "cascade",
      },
      cartStatus: {
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
      totalAmount: {
        type: DataTypes.FLOAT,
      },
      orderStatus: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Basket",
    }
  );
  return Basket;
};
