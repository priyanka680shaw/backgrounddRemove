

// src/RemoveBackground.js
import React, { useState } from 'react';
import axios from 'axios';

const RemoveBackground = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleRemoveBackground = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('image_file', selectedFile);

    try {
      const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
        headers: {
          'X-Api-Key': 'ByE5UG5eNjaC6wokeFmNKmr5', // Replace with your Remove.bg API key
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'
      });

      const imageBlob = new Blob([response.data], { type: 'image/png' });
      const imageObjectUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageObjectUrl);
    } catch (error) {
      console.error('Error removing background:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Background Removal App</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleRemoveBackground} disabled={loading}>
        {loading ? 'Processing...' : 'Remove Background'}
      </button>
      {imageUrl && (
        <div>
          <h2>Result:</h2>
          <img src={imageUrl} alt="Background removed" />
        </div>
      )}
    </div>
  );
};

export default RemoveBackground;
