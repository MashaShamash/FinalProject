const multer = require('multer');
const path = require('path');

// Настройки для multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img'); // Папка для сохранения файлов
  },
  filename: (req, file, cb) => {
    // Генерация уникального имени файла
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

module.exports = upload;