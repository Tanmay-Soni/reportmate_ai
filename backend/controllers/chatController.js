const { createAssistantThread, sendMessageToAssistant, runAssistant, pollAssistantResponse } = require('../services/openaiService');

exports.handleChat = async (req, res) => {
  const { message, fileIds } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // 1. Create a new thread for this chat (or reuse if you want persistent threads)
    const threadId = await createAssistantThread();
    // 2. Send the user's message and file IDs
    await sendMessageToAssistant(threadId, message, fileIds);
    // 3. Run the assistant
    const runId = await runAssistant(threadId);
    // 4. Poll for the assistant's response
    const aiResponse = await pollAssistantResponse(threadId, runId);
    res.json({ response: aiResponse });
  } catch (error) {
    console.error('Error in handleChat:', error);
    
    // Send the actual error message to the frontend
    let errorMessage = 'Unknown error occurred';
    
    if (error.message) {
      errorMessage = error.message;
    } else if (error.response && error.response.data && error.response.data.error) {
      // Handle OpenAI API errors
      errorMessage = error.response.data.error.message || error.response.data.error;
    } else if (error.code) {
      // Handle specific error codes
      switch (error.code) {
        case 'ENOTFOUND':
          errorMessage = 'Network error: Unable to connect to OpenAI API';
          break;
        case 'ECONNRESET':
          errorMessage = 'Connection reset: Please try again';
          break;
        case 'ETIMEDOUT':
          errorMessage = 'Request timeout: Please try again';
          break;
        default:
          errorMessage = `Error ${error.code}: ${error.message || 'Unknown error'}`;
      }
    }
    
    res.status(500).json({ error: errorMessage });
  }
};
