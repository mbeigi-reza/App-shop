// src/components/PriceFilter.jsx
import React, { useState, useEffect } from 'react';
import { FiX } from "react-icons/fi";

const PriceFilter = ({ 
  showFilter, 
  setShowFilter, 
  minPrice, 
  setMinPrice, 
  maxPrice, 
  setMaxPrice, 
  onClearFilters 
}) => {
  const [displayMin, setDisplayMin] = useState('');
  const [displayMax, setDisplayMax] = useState('');

  // تابع برای فرمت کردن اعداد با جداکننده هزارگان
  const formatNumber = (number) => {
    if (!number && number !== 0) return '';
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // تابع ساده‌شده برای نمایش معادل فارسی
  const getPersianPriceText = (number) => {
    if (!number) return '';
    
    const num = parseInt(number);
    if (isNaN(num)) return '';

    // برای اعداد ساده
    if (num < 1000) {
      return `${formatNumber(num)} تومان`;
    }
    
    // برای اعداد بزرگ‌تر
    if (num < 1000000) {
      const thousands = Math.floor(num / 1000);
      const remainder = num % 1000;
      if (remainder === 0) {
        return `${formatNumber(thousands)} هزار تومان`;
      } else {
        return `${formatNumber(thousands)} هزار و ${formatNumber(remainder)} تومان`;
      }
    }
    
    // برای میلیون
    if (num < 1000000000) {
      const millions = Math.floor(num / 1000000);
      const remainder = num % 1000000;
      if (remainder === 0) {
        return `${formatNumber(millions)} میلیون تومان`;
      } else {
        const thousands = Math.floor(remainder / 1000);
        const hundreds = remainder % 1000;
        if (hundreds === 0) {
          return `${formatNumber(millions)} میلیون و ${formatNumber(thousands)} هزار تومان`;
        } else {
          return `${formatNumber(millions)} میلیون و ${formatNumber(thousands)} هزار و ${formatNumber(hundreds)} تومان`;
        }
      }
    }

    return `${formatNumber(num)} تومان`;
  };

  // وقتی minPrice یا maxPrice تغییر می‌کنه، display رو آپدیت کن
  useEffect(() => {
    setDisplayMin(minPrice ? formatNumber(minPrice) : '');
    setDisplayMax(maxPrice ? formatNumber(maxPrice) : '');
  }, [minPrice, maxPrice]);

  // تابع برای تبدیل ورودی کاربر به عدد خالص
  const handleInputChange = (value, setPrice) => {
    const cleanValue = value.replace(/[^\d]/g, '');
    setPrice(cleanValue === '' ? '' : cleanValue);
  };

  // تابع برای فرمت کردن هنگام از دست دادن فوکوس
  const handleBlur = (value, setPrice, setDisplay) => {
    if (value) {
      const cleanValue = value.replace(/[^\d]/g, '');
      setPrice(cleanValue);
      setDisplay(formatNumber(cleanValue));
    }
  };

  return (
    <aside
      className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 p-6 shadow-lg transform transition-transform duration-300 z-50 border-l border-amber-100 dark:border-gray-700
      ${showFilter ? "translate-x-0" : "translate-x-full"} 
      lg:static lg:translate-x-0 lg:w-64 lg:rounded-lg lg:border lg:border-amber-200 dark:lg:border-gray-600 lg:shadow-sm lg:block lg:h-auto lg:z-0`}
    >
      {/* دکمه بستن فقط در موبایل */}
      <div className="flex justify-between items-center mb-6 lg:hidden">
        <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400">فیلتر قیمت</h3>
        <button onClick={() => setShowFilter(false)} className="text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300">
          <FiX className="w-6 h-6" />
        </button>
      </div>

      {/* محتوا */}
      <div className="flex flex-col gap-4">
        <div className="mb-2">
          <h4 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-2">فیلتر محصولات</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            محصولات بر اساس قیمت فیلتر کنید
          </p>
        </div>
        
        <label className="flex flex-col text-gray-700 dark:text-gray-300 font-medium">
          حداقل قیمت:
          <input
            type="text"
            value={displayMin}
            onChange={(e) => handleInputChange(e.target.value, setMinPrice)}
            onBlur={(e) => handleBlur(e.target.value, setMinPrice, setDisplayMin)}
            className="mt-1 p-2 rounded-lg bg-amber-50 dark:bg-gray-700 border border-amber-200 dark:border-gray-600 text-gray-800 dark:text-white focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/30 focus:outline-none transition-colors text-left direction-ltr"
            placeholder="0"
            dir="ltr"
          />
          {minPrice && (
            <span className="text-xs text-amber-600 dark:text-amber-400 mt-1 text-right">
              {getPersianPriceText(minPrice)}
            </span>
          )}
        </label>

        <label className="flex flex-col text-gray-700 dark:text-gray-300 font-medium">
          حداکثر قیمت:
          <input
            type="text"
            value={displayMax}
            onChange={(e) => handleInputChange(e.target.value, setMaxPrice)}
            onBlur={(e) => handleBlur(e.target.value, setMaxPrice, setDisplayMax)}
            className="mt-1 p-2 rounded-lg bg-amber-50 dark:bg-gray-700 border border-amber-200 dark:border-gray-600 text-gray-800 dark:text-white focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-200 dark:focus:ring-amber-500/30 focus:outline-none transition-colors text-left direction-ltr"
            placeholder="0"
            dir="ltr"
          />
          {maxPrice && (
            <span className="text-xs text-amber-600 dark:text-amber-400 mt-1 text-right">
              {getPersianPriceText(maxPrice)}
            </span>
          )}
        </label>

        <div className="flex gap-3 mt-4">
          <button 
            onClick={() => setShowFilter(false)}
            className="flex-1 px-4 py-2 bg-amber-500 dark:bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-600 dark:hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-300/40 dark:hover:shadow-amber-500/30 transition-all duration-200"
          >
            اعمال فیلتر
          </button>
          <button 
            onClick={onClearFilters}
            className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border-2 border-amber-500 dark:border-amber-400 text-amber-600 dark:text-amber-400 font-bold rounded-lg hover:bg-amber-500 dark:hover:bg-amber-600 hover:text-white transition-all duration-200"
          >
            حذف فیلتر
          </button>
        </div>
      </div>
    </aside>
  );
};

export default PriceFilter;