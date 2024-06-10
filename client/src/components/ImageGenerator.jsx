import React, { useState } from 'react';
import '../styles/gallery.css';

const ImageGenerator = ({ onImagesGenerated }) => {
  const [prompt, setPrompt] = useState('');

  const generateImages = async () => {
    try {
      const response = await fetch('http://localhost:3001/generate-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      onImagesGenerated(data.images);
    } catch (error) {
      console.error('Error generating images:', error);
    }
  };

  const searchImages = () => {
    generateImages();
  };

  return (
    <div id="search-form">
      <input
        id="search-input"
        type="text"
        placeholder="Enter a prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(event) => {
          if (event.keyCode === 13) {
            searchImages();
          }
        }}
      />
      <button id="search-button" type="button" onClick={searchImages}>Search</button>
    </div>
  );
};

export default ImageGenerator;
