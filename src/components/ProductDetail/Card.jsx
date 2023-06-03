import React, { useState } from 'react';
import './Card.css';

const Card = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="card" >
      <div className="slider">
        <img className="slide" onClick={onClick} src={images[currentIndex].url} alt="Slider Image" />
        <button className="arrow previous" onClick={handlePrevious}>
          &#8249;
        </button>
        <button className="arrow next" onClick={handleNext}>
          &#8250;
        </button>
      </div>
      {/* <div className="details" onClick={onClick}>
        {/* <h2 className="name">{name}</h2>
        <p className="price">{price}</p>
        <p className="day">{day}</p> */}
      </div> */}
    </div>
  );
};

export default Card;
