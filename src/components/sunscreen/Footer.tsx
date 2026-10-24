import React, { useState } from 'react';
import { Sun, Sparkles, Check, Heart, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import { SkinConcernCategory } from '../../types/sunscreen';

interface FooterProps {
  onSelectConcern: (concern: SkinConcernCategory) => void;
  onOpenQuiz: () => void;
  onOpenAbout: () => void;
  onScrollToFaqs: () => void;
  onOpenAdmin: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectConcern,
  onOpenQuiz,
  onOpenAbout,
  onScrollToFaqs,
  onOpenAdmin,
  onScrollToTop,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-white border-t border-[#F5D5DE] text-[#633D4B] pt-12 sm:pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section with Instant 15% Discount Code */}
        <div className="rounded-3xl bg-gradient-to-r from-[#F9DDE5] via-[#FCEEF2] to-[#F9DDE5] border border-[#F5D5DE] p-6 sm:p-10 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="max-w-md text-center md:text-left">
            <span className="text-[11px] font-black text-[#633D4B] uppercase tracking-wider flex items-center justify-center md:justify-start gap-1">
              <Sun className="w-3.5 h-3.5 text-[#FF8C9A] fill-[#FF8C9A]" />
              Join the Sun Protection Club
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#633D4B] mt-1 font-display">
              Get 15% OFF Your Sunscreen Match
            </h3>
            <p className="text-xs text-[#8E6B78] mt-1 leading-relaxed">
              Subscribe to unlock coupon <strong>SUNNY15</strong>, summer UV alerts, and new sunscreen launches.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {subscribed ? (
              <div className="p-3.5 rounded-2xl bg-white border border-[#22C55E] flex items-center gap-2 text-xs font-bold text-[#15803D] shadow-sm">
                <Check className="w-4 h-4 text-[#22C55E]" />
                <span>You're in! Use coupon code <strong>SUNNY15</strong> at checkout for 15% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-white border border-[#F5D5DE] rounded-xl px-4 py-3 text-xs font-medium text-[#633D4B] placeholder:text-[#8E6B78] focus:outline-none focus:ring-2 focus:ring-[#FF8C9A]/30 focus:border-[#FF8C9A]"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-[#FF8C9A] hover:bg-[#FF7586] text-white text-xs font-black shadow-md hover:shadow-lg shadow-[#FF8C9A]/20 transition-all cursor-pointer whitespace-nowrap"
                >
                  Get 15% OFF
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-[#FF8C9A] flex items-center justify-center text-white shadow-xs">
                <Sun className="w-4 h-4 fill-white" />
              </div>
              <span className="text-xl font-black text-[#633D4B] lowercase font-display">
                bloom <span className="text-[#FF8C9A]">&amp;</span> blush
              </span>
            </div>
            <p className="text-xs text-[#8E6B78] leading-relaxed">
              Your daily dose of sun protection. High-performance, fruit-powered SPF 50+ PA++++ sunscreens designed for glowing, protected Indian skin with zero white cast.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8E6B78]">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              <span>Dermatologically Tested • 100% Vegan</span>
            </div>
          </div>

          {/* Col 2: Shop by Concern */}
          <div>
            <h4 className="font-black text-sm text-[#633D4B] mb-3 font-display">Shop By Concern</h4>
            <ul className="space-y-2 text-xs text-[#8E6B78]">
              <li>
                <button
                  onClick={() => onSelectConcern('Oily Skin')}
                  className="hover:text-[#FF8C9A] transition-colors cursor-pointer"
                >
                  Oily &amp; Acne-Prone Sunscreens
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectConcern('Dry Skin')}
                  className="hover:text-[#FF8C9A] transition-colors cursor-pointer"
                >
                  Dry Skin &amp; Barrier Hydrate
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectConcern('Sensitive Skin')}
                  className="hover:text-[#FF8C9A] transition-colors cursor-pointer"
                >
                  Fragrance-Free Cica Calming
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectConcern('Combination Skin')}
                  className="hover:text-[#FF8C9A] transition-colors cursor-pointer"
                >
                  Dragon Fruit &amp; Watermelon
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectConcern('Dull-Looking Skin')}
                  className="hover:text-[#FF8C9A] transition-colors cursor-pointer"
                >
                  Vitamin C Super Bright Glow
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Guides */}
          <div>
            <h4 className="font-black text-sm text-[#633D4B] mb-3 font-display">Customer Care</h4>
            <ul className="space-y-2 text-xs text-[#8E6B78]">
              <li>
                <button
                  onClick={onOpenQuiz}
                  className="hover:text-[#FF8C9A] transition-colors cursor-pointer flex items-center gap-1 font-bold text-[#FF8C9A]"
                >
                  <span>Sunscreen Match Quiz</span>
                  <Sparkles className="w-3 h-3 text-[#FF8C9A]" />
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToFaqs}
                  className="hover:text-[#FF8C9A] transition-colors cursor-pointer"
                >
                  Sunscreen FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-[#FF8C9A] transition-colors cursor-pointer"
                >
                  About Our SPF Standards
                </button>
              </li>
              <li>
                <span className="text-[#8E6B78]">Free Shipping on Orders &gt; ₹499</span>
              </li>
              <li>
                <span className="text-[#8E6B78]">Hassle-free 7-day returns</span>
              </li>
              <li className="pt-2 border-t border-[#F5D5DE]">
                <button
                  onClick={onOpenAdmin}
                  className="px-3 py-1.5 rounded-xl bg-[#633D4B] hover:bg-[#FF8C9A] text-white font-extrabold text-[11px] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Admin Dashboard</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Project Notice & Back to Top */}
          <div className="space-y-3">
            <h4 className="font-black text-sm text-[#633D4B] font-display">Project Showcase</h4>
            <div className="p-3.5 rounded-2xl bg-[#FCEEF2] border border-[#F5D5DE] text-[11px] text-[#8E6B78] space-y-2 leading-relaxed">
              <p>
                <strong>Academic Portfolio Notice:</strong> This sunscreen store is an original educational showcase inspired by Bloom &amp; Blush’s vibrant sunscreen aesthetic.
              </p>
              <p>
                Product details and SPF/PA ratings are sourced from verified public sunscreen formulations for educational purposes.
              </p>
            </div>

            {/* Back to top button in footer */}
            <button
              onClick={onScrollToTop}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#F9DDE5] border border-[#F5D5DE] text-[#633D4B] hover:text-[#FF8C9A] text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Back to Top</span>
              <ArrowRight className="w-3.5 h-3.5 -rotate-90" />
            </button>
          </div>
        </div>

        {/* Bottom copyright & disclaimer ribbon */}
        <div className="pt-8 border-t border-[#F5D5DE] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E6B78] gap-4">
          <p>© {new Date().getFullYear()} Bloom &amp; Blush Sunscreen Store — Unofficial Student Demonstration.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="text-[#FF8C9A] font-black hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Admin Portal</span>
            </button>
            <span>•</span>
            <span className="hover:text-[#633D4B] cursor-pointer" onClick={onOpenAbout}>
              Privacy Policy
            </span>
            <span>•</span>
            <span className="hover:text-[#633D4B] cursor-pointer" onClick={onOpenAbout}>
              Terms of Service
            </span>
            <span>•</span>
            <button
              onClick={onScrollToTop}
              className="hover:text-[#FF8C9A] font-bold cursor-pointer"
            >
              Top ⬆
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
