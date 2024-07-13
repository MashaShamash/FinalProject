const axios = require('axios');
const random_name = require('node-random-name');
const randomEmail = require('random-email')
const fs = require('fs');

const apiKey = '2XK9Ou02';

async function fetchArtObjects() {
  try {

    let artObjectsData = [];
    let count = 0
   
    for (let i = 1; i <= 500; i++) {
      try {
        const response = await axios.get(`https://www.rijksmuseum.nl/api/nl/collection/SK-C-${i}`, {
          params: {
            key: apiKey,
            format: 'json'
          }
        });

 
        if (response.data.artObject) {
          count = count + 1
          const {
            title,
            titles,
            materials,
            webImage,
            description,
            principalMakers,
            dating,
          } = response.data.artObject;
          

          artObjectsData.push({
            id: count,
            userId: count,
            name: random_name({ first: true}),
            lastName: random_name({ last: true }),
            password: '12345',
            email: randomEmail(),
            pseudonym: principalMakers[0].unFixedName,
            activity: principalMakers[0].roles,
            biography: description,
            sell: false,
            img: webImage.url,
            width: webImage.width,
            height: webImage.height,
            price: Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000,
            title,
            date: dating.yearLate,
            materials,
            categoryId: Math.floor(Math.random() * 5) + 1,
          });
        }
      } catch (error) {
        console.error(`Ошибка при получении данных о произведении искусства SK-C-${i}:`, error.message);
      }


      await new Promise(resolve => setTimeout(resolve, 500));
    }

   
    fs.writeFileSync('art_objects_data_hay.json', JSON.stringify(artObjectsData, null, 2));
    console.log(`Данные о ${artObjectsData.length} произведениях искусства успешно записаны в файл art_objects_data.json`);
  } catch (error) {
    console.error('Ошибка при получении данных о произведениях искусства:', error.message);
  }
}

// fetchArtObjects();  // не удалять



