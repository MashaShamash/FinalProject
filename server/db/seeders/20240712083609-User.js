'use strict';
const fs = require('fs').promises

const path = require('path')

async function getAllUser () {
    try {
      const getReadFile = await fs.readFile(path.join(__dirname, '..', '..', '/scriptSeeads/updated_data.json'), 'utf8')
        const parsGetReadFile = JSON.parse(getReadFile)
        const newArrUser = []
      
        parsGetReadFile.map( (el) => {
          newArrUser.push({name: el.name, lastName: el.lastName,email: el.email, password: el.password})
        })
       
      return newArrUser
    } catch (error) {
      console.log(error);
    }
  }

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await getAllUser();
     await queryInterface.bulkInsert('Users',users, {});
  },
  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
     
  }
};
