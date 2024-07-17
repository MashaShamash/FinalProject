const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Функция для проверки существования файла
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

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

// Функция для фильтрации файлов
const fileFilter = (req, file, cb) => {
  const filePath = path.join('public/img', file.originalname);
  if (fileExists(filePath)) {
    // Файл с таким именем уже существует, продолжаем без ошибки
    cb(null, true);
  } else {
    // Разрешаем загрузку файла
    cb(null, true);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;