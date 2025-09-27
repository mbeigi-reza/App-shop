// src/pages/ProductDetail.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FiPlus, FiMinus, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  // نمونه محصول
  const product = {
    id,
    name: "مانتو تابستانی",
    description:
      "یک مانتوی شیک و راحت برای فصل تابستان. ساخته شده از پارچه خنک و با کیفیت.",
    price: 320000,
    oldPrice: 400000,
    images: [
      "https://via.placeholder.com/400x400?text=1",
      "https://via.placeholder.com/400x400/aaa?text=2",
      "https://via.placeholder.com/400x400/f55?text=3",
      "https://via.placeholder.com/400x400/0af?text=4",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["مشکی", "سفید", "طلایی"],
  };

  // تغییر عکس‌ها
  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };
  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen bg-[#1F1F1F] text-white p-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* بخش تصاویر با گالری */}
        <div className="relative w-full max-w-md mx-auto">
          <div className="flex justify-center items-center overflow-hidden relative h-96">
            {product.images.map((img, index) => {
              const isActive = index === currentIndex;
              const offset = (index - currentIndex) * 40;

              return (
                <img
                  key={index}
                  src={img}
                  alt={`product-${index}`}
                  className={`absolute transition-all duration-500 rounded-lg shadow-lg cursor-pointer
                  ${isActive ? "scale-100 z-20" : "scale-90 opacity-70 z-10"}
                `}
                  style={{
                    transform: `translateX(${offset}px)`,
                  }}
                />
              );
            })}
          </div>

          {/* دکمه‌های ناوبری */}
          <button
            onClick={prevImage}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
          >
            <FiChevronRight size={24} />
          </button>
        </div>

        {/* بخش اطلاعات محصول */}
        <div>
          <h1 className="text-2xl font-bold text-yellow-400">{product.name}</h1>
          <p className="mt-2 text-gray-300">{product.description}</p>

          {/* قیمت */}
          <div className="mt-4">
            <span className="text-yellow-400 text-xl font-bold">
              {product.price.toLocaleString()} تومان
            </span>
            {product.oldPrice && (
              <span className="text-gray-500 line-through mr-3">
                {product.oldPrice.toLocaleString()} تومان
              </span>
            )}
          </div>

          {/* انتخاب سایز */}
          <div className="mt-4">
            <p className="font-semibold">سایز:</p>
            <div className="flex gap-2 mt-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className="px-3 py-1 border border-gray-600 rounded hover:bg-yellow-400 hover:text-black transition"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* انتخاب رنگ */}
          <div className="mt-4">
            <p className="font-semibold">رنگ:</p>
            <div className="flex gap-2 mt-2">
              {product.colors.map((color) => (
                <span
                  key={color}
                  className="px-3 py-1 border border-gray-600 rounded hover:bg-yellow-400 hover:text-black transition cursor-pointer"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>

          {/* انتخاب تعداد */}
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              className="p-2 bg-gray-700 rounded hover:bg-gray-600"
            >
              <FiMinus />
            </button>
            <span className="font-bold text-lg">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 bg-gray-700 rounded hover:bg-gray-600"
            >
              <FiPlus />
            </button>
          </div>

          {/* دکمه افزودن به سبد */}
          <button className="mt-6 w-full bg-yellow-400 text-black py-3 rounded-lg font-bold hover:opacity-90 transition">
            افزودن به سبد خرید 🛒
          </button>
        </div>
      </div>

      {/* بخش نظرات */}
      <div className="max-w-5xl mx-auto mt-12">
        <h2 className="text-xl font-bold mb-4">نظرات کاربران</h2>
        <div className="bg-gray-800 p-4 rounded-lg mb-3">
          <p className="font-semibold">کاربر علی</p>
          <p className="text-sm text-gray-300">خیلی کیفیت خوبی داشت 👍</p>
        </div>
        <textarea
          placeholder="نظر خود را بنویسید..."
          className="w-full p-3 rounded bg-gray-900 text-white mt-3"
        />
        <button className="mt-3 px-4 py-2 bg-yellow-400 text-black rounded hover:opacity-90">
          ارسال نظر
        </button>
      </div>

      {/* محصولات مرتبط */}
      <div className="max-w-5xl mx-auto mt-12">
        <h2 className="text-xl font-bold mb-4">محصولات مرتبط</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-gray-800 p-3 rounded-lg flex flex-col items-center"
            >
              <img
                src="https://via.placeholder.com/150"
                alt="محصول مرتبط"
                className="rounded mb-2"
              />
              <p className="text-sm">محصول شماره {item}</p>
              <span className="text-yellow-400 font-bold">200,000 تومان</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
