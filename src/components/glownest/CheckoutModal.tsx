import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { CartItem } from '../../types/skincare';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [formData, setFormData] = useState({
    name: 'Aarav Patel',
    phone: '9876543210',
    email: 'aarav.patel@example.com',
    address: 'Flat 402, Sunshine Heights, MG Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [placedOrderId, setPlacedOrderId] = useState<string>('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * 0.2); // 20% GLOW20
  const shipping = subtotal >= 499 ? 0 : 60;
  const total = Math.max(0, subtotal - discount + shipping);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.pincode) {
      alert('Please fill out all delivery fields');
      return;
    }
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `GLOW-${Date.now().toString().slice(-6)}`;
    setPlacedOrderId(newOrderId);
    setStep('confirmed');
    onOrderSuccess(newOrderId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#FFD1DC]/40 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#FFE5EC] via-[#FFF0F3] to-[#EDE9FE] border-b border-[#F0E6E1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#22C55E]" />
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-[#1E1B1D]">
                {step === 'confirmed' ? 'Order Confirmed! 🎉' : 'GlowNest Express Checkout'}
              </h2>
              <p className="text-[11px] text-[#7A6E75]">
                {step === 'details'
                  ? 'Step 1: Shipping & Delivery Address'
                  : step === 'payment'
                  ? 'Step 2: Secure Payment Method'
                  : `Order reference: #${placedOrderId}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white text-[#7A6E75] hover:text-[#1E1B1D] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {/* STEP 1: Address Details */}
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1E1B1D] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FAF7F5] border border-[#EFE5E0] rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#1E1B1D] focus:outline-none focus:ring-1 focus:ring-[#FF6584]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1E1B1D] mb-1">
                    Mobile Number (for delivery SMS)
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF7F5] border border-[#EFE5E0] rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#1E1B1D] focus:outline-none focus:ring-1 focus:ring-[#FF6584]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E1B1D] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FAF7F5] border border-[#EFE5E0] rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#1E1B1D] focus:outline-none focus:ring-1 focus:ring-[#FF6584]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E1B1D] mb-1">
                  Street Address & House / Apartment No.
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#FAF7F5] border border-[#EFE5E0] rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#1E1B1D] focus:outline-none focus:ring-1 focus:ring-[#FF6584]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1E1B1D] mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#FAF7F5] border border-[#EFE5E0] rounded-xl px-3 py-2 text-xs font-medium text-[#1E1B1D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1E1B1D] mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-[#FAF7F5] border border-[#EFE5E0] rounded-xl px-3 py-2 text-xs font-medium text-[#1E1B1D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1E1B1D] mb-1">PIN Code</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full bg-[#FAF7F5] border border-[#EFE5E0] rounded-xl px-3 py-2 text-xs font-medium text-[#1E1B1D]"
                  />
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="mt-4 p-3.5 rounded-2xl bg-[#FAF7F5] border border-[#EFE5E0]">
                <p className="text-xs font-bold text-[#1E1B1D] mb-2">Order Items ({items.length})</p>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.cartId} className="flex justify-between items-center text-xs">
                      <span className="truncate max-w-[240px]">
                        {item.name} ({item.size}) × {item.quantity}
                      </span>
                      <span className="font-bold">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-[#E0D5CE] flex justify-between font-black text-sm text-[#1E1B1D]">
                  <span>Total Payable</span>
                  <span className="text-[#E11D48]">₹{total}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF6584] to-[#F43F5E] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Continue to Payment (₹{total})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: Payment Option */}
          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="space-y-2.5">
                {[
                  {
                    id: 'upi',
                    title: 'Instant UPI (Google Pay, PhonePe, Paytm, BHIM)',
                    desc: 'Fastest 0% transaction fee. Instant order placement.',
                    icon: QrCode,
                  },
                  {
                    id: 'card',
                    title: 'Credit / Debit Card (Visa, Mastercard, RuPay)',
                    desc: 'Encrypted 256-bit payment gateway security.',
                    icon: CreditCard,
                  },
                  {
                    id: 'cod',
                    title: 'Cash on Delivery (COD)',
                    desc: 'Pay cash or UPI at your doorstep upon delivery.',
                    icon: Banknote,
                  },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <label
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        paymentMethod === m.id
                          ? 'border-[#FF6584] bg-[#FFF0F3]'
                          : 'border-[#EFE5E0] bg-[#FAF7F5] hover:bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === m.id}
                        onChange={() => {}}
                        className="mt-1 text-[#FF6584] focus:ring-[#FF6584]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#1E1B1D]">
                          <Icon className="w-4 h-4 text-[#FF6584]" />
                          <span>{m.title}</span>
                        </div>
                        <p className="text-[11px] text-[#7A6E75] mt-0.5">{m.desc}</p>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Delivery Address summary */}
              <div className="p-3 bg-[#FAF7F5] rounded-xl border border-[#EFE5E0] text-xs text-[#52474E]">
                <p className="font-bold text-[#1E1B1D]">Delivering to:</p>
                <p>
                  {formData.name} • {formData.phone}
                </p>
                <p>
                  {formData.address}, {formData.city}, {formData.state} - {formData.pincode}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-4 py-3 rounded-xl border border-[#EFE5E0] text-xs font-bold text-[#52474E] hover:bg-white cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF6584] to-[#F43F5E] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  Pay ₹{total} & Confirm Order
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Order Confirmed */}
          {step === 'confirmed' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#1E1B1D]">Thank You for Your Order!</h3>
                <p className="text-xs text-[#7A6E75] mt-1">
                  We have received your skincare order #{placedOrderId}. A confirmation SMS has been dispatched to{' '}
                  <strong>{formData.phone}</strong>.
                </p>
              </div>

              <div className="p-4 bg-[#FAF7F5] rounded-2xl border border-[#EFE5E0] text-left text-xs space-y-1.5 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-[#7A6E75]">Estimated Delivery:</span>
                  <span className="font-bold text-[#1E1B1D]">3-4 Business Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6E75]">Payment Status:</span>
                  <span className="font-bold text-[#22C55E]">
                    {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid Online (Demo)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6E75]">Total Paid:</span>
                  <span className="font-bold text-[#E11D48]">₹{total}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#1E1B1D] text-white text-xs font-bold hover:bg-[#3D3338] transition-colors cursor-pointer"
              >
                Back to Glow Store
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
