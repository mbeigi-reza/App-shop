// src/components/RandomImageManager.jsx
import { useState, useEffect } from 'react';

const RandomImageManager = ({ images, productCount, children }) => {
  const [currentImages, setCurrentImages] = useState([]);

  const getRandomImage = () => {
    if (!images || images.length === 0) return '';
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  useEffect(() => {
    // مقداردهی اولیه
    if (productCount > 0) {
      const initialImages = Array(productCount).fill().map(() => getRandomImage());
      setCurrentImages(initialImages);
    }
  }, [images, productCount]);

  return children(currentImages);
};

export default RandomImageManager;