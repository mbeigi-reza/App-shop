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
          const offset = (index - currentIndex) * 40; // فاصله بین تصاویر

          return (
            <img
              key={index}
              src={img}
              alt={`product-${index}`}
              className={`absolute transition-all duration-500 rounded-lg shadow-lg cursor-pointer
                ${isActive ? "scale-100 z-20" : "scale-90 opacity-70 z-10"}
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
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
      >
        <FiChevronRight size={24} />
      </button>
    </div>
  );
};

export default ProductImages;
