'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AuctionLines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        auctionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Auctions',
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
    await queryInterface.dropTable('AuctionLines');
  }
};