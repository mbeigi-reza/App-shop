import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiUser,
  FiX,
  FiSun,
  FiMoon,
  FiLogOut,
  FiHome,
  FiInfo,
  FiChevronDown,
  FiGrid,
  FiShield
} from "react-icons/fi";
import { useCart } from "../context/CartContext";

// هوک مدیریت کاربر - ساده‌سازی شده
const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // فقط از localStorage کاربر رو بگیر
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  return { 
    user, 
    logout, 
    login,
    isAdmin: user?.role === 'admin'
  };
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [categoriesTimeout, setCategoriesTimeout] = useState(null);
  const navigate = useNavigate();

  const { cart, removeFromCart, updateQty, totalPrice } = useCart();
  const { user, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // مدیریت دارک مود
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

    const handleLogin = () => {
     navigate("/login"); // به جای "/register"
     };

  // توابع جدید برای مدیریت hover با تاخیر
  const handleMouseEnter = () => {
    if (categoriesTimeout) {
      clearTimeout(categoriesTimeout);
      setCategoriesTimeout(null);
    }
    setCategoriesOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setCategoriesOpen(false);
    }, 1000); // 1 ثانیه تاخیر
    
    setCategoriesTimeout(timeout);
  };

  // دسته‌بندی‌ها
  const categories = [
    { name: "اسکیت برد", link: "/skateboard", icon: "🛹" },
    { name: "اسکیت اینلاین", link: "/inline-skates", icon: "⛸️" },
    { name: "تخته موج‌سواری", link: "/surfboard", icon: "🏄" },
    { name: "کفش چرخ‌دار", link: "/heelys", icon: "👟" },
    { name: "اسکیت روی یخ", link: "/ice-skates", icon: "❄️" },
    { name: "لوازم جانبی", link: "/accessories", icon: "🛡️" }
  ];

  // منوی اصلی
  const menuItems = [
    { name: "خانه", link: "/", icon: <FiHome className="w-5 h-5" /> },
    { name: "درباره ما", link: "/about", icon: <FiInfo className="w-5 h-5" /> },
  ];

  return (
    <>
      <nav
        className={`w-full flex justify-between items-center px-4 sm:px-8 p-4 fixed top-0 z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-white dark:bg-gray-900 shadow-lg border-amber-100 dark:border-gray-700"
            : "bg-transparent"
        }`}
      >
        {/* سمت راست - لوگو */}
        <div className="flex items-center">
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
          >
            SportLand
          </Link>
        </div>

        {/* سمت چپ - منو و دکمه‌ها */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* تغییر تم */}
          <button
            onClick={toggleDarkMode}
            className="relative overflow-hidden flex items-center justify-center w-10 h-10 rounded-full bg-amber-500 dark:bg-amber-600 text-white hover:bg-amber-600 dark:hover:bg-amber-700 hover:scale-105 transition-all duration-200 shadow-md hover:shadow-amber-300/40"
          >
            {darkMode ? (
              <FiSun className="w-5 h-5" />
            ) : (
              <FiMoon className="w-5 h-5" />
            )}
          </button>

          {/* مدیریت کاربر */}
          {user ? (
            <div className="flex items-center gap-3">
              {/* پنل ادمین - فقط برای ادمین‌ها */}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <FiShield className="w-4 h-4" />
                  <span className="text-sm font-semibold">پنل ادمین</span>
                </Link>
              )}
              
              {/* دکمه خروج */}
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <FiLogOut className="w-4 h-4" />
                <span className="text-sm font-semibold">خروج</span>
              </button>
              
              {/* نمایش کاربر در موبایل */}
              <div className="flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-2 rounded-lg">
                <span className="text-sm font-medium">{user.name}</span>
                {isAdmin && (
                  <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">مدیر</span>
                )}
              </div>
            </div>
          ) : (
            /* دکمه ورود */
            <button
              onClick={handleLogin}
              className="relative overflow-hidden flex items-center space-x-2 px-4 py-2 rounded-lg border border-amber-500 dark:border-amber-400 bg-white dark:bg-gray-800 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span className="text-sm font-semibold">ورود</span>
              <FiUser className="w-5 h-5" />
            </button>
          )}

          {/* منوی دسته‌بندی‌ها با تاخیر - فقط در دسکتاپ */}
          <div className="relative hidden md:block">
            <button
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 dark:bg-amber-600 text-white rounded-lg hover:bg-amber-600 dark:hover:bg-amber-700 transition-all duration-200 shadow-md hover:shadow-amber-300/40"
            >
              <FiGrid className="w-5 h-5" />
              <span className="hidden sm:block font-semibold">محصولات ما</span>
              <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${categoriesOpen ? "rotate-180" : ""}`} />
            </button>

            {/* منوی کشویی دسته‌بندی‌ها */}
            {categoriesOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-amber-100 dark:border-gray-700 py-2 z-50"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {categories.map((category, index) => (
                  <Link
                    key={category.name}
                    to={category.link}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50 dark:hover:bg-gray-700 transition-all duration-200 group"
                    onClick={() => setCategoriesOpen(false)}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span className="text-gray-800 dark:text-white font-medium group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* منوی اصلی */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium
                  ${scrolled 
                    ? "text-gray-800 dark:text-white hover:bg-amber-100 dark:hover:bg-gray-700 hover:text-amber-600 dark:hover:text-amber-400" 
                    : "text-white dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-700/50"
                  }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* سبد خرید */}
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
        </div>
      </nav>

      {/* منوی موبایل */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-white to-amber-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white shadow-2xl transform transition-all duration-500 ease-in-out z-50 border-l border-amber-100 dark:border-gray-700
        ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
      >
        <div className="flex flex-col h-full">
          {/* هدر منو */}
          <div className="p-4 border-b border-amber-200 dark:border-gray-600">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-amber-600 dark:text-amber-400">منو</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* محتوای منو */}
          <div className="flex-1 overflow-y-auto py-4">
            {/* وضعیت کاربر */}
            {user && (
              <div className="bg-amber-100 dark:bg-amber-900/30 mx-4 mb-4 rounded-lg p-3">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{user.name}</span>
                    <span className="text-xs">{user.email}</span>
                    {isAdmin && (
                      <span className="text-xs bg-green-500 text-white px-2 py-1 rounded mt-1 text-center">مدیر سایت</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* منوی اصلی */}
            <div className="space-y-2 px-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-amber-100 dark:hover:bg-gray-700 transition-all duration-200 text-right"
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* دسته‌بندی‌ها در موبایل */}
            <div className="mt-6 px-4">
              <h4 className="text-sm font-bold text-amber-600 dark:text-amber-400 mb-3 px-4">محصولات ما</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.link}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-amber-100 dark:hover:bg-gray-700 transition-all duration-200 text-right"
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* پنل ادمین در موبایل */}
            {isAdmin && (
              <div className="mt-4 px-4">
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 text-right"
                >
                  <FiShield className="text-green-500 dark:text-green-400 w-5 h-5" />
                  <span className="font-medium">پنل ادمین</span>
                </Link>
              </div>
            )}

            {/* دکمه خروج در موبایل */}
            {user && (
              <div className="mt-6 px-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 px-4 py-3 w-full text-right hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 rounded-lg"
                >
                  <FiLogOut className="text-red-500 dark:text-red-400 w-5 h-5" />
                  <span className="font-medium">خروج از حساب</span>
                </button>
              </div>
            )}

            {/* دکمه ورود در موبایل */}
            {!user && (
              <div className="mt-6 px-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogin();
                  }}
                  className="flex items-center gap-3 px-4 py-3 w-full text-right hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200 rounded-lg"
                >
                  <FiUser className="text-amber-500 dark:text-amber-400 w-5 h-5" />
                  <span className="font-medium">ورود به حساب</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* پس‌زمینه منوی موبایل */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        ></div>
      )}

      {/* پنجره سبد خرید */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-2xl transform transition-transform duration-500 z-50 border-t-4 border-amber-500 dark:border-amber-400
        ${cartOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        {/* محتوای سبد خرید */}
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