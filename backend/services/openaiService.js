const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const apiKey = process.env.OPENAI_API_KEY;
const assistantId = process.env.OPENAI_ASSISTANT_ID; // Set this in your .env
const openaiBase = 'https://api.openai.com/v1';

// --- Assistants API ---

exports.createAssistantThread = async () => {
  try {
    const response = await axios.post(
      `${openaiBase}/threads`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v2'
        }
      }
    );
    return response.data.id;
  } catch (error) {
    console.error('Error creating thread:', error.response?.data || error.message);
    throw error;
  }
};

exports.sendMessageToAssistant = async (threadId, message, fileIds) => {
  try {
    const response = await axios.post(
      `${openaiBase}/threads/${threadId}/messages`,
      {
        role: 'user',
        content: message,
        attachments: fileIds && fileIds.length > 0
          ? fileIds.map(id => ({
              file_id: id,
              tools: [{ type: 'file_search' }]
            }))
          : undefined
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v2'
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error('Error sending message to assistant:', error.response?.data || error.message);
    throw error;
  }
};


exports.runAssistant = async (threadId) => {
  try {
    const response = await axios.post(
      `${openaiBase}/threads/${threadId}/runs`,
      {
        assistant_id: assistantId
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v2'
        }
      }
    );
    return response.data.id;
  } catch (error) {
    console.error('Error running assistant:', error.response?.data || error.message);
    throw error;
  }
};

exports.pollAssistantResponse = async (threadId, runId, timeoutMs = 60000) => { // Increased to 60 seconds
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      // Check run status
      const runRes = await axios.get(
        `${openaiBase}/threads/${threadId}/runs/${runId}`,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'OpenAI-Beta': 'assistants=v2'
          }
        }
      );
      if (runRes.data.status === 'completed') {
        // Get messages
        const msgRes = await axios.get(
          `${openaiBase}/threads/${threadId}/messages`,
          {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'OpenAI-Beta': 'assistants=v2'
            }
          }
        );
        // Find the latest assistant message
        const assistantMsg = msgRes.data.data.find(m => m.role === 'assistant');
        return assistantMsg?.content[0]?.text?.value || '';
      } else if (runRes.data.status === 'failed') {
        const errorMsg = runRes.data.last_error?.message || 'Assistant run failed';
        throw new Error(`Assistant run failed: ${errorMsg}`);
      } else if (runRes.data.status === 'expired') {
        throw new Error('Assistant run expired - please try again');
      }
      await new Promise(r => setTimeout(r, 1500));
    } catch (error) {
      console.error('Error polling assistant response:', error.response?.data || error.message);
      throw error;
    }
  }
  throw new Error('Assistant response timed out');
};

// --- File upload (already present) ---
exports.uploadFileToOpenAI = async (localFilePath) => {
  const formData = new FormData();
  formData.append('purpose', 'assistants');
  formData.append('file', fs.createReadStream(localFilePath));

  try {
    const response = await axios.post(`${openaiBase}/files`, formData, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        ...formData.getHeaders(),
        'OpenAI-Beta': 'assistants=v2'
      }
    });
    const fileId = response.data.id;
    await exports.waitForFileProcessed(fileId);
    return response.data;  // Contains file ID etc.
  } catch (error) {
    console.error('Error uploading file to OpenAI:', error.response?.data || error.message);
    throw error;
  }
};

exports.waitForFileProcessed = async (fileId, timeoutMs = 20000) => {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await axios.get(`${openaiBase}/files/${fileId}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'OpenAI-Beta': 'assistants=v2'
        }
      });
      if (res.data.status === 'processed') return;
      if (res.data.status === 'failed') throw new Error('File processing failed');
      await new Promise(r => setTimeout(r, 1500));
    } catch (error) {
      console.error('Error checking file status:', error.response?.data || error.message);
      throw error;
    }
  }
  throw new Error('File processing timed out');
};

// --- Remove old completions/chat function ---
// exports.getOpenAIResponse = async (message) => { ... } // (remove or comment out)
