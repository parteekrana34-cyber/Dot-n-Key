import React from 'react';
import { VelmoraLogo } from './VelmoraLogo';
import { Sparkles, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenStory: () => void;
  onOpenFragranceFinder: () => void;
  onOpenGiftBoxBuilder: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenStory,
  onOpenFragranceFinder,
  onOpenGiftBoxBuilder,
}) => {
  const { isLight } = useTheme();

  return (
    <footer className={`transition-colors duration-300 border-t pt-16 pb-12 font-sans ${
      isLight 
        ? 'bg-[#EFE8DD] text-[#5C5456] border-[#9A742A]/25' 
        : 'bg-[#0F0E0E] text-[#A89F93] border-[#C2A064]/25'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top 4 Pillars */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b ${
          isLight ? 'border-[#9A742A]/20' : 'border-[#C2A064]/15'
        }`}>
          <div className="space-y-1.5 text-center sm:text-left">
            <Sparkles className={`w-5 h-5 mx-auto sm:mx-0 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
            <h4 className={`font-sans font-semibold text-xs tracking-wider uppercase ${
              isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'
            }`}>
              32%+ Extrait Concentration
            </h4>
            <p className={`text-[11px] ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
              Formulated for 16-hour enduring sillage.
            </p>
          </div>

          <div className="space-y-1.5 text-center sm:text-left">
            <Truck className={`w-5 h-5 mx-auto sm:mx-0 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
            <h4 className={`font-sans font-semibold text-xs tracking-wider uppercase ${
              isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'
            }`}>
              Complimentary Insured Courier
            </h4>
            <p className={`text-[11px] ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
              White-glove climate delivery nationwide.
            </p>
          </div>

          <div className="space-y-1.5 text-center sm:text-left">
            <ShieldCheck className={`w-5 h-5 mx-auto sm:mx-0 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
            <h4 className={`font-sans font-semibold text-xs tracking-wider uppercase ${
              isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'
            }`}>
              100% Genuine Grasse Harvest
            </h4>
            <p className={`text-[11px] ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
              Pure rare botanical essences and wild agarwood.
            </p>
          </div>

          <div className="space-y-1.5 text-center sm:text-left">
            <RotateCcw className={`w-5 h-5 mx-auto sm:mx-0 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
            <h4 className={`font-sans font-semibold text-xs tracking-wider uppercase ${
              isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'
            }`}>
              Discovery Sample Policy
            </h4>
            <p className={`text-[11px] ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
              Test your 2ml vial first before unsealing.
            </p>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <VelmoraLogo size="lg" />
            <p className={`text-xs leading-relaxed max-w-sm mt-3 ${
              isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'
            }`}>
              VELMORA is an independent Haute Parfumerie house dedicated to creating exceptional fragrances that leave an indelible mark on time. A scent that defines you.
            </p>
            <div className="pt-2">
              <span className={`text-[11px] uppercase tracking-wider block mb-1 font-medium ${
                isLight ? 'text-[#591D2D]' : 'text-[#DFC48E]'
              }`}>
                Atelier Salons:
              </span>
              <p className={`text-xs ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                Place Vendôme, Paris • Mayfair, London • Colaba, Mumbai • DIFC, Dubai
              </p>
            </div>
          </div>

          {/* Fragrance Collections */}
          <div className="md:col-span-3 space-y-3">
            <h4 className={`font-sans font-semibold text-xs uppercase tracking-[0.2em] ${
              isLight ? 'text-[#591D2D]' : 'text-[#DFC48E]'
            }`}>
              Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('Woody & Oud')}
                  className={`transition-colors ${isLight ? 'hover:text-[#9A742A]' : 'hover:text-[#F3EDE3]'}`}
                >
                  Woody & Rare Oud
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Floral')}
                  className={`transition-colors ${isLight ? 'hover:text-[#9A742A]' : 'hover:text-[#F3EDE3]'}`}
                >
                  Opulent Floral Extraits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Amber & Spicy')}
                  className={`transition-colors ${isLight ? 'hover:text-[#9A742A]' : 'hover:text-[#F3EDE3]'}`}
                >
                  Amber & Warm Spices
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Fresh & Citrus')}
                  className={`transition-colors ${isLight ? 'hover:text-[#9A742A]' : 'hover:text-[#F3EDE3]'}`}
                >
                  Fresh & Citrus
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Aquatic')}
                  className={`transition-colors ${isLight ? 'hover:text-[#9A742A]' : 'hover:text-[#F3EDE3]'}`}
                >
                  Aquatic & Marine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Travel-Size')}
                  className={`transition-colors ${isLight ? 'hover:text-[#9A742A]' : 'hover:text-[#F3EDE3]'}`}
                >
                  Nomad Travel Atomizers
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge & Bespoke */}
          <div className="md:col-span-3 space-y-3">
            <h4 className={`font-sans font-semibold text-xs uppercase tracking-[0.2em] ${
              isLight ? 'text-[#591D2D]' : 'text-[#DFC48E]'
            }`}>
              Bespoke Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenFragranceFinder}
                  className={`transition-colors ${isLight ? 'hover:text-[#9A742A]' : 'hover:text-[#F3EDE3]'}`}
                >
                  Personalized Fragrance Finder
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGiftBoxBuilder}
                  className={`transition-colors ${isLight ? 'hover:text-[#9A742A]' : 'hover:text-[#F3EDE3]'}`}
                >
                  Create a Bespoke Gift Coffret
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenStory}
                  className={`transition-colors ${isLight ? 'hover:text-[#9A742A]' : 'hover:text-[#F3EDE3]'}`}
                >
                  The Art of Perfumery
                </button>
              </li>
              <li>
                <a 
                  href="#reviews" 
                  className={`transition-colors ${isLight ? 'hover:text-[#9A742A]' : 'hover:text-[#F3EDE3]'}`}
                >
                  Patron Reviews
                </a>
              </li>
              <li>
                <span className={isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}>
                  Bespoke Engraving Service
                </span>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div className="md:col-span-2 space-y-3">
            <h4 className={`font-sans font-semibold text-xs uppercase tracking-[0.2em] ${
              isLight ? 'text-[#591D2D]' : 'text-[#DFC48E]'
            }`}>
              Private Concierge
            </h4>
            <div className="space-y-2 text-xs">
              <p className={isLight ? 'text-[#1A1616] font-medium' : 'text-[#F3EDE3]'}>
                Maison Concierge:
              </p>
              <p className={isLight ? 'text-[#9A742A] font-medium' : 'text-[#DFC48E]'}>
                concierge@velmora.com
              </p>
              <p className={isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'}>
                +91 22 8900 1200
              </p>
              <p className={`text-[11px] pt-2 ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                Monday — Saturday <br />
                10:00 AM — 8:00 PM IST
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Security */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between text-xs gap-4 ${
          isLight ? 'border-[#9A742A]/20 text-[#73696B]' : 'border-[#C2A064]/15 text-[#A89F93]'
        }`}>
          <p>© {new Date().getFullYear()} VELMORA Haute Parfumerie. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Dispatch & Courier</span>
            <span>Boutique Locations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
