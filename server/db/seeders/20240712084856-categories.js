'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories',
    [
      {
        title: 'Современное искусство',
        img: 'https://d7hftxdivxxvm.cloudfront.net/?height=218&quality=80&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F3NWE5exOx6ni85xifx7aeg%2Fnormalized.jpg&width=387',
        
      },
      {
        title: 'Уличное искусство',
        img: 'https://d7hftxdivxxvm.cloudfront.net/?height=218&quality=80&resize_to=fill&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FKmJZWb8ZAhKGv3mi7jT95w%2Fnormalized.jpg&width=387',
       
      },
      {
        title: 'Развивающее искусство',
        img: 'https://d7hftxdivxxvm.cloudfront.net/?height=218&quality=80&resize_to=fill&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2Fmarketing_collections%2Fimages%2F3640a99b-4b4c-44ef-a257-a80da50ecdbe%3FX-Amz-Expires%3D43200%26X-Amz-Date%3D20240716T133807Z%26X-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DAKIAICYI665LIMIGJ6KQ%252F20240716%252Fus-east-1%252Fs3%252Faws4_request%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Signature%3D4ea56f5db515a66ae0dac1f19325b4d3532777d4643003a82886f09980b69c36&width=387',
      
      },
      {
        title: 'Искусство 20-го века',
        img: 'https://d7hftxdivxxvm.cloudfront.net/?height=218&quality=80&resize_to=fill&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2Fmarketing_collections%2Fimages%2F23aafc87-2498-492c-a87b-5a1568ca86b0%3FX-Amz-Expires%3D43200%26X-Amz-Date%3D20240716T133807Z%26X-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DAKIAICYI665LIMIGJ6KQ%252F20240716%252Fus-east-1%252Fs3%252Faws4_request%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Signature%3D26ad4f6c442362736bcc7bd57bc69a5c08e354aedc4c3574987b9c16a35cab0c&width=387',
        
      },
      {
        title: 'Живопись',
        img: 'https://d7hftxdivxxvm.cloudfront.net/?height=218&quality=80&resize_to=fill&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2Fmarketing_collections%2Fimages%2Fe53f2a60-64a5-4303-8121-08b24f1f665f%3FX-Amz-Expires%3D43200%26X-Amz-Date%3D20240716T133807Z%26X-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DAKIAICYI665LIMIGJ6KQ%252F20240716%252Fus-east-1%252Fs3%252Faws4_request%26X-Amz-SignedHeaders%3Dhost%26X-Amz-Signature%3D6f7de6e04a219932c05a9f52df2b2af4ac54218960c2e4e2aa30bbb7d802067d&width=387',
       
      },
    ],
    {});

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};