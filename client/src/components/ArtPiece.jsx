import React from 'react';
import '../styles/art-piece.css';

const ArtPiece = ({ piece }) => {
  return (
    <div className="art-piece">
      <img src={piece} alt="Art" className="art-image" />
    </div>
  );
};

export default ArtPiece;
