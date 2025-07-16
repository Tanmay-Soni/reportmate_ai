export default function FilePreview({ files, onRemove }) {
    return (
      <>
        {files.map((file, index) => (
          <div key={index} className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-lg p-2 min-w-0 flex-shrink-0">
            {/* File icon */}
            <div className="w-8 h-8 bg-pink-100 rounded flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
            </div>
            
            {/* File info */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
              <p className="text-xs text-gray-500">{file.type.toUpperCase() || 'FILE'}</p>
            </div>
            
            {/* Remove button */}
            <button
              onClick={() => onRemove(index)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1 flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))}
      </>
    );
  }
  