// src/pages/FeaturedProducts.jsx
import { useState, useEffect, useRef } from "react";
import ProductCard from "../components/ProductCard";
import PriceFilter from "../components/PriceFilter";
import usePriceFilter from "../hooks/usePriceFilter";
import { getRandomProducts } from "../data/allProducts";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;
  const filterRef = useRef(null);

  useEffect(() => {
    const randomProducts = getRandomProducts(13);
    setProducts(randomProducts);
  }, []);

  // استفاده از هوک فیلتر قیمت
  const {
    showFilter,
    setShowFilter,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    filteredProducts,
    clearFilters
  } = usePriceFilter(products);

  // بستن فیلتر با کلیک خارج
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilter && filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter, setShowFilter]);

  // محاسبه محصولات قابل نمایش در صفحه جاری (با فیلتر)
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // محاسبه تعداد صفحات (با فیلتر)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // تغییر صفحه
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-amber-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* عنوان صفحه */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">محصولات ویژه</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">برترین و محبوب‌ترین محصولات با بهترین کیفیت</p>
        </div>

        {/* دکمه نمایش فیلتر در موبایل */}
        <div className="lg:hidden flex justify-center mb-4">
          <button
            onClick={() => setShowFilter(true)}
            className="px-6 py-3 bg-amber-500 dark:bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-600 dark:hover:bg-amber-700 transition-all duration-200 shadow-md"
          >
            🔍 فیلتر قیمت
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* کامپوننت فیلتر قیمت با ref */}
          <div ref={filterRef}>
            <PriceFilter
              showFilter={showFilter}
              setShowFilter={setShowFilter}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              onClearFilters={clearFilters}
            />
          </div>

          {/* محتوای اصلی */}
          <div className="flex-1">
            {/* شبکه محصولات */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  imgSrc={product.imgSrc}
                />
              ))}
            </div>

            {/* صفحه‌بندی */}
            {filteredProducts.length > 0 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                {/* دکمه قبلی */}
                <button 
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === 1 
                      ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed" 
                      : "bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-600 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-700"
                  }`}
                >
                  ‹ قبلی
                </button>

                {/* شماره صفحات */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => paginate(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? "bg-amber-500 dark:bg-amber-600 text-white"
                        : "bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-600 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* دکمه بعدی */}
                <button 
                  onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === totalPages 
                      ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed" 
                      : "bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-600 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-700"
                  }`}
                >
                  بعدی ›
                </button>
              </div>
            )}

            {/* پیام عدم وجود محصول */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">
                  محصولی یافت نشد
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  هیچ محصولی با فیلترهای انتخاب شده مطابقت ندارد
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-amber-500 dark:bg-amber-600 text-white rounded-lg hover:bg-amber-600 dark:hover:bg-amber-700 transition-colors"
                >
                  حذف فیلترها
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;