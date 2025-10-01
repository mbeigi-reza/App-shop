// src/pages/ProductDetail.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiPlus, FiMinus, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getProductById, getRandomProducts } from "../data/allProducts";
import ProductCard from "../components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // دریافت محصول از allProducts بر اساس ID
    const foundProduct = getProductById(parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      
      // ایجاد تصاویر مختلف برای گالری (با استفاده از عکس اصلی و چند عکس مشابه)
      const productImages = [
        foundProduct.imgSrc,
        foundProduct.imgSrc, // در واقعیت عکس‌های مختلف محصول رو میذاری
        foundProduct.imgSrc,
        foundProduct.imgSrc,
      ];
      setProduct(prev => ({ ...prev, images: productImages }));
      
      // محصولات مرتبط از همون دسته‌بندی
      const related = getRandomProducts(4).filter(p => 
        p.category === foundProduct.category && p.id !== foundProduct.id
      );
      setRelatedProducts(related);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300">محصول یافت نشد</p>
      </div>
    );
  }

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

  // سایزها و رنگ‌های مناسب محصولات ورزشی
  const sizes = ["S (34-36)", "M (38-40)", "L (42-44)", "XL (46-48)"];
  const colors = ["مشکی", "سفید", "آبی", "قرمز", "سبز"];

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
                  alt={`${product.title} - تصویر ${index + 1}`}
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
          <h1 className="text-3xl font-bold text-amber-600 dark:text-amber-400">{product.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.caption}</p>

          {/* اطلاعات فنی */}
          <div className="bg-amber-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">مشخصات فنی:</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• دسته‌بندی: {product.category === "skateboard" ? "اسکیت برد" : 
                               product.category === "inline-skates" ? "اسکیت اینلاین" :
                               product.category === "surfboard" ? "تخته موج‌سواری" :
                               product.category === "heelys" ? "کفش چرخ‌دار" :
                               product.category === "ice-skates" ? "اسکیت روی یخ" : "لوازم جانبی"}</li>
              <li>• مناسب برای: {product.category === "skateboard" ? "حرکات آکروباتیک و شهری" :
                                product.category.includes("skate") ? "ورزش و تفریح" : "استفاده عمومی"}</li>
              <li>• گارانتی: 6 ماه</li>
            </ul>
          </div>

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
            <div className="flex gap-2 flex-wrap">
              {sizes.map((size) => (
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
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
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
          <p className="font-semibold text-amber-700 dark:text-amber-400">کاربر محمد</p>
          <p className="text-gray-600 dark:text-gray-300 mt-1">کیفیت ساخت عالی داره، واقعاً راضی هستم! 🚀</p>
        </div>
        <div className="bg-amber-50 dark:bg-gray-800 border border-amber-200 dark:border-gray-700 p-4 rounded-lg mb-4">
          <p className="font-semibold text-amber-700 dark:text-amber-400">کاربر سارا</p>
          <p className="text-gray-600 dark:text-gray-300 mt-1">مناسب برای مبتدیان، یادگیری باهاش راحت بود 👍</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-amber-200 dark:border-gray-700 rounded-lg p-4">
          <textarea
            placeholder="نظر خود را درباره این محصول بنویسید..."
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard
              key={relatedProduct.id}
              id={relatedProduct.id}
              title={relatedProduct.title}
              caption={relatedProduct.caption}
              price={relatedProduct.price}
              imgSrc={relatedProduct.imgSrc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;