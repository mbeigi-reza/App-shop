// src/pages/Home.jsx
import React from "react";
import ProductCard from "../components/ProductCard";

// ایمپورت عکس‌ها
import product1 from "../images/product1.png";
import product2 from "../images/product2.png";
import product3 from "../images/product3.png";
import product4 from "../images/product4.png";

import featured1 from "../images/featured1.png";
import featured2 from "../images/featured2.png";
import featured3 from "../images/featured3.png";

const Home = () => {
  return (
    <div className="bg-[#1F1F1F] min-h-screen text-gray-200">
      {/* بخش معرفی محصولات */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-[#FFD700] inline-block">
          محصولات ما
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard title="محصول 1" imgSrc={product1} />
          <ProductCard title="محصول 2" imgSrc={product2} />
          <ProductCard title="محصول 3" imgSrc={product3} />
          <ProductCard title="محصول 4" imgSrc={product4} />
        </div>
      </section>

      {/* بخش محصولات ویژه */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-[#FFD700] inline-block">
          پیشنهاد ویژه
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard title="ویژه 1" imgSrc={featured1} />
          <ProductCard title="ویژه 2" imgSrc={featured2} />
          <ProductCard title="ویژه 3" imgSrc={featured3} />
        </div>
      </section>
    </div>
  );
};

export default Home;
