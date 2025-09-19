import React, { useState } from "react";
import ProductCard from "./ProductCard";
import img1 from "../images/featured1.png";
import img2 from "../images/featured2.png";
import img3 from "../images/featured3.png";

const products = [
  { img: img1, title: "ویژه 1", caption: "کپشن ویژه 1", price: "250,000 تومان" },
  { img: img2, title: "ویژه 2", caption: "کپشن ویژه 2", price: "270,000 تومان" },
  { img: img3, title: "ویژه 3", caption: "کپشن ویژه 3", price: "300,000 تومان" },
];

const ProductCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 2;

  const prev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const next = () => {
    setStartIndex((prev) => Math.min(prev + 1, products.length - visibleCount));
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 border-b-2 border-[#FFD700] inline-block text-gray-200">
        محصولات ویژه
      </h2>
      <div className="relative flex items-center">
        <button
          onClick={prev}
          className="absolute left-0 z-10 bg-[#FFD700] text-[#2a2a2a] px-3 py-2 rounded hover:scale-105 transition"
        >
          {"<"}
        </button>
        <div className="flex overflow-hidden gap-4 w-full">
          {products.slice(startIndex, startIndex + visibleCount).map((p, i) => (
            <ProductCard key={i} {...p} />
          ))}
        </div>
        <button
          onClick={next}
          className="absolute right-0 z-10 bg-[#FFD700] text-[#2a2a2a] px-3 py-2 rounded hover:scale-105 transition"
        >
          {">"}
        </button>
      </div>
    </section>
  );
};

export default ProductCarousel;
