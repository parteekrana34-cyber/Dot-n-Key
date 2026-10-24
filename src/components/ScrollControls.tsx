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

      // Show "Back to Top" if scrolled down more than 200px
      setShowScrollTop(scrollY > 200);

      // Show "Scroll to Bottom" if not already near the bottom
      setShowScrollBottom(scrollY + windowHeight < fullHeight - 300);
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
    <div className="fixed right-5 bottom-8 z-40 flex flex-col items-center gap-2">
      {/* Scroll to Top (Back to Top) */}
      <button
        onClick={scrollToTop}
        className={`group relative p-3 bg-[#FAF7F2] text-[#2A2421] border border-[#DDD0C0] shadow-xl hover:bg-[#2A2421] hover:text-[#FAF7F2] hover:border-[#2A2421] transition-all duration-300 rounded-full focus:outline-none flex items-center justify-center ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
        title="Back to Top"
      >
        <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
        <span className="sr-only">Back to Top</span>
        
        {/* Tooltip on hover */}
        <span className="absolute right-full mr-2.5 px-2.5 py-1 bg-[#2A2421] text-white text-[10px] uppercase tracking-wider font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          Back to Top
        </span>
      </button>

      {/* Scroll to Bottom (Top to Back / Bottom) */}
      <button
        onClick={scrollToBottom}
        className={`group relative p-3 bg-[#FAF7F2] text-[#2A2421] border border-[#DDD0C0] shadow-xl hover:bg-[#C5A880] hover:text-[#1E1917] hover:border-[#C5A880] transition-all duration-300 rounded-full focus:outline-none flex items-center justify-center ${
          showScrollBottom
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to bottom"
        title="Scroll to Bottom"
      >
        <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
        <span className="sr-only">Scroll to Bottom</span>

        {/* Tooltip on hover */}
        <span className="absolute right-full mr-2.5 px-2.5 py-1 bg-[#2A2421] text-white text-[10px] uppercase tracking-wider font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          Scroll to Bottom
        </span>
      </button>
    </div>
  );
};
