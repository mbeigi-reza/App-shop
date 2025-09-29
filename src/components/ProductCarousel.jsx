import React, { useState } from "react";
import ProductCard from "./ProductCard";
import img1 from "../images/featured1.png";
import img2 from "../images/featured2.png";
import img3 from "../images/featured3.png";

const products = [
  { id: 1, img: img1, title: "ویژه 1", caption: "کپشن ویژه 1", price: 250000 },
  { id: 2, img: img2, title: "ویژه 2", caption: "کپشن ویژه 2", price: 270000 },
  { id: 3, img: img3, title: "ویژه 3", caption: "کپشن ویژه 3", price: 300000 },
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
      <h2 className="text-3xl font-bold mb-8 border-b-4 border-amber-500 pb-2 inline-block text-gray-800">
        محصولات ویژه
      </h2>
      <div className="relative flex items-center">
        <button
          onClick={prev}
          disabled={startIndex === 0}
          className="absolute left-0 z-10 bg-amber-500 text-white px-4 py-3 rounded-lg hover:scale-105 transition-all duration-200 hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-300/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {"‹"}
        </button>
        
        <div className="flex overflow-hidden gap-8 w-full justify-center">
          {products.slice(startIndex, startIndex + visibleCount).map((product) => (
            <ProductCard 
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              imgSrc={product.img}
            />
          ))}
        </div>
        
        <button
          onClick={next}
          disabled={startIndex >= products.length - visibleCount}
          className="absolute right-0 z-10 bg-amber-500 text-white px-4 py-3 rounded-lg hover:scale-105 transition-all duration-200 hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-300/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {"›"}
        </button>
      </div>
    </section>
  );
};

export default ProductCarousel;