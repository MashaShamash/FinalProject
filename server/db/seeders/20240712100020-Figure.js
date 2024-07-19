'use strict';

const fs = require('fs').promises

const path = require('path')

async function getAllFigure () {
    try {
      const getReadFile = await fs.readFile(path.join(__dirname, '..', '..', '/scriptSeeads/updated_data.json'), 'utf8')
        const parsGetReadFile = JSON.parse(getReadFile)
        const newArrUser = []
      
        parsGetReadFile.map( (el, i) => {
          newArrUser.push({title: el.title, date: el.date, img: el.img, height: el.height, price: el.price, width: el.width, categoryId: el.categoryId, userId: i+1, sell: el.sell, materials: el.materials, name: el.name, lastName: el.lastName, pseudonym: el.pseudonym, biography: el.biography})
        })
     
      return newArrUser
    } catch (error) {
      console.log(error);
    }
  }


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const figures = await getAllFigure();
     await queryInterface.bulkInsert('Figures', figures
     , {});
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Figures', null, {});
     
  }
};
