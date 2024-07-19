'use strict';

const fs = require('fs').promises

const path = require('path')

async function getAllProfile () {
    try {
      const getReadFile = await fs.readFile(path.join(__dirname, '..', '..', '/scriptSeeads/updated_data.json'), 'utf8')
        const parsGetReadFile = JSON.parse(getReadFile)
        const newArrUser = []
      
        parsGetReadFile.map( (el, i) => {
          newArrUser.push({name: el.name, lastName: el.lastName, pseudonym: el.pseudonym, biography: el.biography, userId: i + 1, conDan: '+79752345644', img: '/img/photo17067660560.webp', activity: 'Поэт'})
        })
     
      return newArrUser
    } catch (error) {
      console.log(error);
    }
  }


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const profile = await getAllProfile();
     await queryInterface.bulkInsert('Profiles', profile
     , {});
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Profiles', null, {});
     
  }
};