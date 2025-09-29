// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import { initialProducts, featuredProducts } from "../data/products";

const Home = () => {
  return (
    <div className="bg-amber-50 min-h-screen text-gray-800">
      {/* دسته‌بندی‌ها */}
      <Categories />

      {/* محصولات ما */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 border-b-4 border-amber-500 pb-2 inline-block text-gray-800">
          محصولات ما
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {initialProducts.map((product, index) => (
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
          <Link
            to="/products"
            className="px-8 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-300/40 transition-all duration-200"
          >
            مشاهده ادامه محصولات
          </Link>
        </div>
      </section>

      {/* محصولات ویژه */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 border-b-4 border-amber-500 pb-2 inline-block text-gray-800">
          محصولات ویژه
        </h2>
        <div className="flex overflow-x-auto gap-6 scrollbar-hide pb-4">
          {featuredProducts.slice(0, 6).map((product, index) => (
            <div key={product.id || index} className="min-w-[280px] flex-shrink-0">
              <ProductCard 
                id={product.id}
                title={product.title}
                price={product.price}
                imgSrc={product.img}
              />
            </div>
          ))}
          {/* کارت مشاهده ادامه */}
          <div className="min-w-[280px] flex-shrink-0 flex items-center justify-center bg-white border-2 border-amber-300 rounded-xl shadow-sm hover:shadow-lg hover:border-amber-500 transition-all duration-300">
            <Link
              to="/featured-products"
              className="px-6 py-4 bg-white border-2 border-amber-500 text-amber-600 rounded-lg font-bold hover:bg-amber-500 hover:text-white transition-all duration-200 text-center"
            >
              مشاهده بقیه محصولات
            </Link>
          </div>
        </div>
      </section>

      {/* محصولات پیشنهادی */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 border-b-4 border-amber-500 pb-2 inline-block text-gray-800">
          محصولات پیشنهادی
        </h2>
        <div className="flex overflow-x-auto gap-6 scrollbar-hide pb-4">
          {featuredProducts.slice(0, 6).map((product, index) => (
            <div key={product.id || index} className="min-w-[280px] flex-shrink-0">
              <ProductCard 
                id={product.id}
                title={product.title}
                price={product.price}
                imgSrc={product.img}
              />
            </div>
          ))}
          {/* کارت مشاهده ادامه */}
          <div className="min-w-[280px] flex-shrink-0 flex items-center justify-center bg-white border-2 border-amber-300 rounded-xl shadow-sm hover:shadow-lg hover:border-amber-500 transition-all duration-300">
            <Link
              to="/recommended-products"
              className="px-6 py-4 bg-white border-2 border-amber-500 text-amber-600 rounded-lg font-bold hover:bg-amber-500 hover:text-white transition-all duration-200 text-center"
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
