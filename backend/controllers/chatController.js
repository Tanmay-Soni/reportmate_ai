const { getOpenAIResponse } = require('../services/openaiService');

exports.handleChat = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const aiResponse = await getOpenAIResponse(message);
    res.json({ response: aiResponse });
  } catch (error) {
    console.error('Error in handleChat:', error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
};
