import { useState } from 'react';

export default function Sidebar({ savedChats, onSelectChat, isOpen, onToggle, onNewChat, currentChatId, onDeleteChat }) {
  const [hovering, setHovering] = useState(false);

  const handleClickCollapsed = () => {
    if (!isOpen) {
      onToggle();
    }
  };

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={handleClickCollapsed}
      style={{
        cursor: !isOpen ? 'e-resize' : 'default'
      }}
      className={`transition-all duration-300 bg-white shadow-md h-full flex flex-col ${
        isOpen ? 'w-64' : 'w-14'
      } relative`}
    >
      {/* Top Section */}
      <div className="flex justify-between items-center p-3 border-b relative">
        {!isOpen ? (
          <div className="w-10 h-10 mx-auto flex items-center justify-center">
            <img src="/workiva_icon.png" alt="Workiva" className="w-8 h-8" />
          </div>
        ) : (
          <>
            <img src="/workiva_icon.png" alt="Workiva" className="w-8 h-8" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="flex flex-col justify-center items-center w-8 h-8 ml-2"
            >
              <span className="block w-5 h-0.5 bg-gray-600 mb-1"></span>
              <span className="block w-5 h-0.5 bg-gray-600 mb-1"></span>
              <span className="block w-5 h-0.5 bg-gray-600"></span>
            </button>
          </>
        )}
      </div>

      {/* New Chat Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNewChat();
        }}
        className={`flex items-center px-4 py-2 hover:bg-gray-200 font-bold ${
          isOpen ? 'justify-start' : 'justify-center'
        }`}
      >
        <span className="text-xl">➕</span>
        {isOpen && <span className="ml-2">New Chat</span>}
      </button>

      {isOpen && (
        <>
          <div className="p-4 border-b font-bold text-lg">Chats</div>

          <div className="flex-1 overflow-y-auto">
            {savedChats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center justify-between px-4 py-2 hover:bg-gray-100 border-b ${
                  currentChatId === chat.id ? 'bg-gray-200' : ''
                }`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectChat(chat);
                  }}
                  className="flex-grow text-left truncate"
                >
                  {chat.title || 'Untitled Chat'}
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.id);
                  }}
                  className="text-gray-400 hover:text-red-500 ml-2"
                  title="Delete Chat"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
