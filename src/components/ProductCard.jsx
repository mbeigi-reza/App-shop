import React from "react";

const ProductCard = ({ title, imgSrc }) => {
  return (
    <div className="bg-[#1F1F1F] text-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <img src={imgSrc} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <button className="px-4 py-2 bg-[#FFD700] text-[#1F1F1F] rounded-lg hover:bg-yellow-500 transition-colors duration-300">
          مشاهده محصول
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
