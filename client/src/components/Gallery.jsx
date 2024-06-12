import React, { useEffect } from 'react';
import '../styles/gallery.css';
import LoadingCube from './LoadingCube';

// display immersive screen
const Gallery = ({ images }) => {
  const visible = false;
useEffect(() => {
  const handleMouseMove = (e) => {
    const wrapper = document.getElementById('wrapper');
    const rect = wrapper.getBoundingClientRect();
    const mouseX = Math.min(Math.max(e.clientX - 200, 0), rect.width - 400);
    const rawPercent = ((mouseX / (rect.width - 400)) * 300) - 100;

    const left = document.getElementById('left');
    const center = document.getElementById('center');
    const right = document.getElementById('right');

    const depth = rawPercent / 5;

    left.style.transform = `translateX(${rawPercent}%) translateZ(${depth}px)`;
    center.style.transform = `translateX(${rawPercent - 100}%) translateZ(${depth}px)`;
    right.style.transform = `translateX(${rawPercent - 200}%) translateZ(${depth}px)`;
  };

  document.addEventListener('mousemove', handleMouseMove);
  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
  };
}, []);


  return (
    <div className="wrapper" id="wrapper">
      {/* {images && (
        <LoadingCube visible={visible} />
      )} */}
      <div className="wrapper-3d">
        <div className="screen-wrapper center-screen">
          <div className="screen-container" id="center">
            {images.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className={`main ${index === 0 ? 'first' : index === 1 ? 'second' : 'third'}`}
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            ))}
          </div>
        </div>
        <div className="screen-wrapper left-screen center-screen">
          <div className="screen-container" id="left">
            {images.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className={`main ${index === 0 ? 'first' : index === 1 ? 'second' : 'third'}`}
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            ))}
          </div>
        </div>
        <div className="screen-wrapper right-screen center-screen">
          <div className="screen-container" id="right">
            {images.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className={`main ${index === 0 ? 'first' : index === 1 ? 'second' : 'third'}`}
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <h2 className="grid top-grid" id="t">Welcome to The Art Gallery Experience</h2>
    </div>
  );
};

export default Gallery;