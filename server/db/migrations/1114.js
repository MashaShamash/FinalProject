'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Auctions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.TEXT,
      },
      startPrice: {
        type: Sequelize.INTEGER,
      },
      time: {
        type: Sequelize.INTEGER,
      },
      step: {
        type: Sequelize.INTEGER,
      },
      messageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Messages',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      currentPriceId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'CurrentPrices',
          key: 'id',
        },
      },
      endPrice: {
        type: Sequelize.INTEGER,
      },
      statusAuction: {
        type: Sequelize.BOOLEAN,
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
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Auctions');
  },
};
