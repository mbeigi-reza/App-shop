// src/components/ProductImages.jsx
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ProductImages = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-6">
      <div className="flex justify-center items-center overflow-hidden relative h-80">
        {images.map((img, index) => {
          const isActive = index === currentIndex;
          const offset = (index - currentIndex) * 40;

          return (
            <img
              key={index}
              src={img}
              alt={`product-${index}`}
              className={`absolute transition-all duration-500 rounded-lg shadow-lg cursor-pointer border-2
                ${isActive 
                  ? "scale-100 z-20 border-amber-400 dark:border-amber-500 shadow-amber-200/50 dark:shadow-amber-500/30" 
                  : "scale-90 opacity-70 z-10 border-amber-100 dark:border-gray-600"
                }
              `}
              style={{
                transform: `translateX(${offset}px)`,
              }}
            />
          );
        })}
      </div>

      {/* دکمه‌های ناوبری */}
      <button
        onClick={prevImage}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-amber-500 dark:bg-amber-600 text-white p-3 rounded-full hover:bg-amber-600 dark:hover:bg-amber-700 hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-amber-300/40 dark:hover:shadow-amber-500/30"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-amber-500 dark:bg-amber-600 text-white p-3 rounded-full hover:bg-amber-600 dark:hover:bg-amber-700 hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-amber-300/40 dark:hover:shadow-amber-500/30"
      >
        <FiChevronRight size={24} />
      </button>

      {/* ایندیکاتور */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-amber-500 dark:bg-amber-400 scale-125" 
                : "bg-amber-200 dark:bg-gray-600 hover:bg-amber-300 dark:hover:bg-amber-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;