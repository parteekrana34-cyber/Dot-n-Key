import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { CartItem } from '../../types/perfume';
import { useTheme } from '../../context/ThemeContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: (appliedDiscount: number, discountCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const { isLight } = useTheme();
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * discountPercent);
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'VELMORA10' || code === 'ROYALGOLD') {
      setDiscountPercent(0.1);
      setPromoSuccess('10% Maison Velmora Privilege Discount applied!');
    } else if (code === 'VIP15') {
      setDiscountPercent(0.15);
      setPromoSuccess('15% Private Collector Discount applied!');
    } else {
      setPromoError('Invalid privilege code. Try VELMORA10 or ROYALGOLD.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className={`w-screen max-w-md border-l shadow-2xl flex flex-col transition-colors ${
          isLight
            ? 'bg-[#FFFFFF] border-[#E5D9C5] text-[#1A1616]'
            : 'bg-[#171515] border-[#C2A064]/35 text-[#F3EDE3]'
        }`}>
          {/* Header */}
          <div className={`p-6 border-b flex items-center justify-between ${
            isLight ? 'bg-[#FAF7F2] border-[#E5D9C5]' : 'bg-[#1E1A1B] border-[#C2A064]/20'
          }`}>
            <div className="flex items-center gap-2">
              <ShoppingBag className={`w-5 h-5 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
              <h2 className="font-serif text-xl tracking-wider font-normal">
                Your Fragrance Bag
              </h2>
              <span className={`text-xs px-2 py-0.5 rounded-full font-sans ${
                isLight ? 'bg-[#591D2D] text-[#FAF7F2]' : 'bg-[#421C27] text-[#DFC48E]'
              }`}>
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>

            <button
              onClick={onClose}
              className={`p-1.5 rounded-full transition-colors ${
                isLight ? 'text-[#73696B] hover:text-[#1A1616] hover:bg-[#F4EFE6]' : 'text-[#A89F93] hover:text-[#F3EDE3] hover:bg-[#421C27]'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Discovery Vials Notification */}
          <div className={`px-6 py-2.5 border-b flex items-center gap-2 text-xs font-sans ${
            isLight
              ? 'bg-[#F4EFE6] border-[#E5D9C5] text-[#591D2D]'
              : 'bg-gradient-to-r from-[#421C27]/60 via-[#1E1A1B] to-[#421C27]/60 border-[#C2A064]/20 text-[#DFC48E]'
          }`}>
            <Sparkles className={`w-4 h-4 shrink-0 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
            <span>2 Complimentary 2ml Extrait samples will be enclosed with this order.</span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className={`w-16 h-16 rounded-full border flex items-center justify-center ${
                  isLight ? 'border-[#E5D9C5] bg-[#FAF7F2]' : 'border-[#C2A064]/30 bg-[#1E1A1B]'
                }`}>
                  <ShoppingBag className={`w-8 h-8 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]/60'}`} />
                </div>
                <h3 className="font-serif text-2xl">Your bag is empty</h3>
                <p className={`text-xs max-w-xs font-sans ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                  Immerse your senses in our Haute Parfumerie collection and find a scent that defines you.
                </p>
                <button
                  onClick={onClose}
                  className={`mt-4 px-6 py-2.5 rounded font-sans font-semibold text-xs tracking-widest uppercase shadow-sm ${
                    isLight
                      ? 'bg-gradient-to-r from-[#1A1616] via-[#351B22] to-[#1A1616] text-[#FAF7F2]'
                      : 'bg-gradient-to-r from-[#C2A064] to-[#DFC48E] text-[#171515] hover:brightness-110'
                  }`}
                >
                  Explore Fragrances
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border flex gap-4 items-center justify-between transition-colors ${
                    isLight 
                      ? 'bg-[#FAF7F2] border-[#E5D9C5]' 
                      : 'bg-[#1E1A1B] border-[#C2A064]/20'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`w-16 h-16 rounded object-cover border shrink-0 ${
                      isLight ? 'border-[#E5D9C5]' : 'border-[#C2A064]/20'
                    }`}
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="font-serif text-sm sm:text-base truncate">
                      {item.name}
                    </h4>
                    <p className={`text-xs font-sans ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`}>
                      {item.size} • {item.family}
                    </p>

                    {item.isGiftBox && item.giftBoxDetails && (
                      <p className={`text-[10px] font-sans mt-0.5 line-clamp-1 ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                        For: {item.giftBoxDetails.recipientName} ({item.giftBoxDetails.perfumes.map(p => p.name).join(', ')})
                      </p>
                    )}

                    <div className="flex items-center gap-3 mt-2">
                      <div className={`flex items-center border rounded text-xs ${
                        isLight ? 'border-[#E5D9C5] bg-[#FFFFFF]' : 'border-[#C2A064]/20 bg-[#171515]'
                      }`}>
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className={`px-2 py-0.5 ${isLight ? 'text-[#73696B] hover:text-[#1A1616]' : 'text-[#A89F93] hover:text-[#F3EDE3]'}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-sans font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className={`px-2 py-0.5 ${isLight ? 'text-[#73696B] hover:text-[#1A1616]' : 'text-[#A89F93] hover:text-[#F3EDE3]'}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className={`p-1 hover:text-rose-600 ${isLight ? 'text-[#968D8E]' : 'text-[#A89F93]'}`}
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`font-serif text-base ${isLight ? 'text-[#9A742A] font-medium' : 'text-[#DFC48E]'}`}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className={`p-6 border-t space-y-4 ${
              isLight ? 'border-[#E5D9C5] bg-[#FAF7F2]' : 'border-[#C2A064]/25 bg-[#1E1A1B]'
            }`}>
              {/* Privilege Code Input */}
              <div className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className={`w-3.5 h-3.5 absolute left-3 top-3 ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`} />
                    <input
                      type="text"
                      placeholder="Privilege Code (e.g. VELMORA10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2 rounded border text-xs uppercase focus:outline-none transition-colors ${
                        isLight
                          ? 'bg-[#FFFFFF] border-[#E5D9C5] text-[#1A1616] focus:border-[#9A742A]'
                          : 'bg-[#171515] border-[#C2A064]/30 text-[#F3EDE3] focus:border-[#C2A064]'
                      }`}
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    className={`px-4 py-2 rounded border text-xs font-sans tracking-wider uppercase font-medium ${
                      isLight
                        ? 'border-[#9A742A] bg-[#591D2D] text-[#FAF7F2] hover:bg-[#6E2437]'
                        : 'border-[#C2A064]/50 bg-[#421C27] hover:bg-[#572533] text-[#DFC48E]'
                    }`}
                  >
                    Apply
                  </button>
                </div>
                {promoSuccess && (
                  <p className="text-[11px] text-emerald-600 font-sans font-medium">{promoSuccess}</p>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-500 font-sans">{promoError}</p>
                )}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-1.5 text-xs font-sans">
                <div className={`flex justify-between ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Privilege Code ({discountPercent * 100}%):</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className={`flex justify-between ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                  <span>Insured White-Glove Courier:</span>
                  <span className={isLight ? 'text-[#9A742A] font-medium' : 'text-[#DFC48E]'}>Complimentary</span>
                </div>
                <div className={`flex justify-between ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
                  <span>Signature Velvet Gift Wrap:</span>
                  <span className={isLight ? 'text-[#9A742A] font-medium' : 'text-[#DFC48E]'}>Included</span>
                </div>
                <div className={`pt-2 border-t flex justify-between items-baseline ${
                  isLight ? 'border-[#E5D9C5]' : 'border-[#C2A064]/20'
                }`}>
                  <span className="text-sm font-medium">Estimated Total:</span>
                  <span className={`font-serif text-2xl font-normal ${
                    isLight ? 'text-[#9A742A] font-medium' : 'text-[#DFC48E]'
                  }`}>
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  onProceedToCheckout(discountAmount, promoCode);
                  onClose();
                }}
                className={`w-full py-4 rounded font-sans font-semibold text-xs tracking-[0.2em] uppercase shadow-lg transition-all flex items-center justify-center gap-2 ${
                  isLight
                    ? 'bg-gradient-to-r from-[#1A1616] via-[#351B22] to-[#1A1616] text-[#FAF7F2] hover:shadow-xl'
                    : 'bg-gradient-to-r from-[#C2A064] via-[#DFC48E] to-[#C2A064] text-[#171515] hover:brightness-110'
                }`}
              >
                <span>Proceed to Luxury Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className={`text-[10px] text-center font-sans flex items-center justify-center gap-1 ${
                isLight ? 'text-[#73696B]' : 'text-[#A89F93]'
              }`}>
                <ShieldCheck className={`w-3.5 h-3.5 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
                <span>Encrypted 256-bit Secure Checkout • 100% Guaranteed Authentic</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
