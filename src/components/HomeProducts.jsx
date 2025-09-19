import React, { useState } from "react";
import ProductCard from "./ProductCard";

const HomeProducts = ({ initialProducts }) => {
  const [visibleCount, setVisibleCount] = useState(6); // تعداد اولیه
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    if (expanded) {
      setVisibleCount(6);
      setExpanded(false);
    } else {
      setVisibleCount(initialProducts.length); // همه محصولات
      setExpanded(true);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 border-b-2 border-[#FFD700] inline-block">
        محصولات ما
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {initialProducts.slice(0, visibleCount).map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>

      {/* دکمه ادامه / بستن */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleToggle}
          className="px-6 py-3 bg-[#FFD700] text-[#1F1F1F] font-semibold rounded-lg hover:scale-105 transition"
        >
          {expanded ? "بستن" : "ادامه محصولات"}
        </button>
      </div>
    </section>
  );
};

export default HomeProducts;
