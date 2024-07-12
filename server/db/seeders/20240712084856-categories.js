'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories',
    [
      {
        title: 'Авангардизм',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Ампир',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Готика',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Гиперриализм',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Класицизм',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {});

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};