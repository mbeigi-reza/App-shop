// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiChevronLeft, FiX } from "react-icons/fi";
import { useCart } from "../context/CartContext"; // ⬅️ استفاده از context

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  // گرفتن داده‌ها از context
  const { cart, removeFromCart, updateQty, totalPrice } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        className={`w-full flex justify-between items-center px-4 sm:px-8 p-4 fixed top-0 z-50 transition-colors duration-300
        ${scrolled ? "bg-[#1F1F1F] shadow-md" : "bg-transparent"}`}
      >
        {/* سمت راست دکمه‌ها */}
        <div className="flex pl-4 space-x-2 sm:space-x-4">
          {/* آیکون سبد خرید */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#eab308] text-[#2a2a2a] hover:opacity-90 transition"
          >
            <FiShoppingCart className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </button>

          {/* دکمه ثبت نام | ورود */}
          <button
            onClick={() => navigate("/register")}
            className="relative overflow-hidden flex items-center space-x-2 px-3 py-2 rounded-lg border border-[#eab308] bg-[#2a2a2a] text-[#eab308] transition"
          >
            <span className="text-sm font-semibold">ثبت نام | ورود</span>
            <FiUser className="w-5 h-5" />
          </button>
        </div>

        {/* منوی دسکتاپ */}
        <ul
          className={`hidden md:flex space-x-6 pr-9 text-gray-200 transition-colors duration-300 
          ${scrolled ? "text-gray-100" : "text-gray-200"}`}
        >
          {menuItems.map((item) => (
            <li key={item.name} className="hover:text-[#FFD700] transition">
              <Link to={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>

        {/* دکمه موبایل */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className={`text-2xl font-bold transition-colors duration-300
            ${scrolled ? "text-gray-200" : "text-white"} hover:text-[#FFD700]`}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* منوی موبایل */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-[#1F1F1F] to-black text-gray-200 shadow-lg transform transition-all duration-500 ease-in-out z-50
        ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
      >
        <ul className="flex flex-col divide-y divide-yellow-400 mt-2 pr-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.link}
                onClick={() => setIsOpen(false)}
                className="flex justify-between items-center py-3 px-4 hover:text-[#FFD700] hover:bg-[#FFD700]/10 transition"
              >
                <FiChevronLeft className="text-[#FFD700] w-5 h-5" />
                <span className="text-right">{item.name}</span>
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/register");
              }}
              className="flex justify-between items-center py-3 px-4 w-full text-right hover:text-[#FFD700] hover:bg-[#FFD700]/10 transition"
            >
              <FiUser className="text-[#FFD700] w-5 h-5" />
              <span>ثبت نام | ورود</span>
            </button>
          </li>
        </ul>
      </div>

      {/* پس‌زمینه نیمه شفاف برای منوی موبایل */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        ></div>
      )}

      {/* پنجره سبد خرید از پایین */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-[#1F1F1F] text-white shadow-2xl transform transition-transform duration-500 z-50 
        ${cartOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h3 className="text-lg font-bold">🛒 سبد خرید</h3>
          <button onClick={() => setCartOpen(false)} className="text-red-500">
            <FiX size={20} />
          </button>
        </div>

        {/* لیست محصولات */}
        <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-center text-gray-400">سبد خرید خالی است</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-800 p-3 rounded"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-400">
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
                    className="px-2 bg-gray-600 rounded"
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="px-2 bg-gray-600 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-2 text-red-500"
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* جمع کل */}
        <div className="p-4 border-t border-gray-700 flex justify-between items-center">
          <span className="font-bold">جمع کل:</span>
          <span className="text-yellow-400">
            {totalPrice.toLocaleString()} تومان
          </span>
        </div>

        {/* دکمه پرداخت */}
        {cart.length > 0 && (
          <div className="p-4">
            <button className="w-full bg-yellow-400 text-black py-2 rounded font-bold hover:opacity-90 transition">
              ادامه خرید
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
