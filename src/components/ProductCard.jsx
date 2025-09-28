// src/components/ProductCard.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, title, price, imgSrc }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-[#2a2a2a] p-2 rounded-lg shadow-md hover:shadow-xl transition flex flex-col items-center">
      {/* دیو دور عکس */}
      <div className="rounded-md overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          className="w-[206px] h-[250px] object-cover"
        />
      </div>

      {/* عنوان و قیمت */}
      <div className="mt-2 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
        <span className="text-[#FFD700] font-bold mt-1">
          {price.toLocaleString()} تومان
        </span>

        {/* دکمه‌ها */}
        <div className="flex space-x-2 mt-3">
          {/* ✅ رفتن به صفحه جزئیات محصول */}
          <button
            onClick={() => navigate(`/product/${id}`)}
            className="px-3 py-1 bg-gray-600 text-[#F8c62A] rounded-md hover:scale-105 transition"
          >
            دیدن محصول
          </button>

          {/* افزودن به سبد خرید */}
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
            className="px-3 py-1 bg-[#F8c62A] text-[#ffffff] rounded-md hover:scale-105 transition"
          >
            افزودن 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
