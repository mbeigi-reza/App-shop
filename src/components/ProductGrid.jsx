import React, { useState } from "react";
import ProductCard from "./ProductCard";
import img1 from "../images/product1.png";
import img2 from "../images/product2.png";
import img3 from "../images/product3.png";
import img4 from "../images/product4.png";
import img5 from "../images/product5.png";
import img6 from "../images/product6.png";
import img7 from "../images/product7.png"; // محصولات اضافی
import img8 from "../images/product8.png";

const initialProducts = [
  { img: img1, title: "محصول 1", caption: "کپشن محصول 1", price: "120,000 تومان" },
  { img: img2, title: "محصول 2", caption: "کپشن محصول 2", price: "150,000 تومان" },
  { img: img3, title: "محصول 3", caption: "کپشن محصول 3", price: "200,000 تومان" },
  { img: img4, title: "محصول 4", caption: "کپشن محصول 4", price: "130,000 تومان" },
  { img: img5, title: "محصول 5", caption: "کپشن محصول 5", price: "180,000 تومان" },
  { img: img6, title: "محصول 6", caption: "کپشن محصول 6", price: "220,000 تومان" },
];

const moreProducts = [
  { img: img7, title: "محصول 7", caption: "کپشن محصول 7", price: "170,000 تومان" },
  { img: img8, title: "محصول 8", caption: "کپشن محصول 8", price: "190,000 تومان" },
];

const ProductGrid = () => {
  const [showAll, setShowAll] = useState(false);

  const productsToShow = showAll ? [...initialProducts, ...moreProducts] : initialProducts;

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 border-b-2 border-[#FFD700] inline-block text-gray-200">
        محصولات ما
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {productsToShow.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>
      {!showAll && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2 bg-[#FFD700] text-[#2a2a2a] rounded-md hover:scale-105 transition"
          >
            باقی محصولات
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
