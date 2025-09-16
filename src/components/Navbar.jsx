import { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full flex justify-between items-center px-4 sm:px-8 p-4 fixed top-0 z-50">
      {/* سمت راست: دکمه‌ها */}
      <div className="flex space-x-2 sm:space-x-4">
        <button className="flex items-center space-x-1 space-x-reverse sm:space-x-2 px-2 py-1 sm:px-3 sm:py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
          <span className="text-xs sm:text-sm">سبد خرید</span>
          <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button className="flex items-center space-x-1 space-x-reverse sm:space-x-2 px-2 py-1 sm:px-3 sm:py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
          <span className="text-xs sm:text-sm">حساب کاربری</span>
          <FiUser className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* منو دسکتاپ */}
      <ul className="hidden md:flex space-x-4 lg:space-x-6">
        <li><Link to="/">خانه</Link></li>
        <li><Link to="/manto">مانتو</Link></li>
        <li><Link to="/shalvar">شلوار</Link></li>
        <li><Link to="/page4">صفحه ۴</Link></li>
        <li><Link to="/page5">صفحه ۵</Link></li>
        <li><Link to="/contact">ارتباط با ما</Link></li>
      </ul>

      {/* دکمه منوی موبایل */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="text-2xl font-bold"
        >
          ☰
        </button>
      </div>

      {/* منوی موبایل Drawer از سمت راست */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* دکمه بستن */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-2xl font-bold"
        >
          ✕
        </button>

        {/* لینک‌ها */}
        <ul className="flex flex-col mt-16 space-y-4 px-6">
          <li><Link to="/" onClick={() => setIsOpen(false)}>خانه</Link></li>
          <li><Link to="/manto" onClick={() => setIsOpen(false)}>مانتو</Link></li>
          <li><Link to="/shalvar" onClick={() => setIsOpen(false)}>شلوار</Link></li>
          <li><Link to="/page4" onClick={() => setIsOpen(false)}>صفحه ۴</Link></li>
          <li><Link to="/page5" onClick={() => setIsOpen(false)}>صفحه ۵</Link></li>
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>ارتباط با ما</Link></li>
        </ul>
      </div>

      {/* پس‌زمینه نیمه شفاف وقتی منو بازه */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
