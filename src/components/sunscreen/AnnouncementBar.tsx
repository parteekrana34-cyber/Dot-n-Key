import React, { useState, useEffect } from 'react';
import { Sun, Sparkles, ChevronRight, ChevronLeft, Truck, Tag, ShieldCheck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const announcements = [
    {
      text: '☀️ Your Daily Dose of Sun Protection | Flat 15% OFF with code SUNNY15',
      icon: Sun,
      highlight: 'SUNNY15',
    },
    {
      text: '✨ Free Shipping on all sunscreen orders above ₹499 across India',
      icon: Truck,
      highlight: 'Free Shipping',
    },
    {
      text: '🛡️ Clinically Tested SPF 50+ PA++++ • Zero White Cast Guarantee',
      icon: ShieldCheck,
      highlight: 'Zero White Cast',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  const next = () => setCurrentIndex((prev) => (prev + 1) % announcements.length);

  const CurrentIcon = announcements[currentIndex].icon;

  return (
    <div className="bg-gradient-to-r from-[#FF8C9A] via-[#FF7E8E] to-[#FFA3AE] text-white text-xs font-semibold py-2 px-3 sm:px-6 relative overflow-hidden z-50 shadow-xs border-b border-[#F5D5DE]/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={prev}
          className="p-1 rounded-full hover:bg-white/20 transition-colors text-white/90 hover:text-white cursor-pointer"
          aria-label="Previous announcement"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center justify-center gap-2 text-center truncate px-2">
          <CurrentIcon className="w-3.5 h-3.5 shrink-0 text-[#FEF08A] animate-pulse" />
          <span className="truncate tracking-wide text-[11px] sm:text-xs">
            {announcements[currentIndex].text}
          </span>
        </div>

        <button
          onClick={next}
          className="p-1 rounded-full hover:bg-white/20 transition-colors text-white/90 hover:text-white cursor-pointer"
          aria-label="Next announcement"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
