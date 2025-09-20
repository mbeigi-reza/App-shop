// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTelegramPlane, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
<footer className="border-t border-[#374151] w-full bg-gradient-to-t from-[#2a2a2a] to-[#1F1F1F]">
  <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* بخش لینک‌های سریع */}
    <div className="text-right md:text-left">
      <h3 className="text-xl font-bold text-[#FFD700] mb-4">لینک‌های سریع</h3>
      <ul className="space-y-2">
        <li>
          <Link to="/" className="text-gray-200 hover:text-[#FFD700] transition">خانه</Link>
        </li>
        <li>
          <Link to="/manto" className="text-gray-200 hover:text-[#FFD700] transition">مانتو</Link>
        </li>
        <li>
          <Link to="/shalvar" className="text-gray-200 hover:text-[#FFD700] transition">شلوار</Link>
        </li>
        <li>
          <Link to="/contact" className="text-gray-200 hover:text-[#FFD700] transition">ارتباط با ما</Link>
        </li>
      </ul>
    </div>

    {/* بخش شبکه‌های اجتماعی */}
    <div className="flex flex-col items-end md:items-center text-right md:text-center">
      <h3 className="text-xl font-bold text-[#FFD700] mb-4">ما را دنبال کنید</h3>
      <div className="flex space-x-4 rtl:space-x-reverse text-2xl">
        <a href="#" className="text-gray-200 hover:text-[#FFD700] transition"><FaInstagram /></a>
        <a href="#" className="text-gray-200 hover:text-[#FFD700] transition"><FaTelegramPlane /></a>
        <a href="#" className="text-gray-200 hover:text-[#FFD700] transition"><FaFacebookF /></a>
      </div>
    </div>

    {/* بخش اطلاعات تماس */}
    <div className="flex flex-col items-end text-right md:items-end md:text-left">
      <h3 className="text-xl font-bold text-[#FFD700] mb-4">تماس با ما</h3>
      <p className="text-gray-200">آدرس: تهران، خیابان مثال ۱۲۳</p>
      <p className="text-gray-200">تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p>
      <p className="text-gray-200">ایمیل: info@example.com</p>
    </div>
  </div>

  {/* کپی‌رایت */}
  <div className="border-t border-gray-700 mt-8 py-4 text-center text-gray-200">
    © 2025 تمام حقوق محفوظ است.
  </div>
</footer>

  );
};

export default Footer;
