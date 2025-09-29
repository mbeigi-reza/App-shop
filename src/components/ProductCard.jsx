// src/components/ProductCard.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, title, price, imgSrc }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // محاسبه نسبت براساس 294×168 در 1324px
  const aspectRatio = (168 / 294) * 100; // ≈ 57.14%

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col border border-amber-100 hover:border-amber-300 hover:shadow-amber-100/50 overflow-hidden w-full">
      {/* دیو دور عکس - با نسبت ثابت */}
      <div 
        className="w-full relative overflow-hidden"
        style={{ paddingBottom: `${aspectRatio}%` }}
      >
        <img
          src={imgSrc}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* محتوای محصول */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 text-center line-clamp-2 mb-2 flex-grow">
          {title}
        </h3>
        
        <span className="text-amber-700 font-bold text-xl text-center mb-4">
          {price.toLocaleString()} تومان
        </span>

        {/* دکمه‌ها */}
        <div className="flex space-x-3">
          <button
            onClick={() => navigate(`/product/${id}`)}
            className="flex-1 px-4 py-2 bg-gray-800 text-amber-400 rounded-lg hover:scale-105 transition-all duration-200 hover:bg-gray-700 hover:shadow-lg hover:shadow-amber-200/30 font-medium"
          >
            دیدن محصول
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
            className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg hover:scale-105 transition-all duration-200 hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-300/40 font-medium"
          >
            افزودن 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;