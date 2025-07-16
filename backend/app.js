// app.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const chatRoutes = require('./routes/chatRoutes');
const fileRoutes = require('./routes/fileRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/files', fileRoutes);

// Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
