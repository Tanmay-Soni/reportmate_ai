export async function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await fetch('/api/files/upload', {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('File upload failed');
    }
  
    return response.json();
  }
  