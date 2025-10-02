// src/pages/Heelys.jsx
import React from "react";
import ProductCard from "../components/ProductCard";
import RandomImageManager from "../components/RandomImageManager";
import PriceFilter from "../components/PriceFilter";
import usePriceFilter from "../hooks/usePriceFilter";
import { FiFilter } from "react-icons/fi";
import AutoScrollToProducts from "../components/AutoScrollToProducts";

// ایمپورت تمام تصاویر کفش چرخ‌دار
import heelys1 from '../images/products/heelys/heelys1.jpg';
import heelys2 from '../images/products/heelys/heelys2.jpg';
import heelys3 from '../images/products/heelys/heelys3.jpg';
import heelys4 from '../images/products/heelys/heelys4.jpg';
import heelys5 from '../images/products/heelys/heelys5.jpg';
import heelys6 from '../images/products/heelys/heelys6.jpg';
import heelys7 from '../images/products/heelys/heelys7.jpg';
import heelys8 from '../images/products/heelys/heelys8.jpg';
import heelys9 from '../images/products/heelys/heelys9.jpg';
import heelys10 from '../images/products/heelys/heelys10.jpg';
import heelys11 from '../images/products/heelys/heelys11.jpg';
import heelys12 from '../images/products/heelys/heelys12.jpg';
import heelys13 from '../images/products/heelys/heelys13.jpg';
import heelys14 from '../images/products/heelys/heelys14.jpg';

// آرایه تمام تصاویر
const heelysImages = [
  heelys1, heelys2, heelys3, heelys4, heelys5, heelys6, heelys7,
  heelys8, heelys9, heelys10, heelys11, heelys12, heelys13, heelys14
];

// محصولات کفش چرخ‌دار
const heelysProducts = [
  {
    id: 1,
    title: "کفش چرخ‌دار حرفه‌ای مدل Pro",
    price: 680000,
  },
  {
    id: 2,
    title: "کفش چرخ‌دار نوجوان",
    price: 520000,
  },
  {
    id: 3,
    title: "کفش چرخ‌دار کودک",
    price: 450000,
  },
  {
    id: 4,
    title: "کفش چرخ‌دار اسپرت",
    price: 580000,
  },
  {
    id: 5,
    title: "کفش چرخ‌دار طرح دار",
    price: 620000,
  },
  {
    id: 6,
    title: "کفش چرخ‌دار LED دار",
    price: 750000,
  },
  {
    id: 7,
    title: "کفش چرخ‌دار کتانی",
    price: 490000,
  },
  {
    id: 8,
    title: "کفش چرخ‌دار چرمی",
    price: 710000,
  },
  {
    id: 9,
    title: "کفش چرخ‌دار ضد آب",
    price: 690000,
  },
  {
    id: 10,
    title: "کفش چرخ‌دار سبک",
    price: 540000,
  },
  {
    id: 11,
    title: "کفش چرخ‌دار رنگارنگ",
    price: 560000,
  },
  {
    id: 12,
    title: "کفش چرخ‌دار اورجینال",
    price: 780000,
  },
  {
    id: 13,
    title: "کفش چرخ‌دار فانتزی",
    price: 510000,
  },
  {
    id: 14,
    title: "کفش چرخ‌دار مخصوص ترفند",
    price: 720000,
  },
];

const Heelys = () => {
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
  } = usePriceFilter(heelysProducts, 4);

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
                  کفش چرخ‌دار
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
            <RandomImageManager images={heelysImages} productCount={filteredProducts.length}>
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
    </AutoScrollToProducts> // این خط رو اضافه کن
  );
};

export default Heelys;