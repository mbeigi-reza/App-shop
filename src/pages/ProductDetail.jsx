// src/pages/ProductDetail.jsx
import { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FiPlus, FiMinus, FiChevronLeft, FiChevronRight, FiZoomIn } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProductById, productsByCategory } from "../data/allProducts";
import ProductCard from "../components/ProductCard";
import Layout from "../components/Layout";
import { useCart } from "../context/CartContext";
import CommentSection from "../components/CommentSection";

// تابع برای گرفتن عکس‌های هر دسته‌بندی
const getCategoryImages = (category) => {
  const images = [];
  
  if (category === "skateboard") {
    for (let i = 1; i <= 24; i++) {
      images.push(require(`../images/products/skateboard/skateboard${i}.jpg`));
    }
  } else if (category === "inline-skates") {
    for (let i = 1; i <= 11; i++) {
      images.push(require(`../images/products/inline-skates/inlineSkate${i}.jpg`));
    }
  } else if (category === "surfboard") {
    for (let i = 1; i <= 8; i++) {
      images.push(require(`../images/products/surfboard/surfboard${i}.jpg`));
    }
  } else if (category === "heelys") {
    for (let i = 1; i <= 14; i++) {
      images.push(require(`../images/products/heelys/heelys${i}.jpg`));
    }
  } else if (category === "ice-skates") {
    for (let i = 1; i <= 10; i++) {
      images.push(require(`../images/products/ice-skates/iceSkate${i}.jpg`));
    }
  } else if (category === "accessories") {
    for (let i = 1; i <= 14; i++) {
      images.push(require(`../images/products/accessories/accessories${i}.jpg`));
    }
  }
  
  return images;
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart, removeFromCart, updateQty } = useCart();
  const [quantity, setQuantity] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  // اسکرول به بالای صفحه وقتی کامپوننت mount شد
  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  // توابع اعلان‌های طلایی - هماهنگ با تم سایت
  const showSuccess = (message) =>
    toast.success(message, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
        background: "linear-gradient(135deg, #f59e0b, #d97706)",
        color: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
        border: "1px solid #d97706",
        fontFamily: "Vazir, sans-serif",
        fontSize: "14px"
      }
    });

  const showError = (message) =>
    toast.error(message, {
      position: "top-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
        background: "linear-gradient(135deg, #dc2626, #b91c1c)",
        color: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)",
        border: "1px solid #b91c1c",
        fontFamily: "Vazir, sans-serif",
        fontSize: "14px"
      }
    });

  const showInfo = (message) =>
    toast.info(message, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
        background: "linear-gradient(135deg, #f59e0b, #d97706)",
        color: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
        border: "1px solid #d97706",
        fontFamily: "Vazir, sans-serif",
        fontSize: "14px"
      }
    });

  const showWarning = (message) =>
    toast.warning(message, {
      position: "top-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
        background: "linear-gradient(135deg, #f59e0b, #d97706)",
        color: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
        border: "1px solid #d97706",
        fontFamily: "Vazir, sans-serif",
        fontSize: "14px"
      }
    });

  useEffect(() => {
    const foundProduct = getProductById(parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      
      const categoryImagesList = getCategoryImages(foundProduct.category);
      
      let randomImages = [];
      if (categoryImagesList.length > 0) {
        // عکس اصلی محصول رو اول قرار بده
        randomImages = [foundProduct.imgSrc];
        
        // بقیه عکس‌ها رو به صورت رندوم انتخاب کن (بدون عکس اصلی)
        const otherImages = categoryImagesList.filter(img => {
          // مقایسه مسیر عکس‌ها برای حذف عکس اصلی
          const imgPath = typeof img === 'string' ? img : (img.default || img);
          const productImgPath = typeof foundProduct.imgSrc === 'string' ? foundProduct.imgSrc : (foundProduct.imgSrc.default || foundProduct.imgSrc);
          return imgPath !== productImgPath;
        });
        
        const shuffled = [...otherImages].sort(() => 0.5 - Math.random());
        
        // 3 عکس دیگه اضافه کن
        randomImages = [...randomImages, ...shuffled.slice(0, 3)];
        
        // اگر کمتر از 4 عکس داریم، عکس اصلی رو تکرار کن
        while (randomImages.length < 4) {
          randomImages.push(foundProduct.imgSrc);
        }
      } else {
        randomImages = Array(4).fill(foundProduct.imgSrc);
      }
      
      setProductImages(randomImages);
      
      const related = productsByCategory[foundProduct.category]
        .filter(p => p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id]);

  // تغییر عکس‌ها
  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };
  
  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  // زوم روی عکس
  const handleImageZoom = (e) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  // توابع جدید برای مدیریت تعداد
  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
    showInfo(`تعداد به ${quantity + 1} افزایش یافت`);
  };

  const handleDecreaseQuantity = () => {
    if (quantity === 1) {
      // اگر عدد 1 هست، کلیک روی سطل آشغال => بازگشت به حالت اولیه
      setQuantity(0);
      showInfo("محصول حذف شد");
    } else if (quantity > 1) {
      // اگر عدد 2 به بالا هست، کلیک روی - => کاهش تعداد
      setQuantity(quantity - 1);
      showInfo(`تعداد به ${quantity - 1} کاهش یافت`);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      showError("لطفاً سایز مورد نظر را انتخاب کنید");
      return;
    }

    if (product && quantity > 0) {
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.imgSrc,
        qty: quantity,
        size: selectedSize
      });
      showSuccess(`"${product.title}" به سبد خرید اضافه شد! 🛒`);
    } else {
      showError("لطفاً تعداد محصول را انتخاب کنید");
    }
  };

  // سایزهای مناسب محصولات ورزشی
  const sizes = ["S (34-36)", "M (38-40)", "L (42-44)", "XL (46-48)"];

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
          <p className="text-gray-600 dark:text-gray-300">محصول یافت نشد</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{
          fontSize: '14px',
          fontFamily: 'Vazir, sans-serif'
        }}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-4 py-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 lg:gap-12">
          {/* بخش تصاویر با اسلایدر حرفه‌ای */}
          <div className="space-y-4 lg:space-y-6">
            {/* اسلایدر اصلی */}
            <div className="relative bg-gray-100 dark:bg-gray-800 rounded-xl lg:rounded-2xl overflow-hidden group">
              <div 
                className={`relative h-64 sm:h-80 lg:h-96 transition-all duration-300 ${
                  isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
                onMouseMove={handleImageZoom}
              >
                <img
                  src={productImages[currentIndex].default || productImages[currentIndex]}
                  alt={`${product.title} - تصویر ${currentIndex + 1}`}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isZoomed ? "scale-150" : "scale-100"
                  }`}
                  style={{
                    transformOrigin: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center'
                  }}
                />
                
                {/* دکمه زوم - فقط در دسکتاپ */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(!isZoomed);
                  }}
                  className="absolute top-3 right-3 lg:top-4 lg:right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur-sm hover:bg-black/70 transition-all duration-200 opacity-0 lg:group-hover:opacity-100"
                >
                  <FiZoomIn size={18} className="lg:w-5 lg:h-5" />
                </button>

                {/* دکمه‌های ناوبری */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white p-2 lg:p-3 rounded-full hover:bg-amber-500 hover:text-white hover:scale-110 transition-all duration-200 shadow-lg backdrop-blur-sm"
                >
                  <FiChevronLeft size={20} className="lg:w-6 lg:h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-white p-2 lg:p-3 rounded-full hover:bg-amber-500 hover:text-white hover:scale-110 transition-all duration-200 shadow-lg backdrop-blur-sm"
                >
                  <FiChevronRight size={20} className="lg:w-6 lg:h-6" />
                </button>

                {/* شماره عکس */}
                <div className="absolute bottom-3 left-3 lg:bottom-4 lg:left-4 bg-black/50 text-white px-2 py-1 lg:px-3 lg:py-1 rounded-full text-xs lg:text-sm backdrop-blur-sm">
                  {currentIndex + 1} / {productImages.length}
                </div>
              </div>
            </div>

            {/* گالری کوچک */}
            <div className="grid grid-cols-4 gap-2 lg:gap-3">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative rounded-lg lg:rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    index === currentIndex
                      ? "border-amber-500 dark:border-amber-400 ring-1 lg:ring-2 ring-amber-200 dark:ring-amber-500/30 scale-105"
                      : "border-gray-200 dark:border-gray-600 hover:border-amber-300 dark:hover:border-amber-500"
                  }`}
                >
                  <img
                    src={img.default || img}
                    alt={`${product.title} - تصویر ${index + 1}`}
                    className="w-full h-16 lg:h-20 object-cover"
                  />
                  {/* overlay برای عکس فعال */}
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-amber-500/20" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* بخش اطلاعات محصول */}
          <div className="space-y-4 lg:space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-lg border border-amber-100 dark:border-gray-700">
              <h1 className="text-xl lg:text-3xl font-bold text-amber-600 dark:text-amber-400 mb-3 leading-tight text-right">
                {product.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm lg:text-lg text-right">
                {product.caption}
              </p>

              {/* اطلاعات فنی */}
              <div className="bg-amber-50 dark:bg-gray-700 p-3 lg:p-4 rounded-lg lg:rounded-xl mt-4">
                <h3 className="font-semibold text-amber-700 dark:text-amber-400 mb-2 lg:mb-3 text-base lg:text-lg text-right">
                  مشخصات فنی:
                </h3>
                <ul className="text-xs lg:text-sm text-gray-600 dark:text-gray-300 space-y-1 lg:space-y-2 text-right">
                  <li className="flex items-center justify-end">
                    <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-amber-500 rounded-full ml-2 flex-shrink-0"></span>
                    دسته‌بندی: {product.category === "skateboard" ? "اسکیت برد" : 
                                 product.category === "inline-skates" ? "اسکیت اینلاین" :
                                 product.category === "surfboard" ? "تخته موج‌سواری" :
                                 product.category === "heelys" ? "کفش چرخ‌دار" :
                                 product.category === "ice-skates" ? "اسکیت روی یخ" : "لوازم جانبی"}
                  </li>
                  <li className="flex items-center justify-end">
                    <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-amber-500 rounded-full ml-2 flex-shrink-0"></span>
                    مناسب برای: {product.category === "skateboard" ? "حرکات آکروباتیک و شهری" :
                                  product.category.includes("skate") ? "ورزش و تفریح" : "استفاده عمومی"}
                  </li>
                  <li className="flex items-center justify-end">
                    <span className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-amber-500 rounded-full ml-2 flex-shrink-0"></span>
                    گارانتی: 6 ماه
                  </li>
                </ul>
              </div>

              {/* قیمت */}
              <div className="flex items-center gap-3 lg:gap-4 mt-4 lg:mt-6 p-3 lg:p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-gray-700 dark:to-gray-600 rounded-lg lg:rounded-xl text-right">
                <span className="text-amber-600 dark:text-amber-400 text-lg lg:text-2xl font-bold">
                  {product.price.toLocaleString()} تومان
                </span>
                {product.oldPrice && (
                  <span className="text-gray-400 dark:text-gray-500 line-through text-sm lg:text-lg">
                    {product.oldPrice.toLocaleString()} تومان
                  </span>
                )}
              </div>

              {/* انتخاب سایز */}
              <div className="mt-4 lg:mt-6 text-right">
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2 lg:mb-3 text-base lg:text-lg">
                  سایز:
                </p>
                <div className="flex gap-2 lg:gap-3 flex-wrap">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-2 py-1.5 lg:px-3 lg:py-2 border-2 rounded-lg font-medium transition-all duration-200 text-xs lg:text-sm flex-1 min-w-[60px] lg:min-w-[70px] ${
                        selectedSize === size
                          ? "bg-amber-500 dark:bg-amber-600 text-white border-amber-500 dark:border-amber-600 shadow-md shadow-amber-300/20 dark:shadow-amber-500/10 scale-105"
                          : "border-amber-200 dark:border-amber-600 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-700 hover:border-amber-300 dark:hover:border-amber-500 hover:scale-105"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* انتخاب تعداد و دکمه خرید */}
              <div className="mt-6 lg:mt-8 p-3 lg:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg lg:rounded-xl">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 text-right">
                  <div className="flex items-center justify-between lg:justify-end lg:gap-4">
                    <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm lg:text-lg whitespace-nowrap">
                      تعداد:
                    </span>
                    
                    {/* کامپوننت جدید تعداد */}
                    <div className="flex items-center gap-2 lg:gap-3 bg-white dark:bg-gray-800 rounded-lg lg:rounded-xl p-2 shadow-sm">
                      {quantity === 0 ? (
                        // حالت اولیه: فقط دکمه +
                        <button
                          onClick={() => setQuantity(1)}
                          className="p-2 lg:p-3 bg-amber-500 dark:bg-amber-600 text-white rounded lg:rounded-lg hover:bg-amber-600 dark:hover:bg-amber-700 hover:scale-110 transition-all duration-200"
                        >
                          <FiPlus size={14} className="lg:w-4 lg:h-4" />
                        </button>
                      ) : (
                        // حالت وقتی تعداد >= 1
                        <>
                          {/* دکمه حذف/کاهش */}
                          <button
                            onClick={handleDecreaseQuantity}
                            className="p-2 lg:p-3 bg-amber-500 dark:bg-amber-600 text-white rounded lg:rounded-lg hover:bg-amber-600 dark:hover:bg-amber-700 hover:scale-110 transition-all duration-200"
                          >
                            {quantity === 1 ? (
                              // سطل آشغال برای عدد 1
                              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            ) : (
                              // - برای عدد 2 به بالا
                              <FiMinus size={14} className="lg:w-4 lg:h-4" />
                            )}
                          </button>

                          {/* نمایش عدد */}
                          <span className="font-bold text-base lg:text-lg min-w-6 lg:min-w-8 text-center dark:text-white mx-1 lg:mx-2">
                            {quantity}
                          </span>

                          {/* دکمه افزایش */}
                          <button
                            onClick={handleIncreaseQuantity}
                            className="p-2 lg:p-3 bg-amber-500 dark:bg-amber-600 text-white rounded lg:rounded-lg hover:bg-amber-600 dark:hover:bg-amber-700 hover:scale-110 transition-all duration-200"
                          >
                            <FiPlus size={14} className="lg:w-4 lg:h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* دکمه افزودن به سبد - ریسپانسیو */}
                  <button 
                    onClick={handleAddToCart}
                    disabled={quantity === 0}
                    className={`w-full lg:flex-1 lg:max-w-xs py-3 lg:py-4 rounded-lg lg:rounded-xl font-bold hover:shadow-xl lg:hover:shadow-2xl transition-all duration-200 text-base lg:text-lg hover:scale-105 hover:-translate-y-0.5 active:scale-95 ${
                      quantity === 0 
                        ? "bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed" 
                        : "bg-amber-500 dark:bg-amber-600 text-white hover:bg-amber-600 dark:hover:bg-amber-700 hover:shadow-amber-300/40 dark:hover:shadow-amber-500/30"
                    }`}
                  >
                    {quantity === 0 ? "⚠️ ابتدا تعداد انتخاب کنید" : "🛒 افزودن به سبد خرید"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* محصولات مرتبط */}
        <div className="max-w-6xl mx-auto mt-12 lg:mt-16">
          <h2 className="text-xl lg:text-2xl font-bold mb-6 border-b-4 border-amber-500 dark:border-amber-400 pb-2 lg:pb-3 inline-block dark:text-white text-right">
            محصولات مرتبط
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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

        {/* بخش نظرات */}
        <div className="max-w-6xl mx-auto mt-12 lg:mt-16">
          <CommentSection productId={id} />
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;