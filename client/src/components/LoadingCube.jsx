import React, { useState } from 'react';
import '../styles/loading-cube.css'

const LoadingCube = () => {
  
    return (
        <div>
        {/* {visible && ( */}
        <div role="document" aria-label="loadingcube">
      <div className="container">
        <div className="cube">
          <div className="front side"></div>
          <div className="back side"></div>
          <div className="left side"></div>
          <div className="right side"></div>
          <div className="top side"></div>
          <div className="bottom side"></div>
        </div>
      </div>
    </div>
          {/* )} */}
          {/* {!visible && (
            <div>
                <h2>Enter a promt and watch the art gallery come alive...</h2>
            </div>
          )} */}
</div>
    );
  };

  export default LoadingCube;