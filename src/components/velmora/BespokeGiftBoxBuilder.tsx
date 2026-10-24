import React, { useState } from 'react';
import { Gift, Trash2, Check } from 'lucide-react';
import { PerfumeProduct, CartItem } from '../../types/perfume';
import { PERFUME_CATALOG, GIFT_BOX_OPTIONS } from '../../data/perfumeCatalog';
import { useTheme } from '../../context/ThemeContext';

interface BespokeGiftBoxBuilderProps {
  onAddGiftBoxToBag: (item: CartItem) => void;
  onClose?: () => void;
}

export const BespokeGiftBoxBuilder: React.FC<BespokeGiftBoxBuilderProps> = ({
  onAddGiftBoxToBag,
  onClose,
}) => {
  const { isLight } = useTheme();

  // Available single flacon fragrances for the coffret
  const eligiblePerfumes = PERFUME_CATALOG.filter(
    (p) => p.family !== 'Luxury Gift Sets' && p.family !== 'Travel-Size'
  );

  const [selectedBoxStyle, setSelectedBoxStyle] = useState(GIFT_BOX_OPTIONS[0]);
  const [selectedSlots, setSelectedSlots] = useState<
    Array<{ perfume: PerfumeProduct; size: '30ml' | '50ml' }>
  >([
    { perfume: eligiblePerfumes[0], size: '30ml' },
    { perfume: eligiblePerfumes[2], size: '30ml' },
  ]);
  const [recipientName, setRecipientName] = useState('');
  const [giftMessage, setGiftMessage] = useState(
    'With admiration and highest regards. May this signature scent accompany your finest moments.'
  );
  const [waxSealColor, setWaxSealColor] = useState<'Royal Gold' | 'Obsidian Black' | 'Crimson Burgundy'>(
    'Royal Gold'
  );
  const [isSuccess, setIsSuccess] = useState(false);

  // Maximum 3 fragrances in a coffret
  const maxSlots = 3;

  const handleAddSlot = (perfume: PerfumeProduct) => {
    if (selectedSlots.length < maxSlots) {
      setSelectedSlots([...selectedSlots, { perfume, size: '30ml' }]);
    }
  };

  const handleRemoveSlot = (index: number) => {
    if (selectedSlots.length > 1) {
      setSelectedSlots(selectedSlots.filter((_, i) => i !== index));
    }
  };

  const handleSizeChange = (index: number, newSize: '30ml' | '50ml') => {
    const updated = [...selectedSlots];
    updated[index].size = newSize;
    setSelectedSlots(updated);
  };

  // Live pricing calculation
  const perfumeSubtotal = selectedSlots.reduce((acc, slot) => {
    const price = slot.perfume.sizePrices[slot.size] || slot.perfume.price;
    return acc + price;
  }, 0);

  const baseTotal = perfumeSubtotal + selectedBoxStyle.boxPrice;
  // 15% Bespoke Coffret privilege discount when 2 or more flacons are combined
  const discountRate = selectedSlots.length >= 2 ? 0.15 : 0;
  const privilegeDiscount = Math.round(baseTotal * discountRate);
  const finalPrice = baseTotal - privilegeDiscount;

  const handleAddToBag = () => {
    const giftBoxCartItem: CartItem = {
      id: `bespoke-coffret-${Date.now()}`,
      productId: 'bespoke-gift-coffret',
      name: `Bespoke Coffret (${selectedBoxStyle.name})`,
      size: `${selectedSlots.length} Flacons Set`,
      price: finalPrice,
      image: '/src/assets/images/luxury_gift_coffret_1791959203436.jpg',
      quantity: 1,
      family: 'Luxury Gift Sets',
      isGiftBox: true,
      giftBoxDetails: {
        packagingName: selectedBoxStyle.name,
        perfumes: selectedSlots.map((s) => ({
          name: s.perfume.name,
          size: s.size,
        })),
        cardMessage: giftMessage,
        recipientName: recipientName || 'Esteemed Patron',
      },
    };

    onAddGiftBoxToBag(giftBoxCartItem);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      if (onClose) onClose();
    }, 1500);
  };

  return (
    <section
      id="bespoke-gift-box"
      className={`scroll-mt-24 py-20 sm:py-28 transition-colors duration-300 border-b ${
        isLight 
          ? 'bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#FAF7F2] border-[#9A742A]/20' 
          : 'bg-gradient-to-b from-[#171515] via-[#1A1416] to-[#171515] border-[#C2A064]/25'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full border text-xs uppercase tracking-[0.25em] font-sans ${
            isLight
              ? 'border-[#9A742A]/40 bg-[#FFFFFF] text-[#591D2D] shadow-sm'
              : 'border-[#C2A064]/40 bg-[#421C27]/40 text-[#DFC48E]'
          }`}>
            <Gift className={`w-3.5 h-3.5 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
            <span>Maison Velmora Atelier</span>
          </div>

          <h2 className={`font-serif text-3xl sm:text-5xl font-normal leading-tight transition-colors ${
            isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'
          }`}>
            Create a Bespoke Gift Box
          </h2>

          <p className={`text-sm sm:text-base font-sans transition-colors ${
            isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'
          }`}>
            Curate an opulent presentation coffret for someone truly extraordinary. Choose your velvet box style, select 2 or 3 signature Extraits, and compose a wax-sealed calligraphy card.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Visual Showcase & Coffret Preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`relative aspect-[4/3] rounded-xl overflow-hidden border shadow-xl ${
              isLight ? 'border-[#E5D9C5] bg-[#F5EFE6]' : 'border-[#C2A064]/40 bg-[#171515]'
            }`}>
              <img
                src="/src/assets/images/luxury_gift_coffret_1791959203436.jpg"
                alt="VELMORA Bespoke Gift Coffret"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              <div className={`absolute top-4 left-4 z-20 px-3 py-1 rounded border backdrop-blur-md ${
                isLight 
                  ? 'bg-[#FFFFFF]/90 border-[#9A742A]/40 text-[#591D2D] font-medium' 
                  : 'bg-[#171515]/90 border-[#C2A064]/50 text-[#DFC48E]'
              }`}>
                <span className="text-[10px] tracking-widest uppercase font-sans">
                  15% Bundle Privilege Active
                </span>
              </div>

              <div className={`absolute inset-0 pointer-events-none opacity-40 ${
                isLight ? 'bg-gradient-to-t from-white/40 via-transparent to-transparent' : 'bg-gradient-to-t from-[#171515] via-transparent to-transparent'
              }`} />
            </div>

            {/* Selected Coffret Summary List */}
            <div className={`p-5 rounded-lg border space-y-4 transition-colors ${
              isLight 
                ? 'bg-[#FFFFFF] border-[#E5D9C5] shadow-sm' 
                : 'bg-[#1E1A1B] border-[#C2A064]/20'
            }`}>
              <h4 className={`font-serif text-lg border-b pb-2 ${
                isLight ? 'text-[#1A1616] border-[#E5D9C5]' : 'text-[#F3EDE3] border-[#C2A064]/15'
              }`}>
                Coffret Configuration
              </h4>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className={isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}>Presentation Box:</span>
                  <span className={`font-medium ${isLight ? 'text-[#9A742A]' : 'text-[#DFC48E]'}`}>
                    {selectedBoxStyle.name}
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  <span className={`text-xs font-sans block ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                    Curated Flacons ({selectedSlots.length} of {maxSlots}):
                  </span>
                  {selectedSlots.map((slot, index) => {
                    const price = slot.perfume.sizePrices[slot.size] || slot.perfume.price;
                    return (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-2.5 rounded border text-xs font-sans ${
                          isLight 
                            ? 'bg-[#FAF7F2] border-[#E5D9C5]' 
                            : 'bg-[#171515] border-[#C2A064]/15'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isLight ? 'bg-[#591D2D] text-[#FAF7F2]' : 'bg-[#421C27] text-[#DFC48E]'
                          }`}>
                            {index + 1}
                          </span>
                          <span className={isLight ? 'text-[#1A1616] font-medium' : 'text-[#F3EDE3]'}>
                            {slot.perfume.name}
                          </span>
                          <span className={isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}>
                            ({slot.size})
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`font-serif font-medium ${isLight ? 'text-[#9A742A]' : 'text-[#DFC48E]'}`}>
                            ₹{price.toLocaleString('en-IN')}
                          </span>
                          {selectedSlots.length > 1 && (
                            <button
                              onClick={() => handleRemoveSlot(index)}
                              className={`p-1 hover:text-rose-600 transition-colors ${isLight ? 'text-[#968D8E]' : 'text-[#A89F93]'}`}
                              title="Remove fragrance"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Live Price Calculation Box */}
              <div className={`pt-3 border-t space-y-2 text-xs font-sans ${
                isLight ? 'border-[#E5D9C5]' : 'border-[#C2A064]/20'
              }`}>
                <div className={`flex justify-between ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                  <span>Items & Box Subtotal:</span>
                  <span>₹{baseTotal.toLocaleString('en-IN')}</span>
                </div>
                {privilegeDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Atelier 15% Bundle Savings:</span>
                    <span>-₹{privilegeDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className={`flex justify-between items-baseline pt-2 border-t ${
                  isLight ? 'border-[#E5D9C5]' : 'border-[#C2A064]/15'
                }`}>
                  <span className={`text-sm font-medium ${isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'}`}>
                    Total Gift Investment:
                  </span>
                  <span className={`font-serif text-2xl font-normal ${
                    isLight ? 'text-[#9A742A] font-medium' : 'text-[#DFC48E]'
                  }`}>
                    ₹{finalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddToBag}
                disabled={isSuccess}
                className={`w-full py-4 rounded font-sans font-semibold text-xs tracking-[0.2em] uppercase shadow-lg transition-all flex items-center justify-center gap-2 ${
                  isLight
                    ? 'bg-gradient-to-r from-[#1A1616] via-[#351B22] to-[#1A1616] text-[#FAF7F2] hover:shadow-xl'
                    : 'bg-gradient-to-r from-[#C2A064] via-[#DFC48E] to-[#C2A064] text-[#171515] hover:brightness-110'
                }`}
              >
                {isSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Shopping Bag!</span>
                  </>
                ) : (
                  <>
                    <Gift className={`w-4 h-4 ${isLight ? 'text-[#DFC48E]' : 'text-[#171515]'}`} />
                    <span>Add Bespoke Coffret to Bag</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Packaging Style */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full font-sans text-xs font-bold flex items-center justify-center ${
                  isLight ? 'bg-[#591D2D] text-[#FAF7F2]' : 'bg-[#C2A064] text-[#171515]'
                }`}>
                  1
                </span>
                <h3 className={`font-serif text-xl ${isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'}`}>
                  Select Presentation Coffret Box
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {GIFT_BOX_OPTIONS.map((box) => {
                  const isSelected = selectedBoxStyle.id === box.id;
                  return (
                    <button
                      key={box.id}
                      onClick={() => setSelectedBoxStyle(box)}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        isSelected
                          ? isLight
                            ? 'border-[#9A742A] bg-[#FFFFFF] shadow-md ring-1 ring-[#9A742A]'
                            : 'border-[#C2A064] bg-[#421C27]/60 shadow-[0_0_15px_rgba(194,160,100,0.2)]'
                          : isLight
                            ? 'border-[#E5D9C5] bg-[#FFFFFF] hover:border-[#9A742A]/50'
                            : 'border-[#C2A064]/20 bg-[#1E1A1B] hover:border-[#C2A064]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="w-4 h-4 rounded-full border border-black/20"
                          style={{ backgroundColor: box.colorHex }}
                        />
                        <span className={`text-xs font-serif ${isLight ? 'text-[#9A742A]' : 'text-[#DFC48E]'}`}>
                          +₹{box.boxPrice}
                        </span>
                      </div>
                      <h4 className={`font-sans font-medium text-xs ${isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'}`}>
                        {box.name}
                      </h4>
                      <p className={`text-[11px] font-sans mt-1 line-clamp-2 ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                        {box.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Choose Fragrances & Sizes */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full font-sans text-xs font-bold flex items-center justify-center ${
                    isLight ? 'bg-[#591D2D] text-[#FAF7F2]' : 'bg-[#C2A064] text-[#171515]'
                  }`}>
                    2
                  </span>
                  <h3 className={`font-serif text-xl ${isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'}`}>
                    Choose 2 to 3 Signature Flacons
                  </h3>
                </div>
                <span className={`text-xs font-sans ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                  {selectedSlots.length} of {maxSlots} Selected
                </span>
              </div>

              {/* Selected Slots Manager */}
              <div className="space-y-3">
                {selectedSlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isLight 
                        ? 'bg-[#FFFFFF] border-[#E5D9C5] shadow-xs' 
                        : 'bg-[#1E1A1B] border-[#C2A064]/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={slot.perfume.image}
                        alt={slot.perfume.name}
                        className={`w-12 h-12 rounded object-cover border ${
                          isLight ? 'border-[#E5D9C5]' : 'border-[#C2A064]/30'
                        }`}
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className={`font-serif text-base ${isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'}`}>
                          {slot.perfume.name}
                        </h4>
                        <p className={`text-xs font-sans ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`}>
                          {slot.perfume.concentration}
                        </p>
                      </div>
                    </div>

                    {/* Bottle Size Selector for this slot */}
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleSizeChange(index, '30ml')}
                          className={`text-xs px-2.5 py-1 rounded font-sans transition-all ${
                            slot.size === '30ml'
                              ? isLight
                                ? 'bg-[#1A1616] text-[#FAF7F2] font-semibold'
                                : 'bg-[#C2A064] text-[#171515] font-semibold'
                              : isLight
                                ? 'bg-[#FAF7F2] text-[#73696B] border border-[#E5D9C5]'
                                : 'bg-[#171515] text-[#A89F93] border border-[#C2A064]/20'
                          }`}
                        >
                          30ml (₹{slot.perfume.sizePrices['30ml']?.toLocaleString('en-IN')})
                        </button>
                        <button
                          onClick={() => handleSizeChange(index, '50ml')}
                          className={`text-xs px-2.5 py-1 rounded font-sans transition-all ${
                            slot.size === '50ml'
                              ? isLight
                                ? 'bg-[#1A1616] text-[#FAF7F2] font-semibold'
                                : 'bg-[#C2A064] text-[#171515] font-semibold'
                              : isLight
                                ? 'bg-[#FAF7F2] text-[#73696B] border border-[#E5D9C5]'
                                : 'bg-[#171515] text-[#A89F93] border border-[#C2A064]/20'
                          }`}
                        >
                          50ml (₹{slot.perfume.sizePrices['50ml']?.toLocaleString('en-IN')})
                        </button>
                      </div>

                      {selectedSlots.length > 1 && (
                        <button
                          onClick={() => handleRemoveSlot(index)}
                          className={`p-1.5 hover:text-rose-600 transition-colors ${
                            isLight ? 'text-[#968D8E]' : 'text-[#A89F93]'
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* Add third fragrance if < 3 */}
                {selectedSlots.length < maxSlots && (
                  <div className="pt-2">
                    <span className={`text-xs font-sans block mb-2 ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                      Add a 3rd Flacon to complete the Trinity Coffret:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {eligiblePerfumes
                        .filter((p) => !selectedSlots.some((s) => s.perfume.id === p.id))
                        .slice(0, 4)
                        .map((p) => (
                          <button
                            key={p.id}
                            onClick={() => handleAddSlot(p)}
                            className={`p-2.5 rounded border text-left transition-all group ${
                              isLight
                                ? 'bg-[#FFFFFF] border-[#E5D9C5] hover:border-[#9A742A]'
                                : 'bg-[#171515] border-[#C2A064]/20 hover:border-[#C2A064]'
                            }`}
                          >
                            <p className={`font-serif text-xs truncate transition-colors ${
                              isLight ? 'text-[#1A1616] group-hover:text-[#9A742A]' : 'text-[#F3EDE3] group-hover:text-[#DFC48E]'
                            }`}>
                              {p.name}
                            </p>
                            <p className={`text-[10px] font-sans ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                              + Add Flacon
                            </p>
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: Personalized Wax Seal & Calligraphy Message */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full font-sans text-xs font-bold flex items-center justify-center ${
                  isLight ? 'bg-[#591D2D] text-[#FAF7F2]' : 'bg-[#C2A064] text-[#171515]'
                }`}>
                  3
                </span>
                <h3 className={`font-serif text-xl ${isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'}`}>
                  Wax-Sealed Calligraphy Card & Inscription
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`text-xs font-sans block mb-1.5 ${isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'}`}>
                    Recipient Name (Hand-Penned on Envelope):
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Maharani Gayatri / Lord Sterling"
                    className={`w-full px-3.5 py-2.5 rounded border text-sm focus:outline-none transition-colors ${
                      isLight
                        ? 'bg-[#FFFFFF] border-[#E5D9C5] text-[#1A1616] focus:border-[#9A742A]'
                        : 'bg-[#171515] border-[#C2A064]/30 text-[#F3EDE3] focus:border-[#C2A064]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`text-xs font-sans block mb-1.5 ${isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'}`}>
                    Wax Seal Stamp Color:
                  </label>
                  <div className="flex items-center gap-2">
                    {(['Royal Gold', 'Obsidian Black', 'Crimson Burgundy'] as const).map((color) => (
                      <button
                        key={color}
                        onClick={() => setWaxSealColor(color)}
                        className={`text-xs px-3 py-2 rounded font-sans transition-all flex-1 ${
                          waxSealColor === color
                            ? isLight
                              ? 'bg-[#591D2D] text-[#FAF7F2] font-medium'
                              : 'bg-[#421C27] text-[#DFC48E] border border-[#C2A064]'
                            : isLight
                              ? 'bg-[#FFFFFF] text-[#73696B] border border-[#E5D9C5]'
                              : 'bg-[#171515] text-[#A89F93] border border-[#C2A064]/20'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className={`text-xs font-sans block mb-1.5 ${isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'}`}>
                  Personalized Gift Inscription (Printed on 300gsm Cotton Paper):
                </label>
                <textarea
                  rows={3}
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded border text-xs sm:text-sm focus:outline-none transition-colors ${
                    isLight
                      ? 'bg-[#FFFFFF] border-[#E5D9C5] text-[#1A1616] focus:border-[#9A742A]'
                      : 'bg-[#171515] border-[#C2A064]/30 text-[#F3EDE3] focus:border-[#C2A064]'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
