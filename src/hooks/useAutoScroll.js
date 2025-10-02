// src/hooks/useAutoScroll.js
import { useLayoutEffect } from "react";

export const useAutoScroll = (offset = 80) => {
  useLayoutEffect(() => {
    const hasScrolled = sessionStorage.getItem('hasAutoScrolled');
    
    if (!hasScrolled) {
      const scrollY = window.pageYOffset;
      
      // اگر کاربر از قبل اسکرول نکرده
      if (scrollY < 100) {
        setTimeout(() => {
          window.scrollTo({
            top: offset,
            behavior: 'smooth'
          });
          sessionStorage.setItem('hasAutoScrolled', 'true');
        }, 300);
      }
    }

    return () => {
      sessionStorage.removeItem('hasAutoScrolled');
    };
  }, [offset]);
};