import { useState } from 'react';

export default function InputBar({ onSend, isCentered }) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim() !== '') {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div
      className={`flex items-center justify-center ${
        isCentered ? 'bg-gray-100' : 'w-full px-4 py-3 bg-gray-100'
      }`}
    >
      <div
        className={`flex items-center ${
          isCentered ? 'w-full' : 'w-4/5'
        } rounded-2xl shadow-md px-3 py-2`}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <div className="flex-grow overflow-x-auto whitespace-nowrap">
          <input
            type="text"
            placeholder="Ask AI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-black"
            style={{ minWidth: '0' }} // prevents input from expanding infinitely
          />
        </div>
        <button
          onClick={handleSubmit}
          className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition flex-shrink-0"
        >
          Ask AI
        </button>
      </div>
    </div>
  );
}
