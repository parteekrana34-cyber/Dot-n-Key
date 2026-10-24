import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Truck,
  ArrowRight,
  Tag,
  Check,
  Sun,
} from 'lucide-react';
import { CartItem } from '../../types/sunscreen';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onCheckout: () => void;
  onShopSunscreens: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onShopSunscreens,
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number>(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const FREE_SHIPPING_THRESHOLD = 499;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * appliedDiscountPercent) / 100);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0;
  const shippingFee = isFreeShipping ? 0 : 50;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    const code = couponCode.trim().toUpperCase();

    if (code === 'SUNNY15' || code === 'GLOW15') {
      setAppliedDiscountPercent(15);
      setCouponSuccess('15% OFF Sunscreen discount applied!');
    } else if (code === 'SUMMER20' && subtotal > 800) {
      setAppliedDiscountPercent(20);
      setCouponSuccess('20% Summer Bundle discount applied!');
    } else {
      setCouponError('Invalid coupon code. Try SUNNY15 for 15% off!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#FCEEF2] h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#F5D5DE]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#F9DDE5] via-[#FCEEF2] to-[#F9DDE5] border-b border-[#F5D5DE] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FF8C9A] text-white flex items-center justify-center shadow-xs">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-black text-base text-[#633D4B] font-display">Your Sunscreen Bag</h2>
              <p className="text-[11px] text-[#8E6B78]">
                {items.length} {items.length === 1 ? 'item' : 'items'} ready for glow
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#F9DDE5] text-[#8E6B78] hover:text-[#633D4B] flex items-center justify-center cursor-pointer shadow-xs border border-[#F5D5DE] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Tracker */}
        <div className="bg-white border-b border-[#F5D5DE] px-4 py-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#633D4B] mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#FF8C9A]" />
              {isFreeShipping ? (
                <span className="text-[#15803D]">You unlocked Free Express Shipping! 🎉</span>
              ) : (
                <span>
                  Add <strong className="text-[#FF8C9A]">₹{amountNeededForFreeShipping}</strong> more for Free Shipping
                </span>
              )}
            </span>
            <span className="text-[11px] text-[#8E6B78]">{progressPercent}%</span>
          </div>
          <div className="w-full bg-[#FCEEF2] h-2 rounded-full overflow-hidden border border-[#F5D5DE]">
            <div
              className="bg-gradient-to-r from-[#FF8C9A] to-[#FF7586] h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-white text-[#FF8C9A] flex items-center justify-center mx-auto border border-[#F5D5DE] shadow-xs">
                <Sun className="w-8 h-8 animate-spin-slow" />
              </div>
              <div>
                <h3 className="font-black text-base text-[#633D4B] font-display">Your Bag is Empty</h3>
                <p className="text-xs text-[#8E6B78] max-w-xs mx-auto mt-1">
                  Don't leave your skin unprotected today! Find your perfect daily SPF match.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onShopSunscreens();
                }}
                className="px-6 py-3 rounded-2xl bg-[#FF8C9A] hover:bg-[#FF7586] text-white text-xs font-black shadow-md cursor-pointer hover:shadow-lg transition-all"
              >
                Shop Sunscreens Now
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.cartId}
                className="flex gap-3 p-3 rounded-2xl bg-white border border-[#F5D5DE] shadow-xs relative group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover bg-[#FCEEF2] border border-[#F5D5DE] shrink-0"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="pr-6">
                    <span className="text-[9px] font-black uppercase text-[#633D4B] bg-[#FCEEF2] px-2 py-0.5 rounded-full border border-[#F5D5DE]">
                      {item.spf}
                    </span>
                    <h4 className="font-extrabold text-xs text-[#633D4B] truncate mt-1">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#8E6B78]">{item.size}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-black text-sm text-[#633D4B]">
                        ₹{item.price * item.quantity}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-[10px] text-[#8E6B78] line-through">
                          ₹{item.originalPrice * item.quantity}
                        </span>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#F5D5DE] bg-[#FCEEF2] rounded-lg overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs font-bold text-[#633D4B] hover:bg-[#F9DDE5] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-[#633D4B]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs font-bold text-[#633D4B] hover:bg-[#F9DDE5] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => onRemoveItem(item.cartId)}
                  className="absolute top-2.5 right-2.5 text-[#8E6B78] hover:text-[#FF8C9A] transition-colors cursor-pointer"
                  title="Remove item"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer: Coupon, Summary, Checkout */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-[#F5D5DE] space-y-3">
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-[#8E6B78] absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Enter code (SUNNY15)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full bg-[#FCEEF2] border border-[#F5D5DE] rounded-xl pl-9 pr-3 py-2 text-xs text-[#633D4B] font-bold uppercase placeholder:normal-case placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-[#FF8C9A]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#633D4B] text-white text-xs font-black hover:bg-[#FF8C9A] transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {couponSuccess && (
              <p className="text-[11px] font-bold text-[#15803D] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>{couponSuccess}</span>
              </p>
            )}
            {couponError && (
              <p className="text-[11px] font-bold text-[#FF8C9A]">{couponError}</p>
            )}

            {/* Calculations breakdown */}
            <div className="space-y-1.5 text-xs pt-1 border-t border-[#F5D5DE]">
              <div className="flex justify-between text-[#8E6B78]">
                <span>Subtotal</span>
                <span className="font-bold text-[#633D4B]">₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#FF8C9A]">
                  <span>Discount ({appliedDiscountPercent}%)</span>
                  <span className="font-bold">-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-[#8E6B78]">
                <span>Delivery Shipping</span>
                <span className="font-bold text-[#633D4B]">
                  {shippingFee === 0 ? <strong className="text-[#15803D]">FREE</strong> : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-[#633D4B] pt-1.5 border-t border-[#F5D5DE]">
                <span>Total Amount</span>
                <span className="text-base text-[#FF8C9A]">₹{grandTotal}</span>
              </div>
            </div>

            {/* Checkout Button in Coral Pink */}
            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#FF8C9A] hover:bg-[#FF7586] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF8C9A]/30 transition-all cursor-pointer active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
