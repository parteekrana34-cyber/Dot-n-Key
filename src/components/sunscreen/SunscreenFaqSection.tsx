import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sun, Sparkles } from 'lucide-react';
import { SUNSCREEN_FAQS } from '../../data/sunscreenCatalog';

export const SunscreenFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="sunscreen-faqs-section" className="py-12 sm:py-16 bg-white border-b border-[#F5D5DE]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#FCEEF2] text-[#633D4B] border border-[#F5D5DE] shadow-xs mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#FF8C9A]" />
            <span>Got Sunscreen Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#633D4B] tracking-tight font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#8E6B78] mt-1.5 leading-relaxed">
            Everything you need to know about SPF, white cast, and choosing your formula.
          </p>
        </div>

        <div className="space-y-3">
          {SUNSCREEN_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl sm:rounded-3xl bg-white border border-[#F5D5DE] hover:border-[#FF8C9A] shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FCEEF2]/60 transition-colors"
                >
                  <span className="font-extrabold text-xs sm:text-sm text-[#633D4B]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#FF8C9A] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-[#8E6B78] leading-relaxed border-t border-[#F5D5DE] pt-3 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
