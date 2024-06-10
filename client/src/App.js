import React, { useState } from 'react';
import ImageGenerator from './components/ImageGenerator';
import Gallery from './components/Gallery';
// import './App.css';

const App = () => {
  const [images, setImages] = useState([]);

  const handleImagesGenerated = (generatedImages) => {
    setImages(generatedImages);
  };

  return (
    <div className="App">
      <ImageGenerator onImagesGenerated={handleImagesGenerated} />
      <Gallery images={images} />
    </div>
  );
};

export default App;
