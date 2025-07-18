import { useState, useRef } from 'react';
import FilePreview from './FilePreview';
import { uploadFile } from "../services/openaiFileService";

export default function InputBar({ onSend, isCentered = false, uploadedFiles = [], onRemoveFile }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'; // limit to 120px
  };

  const hasFiles = uploadedFiles && uploadedFiles.length > 0;

  return (
    <div className={`bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:border-gray-300 mb-4 ${
      isCentered ? 'max-w-3xl mx-auto' : 'w-[90%] mx-auto'
    }`}>    
      {/* File previews - horizontal scroll */}
      {hasFiles && (
        <div className="p-3 border-b border-gray-100">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
            <FilePreview files={uploadedFiles} onRemove={onRemoveFile} />
          </div>
        </div>
      )}
      
      {/* Input area */}
      <div className="flex items-center p-3 space-x-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleTextareaChange}
          onKeyPress={handleKeyPress}
          placeholder="Ask anything or Drag-and-Drop a file"
          className="flex-1 resize-none border-none outline-none text-gray-700 placeholder-gray-500 text-lg leading-tight max-h-32 py-2"
          rows={1}
          style={{
            minHeight: '40px', // matches button height
            maxHeight: '120px',
            overflowY: 'auto',
            alignSelf: 'center'
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={!input.trim()}
          className="bg-[#2563eb] text-white px-6 py-2 rounded-xl hover:bg-[#1d4ed8] disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg transition-all duration-150"
          style={{
            height: '40px', // matches min textarea height
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Ask AI
        </button>
      </div>
    </div>
  );
}
