const express = require('express');
const router = express.Router();
const { handleChat } = require('../controllers/chatController');

router.post('/message', handleChat);

module.exports = router;
