import { useState, useEffect } from 'react';
import ChatUI from './components/ChatUI';
import InputBar from './components/InputBar';
import Sidebar from './components/Sidebar';
import FileDropOverlay from './components/FileDropOverlay';
import FilePreview from './components/FilePreview'; 

function App() {
  const [savedChats, setSavedChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const getCurrentChat = () => savedChats.find(chat => chat.id === currentChatId);

  useEffect(() => {
    if (savedChats.length === 0) {
      const newChat = {
        id: Date.now(),
        title: 'New Chat',
        messages: [
          { role: 'ai', content: "I'm here for your help, don't hesitate and ask please" }
        ]
      };
      setSavedChats([newChat]);
      setCurrentChatId(newChat.id);
    }
  }, []);

  useEffect(() => {
    const preventDefaults = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const handleDrop = (e) => {
      preventDefaults(e);
      // Handle file drop here if needed
    };

    document.addEventListener('dragover', preventDefaults, true);
    document.addEventListener('drop', handleDrop, true);

    return () => {
      document.removeEventListener('dragover', preventDefaults, true);
      document.removeEventListener('drop', handleDrop, true);
    };
  }, []);

  // Add this function to handle file drops
  const handleFileDrop = async (file) => {
    console.log('App received file:', file.name);
    setUploadedFiles(prev => {
      const newFiles = [...prev, file];
      console.log('Updated uploadedFiles:', newFiles); // Add this log
      return newFiles;
    });
    // You can add file upload logic here if needed
  };

  const generateChatTitle = (message) => {
    return message.split(' ').slice(0, 3).join(' ') + '...';
  };

  const handleSendMessage = async (userInput) => {
    if (!currentChatId) return;

    const newMessage = { role: 'user', content: userInput };
    setIsLoading(true);

    setSavedChats(prev => prev.map(chat => {
      if (chat.id === currentChatId) {
        let updatedChat = { ...chat, messages: [...chat.messages, newMessage] };
        if (chat.title === 'New Chat') {
          updatedChat.title = generateChatTitle(userInput);
        }
        return updatedChat;
      }
      return chat;
    }));

    try {
      const res = await fetch('http://localhost:5000/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();
      const finalAIMessage = { role: 'ai', content: data.response || 'No response from AI.' };

      setSavedChats(prev => prev.map(chat => {
        if (chat.id === currentChatId) {
          return {
            ...chat,
            messages: [...chat.messages, finalAIMessage]
          };
        }
        return chat;
      }));

    } catch (error) {
      setSavedChats(prev => prev.map(chat => {
        if (chat.id === currentChatId) {
          return {
            ...chat,
            messages: [...chat.messages, { role: 'ai', content: 'Error fetching AI response.' }]
          };
        }
        return chat;
      }));
    }

    setIsLoading(false);
  };

  const handleSelectChat = (chat) => {
    setCurrentChatId(chat.id);
  };

  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: 'New Chat',
      messages: [
        { role: 'ai', content: "I'm here for your help, don't hesitate and ask please" }
      ]
    };
    setSavedChats(prev => [...prev, newChat]);
    setCurrentChatId(newChat.id);
  };

  const handleDeleteChat = (chatId) => {
    setSavedChats(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  };

  const handleClearAllChats = () => {
    setSavedChats([]);
    setCurrentChatId(null);
  };

  const currentChat = getCurrentChat();
  const userHasStarted = currentChat?.messages.some(msg => msg.role === 'user');

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Add FileDropOverlay at the top level */}
      <FileDropOverlay onFileUploaded={handleFileDrop} />
      
      <Sidebar
        savedChats={savedChats}
        onSelectChat={handleSelectChat}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onNewChat={handleNewChat}
        currentChatId={currentChatId}
        onDeleteChat={handleDeleteChat}
        onClearAllChats={handleClearAllChats} 
      />

      <div className="flex flex-col flex-1 transition-all duration-300 bg-gray-100">
        <div className={`flex-1 overflow-y-auto p-4`}>
          {currentChatId ? (
            userHasStarted ? (
              <ChatUI
                messages={currentChat?.messages || []}
                isLoading={isLoading}
                uploadedFiles={uploadedFiles}
                onRemoveFile={(index) => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
              />
            ) : (
              <div className="relative h-full flex flex-col items-center justify-start">
                <div className="mt-20 text-center max-w-md px-4">
                  <p className="text-xl font-medium text-gray-500 leading-relaxed">
                    I'm here for your help,<br />
                    don't hesitate and ask please.
                  </p>
                </div>
                
                <div className="absolute top-1/2 transform -translate-y-1/2 left-0 w-full flex flex-col items-center">
                  <div className="w-full max-w-3xl px-4">
                    <InputBar 
                      onSend={handleSendMessage} 
                      isCentered={true} 
                      uploadedFiles={uploadedFiles}
                      onRemoveFile={(index) => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap justify-center max-w-3xl px-4">
                    {[
                      "Analyze a transcript for fraud risk",
                      "Document SOX controls for financial reporting",
                      "Provide an example of ESG governance structure",
                      "Perform a PESTLE analysis on a company"
                    ].map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(prompt)}
                        className="bg-gray-200 hover:bg-gray-300 text-sm rounded-full px-4 py-2 m-1 transition"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="text-center text-gray-500 mt-10">
              Start a new chat from the sidebar.
            </div>
          )}
        </div>

        {userHasStarted && (
          <div className="bg-gray-100">
            <InputBar 
              onSend={handleSendMessage} 
              isCentered={false} 
              uploadedFiles={uploadedFiles}
              onRemoveFile={(index) => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
