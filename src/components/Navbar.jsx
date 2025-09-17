import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✅ مدیریت اسکرول برای تغییر رنگ بک‌گراند و متن
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 flex justify-between items-center px-4 py-3 transition-colors duration-300
        ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}
    >
      {/* دکمه‌ها سمت راست */}
      <div className="flex space-x-2">
        <button className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
          <span className="text-xs">سبد خرید</span>
          <FiShoppingCart className="w-4 h-4" />
        </button>

        <button className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
          <span className="text-xs">حساب کاربری</span>
          <FiUser className="w-4 h-4" />
        </button>
      </div>

      {/* منوی دسکتاپ */}
      <ul
        className={`hidden md:flex space-x-4 lg:space-x-6 transition-colors duration-300
          ${scrolled ? "text-black" : "text-white"}`}
      >
        <li><Link to="/">خانه</Link></li>
        <li><Link to="/manto">مانتو</Link></li>
        <li><Link to="/shalvar">شلوار</Link></li>
        <li><Link to="/page4">صفحه ۴</Link></li>
        <li><Link to="/page5">صفحه ۵</Link></li>
        <li><Link to="/contact">ارتباط با ما</Link></li>
      </ul>

      {/* دکمه منوی موبایل */}
      <button
        className={`md:hidden text-2xl font-bold transition-colors duration-300
          ${scrolled ? "text-black" : "text-white"}`}
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>

      {/* Drawer موبایل */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-2xl font-bold"
        >
          ✕
        </button>

        <ul className="flex flex-col mt-16 space-y-4 px-6 text-black">
          <li><Link to="/" onClick={() => setIsOpen(false)}>خانه</Link></li>
          <li><Link to="/manto" onClick={() => setIsOpen(false)}>مانتو</Link></li>
          <li><Link to="/shalvar" onClick={() => setIsOpen(false)}>شلوار</Link></li>
          <li><Link to="/page4" onClick={() => setIsOpen(false)}>صفحه ۴</Link></li>
          <li><Link to="/page5" onClick={() => setIsOpen(false)}>صفحه ۵</Link></li>
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>ارتباط با ما</Link></li>
        </ul>
      </div>

      {/* Overlay وقتی Drawer بازه */}
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
