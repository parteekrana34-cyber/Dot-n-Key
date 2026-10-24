import React from 'react';
import { ArrowRight, Sparkles, Gem, Award, Shield } from 'lucide-react';
import signatureImg from '../assets/images/signature_collection_1791349605807.jpg';

interface SignatureCollectionProps {
  onExploreCollection: () => void;
  onViewProduct?: (productId: string) => void;
}

export const SignatureCollection: React.FC<SignatureCollectionProps> = ({
  onExploreCollection,
  onViewProduct,
}) => {
  return (
    <section className="py-24 bg-[#231E1B] text-[#FAF7F2] overflow-hidden relative">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8C6D46]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Large Luxury Image Showcase (7 cols) with Floating Motion Animation */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden border border-[#52443C] shadow-2xl group animate-luxury-float will-change-transform">
              <img
                src={signatureImg}
                alt="Payora Jewels Signature High Jewellery Collection"
                className="w-full h-full object-cover object-center scale-105 animate-gentle-drift will-change-transform"
                referrerPolicy="no-referrer"
              />
              {/* Subtle inner gold frame border */}
              <div className="absolute inset-4 border border-[#C5A880]/40 pointer-events-none" />
              
              {/* Shimmer light beam overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A880]/10 via-transparent to-white/5 pointer-events-none" />
              
              {/* Floating Curator Note */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#1E1917]/85 backdrop-blur-md border border-[#52443C] flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880]">
                    Haute Joaillerie Piece Unique
                  </p>
                  <p className="font-serif text-lg text-white">The Sovereign Imperial Collar</p>
                </div>
                <button
                  onClick={() => onViewProduct && onViewProduct('pj-006')}
                  className="px-3 py-1.5 bg-[#C5A880] text-[#1E1917] hover:bg-white text-[11px] font-semibold uppercase tracking-wider transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Editorial Content (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C5A880] font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Privé High Jewellery</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#FAF7F2] tracking-tight leading-[1.15]">
              The Signature <br />
              <span className="italic font-normal text-[#E8D7C1]">Collection</span>
            </h2>

            <p className="mt-6 text-sm sm:text-base text-[#C2B5A8] font-light leading-relaxed">
              Sculpted with uncompromising reverence for proportion and rarity. Each creation in the Signature Collection represents hundreds of hours of manual gem-setting by our master artisans in Milan and Antwerp.
            </p>

            {/* Spec Matrix */}
            <div className="mt-8 py-6 border-y border-[#3E342F] grid grid-cols-2 gap-6 text-xs text-[#E1D6CA]">
              <div className="flex items-start gap-3">
                <Gem className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Rare Cut Diamonds</p>
                  <p className="text-[11px] text-[#9E9086] mt-0.5">VVS clarity, D-E top color grading</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Museum Archives</p>
                  <p className="text-[11px] text-[#9E9086] mt-0.5">Numbered limited editions</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onExploreCollection}
                className="w-full sm:w-auto px-8 py-4 bg-[#C5A880] text-[#1E1917] hover:bg-[#D4BD9E] text-xs uppercase tracking-[0.24em] font-semibold transition-all duration-200 flex items-center justify-center gap-3 group focus:outline-none"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
