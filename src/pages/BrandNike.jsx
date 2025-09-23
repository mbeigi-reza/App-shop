// src/pages/BrandNike.jsx
import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { initialProducts } from "../data/products";
import { FiFilter, FiX } from "react-icons/fi";

const BrandNike = () => {
  const [products] = useState(initialProducts);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="bg-[#1F1F1F] min-h-screen text-gray-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-4 lg:py-12 flex flex-col lg:flex-row gap-8">
        
        {/* ستون چپ - کارت محصولات */}
        <div className="flex-1">
          {/* عنوان و دکمه فیلتر */}
          <div className="flex items-center justify-between mb-6 border-b-2 border-[#FFD700]">
            <h2 className="text-3xl font-bold text-gray-200">
              محصولات Nike
            </h2>
            {/* دکمه فیلتر فقط در موبایل */}
            <button
              onClick={() => setShowFilter(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-[#FFD700] text-[#2a2a2a] rounded-lg font-bold hover:bg-[#e6c200] transition"
            >
              <FiFilter className="w-5 h-5" />
              فیلتر
            </button>
          </div>

          {/* کارت‌های محصولات */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <ProductCard key={i} {...p} fixedHeight={true} />
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="px-6 py-2 bg-[#2a2a2a] border border-[#FFD700] text-[#FFD700] rounded-lg shadow-md hover:bg-[#FFD700] hover:text-[#2a2a2a] transition">
              مشاهده ادامه محصولات
            </button>
          </div>
        </div>

        {/* فیلتر - همیشه در دسکتاپ، اسلاید در موبایل */}
        <aside
          className={`fixed top-0 right-0 h-full w-64 bg-[#2a2a2a] p-6 shadow-lg transform transition-transform duration-300 z-50
          ${showFilter ? "translate-x-0" : "translate-x-full"} 
          md:static md:translate-x-0 md:w-64 md:rounded-lg`}
        >
          {/* دکمه بستن فقط در موبایل */}
          <div className="flex justify-between items-center mb-4 md:hidden">
            <h3 className="text-xl font-bold text-[#FFD700]">فیلتر قیمت</h3>
            <button onClick={() => setShowFilter(false)} className="text-gray-300 hover:text-white">
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* محتوا */}
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
            <div className="flex gap-4 mt-2">
              <button className="flex-1 px-4 py-2 bg-[#FFD700] text-[#2a2a2a] font-bold rounded hover:scale-105 transition">
                اعمال فیلتر
              </button>
              <button className="flex-1 px-4 py-2 bg-[#2a2a2a] border border-[#FFD700] text-[#FFD700] font-bold rounded hover:scale-105 transition">
                حذف فیلتر
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* بک‌دراپ تاریک وقتی فیلتر بازه (فقط موبایل) */}
      {showFilter && (
        <div
          onClick={() => setShowFilter(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        />
      )}
    </div>
  );
};

export default BrandNike;

