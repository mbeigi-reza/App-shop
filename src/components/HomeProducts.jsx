import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getRandomProducts, allProducts } from "../data/allProducts";

const HomeProducts = () => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [usedProductIds, setUsedProductIds] = useState(new Set());

  // بارگذاری اولیه
  useEffect(() => {
    const initialProducts = getRandomProducts(6);
    setDisplayedProducts(initialProducts);
    setUsedProductIds(new Set(initialProducts.map(p => p.id)));
  }, []);

  const getNewRandomProducts = (count) => {
    const availableProducts = allProducts.filter(product => !usedProductIds.has(product.id));
    
    if (availableProducts.length === 0) return [];
    
    const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(count, availableProducts.length));
    
    return selected;
  };

  const handleLoadMore = () => {
    const newProducts = getNewRandomProducts(6);
    
    if (newProducts.length > 0) {
      setDisplayedProducts(prev => [...prev, ...newProducts]);
      setUsedProductIds(prev => new Set([...prev, ...newProducts.map(p => p.id)]));
    }
  };

  const canLoadMore = usedProductIds.size < allProducts.length;

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-8 border-b-4 border-amber-500 dark:border-amber-400 pb-2 inline-block text-gray-800 dark:text-white">
        محصولات ما
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {displayedProducts.map((product, index) => (
          <ProductCard 
            key={`${product.id}-${index}`}
            id={product.id}
            title={product.title}
            price={product.price}
            imgSrc={product.imgSrc}
          />
        ))}
      </div>

      {/* دکمه ادامه */}
      {canLoadMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3 bg-amber-500 dark:bg-amber-600 text-white font-bold rounded-lg hover:scale-105 transition-all duration-200 hover:bg-amber-600 dark:hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-300/40 dark:hover:shadow-amber-500/30"
          >
            {`مشاهده محصولات بیشتر (${allProducts.length - usedProductIds.size} محصول باقی مانده)`}
          </button>
        </div>
      )}

      {/* وقتی محصولات تموم شد */}
      {!canLoadMore && displayedProducts.length > 0 && (
        <div className="text-center mt-8 p-6 bg-amber-50 dark:bg-gray-800 rounded-xl">
          <p className="text-amber-600 dark:text-amber-400 font-bold text-lg">
            🎉 تمام 81 محصول نمایش داده شدند!
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            شما تمام محصولات ما را مشاهده کردید
          </p>
        </div>
      )}
    </section>
  );
};

export default HomeProducts;