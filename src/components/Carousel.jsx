import { useState, useEffect } from "react";
import img1 from "../images/Untitled1.jpg";
import img2 from "../images/Untitled2.jpg";
import img3 from "../images/Untitled3.jpg";

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
    <div className="w-full h-[100vh] md:h-screen relative overflow-hidden bg-white dark:bg-gray-900">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out
            ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        />
      ))}

      {/* Overlay سفید-طلایی */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/30 dark:from-gray-900/40 to-transparent z-10"></div>

      {/* متن وسط هدر */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 w-full px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-800 dark:text-white mb-4 drop-shadow-lg leading-tight">
          <span className="bg-gradient-to-l from-amber-500 to-amber-700 dark:from-amber-400 dark:to-amber-600 bg-clip-text text-transparent">
           اسپرت لند
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 drop-shadow-md">
          بهترین انتخاب برای سبک زندگی شما
        </p>
      </div>

      {/* دایره‌های پایین */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 ease-in-out border-2 border-amber-500 dark:border-amber-400
              ${
                index === currentIndex
                  ? "w-4 h-4 bg-amber-500 dark:bg-amber-400 shadow-lg shadow-amber-300/50 dark:shadow-amber-500/40 scale-110" 
                  : "w-3 h-3 bg-white/80 dark:bg-gray-700/80 hover:bg-amber-300 dark:hover:bg-amber-500 hover:scale-110"
              }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;