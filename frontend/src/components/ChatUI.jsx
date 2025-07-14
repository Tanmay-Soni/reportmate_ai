import { useEffect, useRef } from 'react';

export default function ChatUI({ messages, isLoading }) {
  const containerRef = useRef(null);
  const scrollAnchorRef = useRef(null);

  useEffect(() => {
    if (scrollAnchorRef.current) {
      scrollAnchorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col space-y-4 overflow-y-auto p-4"
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`w-full flex ${
            msg.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`prose whitespace-pre-wrap break-words ${
              msg.role === 'user'
                ? 'bg-blue-100 text-black p-3 rounded-lg max-w-[75%]'
                : 'bg-transparent text-black p-3 rounded-lg w-full'
            }`}
            style={{ overflowWrap: 'anywhere' }}
            dangerouslySetInnerHTML={{
              __html: msg.content
                .replace(
                  /```([\s\S]*?)```/g,
                  '<pre class="bg-gray-800 text-white p-3 rounded-lg overflow-x-auto"><code>$1</code></pre>'
                )
                .replace(/\n/g, '<br>'),
            }}
          ></div>
        </div>
      ))}

      {isLoading && (
        <div className="w-full flex justify-start">
          <div className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-600">Processing...</span>
          </div>
        </div>
      )}

      <div ref={scrollAnchorRef} />
    </div>
  );
}
