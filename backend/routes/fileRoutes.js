// routes/fileRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const fileController = require('../controllers/fileController');

// POST /api/files/upload
router.post('/upload', upload.single('file'), fileController.handleFileUpload);

module.exports = router;
