// src/pages/RecommendedProducts.jsx
import ProductCard from "../components/ProductCard";

const recommendedProducts = [
  {
    id: 1,
    title: "مانتو مجلسی پیشنهادی",
    price: 420000,
    imgSrc: "https://via.placeholder.com/200x250?text=Recommended+1",
  },
  {
    id: 2,
    title: "شلوار جین پیشنهادی",
    price: 290000,
    imgSrc: "https://via.placeholder.com/200x250?text=Recommended+2",
  },
  {
    id: 3,
    title: "کت پاییزه پیشنهادی",
    price: 620000,
    imgSrc: "https://via.placeholder.com/200x250?text=Recommended+3",
  },
  {
    id: 4,
    title: "بلوز زنانه پیشنهادی",
    price: 250000,
    imgSrc: "https://via.placeholder.com/200x250?text=Recommended+4",
  },
  {
    id: 5,
    title: "دامن تابستانی پیشنهادی",
    price: 180000,
    imgSrc: "https://via.placeholder.com/200x250?text=Recommended+5",
  },
  {
    id: 6,
    title: "پیراهن مجلسی پیشنهادی",
    price: 480000,
    imgSrc: "https://via.placeholder.com/200x250?text=Recommended+6",
  },
  {
    id: 7,
    title: "هودی زنانه پیشنهادی",
    price: 320000,
    imgSrc: "https://via.placeholder.com/200x250?text=Recommended+7",
  },
  {
    id: 8,
    title: "شلوار کتان پیشنهادی",
    price: 240000,
    imgSrc: "https://via.placeholder.com/200x250?text=Recommended+8",
  },
];

const RecommendedProducts = () => {
  return (
    <div className="min-h-screen bg-amber-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* عنوان صفحه */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">محصولات پیشنهادی</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">محصولات منتخب و پیشنهادی برای شما</p>
        </div>

        {/* فیلترها و مرتب‌سازی */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-amber-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <span className="text-gray-700 dark:text-gray-300 font-medium">مرتب‌سازی بر اساس:</span>
            <select className="bg-amber-50 dark:bg-gray-700 border border-amber-200 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-800 dark:text-white focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/30 focus:outline-none transition-colors">
              <option>پربازدیدترین</option>
              <option>جدیدترین</option>
              <option>ارزان‌ترین</option>
              <option>گران‌ترین</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-amber-600 dark:text-amber-400 font-bold">{recommendedProducts.length} محصول</span>
          </div>
        </div>

        {/* شبکه محصولات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendedProducts.map((product) => (
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
        <div className="flex justify-center items-center gap-2 mt-12">
          <button className="px-4 py-2 bg-amber-500 dark:bg-amber-600 text-white rounded-lg hover:bg-amber-600 dark:hover:bg-amber-700 transition-colors font-medium">
            ۱
          </button>
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-600 text-amber-600 dark:text-amber-400 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors font-medium">
            ۲
          </button>
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-600 text-amber-600 dark:text-amber-400 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors font-medium">
            ۳
          </button>
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-600 text-amber-600 dark:text-amber-400 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors font-medium">
            بعدی ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;