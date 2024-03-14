const express = require('express');
const router = express.Router();
const multer = require('multer');

const uploadDestination = 'uploads';

//Показываем где хранить файлы
const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

router.get('/register', (reg, res) => {
  res.send('register');
});

module.exports = router;
