const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const { handleFileUpload } = require('../controllers/fileController');

router.post('/upload', uploadMiddleware, handleFileUpload);

module.exports = router;
