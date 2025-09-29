import React, { useState } from "react";
import ProductCard from "./ProductCard";
import img1 from "../images/product1.png";
import img2 from "../images/product2.png";
import img3 from "../images/product3.png";
import img4 from "../images/product4.png";
import img5 from "../images/product5.png";
import img6 from "../images/product6.png";
import img7 from "../images/product7.png";
import img8 from "../images/product8.png";

const initialProducts = [
  { id: 1, img: img1, title: "محصول 1", caption: "کپشن محصول 1", price: 120000 },
  { id: 2, img: img2, title: "محصول 2", caption: "کپشن محصول 2", price: 150000 },
  { id: 3, img: img3, title: "محصول 3", caption: "کپشن محصول 3", price: 200000 },
  { id: 4, img: img4, title: "محصول 4", caption: "کپشن محصول 4", price: 130000 },
  { id: 5, img: img5, title: "محصول 5", caption: "کپشن محصول 5", price: 180000 },
  { id: 6, img: img6, title: "محصول 6", caption: "کپشن محصول 6", price: 220000 },
];

const moreProducts = [
  { id: 7, img: img7, title: "محصول 7", caption: "کپشن محصول 7", price: 170000 },
  { id: 8, img: img8, title: "محصول 8", caption: "کپشن محصول 8", price: 190000 },
];

const ProductGrid = () => {
  const [showAll, setShowAll] = useState(false);

  const productsToShow = showAll ? [...initialProducts, ...moreProducts] : initialProducts;

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 border-b-4 border-amber-500 pb-2 inline-block text-gray-800">
        محصولات ما
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {productsToShow.map((product) => (
          <ProductCard 
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            imgSrc={product.img}
          />
        ))}
      </div>
      {!showAll && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="px-8 py-3 bg-amber-500 text-white rounded-lg hover:scale-105 transition-all duration-200 hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-300/40 font-bold text-lg"
          >
            مشاهده محصولات بیشتر
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
