import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import { allProducts, featuredProducts, recommendedProducts } from "../data/allProducts";

const Home = () => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [usedProductIds, setUsedProductIds] = useState(new Set());

  // گرفتن محصولات رندوم بدون تکرار
  const getNewRandomProducts = (count, excludeIds = []) => {
    const availableProducts = allProducts.filter(
      (p) => !excludeIds.includes(p.id)
    );
    const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // بارگذاری اولیه → فقط یکبار
  useEffect(() => {
    const storedProducts = localStorage.getItem("displayedProducts");
    const storedUsedIds = localStorage.getItem("usedProductIds");

    if (storedProducts && storedUsedIds) {
      setDisplayedProducts(JSON.parse(storedProducts));
      setUsedProductIds(new Set(JSON.parse(storedUsedIds)));
    } else {
      const initialProducts = getNewRandomProducts(9);
      setDisplayedProducts(initialProducts);
      setUsedProductIds(new Set(initialProducts.map((p) => p.id)));

      localStorage.setItem("displayedProducts", JSON.stringify(initialProducts));
      localStorage.setItem(
        "usedProductIds",
        JSON.stringify(initialProducts.map((p) => p.id))
      );
    }
  }, []);

  // دکمه "مشاهده ادامه"
  const handleLoadMore = () => {
    const currentIds = [...usedProductIds];
    const newProducts = getNewRandomProducts(8, currentIds);

    if (newProducts.length > 0) {
      const updatedProducts = [...displayedProducts, ...newProducts];
      const updatedIds = [...currentIds, ...newProducts.map((p) => p.id)];

      setDisplayedProducts(updatedProducts);
      setUsedProductIds(new Set(updatedIds));

      localStorage.setItem("displayedProducts", JSON.stringify(updatedProducts));
      localStorage.setItem("usedProductIds", JSON.stringify(updatedIds));
    }
  };

  const canLoadMore = usedProductIds.size < allProducts.length;

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
              مشاهده ادامه محصولات
            </button>
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