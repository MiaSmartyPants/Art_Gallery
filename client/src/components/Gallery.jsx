import React, { useEffect } from 'react';
import '../styles/gallery.css';

const Gallery = ({ images }) => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const wrapper = document.getElementById('wrapper');
      const rect = wrapper.getBoundingClientRect();
      const padding = 200;
      const slidesCount = 3 - 1;

      const map = (x, in_min, in_max, out_min, out_max) => {
        return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
      };

      const mouseX = Math.min(Math.max(e.clientX - padding, 0), rect.width - padding * 2);
      const rawPercent = map(mouseX, 0, rect.width - padding * 2, 100 - 100 * slidesCount, 100);
      const percent = Math.round(rawPercent);
      const left = document.getElementById('left');
      const center = document.getElementById('center');
      const right = document.getElementById('right');

      left.style.transform = `translateX(${percent}%)`;
      center.style.transform = `translateX(${percent - 100}%)`;
      right.style.transform = `translateX(${percent - 200}%)`;

      const paragraph = document.getElementById('t');
      paragraph.innerHTML = percent;
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="wrapper" id="wrapper">
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
        Move your mouse horizontally
      </p>
    </div>
  );
};

export default Gallery;
