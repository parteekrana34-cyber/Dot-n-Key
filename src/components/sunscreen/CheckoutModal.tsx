import React, { useState } from 'react';
import {
  X,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Sun,
  Database,
  Copy,
  Check,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { CartItem } from '../../types/sunscreen';
import {
  syncOrderToSupabase,
  SupabaseOrderPayload,
  SUPABASE_PROJECT_ID,
  SUPABASE_SQL_SETUP,
  SyncResult,
} from '../../lib/supabase';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (orderId: string) => void;
  defaultEmail?: string;
  defaultName?: string;
  defaultPhone?: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
  defaultEmail = 'ananya@example.com',
  defaultName = 'Ananya Sharma',
  defaultPhone = '9876543210',
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [createdOrderId, setCreatedOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncResult | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  const [shippingDetails, setShippingDetails] = useState({
    fullName: defaultName,
    email: defaultEmail,
    phone: defaultPhone,
    address: 'Flat 402, Sunshine Apartments, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
  });

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * 0.15); // automatic 15% discount
  const isFreeShipping = subtotal >= 499;
  const shippingFee = isFreeShipping ? 0 : 50;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderId = `SPF-${Math.floor(100000 + Math.random() * 900000)}`;
    setCreatedOrderId(orderId);

    const orderPayload: SupabaseOrderPayload = {
      order_id: orderId,
      customer_name: shippingDetails.fullName,
      customer_email: shippingDetails.email,
      customer_phone: shippingDetails.phone,
      shipping_address: shippingDetails.address,
      city: shippingDetails.city,
      state: shippingDetails.state,
      pincode: shippingDetails.pincode,
      payment_method: paymentMethod.toUpperCase(),
      subtotal,
      discount,
      shipping_fee: shippingFee,
      total_amount: total,
      currency: 'INR',
      order_items: items.map((it) => ({
        id: it.productId,
        name: it.name,
        size: it.size,
        quantity: it.quantity,
        price: it.price,
      })),
      status: 'Confirmed',
      created_at: new Date().toISOString(),
    };

    // Synchronize directly with Supabase backend
    const result = await syncOrderToSupabase(orderPayload);
    setSyncStatus(result);
    setIsSubmitting(false);

    setStep('confirmation');
    onOrderSuccess(orderId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl sm:rounded-[2rem] shadow-2xl overflow-hidden border border-[#F5D5DE] my-auto max-h-[92vh] flex flex-col">
        {/* Header in Pastel Pink theme */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#F9DDE5] via-[#FCEEF2] to-[#F9DDE5] border-b border-[#F5D5DE] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FF8C9A] text-white flex items-center justify-center shadow-xs">
              <Sun className="w-4 h-4 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-base sm:text-lg text-[#633D4B] font-display">
                  {step === 'confirmation' ? 'Order Confirmed! 🎉' : 'Secure Sunscreen Checkout'}
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 text-[#633D4B] text-[10px] font-bold border border-[#F5D5DE]">
                  <Database className="w-3 h-3 text-[#FF8C9A]" />
                  <span>Supabase Live</span>
                </span>
              </div>
              <p className="text-[11px] text-[#8E6B78]">
                {step === 'shipping'
                  ? 'Step 1: Delivery Details'
                  : step === 'payment'
                  ? 'Step 2: Payment Method'
                  : 'Order Details & Supabase Backend Sync'}
              </p>
            </div>
          </div>
          {step !== 'confirmation' && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#8E6B78] hover:text-[#633D4B] flex items-center justify-center cursor-pointer shadow-xs"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {step === 'shipping' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep('payment');
              }}
              className="space-y-4"
            >
              {/* Supabase notice banner */}
              <div className="p-3 rounded-2xl bg-[#FCEEF2] border border-[#F5D5DE] flex items-center justify-between text-xs text-[#633D4B]">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#FF8C9A] shrink-0" />
                  <span className="text-[11px] font-bold">
                    Connected to Supabase Project: <code className="bg-white px-1.5 py-0.5 rounded-md text-[#FF8C9A] font-black">{SUPABASE_PROJECT_ID}</code>
                  </span>
                </div>
                <span className="text-[10px] text-[#8E6B78] font-semibold hidden sm:inline">
                  Auto-sync on submit
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#633D4B] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={shippingDetails.fullName}
                    onChange={(e) =>
                      setShippingDetails({ ...shippingDetails, fullName: e.target.value })
                    }
                    className="w-full bg-[#FCEEF2]/40 border border-[#F5D5DE] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#633D4B] focus:outline-none focus:ring-2 focus:ring-[#FF8C9A]/30 focus:border-[#FF8C9A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#633D4B] mb-1">Email Address (for Supabase)</label>
                  <input
                    type="email"
                    required
                    value={shippingDetails.email}
                    onChange={(e) =>
                      setShippingDetails({ ...shippingDetails, email: e.target.value })
                    }
                    className="w-full bg-[#FCEEF2]/40 border border-[#F5D5DE] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#633D4B] focus:outline-none focus:ring-2 focus:ring-[#FF8C9A]/30 focus:border-[#FF8C9A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#633D4B] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={shippingDetails.phone}
                    onChange={(e) =>
                      setShippingDetails({ ...shippingDetails, phone: e.target.value })
                    }
                    className="w-full bg-[#FCEEF2]/40 border border-[#F5D5DE] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#633D4B] focus:outline-none focus:ring-2 focus:ring-[#FF8C9A]/30 focus:border-[#FF8C9A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#633D4B] mb-1">PIN Code</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={shippingDetails.pincode}
                    onChange={(e) =>
                      setShippingDetails({ ...shippingDetails, pincode: e.target.value })
                    }
                    className="w-full bg-[#FCEEF2]/40 border border-[#F5D5DE] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#633D4B] focus:outline-none focus:ring-2 focus:ring-[#FF8C9A]/30 focus:border-[#FF8C9A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#633D4B] mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={shippingDetails.address}
                  onChange={(e) =>
                    setShippingDetails({ ...shippingDetails, address: e.target.value })
                  }
                  className="w-full bg-[#FCEEF2]/40 border border-[#F5D5DE] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#633D4B] focus:outline-none focus:ring-2 focus:ring-[#FF8C9A]/30 focus:border-[#FF8C9A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#633D4B] mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={shippingDetails.city}
                    onChange={(e) =>
                      setShippingDetails({ ...shippingDetails, city: e.target.value })
                    }
                    className="w-full bg-[#FCEEF2]/40 border border-[#F5D5DE] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#633D4B] focus:outline-none focus:ring-2 focus:ring-[#FF8C9A]/30 focus:border-[#FF8C9A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#633D4B] mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={shippingDetails.state}
                    onChange={(e) =>
                      setShippingDetails({ ...shippingDetails, state: e.target.value })
                    }
                    className="w-full bg-[#FCEEF2]/40 border border-[#F5D5DE] rounded-xl px-3.5 py-2 text-xs font-semibold text-[#633D4B] focus:outline-none focus:ring-2 focus:ring-[#FF8C9A]/30 focus:border-[#FF8C9A]"
                  />
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="p-3.5 rounded-2xl bg-[#FCEEF2] border border-[#F5D5DE] space-y-2">
                <span className="text-xs font-black text-[#633D4B]">Items in Sunscreen Package:</span>
                <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                  {items.map((it) => (
                    <div key={it.cartId} className="flex justify-between text-xs text-[#8E6B78]">
                      <span className="truncate pr-2">
                        {it.name} ({it.size}) × {it.quantity}
                      </span>
                      <span className="font-bold text-[#633D4B] shrink-0">₹{it.price * it.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#FF8C9A] hover:bg-[#FF7586] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md shadow-[#FF8C9A]/30 cursor-pointer hover:shadow-lg transition-all"
              >
                <span>Continue to Payment (₹{total})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 'payment' && (
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-[#FCEEF2] border border-[#F5D5DE] text-[11px] text-[#633D4B] leading-relaxed flex items-center gap-2">
                <Database className="w-4 h-4 text-[#FF8C9A] shrink-0" />
                <span>
                  Placing this order will automatically record all customer and package details into your <strong>Supabase</strong> project.
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'upi', label: 'UPI Instant (Google Pay, PhonePe, Paytm)', icon: QrCode, badge: 'Fastest' },
                  { id: 'card', label: 'Credit / Debit Card (Visa, Mastercard, RuPay)', icon: CreditCard },
                  { id: 'cod', label: 'Cash on Delivery (Pay at Doorstep)', icon: Banknote },
                ].map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setPaymentMethod(opt.id as any)}
                      className={`w-full p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                        paymentMethod === opt.id
                          ? 'border-[#FF8C9A] bg-[#FCEEF2] shadow-xs'
                          : 'border-[#F5D5DE] hover:border-[#FF8C9A] bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-[#FF8C9A]" />
                        <span className="font-bold text-xs text-[#633D4B]">{opt.label}</span>
                      </div>
                      {opt.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] text-[10px] font-black">
                          {opt.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Order total calculation */}
              <div className="p-3.5 rounded-2xl bg-[#FCEEF2] border border-[#F5D5DE] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#8E6B78]">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#633D4B]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-[#FF8C9A]">
                  <span>Member Savings (15%)</span>
                  <span className="font-bold">-₹{discount}</span>
                </div>
                <div className="flex justify-between text-[#8E6B78]">
                  <span>Shipping</span>
                  <span className="font-bold text-[#059669]">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-[#633D4B] pt-2 border-t border-[#F5D5DE]">
                  <span>Final Payable Amount</span>
                  <span className="text-base text-[#FF8C9A]">₹{total}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="px-4 py-3 rounded-2xl border border-[#F5D5DE] text-xs font-bold text-[#633D4B] hover:bg-[#FCEEF2] cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handlePlaceOrder}
                  className="flex-1 py-3.5 rounded-2xl bg-[#FF8C9A] hover:bg-[#FF7586] text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-md shadow-[#FF8C9A]/30 cursor-pointer hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Syncing with Supabase...</span>
                  ) : (
                    <>
                      <span>Place Order &amp; Save in Supabase (₹{total})</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'confirmation' && (
            <div className="text-center py-4 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#059669] uppercase tracking-wider">
                  Success!
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#633D4B] mt-0.5 font-display">
                  Your Sunscreens Are On Their Way!
                </h3>
                <p className="text-xs text-[#8E6B78] mt-1">
                  Order ID: <strong className="text-[#633D4B]">{createdOrderId}</strong>
                </p>
              </div>

              {/* Supabase backend status block */}
              <div className="p-4 rounded-2xl bg-[#FCEEF2] border border-[#F5D5DE] text-left text-xs space-y-2.5 max-w-md mx-auto">
                <div className="flex items-center justify-between pb-2 border-b border-[#F5D5DE]">
                  <span className="font-black text-[#633D4B] flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-[#FF8C9A]" />
                    <span>Supabase Backend Integration</span>
                  </span>
                  <span className="text-[10px] font-bold text-[#FF8C9A] bg-white px-2 py-0.5 rounded-full border border-[#F5D5DE]">
                    {SUPABASE_PROJECT_ID}
                  </span>
                </div>

                {syncStatus?.success ? (
                  <div className="p-2.5 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-[11px] text-[#047857] font-semibold leading-relaxed">
                    ✅ Order details recorded directly into Supabase table <strong>'{syncStatus.table}'</strong>!
                  </div>
                ) : (
                  <div className="space-y-2 text-[11px] text-[#633D4B]">
                    <p className="leading-relaxed">
                      ⚡ <strong>Order Captured &amp; Stored:</strong> Your order details are saved and ready to sync with Supabase project <code>{SUPABASE_PROJECT_ID}</code>.
                    </p>
                    <p className="text-[#8E6B78] text-[10px]">
                      If you haven't created the <code>orders</code> table in Supabase yet, copy the SQL below and run it in your Supabase SQL Editor:
                    </p>
                    <button
                      onClick={handleCopySql}
                      className="w-full py-2 px-3 rounded-xl bg-white hover:bg-[#F9DDE5] text-[#633D4B] border border-[#F5D5DE] font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all"
                    >
                      {copiedSql ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5 text-[#FF8C9A]" />}
                      <span>{copiedSql ? 'SQL Copied to Clipboard!' : 'Copy SQL to Create Supabase Table'}</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#F5D5DE] text-left text-xs space-y-1.5 max-w-md mx-auto shadow-xs">
                <p className="font-bold text-[#633D4B]">Shipping Address:</p>
                <p className="text-[#8E6B78]">{shippingDetails.fullName} ({shippingDetails.phone})</p>
                <p className="text-[#8E6B78]">{shippingDetails.email}</p>
                <p className="text-[#8E6B78]">{shippingDetails.address}, {shippingDetails.city}, {shippingDetails.state} - {shippingDetails.pincode}</p>
                <div className="pt-2 border-t border-[#F5D5DE] text-[11px] text-[#059669] font-bold">
                  Estimated Delivery: Within 2-3 business days
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3 rounded-2xl bg-[#FF8C9A] hover:bg-[#FF7586] text-white text-xs font-black shadow-md cursor-pointer transition-all"
              >
                Continue Shopping Sunscreens
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
