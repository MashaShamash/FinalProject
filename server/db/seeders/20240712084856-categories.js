'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories',
    [
      {
        title: 'Авангардизм',
        img: 'https://avatars.mds.yandex.net/i?id=e6a0184fb888ac7cb41333393e202d5a61d7c538-10121616-images-thumbs&n=13',
        
      },
      {
        title: 'Ампир',
        img: 'https://avatars.mds.yandex.net/i?id=f1fda291c68df54c15ee9897a16a95896cf18185-12529777-images-thumbs&n=13',
       
      },
      {
        title: 'Готика',
        img: 'https://avatars.mds.yandex.net/i?id=c528c1d851a6cabe2d26e6a4bb836bbd6b5faeb66e746567-4395898-images-thumbs&n=13',
      
      },
      {
        title: 'Гиперриализм',
        img: 'https://avatars.mds.yandex.net/i?id=22d89905a23ada335754a67eb6e1d1b52bf29f92-12718967-images-thumbs&n=13',
        
      },
      {
        title: 'Класицизм',
        img: 'https://avatars.mds.yandex.net/i?id=db1e3bf88e66c2112e907cd2477873060b030e09-4662446-images-thumbs&n=13',
       
      },
    ],
    {});

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};