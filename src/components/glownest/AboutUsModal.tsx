import React from 'react';
import { X, Sparkles, Heart, ShieldCheck, Leaf } from 'lucide-react';
import { GlowNestLogo } from './GlowNestLogo';

interface AboutUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutUsModal: React.FC<AboutUsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#FFD1DC]/40 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#FFE5EC] via-[#FFF0F3] to-[#EDE9FE] border-b border-[#F0E6E1] flex items-center justify-between">
          <GlowNestLogo size="md" />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white text-[#7A6E75] hover:text-[#1E1B1D] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs sm:text-sm text-[#52474E] leading-relaxed">
          <div>
            <span className="text-[11px] font-bold text-[#FF6584] uppercase tracking-wider">
              Our Story & Philosophy
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#1E1B1D] mt-1">
              Skincare That Makes You Smile Every Morning
            </h3>
          </div>

          <p>
            Welcome to <strong>Dot &amp; Key Skincare</strong> — an original, colorful skincare experience inspired by juicy tropical fruit actives, clinical dermatological science, and joyful daily self-care rituals.
          </p>

          <p>
            We set out to imagine how high-potency clinical actives like <strong>Triple Vitamin C</strong>, <strong>5-Ceramide complexes</strong>, and <strong>Hyaluronic Acid</strong> can be delivered in mouth-watering textures — from bouncy watermelon water-gels to velvety whipped marshmallow clouds.
          </p>

          <div className="p-4 rounded-2xl bg-[#FFF0F3] border border-[#FFD1DC] space-y-2">
            <h4 className="font-extrabold text-[#1E1B1D] text-sm">Academic Project Notice</h4>
            <p className="text-xs text-[#7A6E75]">
              This application is an educational prototype and portfolio piece created for student learning. Product descriptions, demo reviews, and shopping flows are simulated for interactive demonstration. Not affiliated with or endorsed by any commercial skincare company.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-[#FAF7F5] border border-[#EFE5E0]">
              <Leaf className="w-5 h-5 text-[#22C55E] mb-1" />
              <p className="font-bold text-xs text-[#1E1B1D]">100% Clean Formulations</p>
              <p className="text-[11px] text-[#7A6E75]">Zero parabens, sulfates, or microplastics.</p>
            </div>
            <div className="p-3 rounded-2xl bg-[#FAF7F5] border border-[#EFE5E0]">
              <Heart className="w-5 h-5 text-[#FF6584] mb-1" />
              <p className="font-bold text-xs text-[#1E1B1D]">Skin-Barrier First</p>
              <p className="text-[11px] text-[#7A6E75]">pH balanced for fragile Indian skin types.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
