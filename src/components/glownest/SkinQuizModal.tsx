import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RotateCcw, ShoppingBag, Star } from 'lucide-react';
import { SkincareProduct } from '../../types/skincare';

interface SkinQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: SkincareProduct[];
  onAddBundleToCart: (productsToAdd: { product: SkincareProduct; size: string }[]) => void;
}

export const SkinQuizModal: React.FC<SkinQuizModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddBundleToCart,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<number>(1);
  const [skinType, setSkinType] = useState<string>('');
  const [primaryConcern, setPrimaryConcern] = useState<string>('');
  const [vibe, setVibe] = useState<string>('');
  const [bundleAdded, setBundleAdded] = useState(false);

  const resetQuiz = () => {
    setStep(1);
    setSkinType('');
    setPrimaryConcern('');
    setVibe('');
    setBundleAdded(false);
  };

  // Find 3 recommended products based on answers
  const recommendedRoutine = React.useMemo(() => {
    // 1. Cleanser
    const cleanser =
      products.find((p) => p.category === 'Face Washes') || products[0];

    // 2. Serum
    let serum = products.find((p) => p.category === 'Face Serums');
    if (primaryConcern === 'Dullness & Dark Spots') {
      serum = products.find((p) => p.id === 'vitamin-c-glow-serum') || serum;
    } else if (primaryConcern === 'Acne & Open Pores') {
      serum = products.find((p) => p.id === 'niacinamide-zinc-serum') || serum;
    }

    // 3. Moisturizer
    let moisturizer = products.find((p) => p.category === 'Moisturizers');
    if (primaryConcern === 'Dryness & Barrier Damage') {
      moisturizer = products.find((p) => p.id === 'ceramides-barrier-repair-moisturizer') || moisturizer;
    } else if (skinType === 'Oily & Acne-Prone') {
      moisturizer = products.find((p) => p.id === 'cica-calming-night-gel') || moisturizer;
    }

    // 4. Sunscreen hero
    const sunscreen = products.find((p) => p.id === 'watermelon-hyaluronic-sunscreen') || products[0];

    return [cleanser, serum, moisturizer, sunscreen].filter(Boolean) as SkincareProduct[];
  }, [products, primaryConcern, skinType]);

  const bundleOriginalTotal = recommendedRoutine.reduce((sum, p) => sum + p.price, 0);
  const bundleDiscountedTotal = Math.round(bundleOriginalTotal * 0.85); // 15% OFF bundle
  const savings = bundleOriginalTotal - bundleDiscountedTotal;

  const handleAddAll = () => {
    const bundleItems = recommendedRoutine.map((p) => ({
      product: p,
      size: p.defaultSize,
    }));
    onAddBundleToCart(bundleItems);
    setBundleAdded(true);
    setTimeout(() => {
      setBundleAdded(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#FFD1DC]/40 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#FFE5EC] via-[#FFF0F3] to-[#EDE9FE] border-b border-[#F0E6E1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white shadow-xs flex items-center justify-center text-[#FF6584]">
              <Sparkles className="w-4 h-4 text-[#FF6584]" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-[#1E1B1D]">
                Skin Routine Finder ✨
              </h2>
              <p className="text-xs text-[#7A6E75]">Answer 3 quick questions for your personalized glow recipe</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white text-[#7A6E75] hover:text-[#1E1B1D] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-[#FAF7F5] h-1.5 flex">
          <div
            className="bg-gradient-to-r from-[#FF6584] to-[#8B5CF6] h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Quiz Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          {/* STEP 1: Skin Type */}
          {step === 1 && (
            <div className="space-y-4">
              <span className="text-[11px] font-bold text-[#FF6584] uppercase tracking-wider">
                Question 1 of 3
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1E1B1D]">
                How does your skin feel midday? 💧
              </h3>
              <p className="text-xs text-[#7A6E75]">
                Knowing your skin type helps us pick the ideal weight & hydration balance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  {
                    type: 'Oily & Acne-Prone',
                    desc: 'Shiny T-zone, enlarged pores, prone to frequent breakouts',
                    emoji: '🫧',
                  },
                  {
                    type: 'Dry & Sensitive',
                    desc: 'Tight sensation, dry flaky patches, reacts easily to fragrance',
                    emoji: '🌸',
                  },
                  {
                    type: 'Combination',
                    desc: 'Oily forehead and nose, but normal/dry cheeks',
                    emoji: '⚖️',
                  },
                  {
                    type: 'Normal & Balanced',
                    desc: 'Comfortable, neither greasy nor dry, looking for maintenance glow',
                    emoji: '✨',
                  },
                ].map((item) => (
                  <button
                    key={item.type}
                    onClick={() => {
                      setSkinType(item.type);
                      setStep(2);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      skinType === item.type
                        ? 'border-[#FF6584] bg-[#FFF0F3] shadow-xs'
                        : 'border-[#EFE5E0] hover:border-[#FFD1DC] bg-[#FAF7F5] hover:bg-white'
                    }`}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <p className="font-bold text-sm text-[#1E1B1D]">{item.type}</p>
                      <p className="text-xs text-[#7A6E75] mt-0.5">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Main Concern */}
          {step === 2 && (
            <div className="space-y-4">
              <span className="text-[11px] font-bold text-[#FF6584] uppercase tracking-wider">
                Question 2 of 3
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1E1B1D]">
                What is your #1 skincare goal right now? 🎯
              </h3>
              <p className="text-xs text-[#7A6E75]">
                We will match high-potency actives like Vitamin C, Niacinamide, or Ceramides.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  {
                    concern: 'Dullness & Dark Spots',
                    desc: 'Fade pigmentation, boost glass-skin glow & even out skin tone',
                    active: '10% Vitamin C + Blood Orange',
                  },
                  {
                    concern: 'Acne & Open Pores',
                    desc: 'Unclog congested pores, control shine & stop breakouts',
                    active: 'Niacinamide + Zinc PCA + Cica',
                  },
                  {
                    concern: 'Dryness & Barrier Damage',
                    desc: 'Deep 72hr hydration, stop peeling & soothe redness',
                    active: '5 Ceramides + Hyaluronic Acid',
                  },
                  {
                    concern: 'Sun Protection & Anti-Aging',
                    desc: 'Broad spectrum SPF 50+ without white cast or greasiness',
                    active: 'Watermelon UV + Hyaluronic',
                  },
                ].map((item) => (
                  <button
                    key={item.concern}
                    onClick={() => {
                      setPrimaryConcern(item.concern);
                      setStep(3);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      primaryConcern === item.concern
                        ? 'border-[#FF6584] bg-[#FFF0F3] shadow-xs'
                        : 'border-[#EFE5E0] hover:border-[#FFD1DC] bg-[#FAF7F5] hover:bg-white'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-sm text-[#1E1B1D]">{item.concern}</p>
                      <p className="text-xs text-[#7A6E75] mt-0.5">{item.desc}</p>
                    </div>
                    <span className="text-[10px] font-bold text-[#E11D48] mt-2 bg-white px-2 py-0.5 rounded-md inline-block w-fit">
                      Target: {item.active}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-[#8C828A] hover:text-[#1E1B1D] mt-2"
              >
                ← Back to question 1
              </button>
            </div>
          )}

          {/* STEP 3: Texture Preference */}
          {step === 3 && (
            <div className="space-y-4">
              <span className="text-[11px] font-bold text-[#FF6584] uppercase tracking-wider">
                Question 3 of 3
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#1E1B1D]">
                What finish do you love on your skin? 🍧
              </h3>
              <p className="text-xs text-[#7A6E75]">
                Choose how you want your daily skincare to feel throughout the day.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  {
                    vibe: 'Dewy & Juicy Glaze',
                    desc: 'Fresh glazed donut glow with plump water bounce',
                  },
                  {
                    vibe: 'Soft Matte & Velvet',
                    desc: 'Zero shine, blurred pores, and featherlight feel',
                  },
                  {
                    vibe: 'Cocooning Rich Cream',
                    desc: 'Deep nourishing buttery shield for delicate skin',
                  },
                ].map((item) => (
                  <button
                    key={item.vibe}
                    onClick={() => {
                      setVibe(item.vibe);
                      setStep(4);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      vibe === item.vibe
                        ? 'border-[#FF6584] bg-[#FFF0F3] shadow-xs'
                        : 'border-[#EFE5E0] hover:border-[#FFD1DC] bg-[#FAF7F5] hover:bg-white'
                    }`}
                  >
                    <p className="font-bold text-sm text-[#1E1B1D]">{item.vibe}</p>
                    <p className="text-xs text-[#7A6E75] mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                className="text-xs font-semibold text-[#8C828A] hover:text-[#1E1B1D] mt-2"
              >
                ← Back to question 2
              </button>
            </div>
          )}

          {/* STEP 4: Results & Personalized Routine Bundle */}
          {step === 4 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FFF0F3] via-[#FFE5EC] to-[#EDE9FE] border border-[#FFD1DC] text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E11D48]">
                  🎉 Your Customized 4-Step Glow Regimen
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#1E1B1D] mt-1">
                  Tailored for {skinType || 'Combination'} • {primaryConcern || 'Radiance'}
                </h3>
                <p className="text-xs text-[#52474E] mt-1">
                  Get 15% OFF when you grab this routine bundle together!
                </p>
              </div>

              {/* Regimen Steps */}
              <div className="space-y-2.5">
                {recommendedRoutine.map((product, idx) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF7F5] border border-[#EFE5E0]"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#1E1B1D] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-xl object-cover bg-white shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#FF6584] uppercase">
                          Step {idx + 1}: {product.routineStep}
                        </span>
                        <span className="text-[10px] text-[#8C828A]">({product.timeOfDay})</span>
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-[#1E1B1D] truncate">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-[#7A6E75] truncate">{product.subtitle}</p>
                    </div>
                    <span className="font-bold text-xs text-[#1E1B1D] shrink-0">
                      ₹{product.price}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bundle Pricing Card */}
              <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-[#F0E6E1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-[#1E1B1D]">₹{bundleDiscountedTotal}</span>
                    <span className="text-xs text-[#9C929A] line-through">₹{bundleOriginalTotal}</span>
                    <span className="text-xs font-bold text-[#22C55E] bg-[#F0FDF4] px-2 py-0.5 rounded-full">
                      Save ₹{savings} (15% OFF)
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7A6E75]">Includes Free Shipping & 2 Complimentary Samples</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={resetQuiz}
                    className="p-2.5 rounded-xl border border-[#E0D5CE] hover:bg-white text-[#7A6E75] text-xs font-bold flex items-center gap-1 cursor-pointer"
                    title="Retake quiz"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake</span>
                  </button>

                  <button
                    onClick={handleAddAll}
                    className={`px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center gap-2 text-white shadow-md transition-all cursor-pointer ${
                      bundleAdded
                        ? 'bg-[#22C55E]'
                        : 'bg-gradient-to-r from-[#FF6584] to-[#F43F5E] hover:from-[#F43F5E] hover:to-[#E11D48]'
                    }`}
                  >
                    {bundleAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Bundle Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add Routine to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
