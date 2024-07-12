'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ShowLines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        showId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Shows',
          key: 'id',
        },
        onDelete: 'cascade',
      },
        figureId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Figures',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ShowLines');
  }
};