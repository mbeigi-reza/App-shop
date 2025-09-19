// src/pages/Home.jsx
import React from "react";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import { initialProducts, featuredProducts } from "../data/products";

const Home = () => {
  return (
    <div className="bg-[#1F1F1F] min-h-screen text-gray-200">
      {/* دسته‌بندی‌ها */}
      <Categories />

      {/* محصولات ثابت */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-[#FFD700] inline-block">
          محصولات ما
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {initialProducts.map((p, i) => (
            <ProductCard key={i} {...p} />
          ))}
        </div>
      </section>

      {/* Carousel افقی 1 */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-[#FFD700] inline-block">
          محصولات ویژه
        </h2>
        <div className="flex overflow-x-auto gap-4 scrollbar-hide">
          {featuredProducts.map((p, i) => (
            <div key={i} className="min-w-[250px] flex-shrink-0">
              <ProductCard {...p} />
            </div>
          ))}
        </div>
      </section>

      {/* Carousel افقی 2 */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-[#FFD700] inline-block">
          محصولات پیشنهادی
        </h2>
        <div className="flex overflow-x-auto gap-4 scrollbar-hide">
          {featuredProducts.map((p, i) => (
            <div key={i} className="min-w-[250px] flex-shrink-0">
              <ProductCard {...p} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
