'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Show extends Model {
    static associate({ User, ShowLine }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.hasMany(ShowLine, { foreignKey: 'showId' });
      
    }
  }
  Show.init({
    title: {
      type: DataTypes.TEXT
    },
    description: {
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
    date: {
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'Show',
  });
  return Show;
};