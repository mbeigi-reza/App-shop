import { useState, useEffect } from "react";
import img1 from "../images/Untitled1.png";
import img2 from "../images/Untitled2.png";
import img3 from "../images/Untitled3.png";


const images = [img1, img2, img3];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <div className="w-full h-[60vh] md:h-screen relative overflow-hidden">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}

      {/* دایره‌های پایین */}
      <div className="absolute bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-4 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white transition-all duration-500 ease-in-out
              ${index === currentIndex ? "w-5 h-5 md:w-6 md:h-6 bg-white shadow-lg" : "bg-transparent"}
            `}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
