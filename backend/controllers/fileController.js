// controllers/fileController.js
exports.handleFileUpload = (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }
  
      const fileInfo = {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size
      };
  
      // You could save the file buffer somewhere if needed: req.file.buffer
  
      res.json({ message: 'File uploaded successfully.', file: fileInfo });
    } catch (error) {
      console.error('File upload error:', error);
      res.status(500).json({ error: 'Failed to upload file.' });
    }
  };
  