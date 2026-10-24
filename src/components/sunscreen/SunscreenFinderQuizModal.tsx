import React, { useState } from 'react';
import { X, Sun, Check, RotateCcw, ShoppingBag } from 'lucide-react';
import { SunscreenProduct } from '../../types/sunscreen';

interface SunscreenFinderQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: SunscreenProduct[];
  onAddToCart: (product: SunscreenProduct, size: string) => void;
  onViewProduct: (product: SunscreenProduct) => void;
}

export const SunscreenFinderQuizModal: React.FC<SunscreenFinderQuizModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart,
  onViewProduct,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [skinType, setSkinType] = useState('');
  const [finishPreference, setFinishPreference] = useState('');
  const [exposureLevel, setExposureLevel] = useState('');
  const [added, setAdded] = useState(false);

  const resetQuiz = () => {
    setStep(1);
    setSkinType('');
    setFinishPreference('');
    setExposureLevel('');
    setAdded(false);
  };

  const getRecommendedSunscreen = (): SunscreenProduct => {
    if (skinType === 'Oily & Acne-Prone' || finishPreference === 'Matte') {
      return products.find((p) => p.id === 'cica-calming-sunscreen') || products[2];
    }
    if (skinType === 'Dry & Sensitive') {
      return products.find((p) => p.id === 'ceramide-hydrate-sunscreen') || products[3];
    }
    if (skinType === 'Dull & Pigmented' || finishPreference === 'Glow') {
      return products.find((p) => p.id === 'vitaminc-super-bright-sunscreen') || products[1];
    }
    return products.find((p) => p.id === 'watermelon-cooling-sunscreen') || products[0];
  };

  const recommended = getRecommendedSunscreen();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl sm:rounded-[2rem] shadow-2xl overflow-hidden border border-[#F5D5DE] max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#F9DDE5] via-[#FCEEF2] to-[#F9DDE5] border-b border-[#F5D5DE] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FF8C9A] text-white flex items-center justify-center shadow-xs">
              <Sun className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h2 className="font-black text-base sm:text-lg text-[#633D4B] font-display">
                Sunscreen Match Finder
              </h2>
              <p className="text-[11px] text-[#8E6B78]">Find your 100% zero white-cast daily shield</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#F9DDE5] text-[#8E6B78] hover:text-[#633D4B] flex items-center justify-center cursor-pointer border border-[#F5D5DE] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 bg-white">
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs font-black uppercase tracking-wider text-[#FF8C9A]">
                  Step 1 of 3
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#633D4B] mt-1 font-display">
                  What is your skin type?
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'Oily & Acne-Prone', desc: 'Frequent midday shine, open pores, or breakouts' },
                  { id: 'Dry & Sensitive', desc: 'Feels tight after washing, flaky or stinging easily' },
                  { id: 'Combination Skin', desc: 'Oily T-zone (forehead, nose) but normal/dry cheeks' },
                  { id: 'Dull & Pigmented', desc: 'Uneven skin tone, tan lines, or post-sun dark spots' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSkinType(item.id);
                      setStep(2);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      skinType === item.id
                        ? 'border-[#FF8C9A] bg-[#FCEEF2] shadow-xs'
                        : 'border-[#F5D5DE] hover:border-[#FF8C9A] hover:bg-[#FCEEF2]/60'
                    }`}
                  >
                    <p className="font-extrabold text-sm text-[#633D4B]">{item.id}</p>
                    <p className="text-[11px] text-[#8E6B78] mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs font-black uppercase tracking-wider text-[#FF8C9A]">
                  Step 2 of 3
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#633D4B] mt-1 font-display">
                  What finish do you prefer on your skin?
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'Dewy', title: 'Dewy Aqua Finish', desc: 'Glass-skin glow & fresh water-burst plumpness' },
                  { id: 'Matte', title: 'Soft Powdery Matte', desc: 'Zero shine, oil-controlling, invisible' },
                  { id: 'Glow', title: 'Water-Light Radiance', desc: 'Sun-lit golden hour brightness' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setFinishPreference(item.id);
                      setStep(3);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      finishPreference === item.id
                        ? 'border-[#FF8C9A] bg-[#FCEEF2] shadow-xs'
                        : 'border-[#F5D5DE] hover:border-[#FF8C9A] hover:bg-[#FCEEF2]/60'
                    }`}
                  >
                    <p className="font-extrabold text-sm text-[#633D4B]">{item.title}</p>
                    <p className="text-[11px] text-[#8E6B78] mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-xs font-black uppercase tracking-wider text-[#FF8C9A]">
                  Step 3 of 3
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#633D4B] mt-1 font-display">
                  How much sun exposure do you get daily?
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'Indoor', title: 'Mainly Indoors / AC', desc: 'Blue light protection from laptops & windows' },
                  { id: 'Moderate', title: 'Moderate Commute', desc: '1-2 hours of direct sun during travel' },
                  { id: 'Intense', title: 'Heavy Outdoor Exposure', desc: 'Sports, field work, or tropical beach days' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setExposureLevel(item.id);
                      setStep(4);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      exposureLevel === item.id
                        ? 'border-[#FF8C9A] bg-[#FCEEF2] shadow-xs'
                        : 'border-[#F5D5DE] hover:border-[#FF8C9A] hover:bg-[#FCEEF2]/60'
                    }`}
                  >
                    <p className="font-extrabold text-sm text-[#633D4B]">{item.title}</p>
                    <p className="text-[11px] text-[#8E6B78] mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCEEF2] text-[#633D4B] border border-[#F5D5DE] text-xs font-black uppercase mb-1">
                  <Check className="w-3.5 h-3.5 text-[#FF8C9A]" />
                  <span>100% Match Found!</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#633D4B] font-display">
                  Your Perfect Sunscreen Match:
                </h3>
              </div>

              {/* Matched Product Card */}
              <div className="p-4 sm:p-5 rounded-3xl bg-[#FCEEF2] border border-[#F5D5DE] shadow-sm flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={recommended.image}
                  alt={recommended.name}
                  className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-2xl shadow-sm shrink-0 bg-white"
                />
                <div className="space-y-1.5 text-center sm:text-left">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#633D4B] bg-white px-2 py-0.5 rounded-full border border-[#F5D5DE]">
                    {recommended.spfRating} {recommended.paRating}
                  </span>
                  <h4 className="font-black text-base sm:text-lg text-[#633D4B]">
                    {recommended.name}
                  </h4>
                  <p className="text-xs text-[#8E6B78] leading-relaxed">
                    {recommended.tagline}
                  </p>
                  <p className="text-base font-black text-[#633D4B] pt-1">
                    ₹{recommended.price}{' '}
                    <span className="text-xs text-[#8E6B78] line-through font-normal">
                      ₹{recommended.originalPrice}
                    </span>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  onClick={() => {
                    onAddToCart(recommended, recommended.defaultSize);
                    setAdded(true);
                    setTimeout(() => {
                      setAdded(false);
                      onClose();
                    }, 1200);
                  }}
                  className={`flex-1 py-3.5 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    added ? 'bg-[#633D4B] text-white' : 'bg-[#FF8C9A] hover:bg-[#FF7586] text-white shadow-md'
                  }`}
                >
                  {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  <span>{added ? 'Added to Bag!' : `Add to Bag (₹${recommended.price})`}</span>
                </button>

                <button
                  onClick={() => {
                    onViewProduct(recommended);
                    onClose();
                  }}
                  className="px-5 py-3.5 rounded-2xl bg-white border border-[#F5D5DE] hover:border-[#FF8C9A] text-[#633D4B] text-xs sm:text-sm font-black cursor-pointer"
                >
                  View Details
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={resetQuiz}
                  className="text-xs font-bold text-[#8E6B78] hover:text-[#FF8C9A] inline-flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Retake SPF Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
