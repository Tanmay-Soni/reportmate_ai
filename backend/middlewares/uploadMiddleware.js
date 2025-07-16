// middlewares/uploadMiddleware.js
const multer = require('multer');

// Temporary memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
