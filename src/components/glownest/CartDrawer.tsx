import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  Truck,
  ArrowRight,
  Tag,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { CartItem } from '../../types/skincare';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onCheckout: () => void;
  onShopNow: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onShopNow,
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>({
    code: 'GLOW20',
    percent: 20,
  });
  const [promoError, setPromoError] = useState('');
  const [freeSample, setFreeSample] = useState('Watermelon Dewdrop Sachet');

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 499;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const discountAmount = appliedPromo
    ? Math.round(subtotal * (appliedPromo.percent / 100))
    : 0;

  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 60;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = () => {
    setPromoError('');
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'GLOW20') {
      setAppliedPromo({ code: 'GLOW20', percent: 20 });
    } else if (clean === 'STUDENT15') {
      setAppliedPromo({ code: 'STUDENT15', percent: 15 });
    } else if (clean === 'FREESHIP') {
      setAppliedPromo({ code: 'FREESHIP', percent: 10 });
    } else {
      setPromoError('Invalid code. Try "GLOW20" or "STUDENT15"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-fadeIn">
      {/* Drawer Container */}
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#F0E6E1] flex items-center justify-between bg-[#FFF0F3]/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#FF6584]" />
            <h2 className="font-extrabold text-base sm:text-lg text-[#1E1B1D]">
              Your Glow Bag ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white text-[#7A6E75] hover:text-[#1E1B1D] transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="bg-[#FAF7F5] px-4 py-3 border-b border-[#F0E6E1]">
          <div className="flex items-center justify-between text-xs mb-1.5 font-semibold">
            <span className="flex items-center gap-1.5 text-[#3D3338]">
              <Truck className="w-3.5 h-3.5 text-[#22C55E]" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-[#22C55E] font-bold">🎉 Yay! You unlocked FREE Shipping!</span>
              ) : (
                <span>
                  Add <strong className="text-[#FF6584]">₹{remainingForFreeShipping}</strong> more for{' '}
                  <strong>FREE Delivery</strong>
                </span>
              )}
            </span>
            <span className="text-[11px] text-[#7A6E75]">{Math.round(progressToFreeShipping)}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#EAE2DC] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#FF6584] to-[#22C55E] transition-all duration-500"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Drawer Items Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FFE5EC] flex items-center justify-center text-[#FF6584]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-extrabold text-lg text-[#1E1B1D]">Your Glow Bag is Empty</h3>
              <p className="text-xs text-[#7A6E75] max-w-xs">
                Your skin is waiting for a little love! Explore our juicy sunscreens and hydrating serums.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onShopNow();
                }}
                className="px-6 py-2.5 rounded-xl bg-[#1E1B1D] text-white text-xs font-bold hover:bg-[#3D3338] transition-colors cursor-pointer"
              >
                Shop Bestsellers
              </button>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item.cartId}
                  className="flex gap-3 p-3 rounded-2xl bg-[#FAF7F5] border border-[#EFE5E0] hover:border-[#FFD1DC] transition-all"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 rounded-xl object-cover bg-white shrink-0 shadow-xs"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-xs sm:text-sm text-[#1E1B1D] line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.cartId)}
                          className="text-[#9C929A] hover:text-[#E11D48] p-1 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#7A6E75]">Size: {item.size}</p>
                    </div>

                    {/* Quantity & Unit Price */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#E0D5CE] rounded-lg bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#52474E] hover:text-[#1E1B1D] cursor-pointer"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#1E1B1D]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#52474E] hover:text-[#1E1B1D] cursor-pointer"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-bold text-xs sm:text-sm text-[#1E1B1D]">
                          ₹{item.price * item.quantity}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-[10px] text-[#9C929A] line-through ml-1">
                            ₹{item.originalPrice * item.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Free Sample Selector */}
              <div className="p-3 rounded-2xl bg-[#FFF0F3] border border-[#FFD1DC] text-xs">
                <div className="flex items-center gap-1.5 font-bold text-[#E11D48] mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Choose Your Free Complimentary Sample:</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    'Watermelon Dewdrop Sachet',
                    'Cica Soothing Gel Sample',
                    'Vitamin C Radiance Drops',
                    '5-Ceramide Barrier Pad',
                  ].map((sample) => (
                    <button
                      key={sample}
                      onClick={() => setFreeSample(sample)}
                      className={`p-1.5 rounded-xl text-[10px] font-semibold text-left transition-all cursor-pointer flex items-center gap-1 ${
                        freeSample === sample
                          ? 'bg-[#E11D48] text-white'
                          : 'bg-white text-[#52474E] hover:bg-white/80'
                      }`}
                    >
                      {freeSample === sample && <Check className="w-3 h-3 shrink-0" />}
                      <span className="truncate">{sample}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="pt-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#9C929A]" />
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. GLOW20)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-[#FAF7F5] border border-[#EFE5E0] rounded-xl pl-8 pr-3 py-2 text-xs font-semibold text-[#1E1B1D] placeholder:text-[#9C929A] focus:outline-none focus:ring-1 focus:ring-[#FF6584]"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-[#1E1B1D] text-white rounded-xl text-xs font-bold hover:bg-[#3D3338] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-[11px] text-[#E11D48] mt-1">{promoError}</p>}
                {appliedPromo && (
                  <div className="flex items-center justify-between text-[11px] text-[#22C55E] font-bold mt-1 bg-[#F0FDF4] px-2 py-1 rounded-lg">
                    <span>Code {appliedPromo.code} applied ({appliedPromo.percent}% OFF)!</span>
                    <button
                      onClick={() => setAppliedPromo(null)}
                      className="text-[#9C929A] hover:text-[#E11D48]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer with Checkout Summary */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#F0E6E1] bg-white space-y-3">
            {/* Breakdown */}
            <div className="space-y-1.5 text-xs text-[#52474E]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#1E1B1D]">₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#E11D48]">
                  <span>Discount ({appliedPromo?.code})</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-[#22C55E] font-bold">FREE</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-black text-[#1E1B1D] pt-1.5 border-t border-[#F0E6E1]">
                <span>Total Amount</span>
                <span className="text-[#E11D48]">₹{finalTotal}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#FF6584] to-[#F43F5E] hover:from-[#F43F5E] hover:to-[#E11D48] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust Footer */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-[#8C828A] pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#22C55E]" /> 100% Safe Checkout
              </span>
              <span>•</span>
              <span>Cash on Delivery Available</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
