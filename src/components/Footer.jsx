// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-amber-200 dark:border-gray-700 w-full bg-gradient-to-t from-amber-50 to-white dark:from-gray-800 dark:to-gray-900" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* بخش لینک‌های سریع */}
        <div className="text-right">
          <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4">لینک‌های سریع</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-200">
                خانه
              </Link>
            </li>
            <li>
              <Link to="/skateboard" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-200">
                اسکیت برد
              </Link>
            </li>
            <li>
              <Link to="/inline-skates" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-200">
                اسکیت اینلاین
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-200">
                درباره ما
              </Link>
            </li>
          </ul>
        </div>

        {/* بخش شبکه‌های اجتماعی */}
        <div className="flex flex-col items-center text-center">
          <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4">ما را دنبال کنید</h3>
          <div className="flex space-x-6 text-2xl">
            <Link 
              to="https://instagram.com/sportland.ir" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-200 transform hover:scale-110"
            >
              <FaInstagram />
            </Link>
            <Link 
              to="https://t.me/09339421391" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-200 transform hover:scale-110"
            >
              <FaTelegramPlane />
            </Link>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
            در شبکه‌های اجتماعی همراه ما باشید
          </p>
        </div>

        {/* بخش اطلاعات تماس */}
        <div className="text-right">
          <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4">تماس با ما</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            📍 تهران، خیابان ولیعصر، پلاک ۱۲۳۴
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            📞 ۰۲۱-۱۲۳۴۵۶۷۸
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            📱 ۰۹۳۳۹۴۲۱۳۹۱
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            ✉️ info@sportland.ir
          </p>
          <div className="mt-4 p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <p className="text-amber-700 dark:text-amber-400 text-sm font-medium">
              🕒 ساعات کاری: هر روز از ۹ صبح تا ۹ شب
            </p>
          </div>
        </div>
      </div>

      {/* کپی‌رایت */}
      <div className="border-t border-amber-200 dark:border-gray-700 mt-8 py-4 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          © ۱۴۰۳ - تمامی حقوق برای <span className="text-amber-600 dark:text-amber-400 font-bold">اسپرت‌لند</span> محفوظ است
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
          فروشگاه تخصصی تجهیزات ورزشی و اسکیت
        </p>
      </div>
    </footer>
  );
};

export default Footer;