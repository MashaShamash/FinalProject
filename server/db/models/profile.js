'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Profile.init({
    pseudonym: {
      type: DataTypes.TEXT
    },
    activity: {
      type: DataTypes.TEXT
    },
    biography: {
      type: DataTypes.TEXT
    },
    name: {
      type: DataTypes.TEXT
    },
    conDan: {
      type: DataTypes.TEXT
    },
    lastName: {
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
    modelName: 'Profile',
  });
  return Profile;
};