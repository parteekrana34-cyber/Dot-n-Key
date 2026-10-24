import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { FragranceFamily } from '../../types/perfume';
import { useTheme } from '../../context/ThemeContext';

interface FragranceFamiliesSectionProps {
  onSelectFamily: (family: FragranceFamily | 'All Scents') => void;
}

const FAMILIES_DATA = [
  {
    family: 'Woody & Oud' as FragranceFamily,
    title: 'Woody & Rare Oud',
    desc: 'Smoked Cambodian agarwood, charred birch, and regal incense.',
    image: '/src/assets/images/perfume_noir_oud_1791959203416.jpg',
    tag: 'Haute Sillage',
  },
  {
    family: 'Floral' as FragranceFamily,
    title: 'Opulent Floral',
    desc: 'Centifolia May roses, midnight tuberose, and Persian saffron.',
    image: '/src/assets/images/perfume_burgundy_rose_1791959202926.jpg',
    tag: 'Grasse Harvest',
  },
  {
    family: 'Amber & Spicy' as FragranceFamily,
    title: 'Amber & Warm Spices',
    desc: 'Golden amber resins, vintage cognac, and cinnamon quills.',
    image: '/src/assets/images/perfume_golden_amber_1791959202949.jpg',
    tag: 'Liquid Gold',
  },
  {
    family: 'Fresh & Citrus' as FragranceFamily,
    title: 'Fresh & Citrus Scents',
    desc: 'Calabrian bergamot, blood orange zest, and petitgrain.',
    image: '/src/assets/images/perfume_golden_amber_1791959202949.jpg',
    tag: 'Sunlit Radiance',
  },
  {
    family: 'Aquatic' as FragranceFamily,
    title: 'Aquatic Fragrances',
    desc: 'Atlantic sea salt, blue lotus, driftwood, and grey ambergris.',
    image: '/src/assets/images/perfume_noir_oud_1791959203416.jpg',
    tag: 'Oceanic Elegance',
  },
  {
    family: 'Unisex' as FragranceFamily,
    title: 'Unisex Masterpieces',
    desc: 'Transcending gender boundaries with pure olfactory architecture.',
    image: '/src/assets/images/velmora_hero_flacon_1791959201130.jpg',
    tag: 'Universal Aura',
  },
  {
    family: 'Travel-Size' as FragranceFamily,
    title: 'Nomad Travel Flacons',
    desc: 'Precision brass pocket atomizers for global connoisseurs.',
    image: '/src/assets/images/luxury_gift_coffret_1791959203436.jpg',
    tag: '10ml Extraits',
  },
  {
    family: 'Luxury Gift Sets' as FragranceFamily,
    title: 'Luxury Gift Sets & Coffrets',
    desc: 'Bespoke hand-crafted velvet presentation sets with wax seal.',
    image: '/src/assets/images/luxury_gift_coffret_1791959203436.jpg',
    tag: 'Royal Coffrets',
  },
];

export const FragranceFamiliesSection: React.FC<FragranceFamiliesSectionProps> = ({
  onSelectFamily,
}) => {
  const { isLight } = useTheme();

  return (
    <section
      id="fragrance-families"
      className={`scroll-mt-24 py-20 sm:py-28 transition-colors duration-300 border-b ${
        isLight 
          ? 'bg-[#F5EFE6] border-[#9A742A]/20' 
          : 'bg-[#131111] border-[#C2A064]/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] uppercase tracking-[0.25em] font-sans ${
            isLight
              ? 'border-[#9A742A]/40 bg-[#FFFFFF] text-[#591D2D] shadow-sm'
              : 'border-[#C2A064]/40 bg-[#421C27]/40 text-[#DFC48E]'
          }`}>
            <Compass className={`w-3.5 h-3.5 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
            <span>Olfactory Taxonomy</span>
          </div>
          <h2 className={`font-serif text-3xl sm:text-5xl font-normal tracking-tight transition-colors ${
            isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'
          }`}>
            Shop by Fragrance Family
          </h2>
          <p className={`text-sm sm:text-base font-sans transition-colors ${
            isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'
          }`}>
            Navigate through our 8 distinct olfactory domains, each composed around nature's most precious natural essences.
          </p>
        </div>

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FAMILIES_DATA.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelectFamily(item.family)}
              className={`group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer transition-all duration-500 border ${
                isLight
                  ? 'border-[#E5D9C5] hover:border-[#9A742A] shadow-[0_8px_25px_rgba(154,116,42,0.12)]'
                  : 'border-[#C2A064]/25 hover:border-[#C2A064] bg-[#1E1A1B] shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
              }`}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Overlays */}
              <div className={`absolute inset-0 transition-opacity ${
                isLight 
                  ? 'bg-gradient-to-t from-[#1A1616]/95 via-[#1A1616]/40 to-transparent opacity-85 group-hover:opacity-75' 
                  : 'bg-gradient-to-t from-[#171515] via-[#171515]/50 to-transparent opacity-90 group-hover:opacity-80'
              }`} />

              {/* Top Tag */}
              <div className="absolute top-4 left-4 z-20">
                <span className={`px-2.5 py-1 rounded text-[10px] font-sans uppercase tracking-widest backdrop-blur-md border ${
                  isLight
                    ? 'bg-[#FFFFFF]/90 text-[#591D2D] border-[#9A742A]/40 font-semibold'
                    : 'bg-[#171515]/80 text-[#DFC48E] border-[#C2A064]/30'
                }`}>
                  {item.tag}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-4 left-4 right-4 z-20 space-y-1.5">
                <h3 className="font-serif text-xl sm:text-2xl text-[#FFFFFF] group-hover:text-[#DFC48E] transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-[#E5DDD2] font-sans line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider text-[#DFC48E] group-hover:text-white transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
