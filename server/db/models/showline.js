'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShowLine extends Model {
    static associate({ Show, Figure }) {
      this.belongsTo(Show, { foreignKey: 'showId' });
      this.belongsTo(Figure, { foreignKey: 'figureId' });
   
    }
  }
  ShowLine.init({
    showId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Shows',
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
    modelName: 'ShowLine',
  });
  return ShowLine;
};