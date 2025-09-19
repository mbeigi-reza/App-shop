import React from "react";

const ProductCard = ({ title, caption, price, imgSrc }) => {
  return (
    <div className="bg-[#2a2a2a] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition p-2 flex flex-col">
      <img src={imgSrc} alt={title} className="w-full h-48 object-cover rounded-md" />
      <div className="mt-2 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
        <p className="text-sm text-gray-400 mt-1 flex-1">{caption}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-[#FFD700] font-bold">{price}</span>
          <button className="px-3 py-1 bg-[#FFD700] text-[#2a2a2a] rounded-md hover:scale-105 transition">
            دیدن محصول
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
