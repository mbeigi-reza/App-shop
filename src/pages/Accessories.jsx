// src/pages/Accessories.jsx
import React from "react";
import ProductCard from "../components/ProductCard";
import RandomImageManager from "../components/RandomImageManager";
import PriceFilter from "../components/PriceFilter";
import usePriceFilter from "../hooks/usePriceFilter";
import { FiFilter } from "react-icons/fi";
import AutoScrollToProducts from "../components/AutoScrollToProducts";

// ایمپورت تمام تصاویر لوازم جانبی
import accessories1 from '../images/products/accessories/accessories1.jpg';
import accessories2 from '../images/products/accessories/accessories2.jpg';
import accessories3 from '../images/products/accessories/accessories3.jpg';
import accessories4 from '../images/products/accessories/accessories4.jpg';
import accessories5 from '../images/products/accessories/accessories5.jpg';
import accessories6 from '../images/products/accessories/accessories6.jpg';
import accessories7 from '../images/products/accessories/accessories7.jpg';
import accessories8 from '../images/products/accessories/accessories8.jpg';
import accessories9 from '../images/products/accessories/accessories9.jpg';
import accessories10 from '../images/products/accessories/accessories10.jpg';
import accessories11 from '../images/products/accessories/accessories11.jpg';
import accessories12 from '../images/products/accessories/accessories12.jpg';
import accessories13 from '../images/products/accessories/accessories13.jpg';
import accessories14 from '../images/products/accessories/accessories14.jpg';

// آرایه تمام تصاویر
const accessoriesImages = [
  accessories1, accessories2, accessories3, accessories4, accessories5, accessories6, accessories7,
  accessories8, accessories9, accessories10, accessories11, accessories12, accessories13, accessories14
];

// محصولات لوازم جانبی
const accessoriesProducts = [
  {
    id: 1,
    title: "کلاه ایمنی اسکیت",
    price: 280000,
  },
  {
    id: 2,
    title: "محافظ زانو و آرنج",
    price: 180000,
  },
  {
    id: 3,
    title: "کفش اسکیت حرفه‌ای",
    price: 420000,
  },
  {
    id: 4,
    title: "کیف حمل اسکیت",
    price: 220000,
  },
  {
    id: 5,
    title: "چرخ اسکیت جایگزین",
    price: 150000,
  },
  {
    id: 6,
    title: "یونیفرم اسکیت",
    price: 320000,
  },
  {
    id: 7,
    title: "کاور اسکیت ضد آب",
    price: 95000,
  },
  {
    id: 8,
    title: "لوازم تعمیر اسکیت",
    price: 120000,
  },
  {
    id: 9,
    title: "کفش مخصوص اسکیت روی یخ",
    price: 380000,
  },
  {
    id: 10,
    title: "دستکش اسکیت",
    price: 85000,
  },
  {
    id: 11,
    title: "جوراب اسکیت",
    price: 65000,
  },
  {
    id: 12,
    title: "کیف ابزار اسکیت",
    price: 195000,
  },
  {
    id: 13,
    title: "ماسک اسکیت",
    price: 75000,
  },
  {
    id: 14,
    title: "عینک محافظ اسکیت",
    price: 110000,
  },
];

const Accessories = () => {
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
  } = usePriceFilter(accessoriesProducts, 4);
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
                  لوازم جانبی
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
            <RandomImageManager images={accessoriesImages} productCount={filteredProducts.length}>
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

export default Accessories;