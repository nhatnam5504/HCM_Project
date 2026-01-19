import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollPosition > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Listen to window scroll
    window.addEventListener("scroll", toggleVisibility, { passive: true });

    // Initial check
    toggleVisibility();

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 hover:scale-110 z-40"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
