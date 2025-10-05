// src/components/ProductCard.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, title, price, imgSrc }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col border border-amber-100 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-500 hover:shadow-amber-100/50 dark:hover:shadow-amber-500/20 overflow-hidden w-full h-full">
      
      {/* بخش عکس - scalable با aspect ratio */}
      <div className="w-full aspect-[4/3] relative overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            console.error('Image failed to load:', imgSrc);
            e.target.src = 'https://via.placeholder.com/400x300/EF4444/FFFFFF?text=Error+Loading';
          }}
        />
        
        {/* Overlay روی hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </div>

      {/* بخش محتوا - کاملاً scalable */}
      <div className="p-2 sm:p-3 lg:p-4 flex flex-col flex-grow space-y-1 sm:space-y-2 lg:space-y-3">
        
        {/* عنوان - فونت scalable */}
        <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-gray-800 dark:text-white text-center line-clamp-2 flex-grow leading-tight min-h-[2.5rem] sm:min-h-[3rem]">
          {title}
        </h3>
        
        {/* قیمت - فونت scalable */}
        <span className="text-amber-700 dark:text-amber-400 font-bold text-sm sm:text-base lg:text-lg xl:text-xl text-center">
          {price.toLocaleString()} تومان
        </span>

        {/* دکمه‌ها - کاملاً scalable */}
        <div className="flex gap-1 sm:gap-2 lg:gap-3 mt-auto">
          <button
            onClick={() => navigate(`/product/${id}`)}
            className="flex-1 px-1 sm:px-2 lg:px-3 lg:text-xl xl:px-3 xl:text-base py-1.5 sm:py-2 lg:py-2.5 bg-gray-800 dark:bg-gray-700 text-amber-400 dark:text-amber-300 rounded sm:rounded-lg hover:scale-105 transition-all duration-200 hover:bg-gray-700 dark:hover:bg-gray-600 hover:shadow-lg hover:shadow-amber-200/30 dark:hover:shadow-amber-400/20 font-medium text-xs sm:text-sm"
          >
           مشاهده
          </button>

          <button
            onClick={() =>
              addToCart({
                id,
                name: title,
                price,
                image: imgSrc,
                qty: 1,
              })
            }
            className="flex-1 px-1 sm:px-2 lg:px-3 lg:text-xl xl:px-4 xl:text-xl py-1.5 sm:py-2 lg:py-2.5 bg-amber-500 dark:bg-amber-600 text-white rounded sm:rounded-lg hover:scale-105 transition-all duration-200 hover:bg-amber-600 dark:hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-300/40 dark:hover:shadow-amber-500/30 font-medium text-xs sm:text-sm"
          >
            افزودن
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;