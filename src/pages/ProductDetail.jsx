// src/pages/ProductDetail.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FiPlus, FiMinus, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

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
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-6">
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
                  className={`absolute transition-all duration-500 rounded-lg shadow-lg cursor-pointer border-2
                  ${
                    isActive 
                      ? "scale-100 z-20 border-amber-400 dark:border-amber-500 shadow-amber-200/50 dark:shadow-amber-500/30" 
                      : "scale-90 opacity-70 z-10 border-amber-100 dark:border-gray-600"
                  }
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
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-amber-500 dark:bg-amber-600 text-white p-3 rounded-full hover:bg-amber-600 dark:hover:bg-amber-700 hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-amber-300/40 dark:hover:shadow-amber-500/30"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-amber-500 dark:bg-amber-600 text-white p-3 rounded-full hover:bg-amber-600 dark:hover:bg-amber-700 hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-amber-300/40 dark:hover:shadow-amber-500/30"
          >
            <FiChevronRight size={24} />
          </button>

          {/* ایندیکاتور */}
          <div className="flex justify-center mt-4 space-x-2">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-amber-500 dark:bg-amber-400 scale-125" 
                    : "bg-amber-200 dark:bg-gray-600 hover:bg-amber-300 dark:hover:bg-amber-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* بخش اطلاعات محصول */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-amber-600 dark:text-amber-400">{product.name}</h1>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>

          {/* قیمت */}
          <div className="flex items-center gap-4">
            <span className="text-amber-600 dark:text-amber-400 text-2xl font-bold">
              {product.price.toLocaleString()} تومان
            </span>
            {product.oldPrice && (
              <span className="text-gray-400 dark:text-gray-500 line-through text-lg">
                {product.oldPrice.toLocaleString()} تومان
              </span>
            )}
          </div>

          {/* انتخاب سایز */}
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300 mb-3">سایز:</p>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedSize === size
                      ? "bg-amber-500 dark:bg-amber-600 text-white border-amber-500 dark:border-amber-600"
                      : "border-amber-300 dark:border-amber-600 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* انتخاب رنگ */}
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300 mb-3">رنگ:</p>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedColor === color
                      ? "bg-amber-500 dark:bg-amber-600 text-white border-amber-500 dark:border-amber-600"
                      : "border-amber-300 dark:border-amber-600 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* انتخاب تعداد */}
          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-700 dark:text-gray-300">تعداد:</span>
            <div className="flex items-center gap-3 bg-amber-50 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="p-2 bg-amber-500 dark:bg-amber-600 text-white rounded-lg hover:bg-amber-600 dark:hover:bg-amber-700 transition-colors"
              >
                <FiMinus />
              </button>
              <span className="font-bold text-lg min-w-8 text-center dark:text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 bg-amber-500 dark:bg-amber-600 text-white rounded-lg hover:bg-amber-600 dark:hover:bg-amber-700 transition-colors"
              >
                <FiPlus />
              </button>
            </div>
          </div>

          {/* دکمه افزودن به سبد */}
          <button className="w-full bg-amber-500 dark:bg-amber-600 text-white py-4 rounded-lg font-bold hover:bg-amber-600 dark:hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-300/40 dark:hover:shadow-amber-500/30 transition-all duration-200 text-lg">
            افزودن به سبد خرید 🛒
          </button>
        </div>
      </div>

      {/* بخش نظرات */}
      <div className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-6 border-b-4 border-amber-500 dark:border-amber-400 pb-2 inline-block dark:text-white">نظرات کاربران</h2>
        <div className="bg-amber-50 dark:bg-gray-800 border border-amber-200 dark:border-gray-700 p-4 rounded-lg mb-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400">کاربر علی</p>
          <p className="text-gray-600 dark:text-gray-300 mt-1">خیلی کیفیت خوبی داشت 👍</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-amber-200 dark:border-gray-700 rounded-lg p-4">
          <textarea
            placeholder="نظر خود را بنویسید..."
            className="w-full p-3 rounded-lg bg-amber-50 dark:bg-gray-700 border border-amber-200 dark:border-gray-600 text-gray-800 dark:text-white focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/30 focus:outline-none transition-colors"
            rows="4"
          />
          <button className="mt-3 px-6 py-2 bg-amber-500 dark:bg-amber-600 text-white rounded-lg hover:bg-amber-600 dark:hover:bg-amber-700 transition-colors font-medium">
            ارسال نظر
          </button>
        </div>
      </div>

      {/* محصولات مرتبط */}
      <div className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-6 border-b-4 border-amber-500 dark:border-amber-400 pb-2 inline-block dark:text-white">محصولات مرتبط</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white dark:bg-gray-800 border border-amber-100 dark:border-gray-700 p-4 rounded-xl shadow-sm hover:shadow-lg dark:hover:shadow-gray-700/30 hover:border-amber-300 dark:hover:border-amber-500 transition-all duration-300 flex flex-col items-center"
            >
              <img
                src="https://via.placeholder.com/150"
                alt="محصول مرتبط"
                className="rounded-lg mb-3 border border-amber-200 dark:border-gray-600"
              />
              <p className="text-sm font-medium text-gray-800 dark:text-white text-center">محصول شماره {item}</p>
              <span className="text-amber-600 dark:text-amber-400 font-bold mt-2">200,000 تومان</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;