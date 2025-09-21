import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser, FiChevronLeft } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    <nav
      className={`w-full flex justify-between items-center px-4 sm:px-8 p-4 fixed top-0 z-50 transition-colors duration-300
        ${scrolled ? "bg-[#1F1F1F] shadow-md" : "bg-transparent"}`}
    >
      {/* سمت راست دکمه‌ها */}
      <div className="flex pl-4 space-x-2 sm:space-x-4">
        <button className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-[#eab308] text-[#2a2a2a] hover:bg-yellow-500 transition">
          <span className="text-sm font-bold">سبد خرید</span>
          <FiShoppingCart className="w-5 h-5" />
        </button>
        <button className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-[#eab308] bg-[#2a2a2a] text-[#eab308] hover:bg-yellow-500 transition">
          <span className="text-sm font-semibold">حساب کاربری</span>
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
                <FiChevronLeft className="text-[#FFD700] w-5 h-5" /> {/* ایکون سمت چپ */}
                <span className="text-right">{item.name}</span> {/* متن سمت راست */}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* پس‌زمینه نیمه شفاف وقتی منو بازه */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
