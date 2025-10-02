import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import { allProducts, featuredProducts, recommendedProducts } from "../data/allProducts";

const Home = () => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [usedProductIds, setUsedProductIds] = useState(new Set());

  // 6 محصول ثابت اول
  const initialProducts = allProducts.slice(0, 6);

  // گرفتن 12 محصول جدید بدون تکرار
  const getNewProducts = (count) => {
    const availableProducts = allProducts.filter(
      (p) => !usedProductIds.has(p.id)
    );
    return availableProducts.slice(0, count);
  };

  // بارگذاری اولیه
  useEffect(() => {
    setDisplayedProducts(initialProducts);
    setUsedProductIds(new Set(initialProducts.map((p) => p.id)));
  }, []);

  // دکمه "مشاهده ادامه"
  const handleLoadMore = () => {
    const newProducts = getNewProducts(12);
    
    if (newProducts.length > 0) {
      const updatedProducts = [...displayedProducts, ...newProducts];
      const updatedIds = [...usedProductIds, ...newProducts.map((p) => p.id)];

      setDisplayedProducts(updatedProducts);
      setUsedProductIds(new Set(updatedIds));
    }
  };

  const canLoadMore = usedProductIds.size < allProducts.length;
  const remainingProducts = allProducts.length - usedProductIds.size;

  // تابع برای ایجاد 7 آیتم (6 محصول + 1 دکمه) - بدون تکرار
  const createScrollData = (products) => {
    return [
      ...products.slice(0, 6),
      { type: 'button', id: 'view-more' }
    ];
  };

  // داده‌ها برای هر بخش - فقط 7 آیتم
  const featuredData = createScrollData(featuredProducts);
  const recommendedData = createScrollData(recommendedProducts);

  return (
    <div className="bg-amber-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      {/* دسته‌بندی‌ها */}
      <Categories />

      {/* محصولات ما */}
      <section className="max-w-6xl mx-auto px-4 py-12 bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-bold mb-8 border-b-4 border-amber-500 dark:border-amber-400 pb-2 inline-block text-gray-800 dark:text-white">
          محصولات ما
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              caption={product.caption}
              price={product.price}
              imgSrc={product.imgSrc}
            />
          ))}
        </div>

        {canLoadMore && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 bg-amber-500 dark:bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-600 dark:hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-300/40 dark:hover:shadow-amber-500/30 transition-all duration-200"
            >
              مشاهده ادامه محصولات ({remainingProducts} محصول باقی مانده)
            </button>
          </div>
        )}

        {!canLoadMore && displayedProducts.length > 0 && (
          <div className="text-center mt-8 p-6 bg-amber-50 dark:bg-gray-800 rounded-xl">
            <p className="text-amber-600 dark:text-amber-400 font-bold text-lg">
              🎉 تمام {allProducts.length} محصول نمایش داده شدند!
            </p>
          </div>
        )}
      </section>

      {/* محصولات ویژه */}
      <section className="max-w-6xl mx-auto px-4 py-12 bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-bold mb-8 border-b-4 border-amber-500 dark:border-amber-400 pb-2 inline-block text-gray-800 dark:text-white">
          محصولات ویژه
        </h2>
        
        <div className="flex gap-6 pb-4 overflow-x-auto custom-scrollbar scroll-smooth">
          {featuredData.map((item) => (
            <div key={item.type === 'button' ? 'button' : item.id} 
                 className="min-w-[280px] flex-shrink-0">
              {item.type === 'button' ? (
                <div className="min-w-[280px] flex-shrink-0 flex items-center justify-center 
                  border-2 border-amber-500 dark:border-amber-400 rounded-xl 
                  hover:shadow-lg hover:shadow-amber-300/40 dark:hover:shadow-amber-500/30 
                  transition-all duration-300 p-6 h-full">
                  <Link
                    to="/featured-products"
                    className="text-amber-600 dark:text-amber-400 font-bold hover:text-white 
                      hover:bg-amber-500 dark:hover:bg-amber-600 px-6 py-3 rounded-lg border 
                      border-amber-500 dark:border-amber-400 transition-all duration-200 text-center"
                  >
                    مشاهده بقیه محصولات
                  </Link>
                </div>
              ) : (
                <ProductCard {...item} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* محصولات پیشنهادی */}
      <section className="max-w-6xl mx-auto px-4 py-12 bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-bold mb-8 border-b-4 border-amber-500 dark:border-amber-400 pb-2 inline-block text-gray-800 dark:text-white">
          محصولات پیشنهادی
        </h2>
        
        <div className="flex gap-6 pb-4 overflow-x-auto custom-scrollbar scroll-smooth">
          {recommendedData.map((item) => (
            <div key={item.type === 'button' ? 'button' : item.id} 
                 className="min-w-[280px] flex-shrink-0">
              {item.type === 'button' ? (
                <div className="min-w-[280px] flex-shrink-0 flex items-center justify-center 
                  border-2 border-amber-500 dark:border-amber-400 rounded-xl 
                  hover:shadow-lg hover:shadow-amber-300/40 dark:hover:shadow-amber-500/30 
                  transition-all duration-300 p-6 h-full">
                  <Link
                    to="/recommended-products"
                    className="text-amber-600 dark:text-amber-400 font-bold hover:text-white 
                      hover:bg-amber-500 dark:hover:bg-amber-600 px-6 py-3 rounded-lg border 
                      border-amber-500 dark:border-amber-400 transition-all duration-200 text-center"
                  >
                    مشاهده بقیه محصولات
                  </Link>
                </div>
              ) : (
                <ProductCard {...item} />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;