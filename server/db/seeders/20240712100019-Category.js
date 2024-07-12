'use strict';
const category = [
  {
    id: 1,
    title: 'картина',
    img: 'dfdf'
  },
  {
    id: 2,
    title: 'азбука',
    img: 'dfdf'
  },
  {
    id: 3,
    title: 'яблоко',
    img: 'dfdf'
  },
  {
    id: 4,
    title: 'модель',
    img: 'dfdf'
  },
  {
    id: 5,
    title: 'модель',
    img: 'dfdf'
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Categories',category, {});
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Categories', null, {});
     
  }
};
