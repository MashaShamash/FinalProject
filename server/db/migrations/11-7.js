'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Figures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.DATE
      },
      img: {
        type: Sequelize.TEXT
      },
      materials: {
        type: Sequelize.TEXT
      },
      heigth: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
      },
      width: {
        type: Sequelize.INTEGER
      },
        categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onDelete: 'cascade',
      },
        userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      sell: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Figures');
  }
};