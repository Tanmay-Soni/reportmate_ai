import { useState, useEffect } from 'react';

export default function FileDropOverlay({ onFileUploaded }) {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Prevent default drag behaviors globally
    const preventDefaults = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const handleDragOver = (e) => {
      preventDefaults(e);
      setIsDragging(true);
    };

    const handleDragEnter = (e) => {
      preventDefaults(e);
      setIsDragging(true);
    };

    const handleDragLeave = (e) => {
      preventDefaults(e);
      // Only set dragging to false if we're leaving the window entirely
      if (e.clientX <= 0 || e.clientY <= 0 || 
          e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        setIsDragging(false);
      }
    };

    const handleDrop = (e) => {
      preventDefaults(e);
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files || []);
      console.log('Files dropped:', files); // Add this log
      
      if (files.length > 0) {
        files.forEach(file => {
          console.log('Processing file:', file.name); // Add this log
          onFileUploaded(file);
        });
      }
    };

    // Add event listeners to multiple targets
    const targets = [document, window, document.body];
    
    targets.forEach(target => {
      target.addEventListener('dragover', handleDragOver, true);
      target.addEventListener('dragenter', handleDragEnter, true);
      target.addEventListener('dragleave', handleDragLeave, true);
      target.addEventListener('drop', handleDrop, true);
    });

    // Also prevent defaults on the document
    document.addEventListener('dragover', preventDefaults, true);
    document.addEventListener('drop', preventDefaults, true);

    return () => {
      targets.forEach(target => {
        target.removeEventListener('dragover', handleDragOver, true);
        target.removeEventListener('dragenter', handleDragEnter, true);
        target.removeEventListener('dragleave', handleDragLeave, true);
        target.removeEventListener('drop', handleDrop, true);
      });
      document.removeEventListener('dragover', preventDefaults, true);
      document.removeEventListener('drop', preventDefaults, true);
    };
  }, [onFileUploaded]);

  return (
    isDragging && (
      <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center pointer-events-none">
        <div className="bg-white rounded-lg px-6 py-3 shadow-lg text-gray-700 font-medium pointer-events-none">
          Drop file anywhere to upload
        </div>
      </div>
    )
  );
}
