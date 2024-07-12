'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate({ User, Figure }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Figure, { foreignKey: 'figureId' });
    }
  }
  Like.init(
    {
      figureId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Figures',
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
    },
    {
      sequelize,
      modelName: 'Like',
    }
  );
  return Like;
};
