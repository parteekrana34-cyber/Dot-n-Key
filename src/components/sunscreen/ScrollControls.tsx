import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export const ScrollControls: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // Show "Back to Top" if scrolled down more than 150px
      setShowScrollTop(scrollY > 150);

      // Show "Top to Back" (Scroll to Bottom) if not already near the bottom
      setShowScrollBottom(scrollY + windowHeight < fullHeight - 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <aside aria-label="Page scroll controls" className="fixed right-4 sm:right-6 bottom-20 sm:bottom-8 z-40 flex flex-col items-center gap-2.5">
      {/* Scroll to Top (Back to Top) */}
      <button
        onClick={scrollToTop}
        className={`group relative p-3 sm:p-3.5 bg-white text-[#633D4B] hover:bg-[#FF8C9A] hover:text-white border border-[#F5D5DE] hover:border-[#FF8C9A] shadow-lg hover:shadow-coral transition-all duration-300 rounded-full focus:outline-none flex items-center justify-center cursor-pointer ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
            : 'opacity-0 translate-y-3 pointer-events-none scale-90'
        }`}
        aria-label="Back to Top"
        title="Back to Top"
      >
        <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
        <span className="sr-only">Back to Top</span>

        {/* Tooltip on hover */}
        <span className="absolute right-full mr-3 px-2.5 py-1 bg-[#633D4B] text-white text-[11px] font-bold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          Back to Top ⬆
        </span>
      </button>

      {/* Top to Back (Scroll to Bottom) */}
      <button
        onClick={scrollToBottom}
        className={`group relative p-3 sm:p-3.5 bg-white text-[#633D4B] hover:bg-[#633D4B] hover:text-white border border-[#F5D5DE] shadow-lg hover:shadow-xl transition-all duration-300 rounded-full focus:outline-none flex items-center justify-center cursor-pointer ${
          showScrollBottom
            ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
            : 'opacity-0 translate-y-3 pointer-events-none scale-90'
        }`}
        aria-label="Top to Back (Scroll to Bottom)"
        title="Top to Back (Scroll to Bottom)"
      >
        <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
        <span className="sr-only">Top to Back (Scroll to Bottom)</span>

        {/* Tooltip on hover */}
        <span className="absolute right-full mr-3 px-2.5 py-1 bg-[#633D4B] text-white text-[11px] font-bold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          Top to Back ⬇
        </span>
      </button>
    </aside>
  );
};
