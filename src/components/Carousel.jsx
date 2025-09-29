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

      {/* متن روی کاروسل */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center z-20">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 drop-shadow-lg">
          فروشگاه اینترنتی ما
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 drop-shadow-md">
          بهترین محصولات با کیفیت عالی
        </p>
      </div>
    </div>
  );
};

export default Carousel;