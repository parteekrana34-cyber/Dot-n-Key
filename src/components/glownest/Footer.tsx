import React, { useState } from 'react';
import { Mail, Sparkles, Heart, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { DotKeyLogo } from './GlowNestLogo';
import { SkincareCategory } from '../../types/skincare';

interface FooterProps {
  onSelectCategory: (category: SkincareCategory | string) => void;
  onOpenSkinQuiz: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenSkinQuiz,
  onOpenAbout,
  onOpenContact,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-white border-t border-[#F0E6E1] text-[#2D2A2E] pt-12 sm:pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="rounded-3xl bg-gradient-to-r from-[#FFF0F3] via-[#FFE5EC] to-[#EDE9FE] border border-[#FFD1DC] p-6 sm:p-10 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="max-w-md text-center md:text-left">
            <span className="text-[11px] font-bold text-[#E11D48] uppercase tracking-wider flex items-center justify-center md:justify-start gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              Join the Glow Club
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#1E1B1D] mt-1">
              Get 15% OFF Your First Order
            </h3>
            <p className="text-xs text-[#52474E] mt-1">
              Subscribe to unlock instant code <strong>GLOW15</strong>, new fruit launches, skin quizzes, and secret sales.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="p-3.5 rounded-2xl bg-white border border-[#22C55E] flex items-center gap-2 text-xs font-bold text-[#15803D] shadow-sm">
                <Check className="w-4 h-4 text-[#22C55E]" />
                <span>Welcome! Use code: <strong>GLOW15</strong> for 15% off at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-white border border-[#FFD1DC] rounded-xl px-4 py-3 text-xs font-medium text-[#1E1B1D] placeholder:text-[#9C929A] focus:outline-none focus:ring-2 focus:ring-[#FF6584]/30"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#FF6584] to-[#F43F5E] text-white text-xs font-extrabold hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
                >
                  Join &amp; Save
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <DotKeyLogo size="md" />
            <p className="text-xs text-[#6B5E66] leading-relaxed">
              Discover your best skin yet. Thoughtful, colorful, fruit-packed skincare powered by dermatologist-backed actives formulated for glowing, bouncy Indian skin.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8C828A]">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              <span>Cruelty-Free • 100% Vegan • PETA Approved</span>
            </div>
          </div>

          {/* Col 2: Shop Categories */}
          <div>
            <h4 className="font-extrabold text-sm text-[#1E1B1D] mb-3">Shop Collections</h4>
            <ul className="space-y-2 text-xs text-[#52474E]">
              <li>
                <button
                  onClick={() => onSelectCategory('Sunscreens')}
                  className="hover:text-[#FF6584] transition-colors cursor-pointer"
                >
                  Sunscreens (SPF 50+)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Moisturizers')}
                  className="hover:text-[#FF6584] transition-colors cursor-pointer"
                >
                  Moisturizers &amp; Night Gels
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Face Serums')}
                  className="hover:text-[#FF6584] transition-colors cursor-pointer"
                >
                  Vitamin C &amp; Niacinamide Serums
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Face Washes')}
                  className="hover:text-[#FF6584] transition-colors cursor-pointer"
                >
                  Face Washes &amp; Cleansers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Lip Care')}
                  className="hover:text-[#FF6584] transition-colors cursor-pointer"
                >
                  Watermelon Lip Sleeping Masks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Toners')}
                  className="hover:text-[#FF6584] transition-colors cursor-pointer"
                >
                  Milky Rice Water &amp; AHA Toners
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Body Care')}
                  className="hover:text-[#FF6584] transition-colors cursor-pointer"
                >
                  Vitamin C Body Lotions &amp; Butters
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Skincare Combos')}
                  className="hover:text-[#FF6584] transition-colors cursor-pointer font-bold text-[#E11D48]"
                >
                  Skincare Combos (Save 35%)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Info */}
          <div>
            <h4 className="font-extrabold text-sm text-[#1E1B1D] mb-3">Customer Care</h4>
            <ul className="space-y-2 text-xs text-[#52474E]">
              <li>
                <button
                  onClick={onOpenSkinQuiz}
                  className="hover:text-[#FF6584] transition-colors cursor-pointer flex items-center gap-1 font-semibold"
                >
                  <span>Routine Quiz</span>
                  <span className="text-[10px] bg-[#FFE5EC] text-[#E11D48] px-1.5 py-0.2 rounded-full font-bold">
                    Interactive
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-[#FF6584] transition-colors cursor-pointer"
                >
                  About Us &amp; Actives
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#FF6584] transition-colors cursor-pointer"
                >
                  Contact Us &amp; FAQs
                </button>
              </li>
              <li>
                <span className="text-[#8C828A]">Free Shipping on all orders over ₹499</span>
              </li>
              <li>
                <span className="text-[#8C828A]">Easy 7-day hassle-free returns</span>
              </li>
              <li>
                <span className="text-[#8C828A]">COD &amp; UPI instant checkout</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quality & Demonstration Statement */}
          <div>
            <h4 className="font-extrabold text-sm text-[#1E1B1D] mb-3">Clean Actives Standard</h4>
            <div className="p-3.5 rounded-2xl bg-[#FAF7F5] border border-[#EFE5E0] text-[11px] text-[#6B5E66] space-y-2 leading-relaxed">
              <p>
                <strong>Dermatologist Formulated:</strong> Powered by tropical fruits, clinical actives, zero parabens, and zero SLS.
              </p>
              <p>
                Designed to provide a high-fidelity, interactive e-commerce shopping experience with real-time cart, wishlist, live search, and routine quiz.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer ribbon */}
        <div className="pt-8 border-t border-[#F0E6E1] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C828A] gap-4">
          <p>© {new Date().getFullYear()} Dot &amp; Key Skincare. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-[#1E1B1D] cursor-pointer" onClick={onOpenAbout}>
              Privacy Policy
            </span>
            <span>•</span>
            <span className="hover:text-[#1E1B1D] cursor-pointer" onClick={onOpenAbout}>
              Terms of Service
            </span>
            <span>•</span>
            <span className="hover:text-[#1E1B1D] cursor-pointer" onClick={onOpenContact}>
              Shipping &amp; Returns
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
