import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types/jewellery';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
  onExploreCollection: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreCollection,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 25000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'PAYORA10' || code === 'WELCOME10') {
      setAppliedDiscount(10);
      setPromoSuccess('10% VIP Atelier discount applied!');
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "PAYORA10"');
      setPromoSuccess('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#DDD3C7] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#EAE3D8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#2A2421]" />
            <h2 className="font-serif text-2xl text-[#2A2421] font-medium tracking-tight">
              Shopping Bag
            </h2>
            <span className="text-xs text-[#8C7B70] tabular-nums font-semibold">
              ({items.reduce((s, i) => s + i.quantity, 0)} items)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#6E6056] hover:text-[#2A2421] hover:bg-[#F2ECE2] rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="px-6 py-3 bg-[#F4EFE6] border-b border-[#E7DFD4] text-xs">
          {subtotal >= freeShippingThreshold ? (
            <p className="text-emerald-800 font-medium flex items-center gap-1.5">
              <span>✨ You have qualified for complimentary insured delivery across India!</span>
            </p>
          ) : (
            <div>
              <p className="text-[#6B5E55]">
                Add <strong className="text-[#2A2421] tabular-nums">₹{(freeShippingThreshold - subtotal).toLocaleString('en-IN')}</strong> more for complimentary delivery
              </p>
              <div className="w-full bg-[#E5DDD0] h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-[#C5A880] h-full transition-all duration-300"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-[#C5A880] mx-auto stroke-[1.2]" />
              <p className="font-serif text-2xl text-[#2A2421]">Your Bag is Empty</p>
              <p className="text-xs text-[#7A6C63] max-w-xs mx-auto leading-relaxed">
                Discover our signature diamond and solid gold creations designed to tell your story.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreCollection();
                }}
                className="mt-4 px-6 py-3 bg-[#2A2421] text-[#FAF7F2] text-xs uppercase tracking-wider font-semibold hover:bg-[#8C6D46] transition-colors"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={`${item.product.id}-${index}`}
                className="flex gap-4 pb-6 border-b border-[#EDE6DC] last:border-0"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 bg-[#EFE8DD] shrink-0 border border-[#E0D5C7] overflow-hidden">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif text-base text-[#2A2421] font-medium leading-snug">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-[#9E9086] hover:text-red-700 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#8C7B70] mt-0.5">
                      {item.selectedMetal} {item.selectedSize ? `· Size ${item.selectedSize}` : ''}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#DDD3C7] bg-white">
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-[#2A2421] hover:bg-[#F2ECE2] transition-colors"
                        title="Decrease"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-semibold text-[#2A2421] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-[#2A2421] hover:bg-[#F2ECE2] transition-colors"
                        title="Increase"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-sm font-semibold text-[#2A2421] tabular-nums">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-6 bg-[#FAF7F2] border-t border-[#EAE3D8] space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-[#8C7B70] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Promo Code (try PAYORA10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-white border border-[#DDD3C7] text-xs text-[#2A2421] uppercase tracking-wider focus:outline-none focus:border-[#C5A880]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#2A2421] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#8C6D46] transition-colors"
              >
                Apply
              </button>
            </form>
            {promoError && <p className="text-[11px] text-red-600">{promoError}</p>}
            {promoSuccess && <p className="text-[11px] text-emerald-700 font-medium">{promoSuccess}</p>}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-[#6E6056] pt-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#2A2421] tabular-nums">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>VIP Atelier Discount ({appliedDiscount}%)</span>
                  <span className="font-semibold tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insured Courier Delivery</span>
                <span className="text-emerald-800 font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#EAE3D8] text-base font-semibold text-[#2A2421]">
                <span>Total</span>
                <span className="tabular-nums">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-4 bg-[#C5A880] text-[#1E1917] hover:bg-[#B49467] text-xs uppercase tracking-[0.22em] font-semibold transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-[#8C7B70]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>256-Bit SSL Encrypted &amp; Fully Insured Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
