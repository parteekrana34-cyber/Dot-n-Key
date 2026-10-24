import React from 'react';
import { Sparkles, Compass, Shield, HeartHandshake } from 'lucide-react';
import craftImg from '../assets/images/jewellery_artisan_craft_1791349640850.jpg';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#F8F4EE] border-b border-[#E7DFD4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#8C6D46] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Payora Ethos</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2A2421] tracking-tight leading-[1.15]">
              Jewellery Handcrafted For <br />
              <span className="italic font-normal text-[#8C6D46]">Every Moment That Matters</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#61534A] font-light leading-relaxed">
              <p>
                Founded upon the belief that true luxury resides in heartfelt permanence, <strong>PAYORA JEWELS</strong> crafts fine jewellery designed to effortlessly transition from everyday intimate rituals to life’s grandest celebrations.
              </p>
              <p>
                We eschew fleeting fashion cycles in pursuit of enduring distinction. Every setting, bezel, and pave gallery is hand-sculpted in our European ateliers using 100% recycled 18k solid gold and independently certified conflict-free gemstones.
              </p>
              <p>
                Whether marking an engagement vow, commemorating a personal triumph, or investing in an everyday talisman of quiet confidence, each Payora creation is an heirloom engineered to be treasured across generations.
              </p>
            </div>

            {/* Three Pillars */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#E5DDD0]">
              <div>
                <Compass className="w-5 h-5 text-[#8C6D46] mb-2" />
                <h3 className="font-serif text-base font-semibold text-[#2A2421]">Artisanal Precision</h3>
                <p className="text-xs text-[#7A6C63] font-light mt-1">
                  Over 40 hours of manual setting by master goldsmiths for each piece.
                </p>
              </div>

              <div>
                <Shield className="w-5 h-5 text-[#8C6D46] mb-2" />
                <h3 className="font-serif text-base font-semibold text-[#2A2421]">Conscious Luxury</h3>
                <p className="text-xs text-[#7A6C63] font-light mt-1">
                  100% recycled gold &amp; certified Kimberley Process conflict-free diamonds.
                </p>
              </div>

              <div>
                <HeartHandshake className="w-5 h-5 text-[#8C6D46] mb-2" />
                <h3 className="font-serif text-base font-semibold text-[#2A2421]">Lifetime Heritage</h3>
                <p className="text-xs text-[#7A6C63] font-light mt-1">
                  Complimentary annual inspections, prong tightening, and restoration.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Artisan Image (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden border border-[#DDD3C7] shadow-xl group bg-[#ECE4D8]">
              <img
                src={craftImg}
                alt="Master jeweler delicately setting diamonds in atelier"
                className="w-full h-full object-cover object-center scale-105 animate-gentle-drift will-change-transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-4 border border-white/40 pointer-events-none" />

              {/* Floating Caption Tag */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#FAF7F2]/90 backdrop-blur-md border border-[#E0D5C7]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8C6D46] font-semibold">
                  Milan Atelier Vault
                </p>
                <p className="font-serif text-base text-[#2A2421]">
                  Master Goldsmith Setting an 18K Rose Gold Diamond Band
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
