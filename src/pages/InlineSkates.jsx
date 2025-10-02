// src/pages/InlineSkates.jsx
import React from "react";
import ProductCard from "../components/ProductCard";
import RandomImageManager from "../components/RandomImageManager";
import PriceFilter from "../components/PriceFilter";
import usePriceFilter from "../hooks/usePriceFilter";
import { FiFilter } from "react-icons/fi";
import AutoScrollToProducts from "../components/AutoScrollToProducts";

// ایمپورت تمام تصاویر اسکیت اینلاین
import inlineSkate1 from '../images/products/inline-skates/inlineSkate1.jpg';
import inlineSkate2 from '../images/products/inline-skates/inlineSkate2.jpg';
import inlineSkate3 from '../images/products/inline-skates/inlineSkate3.jpg';
import inlineSkate4 from '../images/products/inline-skates/inlineSkate4.jpg';
import inlineSkate5 from '../images/products/inline-skates/inlineSkate5.jpg';
import inlineSkate6 from '../images/products/inline-skates/inlineSkate6.jpg';
import inlineSkate7 from '../images/products/inline-skates/inlineSkate7.jpg';
import inlineSkate8 from '../images/products/inline-skates/inlineSkate8.jpg';
import inlineSkate9 from '../images/products/inline-skates/inlineSkate9.jpg';
import inlineSkate10 from '../images/products/inline-skates/inlineSkate10.jpg';
import inlineSkate11 from '../images/products/inline-skates/inlineSkate11.jpg';

// آرایه تمام تصاویر
const inlineSkateImages = [
  inlineSkate1, inlineSkate2, inlineSkate3, inlineSkate4, inlineSkate5,
  inlineSkate6, inlineSkate7, inlineSkate8, inlineSkate9, inlineSkate10,
  inlineSkate11
];

// محصولات اسکیت اینلاین
const inlineSkateProducts = [
  {
    id: 1,
    title: "اسکیت اینلاین حرفه‌ای مدل Speed Pro",
    price: 950000,
  },
  {
    id: 2,
    title: "اسکیت اینلاین فیتنس",
    price: 720000,
  },
  {
    id: 3,
    title: "اسکیت اینلاین شهری",
    price: 680000,
  },
  {
    id: 4,
    title: "اسکیت اینلاین آفرود",
    price: 1100000,
  },
  {
    id: 5,
    title: "اسکیت اینلاین سرعتی",
    price: 890000,
  },
  {
    id: 6,
    title: "اسکیت اینلاین تفریحی",
    price: 550000,
  },
  {
    id: 7,
    title: "اسکیت اینلاین کودک",
    price: 420000,
  },
  {
    id: 8,
    title: "اسکیت اینلاین سه چرخ",
    price: 780000,
  },
  {
    id: 9,
    title: "اسکیت اینلاین چهار چرخ",
    price: 820000,
  },
  {
    id: 10,
    title: "اسکیت اینلاین کربنی",
    price: 1250000,
  },
  {
    id: 11,
    title: "اسکیت اینلاین مبتدی",
    price: 480000,
  },
];

const InlineSkates = () => {
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
  } = usePriceFilter(inlineSkateProducts, 4);

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
                  اسکیت اینلاین
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
            <RandomImageManager images={inlineSkateImages} productCount={filteredProducts.length}>
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

export default InlineSkates;