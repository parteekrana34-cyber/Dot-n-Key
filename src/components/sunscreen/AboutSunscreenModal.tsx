import React from 'react';
import { X, Sun, ShieldCheck, Leaf } from 'lucide-react';

interface AboutSunscreenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutSunscreenModal: React.FC<AboutSunscreenModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#F5D5DE] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#F9DDE5] via-[#FCEEF2] to-[#F9DDE5] border-b border-[#F5D5DE] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FF8C9A] text-white flex items-center justify-center shadow-xs">
              <Sun className="w-4 h-4 fill-white" />
            </div>
            <h2 className="font-black text-base sm:text-lg text-[#633D4B] font-display">
              About Bloom &amp; Blush Sunscreen Store
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#F9DDE5] text-[#8E6B78] hover:text-[#633D4B] flex items-center justify-center cursor-pointer border border-[#F5D5DE] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs sm:text-sm text-[#633D4B] leading-relaxed bg-white">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-[#FF8C9A]">
              Clean Photoprotection
            </span>
            <h3 className="text-xl font-black text-[#633D4B] mt-1 font-display">
              Sun Care That Never Feels Like a Chore ☀️
            </h3>
          </div>

          <p>
            Welcome to the <strong>Bloom &amp; Blush Sunscreen Experience</strong>. We engineered a destination dedicated entirely to sun protection skincare in a soft, dreamy Korean skincare aesthetic.
          </p>

          <p>
            Traditional sunscreens in India have historically been thick, chalky, and pore-clogging. Bloom &amp; Blush revolutionized daily SPF by pairing medical-grade <strong>SPF 50+ PA++++ filters</strong> with mouth-watering tropical fruit extracts—including Watermelon, Sicilian Blood Orange, Cica, and Dragon Fruit.
          </p>

          <div className="p-4 rounded-2xl bg-[#FCEEF2] border border-[#F5D5DE] space-y-1.5 text-xs text-[#633D4B]">
            <h4 className="font-black text-sm">Unofficial Student Project Demonstration</h4>
            <p>
              This website is an interactive educational portfolio project showcasing e-commerce architecture, product carousels, responsive filtering, and modern UI design inspired by Bloom &amp; Blush’s vibrant skincare aesthetics.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-[#FCEEF2]/60 border border-[#F5D5DE]">
              <ShieldCheck className="w-5 h-5 text-[#FF8C9A] mb-1" />
              <p className="font-bold text-xs text-[#633D4B]">Zero White Cast</p>
              <p className="text-[11px] text-[#8E6B78]">Invisible finish across all Indian skin tones.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FCEEF2]/60 border border-[#F5D5DE]">
              <Leaf className="w-5 h-5 text-[#15803D] mb-1" />
              <p className="font-bold text-xs text-[#633D4B]">100% Vegan &amp; Clean</p>
              <p className="text-[11px] text-[#8E6B78]">No oxybenzone, zero parabens, cruelty-free.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
