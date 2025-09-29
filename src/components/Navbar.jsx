// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiUser,
  FiChevronLeft,
  FiX,
  FiSun,
  FiMoon
} from "react-icons/fi";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const { cart, removeFromCart, updateQty, totalPrice } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // بررسی وضعیت دارک مود از localStorage
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // تابع تغییر دارک مود
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const menuItems = [
    { name: "خانه", link: "/" },
    { name: "مانتو", link: "/manto" },
    { name: "شلوار", link: "/shalvar" },
    { name: "صفحه ۴", link: "/page4" },
    { name: "صفحه ۵", link: "/page5" },
    { name: "ارتباط با ما", link: "/contact" },
  ];

  return (
    <>
      <nav
        className={`w-full flex justify-between items-center px-4 sm:px-8 p-4 fixed top-0 z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-white dark:bg-gray-900 shadow-lg border-b border-amber-100 dark:border-gray-700"
            : "bg-transparent"
        }`}
      >
        {/* سمت راست دکمه‌ها */}
        <div className="flex pl-4 space-x-2 sm:space-x-4 items-center">
          {/* دکمه تغییر تم */}
          <button
            onClick={toggleDarkMode}
            className="relative overflow-hidden flex items-center justify-center w-10 h-10 rounded-full bg-amber-500 dark:bg-amber-600 text-white hover:bg-amber-600 dark:hover:bg-amber-700 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-amber-300/40"
            aria-label="تغییر تم"
          >
            {darkMode ? (
              <FiSun className="w-5 h-5" />
            ) : (
              <FiMoon className="w-5 h-5" />
            )}
          </button>

          {/* دکمه ثبت نام | ورود */}
          <button
            onClick={() => navigate("/register")}
            className="relative overflow-hidden flex items-center space-x-2 px-4 py-2 rounded-lg border border-amber-500 dark:border-amber-400 bg-white dark:bg-gray-800 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <span className="text-sm font-semibold">ثبت نام | ورود</span>
            <FiUser className="w-5 h-5" />
          </button>

          {/* آیکون سبد خرید */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-amber-500 dark:bg-amber-600 text-white hover:bg-amber-600 dark:hover:bg-amber-700 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-amber-300/40"
          >
            <FiShoppingCart className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* منوی دسکتاپ */}
        <ul
          className={`hidden md:flex space-x-8 pr-9 transition-colors duration-300 
          ${scrolled 
            ? "text-gray-800 dark:text-white" 
            : "text-white dark:text-gray-300"
          }`}
        >
          {menuItems.map((item) => (
            <li key={item.name} className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200 font-medium">
              <Link to={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>

        {/* دکمه موبایل */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className={`text-2xl font-bold transition-colors duration-300
            ${scrolled 
              ? "text-gray-800 dark:text-white" 
              : "text-white dark:text-gray-300"
            } hover:text-amber-500 dark:hover:text-amber-400`}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* منوی موبایل */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-white to-amber-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white shadow-2xl transform transition-all duration-500 ease-in-out z-50 border-l border-amber-100 dark:border-gray-700
        ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
      >
        <ul className="flex flex-col divide-y divide-amber-200 dark:divide-gray-600 mt-2 pr-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.link}
                onClick={() => setIsOpen(false)}
                className="flex justify-between items-center py-3 px-4 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-100/50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <FiChevronLeft className="text-amber-500 dark:text-amber-400 w-5 h-5" />
                <span className="text-right font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/register");
              }}
              className="flex justify-between items-center py-3 px-4 w-full text-right hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-100/50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <FiUser className="text-amber-500 dark:text-amber-400 w-5 h-5" />
              <span className="font-medium">ثبت نام | ورود</span>
            </button>
          </li>
        </ul>
      </div>

      {/* پس‌زمینه نیمه شفاف برای منوی موبایل */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        ></div>
      )}

      {/* پنجره سبد خرید از پایین */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-2xl transform transition-transform duration-500 z-50 border-t-4 border-amber-500 dark:border-amber-400
        ${cartOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="p-4 flex justify-between items-center border-b border-amber-100 dark:border-gray-700 bg-amber-50 dark:bg-gray-800">
          <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400">🛒 سبد خرید</h3>
          <button 
            onClick={() => setCartOpen(false)} 
            className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-4">سبد خرید خالی است</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-amber-50 dark:bg-gray-800 border border-amber-100 dark:border-gray-700 p-3 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg border border-amber-200 dark:border-gray-600"
                  />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{item.name}</p>
                    <p className="text-sm text-amber-600 dark:text-amber-400">
                      {item.price.toLocaleString()} تومان
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      item.qty > 1
                        ? updateQty(item.id, item.qty - 1)
                        : removeFromCart(item.id)
                    }
                    className="px-2 bg-amber-500 dark:bg-amber-600 text-white rounded hover:bg-amber-600 dark:hover:bg-amber-700 transition-colors"
                  >
                    -
                  </button>
                  <span className="font-medium min-w-8 text-center dark:text-white">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="px-2 bg-amber-500 dark:bg-amber-600 text-white rounded hover:bg-amber-600 dark:hover:bg-amber-700 transition-colors"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 text-red-500 hover:text-red-600 transition-colors p-1"
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-amber-100 dark:border-gray-700 bg-amber-50 dark:bg-gray-800 flex justify-between items-center">
          <span className="font-bold text-gray-800 dark:text-white">جمع کل:</span>
          <span className="text-amber-600 dark:text-amber-400 font-bold text-lg">
            {totalPrice.toLocaleString()} تومان
          </span>
        </div>

        {cart.length > 0 && (
          <div className="p-4 bg-white dark:bg-gray-900">
            <button className="w-full bg-amber-500 dark:bg-amber-600 text-white py-3 rounded-lg font-bold hover:bg-amber-600 dark:hover:bg-amber-700 transition-all duration-200 shadow-md hover:shadow-amber-300/40">
              ادامه خرید
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;