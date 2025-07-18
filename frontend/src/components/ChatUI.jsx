import { useEffect, useRef } from 'react';
import FilePreview from './FilePreview';
import ReactMarkdown from 'react-markdown';

export default function ChatUI({ messages, isLoading }) {
  const containerRef = useRef(null);
  const scrollAnchorRef = useRef(null);

  // Enhanced function to clean OpenAI response and remove citation markers
  const cleanResponse = (content) => {
    if (!content) return content;
  
    let cleaned = content
      // Remove citation markers
      .replace(/【\d+:\d+[†⁺‡§]source】/g, '')
      .replace(/【\d+:\d+source】/g, '')
      .replace(/【[^】]*source】/g, '')
  
      // Remove extra blank lines globally (keep only single line breaks)
      .replace(/\n{2,}/g, '\n')
  
      // Fix: Ensure list markers and their content stay on same line (OL & UL)
      .replace(/^([ \t]*([-*]|\d+\.)[ \t]*)\n+([^\n])/gm, '$1 $3')
  
      // Remove all extra spaces
      .trim();
  
    return cleaned;
  };
  
  

  useEffect(() => {
    if (scrollAnchorRef.current) {
      scrollAnchorRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Custom markdown components for better formatting
  const markdownComponents = {
    ul: ({ children }) => <ul className="list-disc pl-6 my-1 space-y-0.5">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-6 my-1 space-y-0.5">{children}</ol>,
    li: ({ children }) => <li className="mb-0.5">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-1">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 px-1 rounded text-sm">{children}</code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-800 text-white p-3 rounded-lg overflow-x-auto my-1">
        {children}
      </pre>
    ),
    p: ({ children }) => <p className="my-0">{children}</p>,
  };
  

  return (
    <div className="relative h-full">
      {/* Chat messages area */}
      <div
        ref={containerRef}
        className="flex flex-col space-y-2 overflow-y-auto p-4"
      >
        {messages.map((msg, index) => {
          
          // Clean the content for AI/assistant messages (check both 'assistant' and 'ai')
          const displayContent = (msg.role === 'assistant' || msg.role === 'ai') ? cleanResponse(msg.content) : msg.content;
          
          
          return (
            <div
              key={index}
              className={`w-full flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`whitespace-pre-wrap break-words ${
                  msg.role === 'user'
                    ? 'bg-blue-100 text-black p-3 rounded-lg max-w-[75%]'
                    : 'bg-transparent text-black p-3 rounded-lg w-full'
                }`}
                style={{ overflowWrap: 'anywhere' }}
              >
                <ReactMarkdown components={markdownComponents}>
                  {displayContent}
                </ReactMarkdown>
                {/* Render files if present */}
                {msg.files && msg.files.length > 0 && (
                  <div className="mt-2">
                    <FilePreview files={msg.files} onRemove={() => {}} />
                  </div>
                )}
              </div>
            </div>
          );
        })}

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
    </div>
  );
}
