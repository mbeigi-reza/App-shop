// src/hooks/usePriceFilter.js
import { useState, useEffect } from 'react';

const usePriceFilter = (products, initialVisibleCount = 4) => {
  const [showFilter, setShowFilter] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const [hasMore, setHasMore] = useState(true);

  // فیلتر کردن محصولات بر اساس قیمت
  useEffect(() => {
    let filtered = products;
    
    if (minPrice) {
      filtered = filtered.filter(product => product.price >= parseInt(minPrice));
    }
    
    if (maxPrice) {
      filtered = filtered.filter(product => product.price <= parseInt(maxPrice));
    }
    
    setFilteredProducts(filtered);
    setVisibleCount(initialVisibleCount);
  }, [minPrice, maxPrice, products, initialVisibleCount]);

  // محاسبه تعداد محصولات باقی‌مانده
  useEffect(() => {
    setHasMore(visibleCount < filteredProducts.length);
  }, [visibleCount, filteredProducts.length]);

  // تابع برای لود محصولات بیشتر
  const loadMoreProducts = () => {
    const remainingProducts = filteredProducts.length - visibleCount;
    
    if (remainingProducts > 0) {
      if (remainingProducts >= 4) {
        setVisibleCount(prev => prev + 4);
      } else {
        setVisibleCount(prev => prev + remainingProducts);
      }
    }
  };

  // پاک کردن فیلترها
  const clearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
  };

  // محاسبه متن دکمه
  const getButtonText = () => {
    if (!hasMore) {
      return "محصولاتمون تموم شد :(";
    }
    
    const remaining = filteredProducts.length - visibleCount;
    if (remaining >= 4) {
      return "مشاهده ادامه محصولات";
    } else {
      return `مشاهده ${remaining} محصول باقی‌مانده`;
    }
  };

  return {
    showFilter,
    setShowFilter,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    filteredProducts,
    visibleCount,
    hasMore,
    loadMoreProducts,
    clearFilters,
    getButtonText
  };
};

export default usePriceFilter;