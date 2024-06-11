import React, { useEffect } from 'react';
import '../styles/gallery.css';
import LoadingCube from './LoadingCube';

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
        <div className="carousel-wrapper center-3d">
          <div className="carousel-container" id="center">
            {images.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className={`slide ${index === 0 ? 'first' : index === 1 ? 'second' : 'third'}`}
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            ))}
          </div>
        </div>
        <div className="carousel-wrapper left-3d center-3d">
          <div className="carousel-container" id="left">
            {images.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className={`slide ${index === 0 ? 'first' : index === 1 ? 'second' : 'third'}`}
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            ))}
          </div>
        </div>
        <div className="carousel-wrapper right-3d center-3d">
          <div className="carousel-container" id="right">
            {images.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className={`slide ${index === 0 ? 'first' : index === 1 ? 'second' : 'third'}`}
                style={{ backgroundImage: `url(${image})` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <p className="debug debug-top" id="t">0</p>
      <p className="debug debug-bot">
        <br />
        <h2> Sroll to see the Magic! </h2>
      </p>
    </div>
  );
};

export default Gallery;
