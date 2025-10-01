// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import { getRandomProducts, featuredProducts, recommendedProducts } from "../data/allProducts";

const Home = () => {
  // این خط رو اضافه کن
  const randomProducts = getRandomProducts(6);

  return (
    <div className="bg-amber-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      {/* دسته‌بندی‌ها */}
      <Categories />

      {/* محصولات ما */}
      <section className="max-w-6xl mx-auto px-4 py-12 bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-bold mb-8 border-b-4 border-amber-500 dark:border-amber-400 pb-2 inline-block text-gray-800 dark:text-white">
          محصولات ما
        </h2>
        
        {/* این بخش رو عوض کن */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {randomProducts.map((product) => (
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

        <div className="text-center mt-8">
          <Link
            to="/products"
            className="px-8 py-3 bg-amber-500 dark:bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-600 dark:hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-300/40 dark:hover:shadow-amber-500/30 transition-all duration-200"
          >
            مشاهده ادامه محصولات
          </Link>
        </div>
      </section>

      {/* محصولات ویژه */}
      <section className="max-w-6xl mx-auto px-4 py-12 bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-bold mb-8 border-b-4 border-amber-500 dark:border-amber-400 pb-2 inline-block text-gray-800 dark:text-white">
          محصولات ویژه
        </h2>
        <div className="flex gap-6 pb-4 overflow-x-auto custom-scrollbar">
          {featuredProducts.slice(0, 6).map((product) => (
            <div key={product.id} className="min-w-[280px] flex-shrink-0">
              <ProductCard 
                id={product.id}
                title={product.title}
                caption={product.caption}
                price={product.price}
                imgSrc={product.imgSrc}
              />
            </div>
          ))}
          {/* کارت مشاهده ادامه */}
          <div className="min-w-[280px] flex-shrink-0 flex items-center justify-center bg-white dark:bg-gray-800 border-2 border-amber-300 dark:border-amber-600 rounded-xl shadow-sm hover:shadow-lg dark:hover:shadow-gray-700/30 hover:border-amber-500 dark:hover:border-amber-400 transition-all duration-300">
            <Link
              to="/featured-products"
              className="px-6 py-4 bg-white dark:bg-gray-800 border-2 border-amber-500 dark:border-amber-400 text-amber-600 dark:text-amber-400 rounded-lg font-bold hover:bg-amber-500 dark:hover:bg-amber-600 hover:text-white transition-all duration-200 text-center"
            >
              مشاهده بقیه محصولات
            </Link>
          </div>
        </div>
      </section>

      {/* محصولات پیشنهادی */}
      <section className="max-w-6xl mx-auto px-4 py-12 bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-bold mb-8 border-b-4 border-amber-500 dark:border-amber-400 pb-2 inline-block text-gray-800 dark:text-white">
          محصولات پیشنهادی
        </h2>
        <div className="flex gap-6 pb-4 overflow-x-auto custom-scrollbar">
          {recommendedProducts.slice(0, 6).map((product) => (
            <div key={product.id} className="min-w-[280px] flex-shrink-0">
              <ProductCard 
                id={product.id}
                title={product.title}
                caption={product.caption}
                price={product.price}
                imgSrc={product.imgSrc}
              />
            </div>
          ))}
          {/* کارت مشاهده ادامه */}
          <div className="min-w-[280px] flex-shrink-0 flex items-center justify-center bg-white dark:bg-gray-800 border-2 border-amber-300 dark:border-amber-600 rounded-xl shadow-sm hover:shadow-lg dark:hover:shadow-gray-700/30 hover:border-amber-500 dark:hover:border-amber-400 transition-all duration-300">
            <Link
              to="/recommended-products"
              className="px-6 py-4 bg-white dark:bg-gray-800 border-2 border-amber-500 dark:border-amber-400 text-amber-600 dark:text-amber-400 rounded-lg font-bold hover:bg-amber-500 dark:hover:bg-amber-600 hover:text-white transition-all duration-200 text-center"
            >
              مشاهده بقیه محصولات
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;