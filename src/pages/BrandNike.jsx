// src/pages/BrandNike.jsx
import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { initialProducts } from "../data/products";
import { FiFilter, FiX } from "react-icons/fi";

const BrandNike = () => {
  const [products] = useState(initialProducts);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="bg-white min-h-screen text-gray-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-4 lg:py-12 flex flex-col lg:flex-row gap-8">
        
        {/* ستون چپ - کارت محصولات */}
        <div className="flex-1">
          {/* عنوان و دکمه فیلتر */}
          <div className="flex items-center justify-between mb-6 border-b-4 border-amber-500 pb-2">
            <h2 className="text-3xl font-bold text-gray-800">
              محصولات Nike
            </h2>
            {/* دکمه فیلتر فقط در موبایل */}
            <button
              onClick={() => setShowFilter(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg font-bold hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-300/40 transition-all duration-200"
            >
              <FiFilter className="w-5 h-5" />
              فیلتر
            </button>
          </div>

          {/* کارت‌های محصولات */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard 
                key={product.id || index}
                id={product.id}
                title={product.title}
                price={product.price}
                imgSrc={product.img}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-white border-2 border-amber-500 text-amber-600 rounded-lg shadow-md hover:bg-amber-500 hover:text-white transition-all duration-200 font-bold hover:shadow-lg hover:shadow-amber-300/40">
              مشاهده ادامه محصولات
            </button>
          </div>
        </div>

        {/* فیلتر - همیشه در دسکتاپ، اسلاید در موبایل */}
        {/* 🔧 FIX: اضافه کردن lg:block و تنظیم position برای دسکتاپ */}
        <aside
          className={`fixed top-0 right-0 h-full w-64 bg-white p-6 shadow-lg transform transition-transform duration-300 z-50 border-l border-amber-100
          ${showFilter ? "translate-x-0" : "translate-x-full"} 
          lg:static lg:translate-x-0 lg:w-64 lg:rounded-lg lg:border lg:border-amber-200 lg:shadow-sm lg:block lg:h-auto lg:z-0`}
        >
          {/* دکمه بستن فقط در موبایل */}
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h3 className="text-xl font-bold text-amber-600">فیلتر قیمت</h3>
            <button onClick={() => setShowFilter(false)} className="text-amber-500 hover:text-amber-600">
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* محتوا */}
          <div className="flex flex-col gap-4">
            <label className="flex flex-col text-gray-700 font-medium">
              حداقل قیمت:
              <input
                type="number"
                className="mt-1 p-2 rounded-lg bg-amber-50 border border-amber-200 text-gray-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-colors"
                placeholder="0"
              />
            </label>
            <label className="flex flex-col text-gray-700 font-medium">
              حداکثر قیمت:
              <input
                type="number"
                className="mt-1 p-2 rounded-lg bg-amber-50 border border-amber-200 text-gray-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none transition-colors"
                placeholder="0"
              />
            </label>
            <div className="flex gap-3 mt-4">
              <button className="flex-1 px-4 py-2 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-300/40 transition-all duration-200">
                اعمال فیلتر
              </button>
              <button className="flex-1 px-4 py-2 bg-white border-2 border-amber-500 text-amber-600 font-bold rounded-lg hover:bg-amber-500 hover:text-white transition-all duration-200">
                حذف فیلتر
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* بک‌دراپ وقتی فیلتر بازه (فقط موبایل) */}
      {showFilter && (
        <div
          onClick={() => setShowFilter(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}
    </div>
  );
};

export default BrandNike;
