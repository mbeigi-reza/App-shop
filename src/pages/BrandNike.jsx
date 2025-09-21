// src/pages/BrandNike.jsx
import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { initialProducts } from "../data/products";

const BrandNike = () => {
  // داده محصولات فرضی برند Nike
  const [products, setProducts] = useState(initialProducts);

  return (
    <div className="bg-[#1F1F1F] min-h-screen text-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
        
        {/* کارت‌های محصولات - ستون چپ */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-[#FFD700] inline-block">
            محصولات Nike
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <ProductCard key={i} {...p} />
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="px-6 py-2 bg-[#2a2a2a] border border-[#FFD700] text-[#FFD700] rounded-lg shadow-md hover:bg-[#FFD700] hover:text-[#2a2a2a] transition">
              مشاهده ادامه محصولات
            </button>
          </div>
        </div>

        {/* فیلتر قیمت - ستون راست */}
        <aside className="w-full lg:w-64 bg-[#2a2a2a] p-6 rounded-lg flex-shrink-0">
          <h3 className="text-xl font-bold text-[#FFD700] mb-4">فیلتر قیمت</h3>
          <div className="flex flex-col gap-4">
            <label className="flex flex-col">
              حداقل قیمت:
              <input
                type="number"
                className="mt-1 p-2 rounded bg-[#1F1F1F] border border-gray-700 text-gray-200"
                placeholder="0"
              />
            </label>
            <label className="flex flex-col">
              حداکثر قیمت:
              <input
                type="number"
                className="mt-1 p-2 rounded bg-[#1F1F1F] border border-gray-700 text-gray-200"
                placeholder="0"
              />
            </label>
            <button className="px-4 py-2 bg-[#FFD700] text-[#2a2a2a] font-bold rounded hover:scale-105 transition">
              اعمال فیلتر
            </button>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default BrandNike;
