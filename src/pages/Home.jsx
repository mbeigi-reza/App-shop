// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import { initialProducts, featuredProducts } from "../data/products";

const Home = () => {
  return (
    <div className="bg-[#1F1F1F] min-h-screen text-gray-200">
      {/* دسته‌بندی‌ها */}
      <Categories />

      {/* محصولات ما */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-[#FFD700] inline-block">
          محصولات ما
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {initialProducts.map((p, i) => (
            <ProductCard key={i} {...p} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/products"
            className="px-6 py-2 bg-[#FFD700] text-[#2a2a2a] rounded-lg shadow-md hover:bg-[#e6c200] transition"
          >
            مشاهده ادامه محصولات
          </Link>
        </div>
      </section>

      {/* محصولات ویژه */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-[#FFD700] inline-block">
          محصولات ویژه
        </h2>
        <div className="flex overflow-x-auto gap-4 scrollbar-hide">
          {featuredProducts.slice(0, 6).map((p, i) => (
            <div key={i} className="min-w-[250px] flex-shrink-0">
              <ProductCard {...p} />
            </div>
          ))}
          {/* کارت مشاهده ادامه */}
          <div className="min-w-[250px] flex-shrink-0 flex items-center justify-center bg-[#2a2a2a] border border-[#FFD700] rounded-xl shadow-md hover:shadow-lg transition">
            <Link
              to="/featured-products"
              className="px-6 py-3 border border-[#FFD700] bg-[#2a2a2a] text-[#FFD700] rounded-lg font-bold hover:bg-[#e6c200] transition"
            >
              مشاهده بقیه محصولات
            </Link>
          </div>
        </div>
      </section>

      {/* محصولات پیشنهادی */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-[#FFD700] inline-block">
          محصولات پیشنهادی
        </h2>
        <div className="flex overflow-x-auto gap-4 scrollbar-hide">
          {featuredProducts.slice(0, 6).map((p, i) => (
            <div key={i} className="min-w-[250px] flex-shrink-0">
              <ProductCard {...p} />
            </div>
          ))}
          {/* کارت مشاهده ادامه */}
          <div className="min-w-[250px] flex-shrink-0 flex items-center justify-center border border-[#FFD700] rounded-xl">
           <Link
             to="/recommended-products"
             className="px-6 py-3 bg-[#2a2a2a] border border-[#FFD700] text-[#FFD700] rounded-lg font-bold hover:bg-[#FFD700] hover:text-[#2a2a2a] transition"
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