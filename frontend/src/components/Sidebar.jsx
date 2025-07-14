import { useState } from 'react';

export default function Sidebar({
  savedChats,
  onSelectChat,
  isOpen,
  onToggle,
  onNewChat,
  currentChatId,
  onDeleteChat,
  onClearAllChats,     // <-- New prop
}) {
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
            {hovering ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle();
                }}
                className="flex flex-col justify-center items-center w-8 h-8"
              >
                <span className="block w-5 h-0.5 bg-gray-600 mb-1"></span>
                <span className="block w-5 h-0.5 bg-gray-600 mb-1"></span>
                <span className="block w-5 h-0.5 bg-gray-600"></span>
              </button>
            ) : (
              <img src="/workiva_icon.png" alt="Workiva" className="w-8 h-8" />
            )}
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

        {/* Clear All Chats Button */}
        <div className="p-4 border-t">
            <button
                onClick={(e) => {
                e.stopPropagation();
                onClearAllChats();
                }}
                className="flex items-center justify-center w-full bg-white text-gray-500 hover:bg-red-600 hover:text-black py-2 rounded transition font-medium"
            >
                <svg
                className="w-4 h-4 mr-2 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                >
                <path d="M9 3v1H4v2h16V4h-5V3H9zm-3 5v12a2 2 0 002 2h8a2 2 0 002-2V8H6zm4 2h2v8h-2v-8zm4 0h2v8h-2v-8z" />
                </svg>
                Clear All Chats
            </button>
        </div>
        </>
      )}
    </div>
  );
}
