const { uploadFileToOpenAI } = require('../services/openaiService');
const fs = require('fs');

exports.handleFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const localPath = req.file.path;

    // Upload file to OpenAI
    const openAIResponse = await uploadFileToOpenAI(localPath);

    // Optionally delete the local file after upload
    fs.unlinkSync(localPath);

    res.json({
      message: 'File uploaded to OpenAI successfully.',
      openAIFileInfo: openAIResponse
    });

  } catch (error) {
    console.error('File upload error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to upload file.' });
  }
};
