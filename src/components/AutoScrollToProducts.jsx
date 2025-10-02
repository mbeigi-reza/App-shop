// src/components/AutoScrollToProducts.jsx
import { useLayoutEffect, useRef } from "react";

const AutoScrollToProducts = ({ children, offset = 80 }) => {
  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    // فقط در اولین رندر صفحه اسکرول کن
    const hasScrolled = sessionStorage.getItem('hasAutoScrolled');
    
    if (!hasScrolled && scrollRef.current) {
      const elementPosition = scrollRef.current.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      // علامت بزن که اسکرول شده
      sessionStorage.setItem('hasAutoScrolled', 'true');
    }

    // وقتی کامپوننت unmount میشه، علامت رو پاک کن
    return () => {
      sessionStorage.removeItem('hasAutoScrolled');
    };
  }, [offset]);

  return (
    <div ref={scrollRef} className="w-full">
      {children}
    </div>
  );
};

export default AutoScrollToProducts;