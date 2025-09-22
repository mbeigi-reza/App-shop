import React from "react";

const ProductCard = ({ title, price, imgSrc }) => {
  return (
    <div className="bg-[#2a2a2a] p-2 rounded-lg shadow-md hover:shadow-xl transition flex flex-col items-center">
      {/* دیو دور عکس */}
      <div className=" rounded-md overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          className="w-[206px] h-[250px] object-cover"
        />
      </div>

      {/* عنوان و قیمت */}
      <div className="mt-2 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
        <span className="text-[#FFD700] font-bold mt-1">{price}</span>
        <button className="mt-2 px-3 py-1 bg-[#FFD700] text-[#2a2a2a] rounded-md hover:scale-105 transition">
          دیدن محصول
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
