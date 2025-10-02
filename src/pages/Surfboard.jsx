// src/pages/Surfboard.jsx
import React from "react";
import ProductCard from "../components/ProductCard";
import RandomImageManager from "../components/RandomImageManager";
import PriceFilter from "../components/PriceFilter";
import usePriceFilter from "../hooks/usePriceFilter";
import { FiFilter } from "react-icons/fi";
import AutoScrollToProducts from "../components/AutoScrollToProducts";

import surfboard1 from '../images/products/surfboard/surfboard1.jpg';
import surfboard2 from '../images/products/surfboard/surfboard2.jpg';
import surfboard3 from '../images/products/surfboard/surfboard3.jpg';
import surfboard4 from '../images/products/surfboard/surfboard4.jpg';
import surfboard5 from '../images/products/surfboard/surfboard5.jpg';
import surfboard6 from '../images/products/surfboard/surfboard6.jpg';
import surfboard7 from '../images/products/surfboard/surfboard7.jpg';
import surfboard8 from '../images/products/surfboard/surfboard8.jpg';

// آرایه تمام تصاویر
const surfboardImages = [
  surfboard1, surfboard2, surfboard3, surfboard4, 
  surfboard5, surfboard6, surfboard7, surfboard8
];

// محصولات تخته موج‌سواری
const surfboardProducts = [
  {
    id: 1,
    title: "تخته موج‌سواری حرفه‌ای مدل Pro",
    price: 1850000,
  },
  {
    id: 2,
    title: "تخته موج‌سواری فایبرگلاس",
    price: 1450000,
  },
  {
    id: 3,
    title: "تخته موج‌سواری لانگ بورد",
    price: 1650000,
  },
  {
    id: 4,
    title: "تخته موج‌سواری شورت بورد",
    price: 1250000,
  },
  {
    id: 5,
    title: "تخته موج‌سواری مالیتی",
    price: 1550000,
  },
  {
    id: 6,
    title: "تخته موج‌سواری مبتدی",
    price: 950000,
  },
  {
    id: 7,
    title: "تخته موج‌سواری هیبریدی",
    price: 1350000,
  },
  {
    id: 8,
    title: "تخته موج‌سواری فان",
    price: 1150000,
  },
];

const Surfboard = () => {
  const {
    showFilter,
    setShowFilter,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    filteredProducts,
    visibleCount,
    hasMore,
    loadMoreProducts,
    clearFilters,
    getButtonText
  } = usePriceFilter(surfboardProducts, 4);
return (
    <AutoScrollToProducts offset={80}> {/* این خط رو اضافه کن */}
      <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-4 lg:py-12 flex flex-col lg:flex-row gap-8">
          
          {/* ستون چپ - کارت محصولات */}
          <div className="flex-1">
            {/* عنوان و دکمه فیلتر */}
            <div className="flex items-center justify-between mb-6 border-b-4 border-amber-500 dark:border-amber-400 pb-2">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                  تخته موج‌سواری
                </h2>
                <span className="text-sm bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 px-3 py-1 rounded-full font-medium">
                  {filteredProducts.length} محصول
                </span>
              </div>
              {/* فقط دکمه فیلتر در موبایل */}
              <button
                onClick={() => setShowFilter(true)}
                className="md:hidden flex items-center gap-2 px-4 py-2 bg-amber-500 dark:bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-600 dark:hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-300/40 dark:hover:shadow-amber-500/30 transition-all duration-200"
              >
                <FiFilter className="w-5 h-5" />
                فیلتر
              </button>
            </div>

            {/* استفاده از کامپوننت RandomImageManager بدون دکمه تغییر تصاویر */}
            <RandomImageManager images={surfboardImages} productCount={filteredProducts.length}>
              {(currentImages) => (
                <>
                  {/* کارت‌های محصولات */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.slice(0, visibleCount).map((product, index) => (
                      <ProductCard 
                        key={`${product.id}-${index}`}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        imgSrc={currentImages[index]}
                      />
                    ))}
                  </div>
                </>
              )}
            </RandomImageManager>

            {/* نمایش تعداد محصولات قابل مشاهده */}
            <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
              نمایش {Math.min(visibleCount, filteredProducts.length)} از {filteredProducts.length} محصول
              {hasMore && (
                <span className="mr-2 text-amber-600 dark:text-amber-400">
                  ({filteredProducts.length - visibleCount} محصول باقی مانده)
                </span>
              )}
            </div>

            {/* دکمه مشاهده ادامه محصولات */}
            <div className="text-center mt-8">
              <button 
                onClick={loadMoreProducts}
                disabled={!hasMore}
                className={`px-6 py-3 border-2 rounded-lg shadow-md transition-all duration-200 font-bold ${
                  hasMore 
                    ? "bg-white dark:bg-gray-800 border-amber-500 dark:border-amber-400 text-amber-600 dark:text-amber-400 hover:bg-amber-500 dark:hover:bg-amber-600 hover:text-white hover:shadow-lg hover:shadow-amber-300/40 dark:hover:shadow-amber-500/30"
                    : "bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                }`}
              >
                {getButtonText()}
              </button>
            </div>
          </div>

          {/* استفاده از کامپوننت PriceFilter */}
          <PriceFilter
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            onClearFilters={clearFilters}
          />
        </div>

        {/* بک‌دراپ وقتی فیلتر بازه (فقط موبایل) */}
        {showFilter && (
          <div
            onClick={() => setShowFilter(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </div>
    </AutoScrollToProducts>
  );
};

export default Surfboard;