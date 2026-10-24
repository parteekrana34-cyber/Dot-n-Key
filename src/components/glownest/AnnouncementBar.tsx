import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronRight, ChevronLeft, Truck, Tag, ShieldCheck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const announcements = [
    {
      text: 'Glow More, Worry Less ✨ | Free Shipping on Eligible Orders over ₹499',
      highlight: 'FREE SHIPPING',
      icon: Truck,
    },
    {
      text: 'First Order Special: Use code GLOW20 for 20% OFF your entire cart 🍉',
      highlight: 'GLOW20',
      icon: Tag,
    },
    {
      text: '100% Dermatologically Tested • No Parabens • Leaping Bunny Cruelty-Free 🐰',
      highlight: 'CLEAN BEAUTY',
      icon: ShieldCheck,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const current = announcements[currentIndex];
  const Icon = current.icon;

  return (
    <div className="bg-gradient-to-r from-[#FFE5EC] via-[#FFF0F3] to-[#EDE9FE] border-b border-[#FFD1DC]/60 text-[#2D2A2E] text-xs font-medium py-2 px-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left mini disclaimer badge */}
        <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[#8C7A83]">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
          <span>Original Student Project Project • Demo Skincare Store</span>
        </div>

        {/* Center Rotating Message */}
        <div className="flex-1 flex items-center justify-center gap-2 overflow-hidden text-center">
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length)
            }
            className="p-0.5 text-[#8C7A83] hover:text-[#E11D48] transition-colors"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2 animate-fadeIn transition-opacity duration-300">
            <Icon className="w-3.5 h-3.5 text-[#FF6584] shrink-0" />
            <span className="tracking-tight text-xs sm:text-[13px] text-[#3D3338] font-medium">
              {current.text}
            </span>
          </div>

          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % announcements.length)}
            className="p-0.5 text-[#8C7A83] hover:text-[#E11D48] transition-colors"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Quick offer helper */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] font-semibold text-[#FF6584]">
          <span className="bg-white/80 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-[#FFD1DC] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#F59E0B]" />
            Free Glow Sample on every order!
          </span>
        </div>
      </div>
    </div>
  );
};
