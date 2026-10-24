import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag } from 'lucide-react';
import { PerfumeProduct, FragranceQuizState } from '../../types/perfume';
import { PERFUME_CATALOG } from '../../data/perfumeCatalog';
import { useTheme } from '../../context/ThemeContext';

interface FragranceFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: PerfumeProduct) => void;
  onAddToCart: (product: PerfumeProduct, size: string) => void;
  onToggleWishlist: (product: PerfumeProduct) => void;
  wishlistIds: string[];
}

const QUIZ_STEPS = [
  {
    step: 1,
    title: 'Select Your Preferred Olfactory Family',
    subtitle: 'Which scent direction speaks most to your aura?',
    field: 'family' as keyof FragranceQuizState,
    options: [
      { label: 'Woody & Rare Oud', value: 'Woody & Oud', description: 'Smoked cedar, agarwood, charred birch, and incense.' },
      { label: 'Opulent Floral', value: 'Floral', description: 'Grasse May rose, midnight tuberose, jasmine, and saffron.' },
      { label: 'Amber & Warm Spices', value: 'Amber & Spicy', description: 'Liquid amber, vintage cognac, cinnamon, and bourbon vanilla.' },
      { label: 'Fresh & Crisp Citrus', value: 'Fresh & Citrus', description: 'Calabrian bergamot, blood orange, petitgrain, and ginger.' },
      { label: 'Marine & Aquatic', value: 'Aquatic', description: 'Atlantic sea salt, blue lotus, driftwood, and mineral ambergris.' },
    ],
  },
  {
    step: 2,
    title: 'Choose the Desired Mood & Texture',
    subtitle: 'How should your presence feel to those near you?',
    field: 'vibe' as keyof FragranceQuizState,
    options: [
      { label: 'Deep, Mysterious & Dark', value: 'Woody', description: 'Smoky, nocturnal, and unapologetically royal.' },
      { label: 'Warm, Sensual & Enveloping', value: 'Warm', description: 'Like cashmere, golden nectar, and aged liquor.' },
      { label: 'Romantic, Hypnotic & Seductive', value: 'Floral', description: 'Velvet petals with intoxicating depth.' },
      { label: 'Clean, Aristocratic & Uplifting', value: 'Fresh', description: 'Sun-drenched Mediterranean breeze.' },
      { label: 'Bold, Spiced & Assertive', value: 'Spicy', description: 'Tuscan leather, saffron threads, and warm cloves.' },
    ],
  },
  {
    step: 3,
    title: 'Desired Projection & Sillage',
    subtitle: 'What intensity level do you command?',
    field: 'intensity' as keyof FragranceQuizState,
    options: [
      { label: 'Subtle & Intimate', value: 'Subtle Intimate', description: 'Discovered only when someone leans close to you.' },
      { label: 'Moderate Elegance', value: 'Moderate Sillage', description: 'A polished, refined aura throughout the room.' },
      { label: 'Powerful Trail', value: 'Powerful Trail', description: 'Leaves an unforgettable scent trail behind your steps.' },
      { label: 'Beast Mode (Extrait 32%+)', value: 'Beast Mode', description: 'Nuclear longevity that lasts 16+ hours on clothes and skin.' },
    ],
  },
  {
    step: 4,
    title: 'Primary Occasion & Setting',
    subtitle: 'Where will you wear this signature masterpiece?',
    field: 'occasion' as keyof FragranceQuizState,
    options: [
      { label: 'Black Tie Galas & Midnight Soirées', value: 'Black Tie', description: 'Tuxedos, velvet gowns, and grand entrances.' },
      { label: 'Intimate Dates & Seduction', value: 'Date Night', description: 'Candlelit dinners and whispered secrets.' },
      { label: 'Daily Signature & Quiet Luxury', value: 'Daily Luxury', description: 'Effortless aristocratic signature for every day.' },
      { label: 'Executive Boardrooms & Power Meetings', value: 'Executive', description: 'Commands respect and authoritative prestige.' },
    ],
  },
  {
    step: 5,
    title: 'Budget Preference',
    subtitle: 'Select your preferred acquisition range',
    field: 'budget' as keyof FragranceQuizState,
    options: [
      { label: 'Discovery Range (Under ₹12,000)', value: 'entry', description: 'Single flacons or luxury travel sets.' },
      { label: 'Signature Line (₹12,000 – ₹17,000)', value: 'signature', description: '50ml Pure Extraits de Parfum.' },
      { label: 'Imperial Flacons & Coffrets (₹17,000+)', value: 'prestige', description: '100ml Flacons and bespoke velvet presentation sets.' },
    ],
  },
];

export const FragranceFinderModal: React.FC<FragranceFinderModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
}) => {
  const { isLight } = useTheme();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<FragranceQuizState>({
    family: 'Woody & Oud',
    vibe: 'Woody',
    intensity: 'Beast Mode',
    occasion: 'Black Tie',
    budget: 'signature',
  });
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const currentStep = QUIZ_STEPS[currentStepIndex];

  const handleSelectOption = (value: string) => {
    const updated = { ...answers, [currentStep.field]: value };
    setAnswers(updated);

    if (currentStepIndex < QUIZ_STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setIsCompleted(false);
  };

  // Score Catalog according to quiz answers
  const scoredProducts = PERFUME_CATALOG.filter(
    (p) => p.family !== 'Luxury Gift Sets' && p.family !== 'Travel-Size'
  )
    .map((product) => {
      let score = 50;
      if (product.family === answers.family) score += 30;
      if (answers.intensity === 'Beast Mode' && product.concentration.includes('32%')) score += 15;
      if (answers.budget === 'signature' && product.price >= 12000 && product.price <= 17000) score += 10;
      return { product, matchPercentage: Math.min(99, score) };
    })
    .sort((a, b) => b.matchPercentage - a.matchPercentage);

  const topMatch = scoredProducts[0]?.product || PERFUME_CATALOG[0];
  const secondaryMatches = scoredProducts.slice(1, 4).map((s) => s.product);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className={`relative w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden my-6 border transition-colors ${
        isLight
          ? 'bg-[#FFFFFF] border-[#E5D9C5] text-[#1A1616]'
          : 'bg-[#171515] border-[#C2A064]/40 text-[#F3EDE3]'
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-30 p-2 rounded-full border transition-colors ${
            isLight
              ? 'bg-[#FAF7F2] hover:bg-[#F4EFE6] border-[#E5D9C5] text-[#1A1616]'
              : 'bg-[#171515]/80 hover:bg-[#421C27] border-[#C2A064]/30 text-[#A89F93] hover:text-[#F3EDE3]'
          }`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCompleted ? (
          /* Quiz Steps */
          <div className="p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border text-[10px] uppercase tracking-widest font-sans ${
                  isLight
                    ? 'border-[#9A742A]/40 bg-[#FAF7F2] text-[#591D2D]'
                    : 'border-[#C2A064]/40 bg-[#421C27]/40 text-[#DFC48E]'
                }`}>
                  <Sparkles className={`w-3 h-3 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
                  <span>Step {currentStepIndex + 1} of {QUIZ_STEPS.length}</span>
                </div>
                <span className={`text-xs font-sans ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                  Personalized Fragrance Finder
                </span>
              </div>

              {/* Progress Bar */}
              <div className={`w-full h-1 rounded-full overflow-hidden ${isLight ? 'bg-[#E5D9C5]' : 'bg-[#1E1A1B]'}`}>
                <div
                  className={`h-full transition-all duration-300 ${isLight ? 'bg-[#591D2D]' : 'bg-gradient-to-r from-[#C2A064] to-[#DFC48E]'}`}
                  style={{ width: `${((currentStepIndex + 1) / QUIZ_STEPS.length) * 100}%` }}
                />
              </div>

              <h2 className={`font-serif text-2xl sm:text-3xl font-normal leading-tight pt-2 ${
                isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'
              }`}>
                {currentStep.title}
              </h2>
              <p className={`text-xs sm:text-sm font-sans ${isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'}`}>
                {currentStep.subtitle}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentStep.options.map((opt) => {
                const isSelected = answers[currentStep.field] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectOption(opt.value)}
                    className={`w-full p-4 rounded-lg border text-left transition-all flex items-center justify-between group ${
                      isSelected
                        ? isLight
                          ? 'border-[#9A742A] bg-[#FAF7F2] shadow-sm ring-1 ring-[#9A742A]'
                          : 'border-[#C2A064] bg-[#421C27]/50 shadow-[0_0_15px_rgba(194,160,100,0.2)]'
                        : isLight
                          ? 'bg-[#FAF7F2] border-[#E5D9C5] hover:border-[#9A742A]/60'
                          : 'bg-[#1E1A1B] border-[#C2A064]/20 hover:border-[#C2A064]/60'
                    }`}
                  >
                    <div>
                      <h4 className={`font-sans font-medium text-sm sm:text-base transition-colors ${
                        isLight 
                          ? 'text-[#1A1616] group-hover:text-[#9A742A]' 
                          : 'text-[#F3EDE3] group-hover:text-[#DFC48E]'
                      }`}>
                        {opt.label}
                      </h4>
                      <p className={`text-xs font-sans mt-0.5 ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                        {opt.description}
                      </p>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? isLight
                            ? 'border-[#9A742A] bg-[#591D2D] text-[#FAF7F2]'
                            : 'border-[#C2A064] bg-[#C2A064] text-[#171515]'
                          : 'border-[#C2A064]/40 group-hover:border-[#C2A064]'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Back / Skip buttons */}
            <div className={`flex items-center justify-between pt-4 border-t ${
              isLight ? 'border-[#E5D9C5]' : 'border-[#C2A064]/15'
            }`}>
              {currentStepIndex > 0 ? (
                <button
                  onClick={() => setCurrentStepIndex((prev) => prev - 1)}
                  className={`text-xs font-sans tracking-widest uppercase transition-colors ${
                    isLight ? 'text-[#73696B] hover:text-[#1A1616]' : 'text-[#A89F93] hover:text-[#F3EDE3]'
                  }`}
                >
                  ← Previous Step
                </button>
              ) : (
                <div />
              )}

              <button
                onClick={() => {
                  if (currentStepIndex < QUIZ_STEPS.length - 1) {
                    setCurrentStepIndex((prev) => prev + 1);
                  } else {
                    setIsCompleted(true);
                  }
                }}
                className={`flex items-center gap-1.5 text-xs font-sans tracking-widest uppercase hover:underline ${
                  isLight ? 'text-[#591D2D] font-medium' : 'text-[#DFC48E]'
                }`}
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <span className={`text-[11px] font-sans tracking-[0.25em] uppercase font-semibold block ${
                isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'
              }`}>
                Your Bespoke Olfactory Prescription
              </span>
              <h2 className={`font-serif text-3xl sm:text-4xl font-normal ${
                isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'
              }`}>
                {topMatch.name}
              </h2>
              <p className={`text-sm max-w-lg mx-auto font-sans ${isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'}`}>
                Based on your preference for {answers.family.toLowerCase()} scents and {answers.intensity.toLowerCase()} sillage, our master perfumers have selected your defining fragrance.
              </p>
            </div>

            {/* Crown Jewel Card */}
            <div className={`border rounded-xl p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center shadow-lg ${
              isLight
                ? 'bg-[#FAF7F2] border-[#9A742A]'
                : 'bg-[#1E1A1B] border-[#C2A064]'
            }`}>
              <div className={`sm:col-span-5 aspect-square rounded-lg overflow-hidden border ${
                isLight ? 'border-[#E5D9C5] bg-[#FFFFFF]' : 'border-[#C2A064]/30 bg-[#171515]'
              }`}>
                <img
                  src={topMatch.image}
                  alt={topMatch.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="sm:col-span-7 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-sans uppercase tracking-widest border ${
                    isLight 
                      ? 'bg-[#591D2D] text-[#FAF7F2] border-[#591D2D]' 
                      : 'bg-[#421C27] text-[#DFC48E] border-[#C2A064]/40'
                  }`}>
                    {scoredProducts[0]?.matchPercentage}% Perfect Match
                  </span>
                  <span className={`font-serif text-2xl font-medium ${
                    isLight ? 'text-[#9A742A]' : 'text-[#DFC48E]'
                  }`}>
                    ₹{topMatch.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <div>
                  <h3 className={`font-serif text-xl font-normal ${isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'}`}>
                    {topMatch.name}
                  </h3>
                  <p className={`text-xs font-sans line-clamp-2 mt-1 ${isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'}`}>
                    {topMatch.description}
                  </p>
                </div>

                {/* Notes Summary */}
                <div className={`space-y-1 text-xs font-sans pt-1 ${isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'}`}>
                  <div>
                    <span className={`font-medium ${isLight ? 'text-[#9A742A]' : 'text-[#DFC48E]'}`}>Top: </span>
                    {topMatch.notes.top.join(' • ')}
                  </div>
                  <div>
                    <span className={`font-medium ${isLight ? 'text-[#9A742A]' : 'text-[#DFC48E]'}`}>Heart: </span>
                    {topMatch.notes.heart.join(' • ')}
                  </div>
                  <div>
                    <span className={`font-medium ${isLight ? 'text-[#9A742A]' : 'text-[#DFC48E]'}`}>Base: </span>
                    {topMatch.notes.base.join(' • ')}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-3">
                  <button
                    onClick={() => {
                      onAddToCart(topMatch, topMatch.defaultSize);
                      onClose();
                    }}
                    className={`flex-1 py-3 px-4 rounded font-sans font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-md ${
                      isLight
                        ? 'bg-gradient-to-r from-[#1A1616] via-[#351B22] to-[#1A1616] text-[#FAF7F2] hover:shadow-lg'
                        : 'bg-gradient-to-r from-[#C2A064] via-[#DFC48E] to-[#C2A064] text-[#171515] hover:brightness-110'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Signature Flacon</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectProduct(topMatch);
                      onClose();
                    }}
                    className={`py-3 px-4 rounded border font-sans text-xs tracking-widest uppercase transition-colors ${
                      isLight
                        ? 'border-[#9A742A]/50 bg-[#FFFFFF] text-[#1A1616] hover:bg-[#FAF7F2]'
                        : 'border-[#C2A064]/50 bg-[#171515] text-[#DFC48E] hover:bg-[#421C27]'
                    }`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>

            {/* Other Close Matches */}
            <div className="space-y-2 pt-2">
              <h4 className={`text-xs font-sans uppercase tracking-[0.2em] font-semibold ${
                isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'
              }`}>
                Alternative Recommendations:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {secondaryMatches.map((sec) => (
                  <div
                    key={sec.id}
                    onClick={() => {
                      onSelectProduct(sec);
                      onClose();
                    }}
                    className={`p-3 rounded-lg border cursor-pointer flex items-center gap-3 transition-colors ${
                      isLight
                        ? 'bg-[#FAF7F2] border-[#E5D9C5] hover:border-[#9A742A]'
                        : 'bg-[#1E1A1B] border-[#C2A064]/20 hover:border-[#C2A064]'
                    }`}
                  >
                    <img
                      src={sec.image}
                      alt={sec.name}
                      className={`w-12 h-12 rounded object-cover border ${
                        isLight ? 'border-[#E5D9C5]' : 'border-[#C2A064]/20'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    <div className="overflow-hidden">
                      <p className={`font-serif text-sm truncate ${isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'}`}>
                        {sec.name}
                      </p>
                      <p className={`text-[11px] font-sans font-medium ${isLight ? 'text-[#9A742A]' : 'text-[#DFC48E]'}`}>
                        ₹{sec.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Retake Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={handleRestart}
                className={`inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest transition-colors ${
                  isLight ? 'text-[#73696B] hover:text-[#9A742A]' : 'text-[#A89F93] hover:text-[#DFC48E]'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Fragrance Consultation</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
