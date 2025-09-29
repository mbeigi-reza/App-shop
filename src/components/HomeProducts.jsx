import React, { useState } from "react";
import ProductCard from "./ProductCard";

const HomeProducts = ({ initialProducts }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    if (expanded) {
      setVisibleCount(6);
      setExpanded(false);
    } else {
      setVisibleCount(initialProducts.length);
      setExpanded(true);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 border-b-4 border-amber-500 pb-2 inline-block text-gray-800">
        محصولات ما
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {initialProducts.slice(0, visibleCount).map((product, index) => (
          <ProductCard 
            key={product.id || index}
            id={product.id}
            title={product.title}
            price={product.price}
            imgSrc={product.img}
          />
        ))}
      </div>

      {/* دکمه ادامه / بستن */}
      {initialProducts.length > 6 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleToggle}
            className="px-8 py-3 bg-amber-500 text-white font-bold rounded-lg hover:scale-105 transition-all duration-200 hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-300/40"
          >
            {expanded ? "بستن" : "مشاهده محصولات بیشتر"}
          </button>
        </div>
      )}
    </section>
  );
};

export default HomeProducts;
