// src/pages/Skateboard.jsx
import React from "react";
import ProductCard from "../components/ProductCard";
import RandomImageManager from "../components/RandomImageManager";
import PriceFilter from "../components/PriceFilter";
import usePriceFilter from "../hooks/usePriceFilter";
import { FiFilter } from "react-icons/fi";
import AutoScrollToProducts from "../components/AutoScrollToProducts";

// ایمپورت تمام تصاویر اسکیت برد
import skateboard1 from '../images/products/skateboard/skateboard1.jpg';
import skateboard2 from '../images/products/skateboard/skateboard2.jpg';
import skateboard3 from '../images/products/skateboard/skateboard3.jpg';
import skateboard4 from '../images/products/skateboard/skateboard4.jpg';
import skateboard5 from '../images/products/skateboard/skateboard5.jpg';
import skateboard6 from '../images/products/skateboard/skateboard6.jpg';
import skateboard7 from '../images/products/skateboard/skateboard7.jpg';
import skateboard8 from '../images/products/skateboard/skateboard8.jpg';
import skateboard9 from '../images/products/skateboard/skateboard9.jpg';
import skateboard10 from '../images/products/skateboard/skateboard10.jpg';
import skateboard11 from '../images/products/skateboard/skateboard11.jpg';
import skateboard12 from '../images/products/skateboard/skateboard12.jpg';
import skateboard13 from '../images/products/skateboard/skateboard13.jpg';
import skateboard14 from '../images/products/skateboard/skateboard14.jpg';
import skateboard15 from '../images/products/skateboard/skateboard15.jpg';
import skateboard16 from '../images/products/skateboard/skateboard16.jpg';
import skateboard17 from '../images/products/skateboard/skateboard17.jpg';
import skateboard18 from '../images/products/skateboard/skateboard18.jpg';
import skateboard19 from '../images/products/skateboard/skateboard19.jpg';
import skateboard20 from '../images/products/skateboard/skateboard20.jpg';
import skateboard21 from '../images/products/skateboard/skateboard21.jpg';
import skateboard22 from '../images/products/skateboard/skateboard22.jpg';
import skateboard23 from '../images/products/skateboard/skateboard23.jpg';
import skateboard24 from '../images/products/skateboard/skateboard24.jpg';

// آرایه تمام تصاویر
const skateboardImages = [
  skateboard1, skateboard2, skateboard3, skateboard4, skateboard5, skateboard6,
  skateboard7, skateboard8, skateboard9, skateboard10, skateboard11, skateboard12,
  skateboard13, skateboard14, skateboard15, skateboard16, skateboard17, skateboard18,
  skateboard19, skateboard20, skateboard21, skateboard22, skateboard23, skateboard24
];

// محصولات اسکیت برد
const skateboardProducts = [
  {
    id: 1,
    title: "اسکیت برد حرفه‌ای مدل Pro X1",
    price: 890000,
  },
  {
    id: 2,
    title: "اسکیت برد طرح چوب طبیعی",
    price: 650000,
  },
  {
    id: 3,
    title: "اسکیت برد الکتریکی",
    price: 1200000,
  },
  {
    id: 4,
    title: "اسکیت برد استریت",
    price: 550000,
  },
  {
    id: 5,
    title: "اسکیت برد لانگ بورد",
    price: 750000,
  },
  {
    id: 6,
    title: "اسکیت برد مینی",
    price: 420000,
  },
  {
    id: 7,
    title: "اسکیت برد کراس",
    price: 680000,
  },
  {
    id: 8,
    title: "اسکیت برد طرح گرافیتی",
    price: 720000,
  },
  {
    id: 9,
    title: "اسکیت برد آفرود",
    price: 950000,
  },
  {
    id: 10,
    title: "اسکیت برد کلاسیک",
    price: 580000,
  },
];

const Skateboard = () => {
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
  } = usePriceFilter(skateboardProducts, 4);

return (
    <AutoScrollToProducts offset={80}>
      <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-4 lg:py-12 flex flex-col lg:flex-row gap-8">
          
          {/* ستون چپ - کارت محصولات */}
          <div className="flex-1">
            {/* عنوان و دکمه فیلتر */}
            <div className="flex items-center justify-between mb-6 border-b-4 border-amber-500 dark:border-amber-400 pb-2">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                  اسکیت برد
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
            <RandomImageManager images={skateboardImages} productCount={filteredProducts.length}>
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

export default Skateboard;