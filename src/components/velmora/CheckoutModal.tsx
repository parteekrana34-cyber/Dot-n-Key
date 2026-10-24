import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Building2,
  Banknote,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Gift,
  ArrowRight,
  PackageCheck,
} from 'lucide-react';
import { CartItem, UserOrder } from '../../types/perfume';
import { syncOrderToSupabase } from '../../lib/supabase';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountAmount: number;
  discountCode: string;
  onOrderSuccess: (order: UserOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountAmount,
  discountCode,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<string>('');

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine: '',
    city: '',
    state: 'Maharashtra',
    postalCode: '',
    giftNote: '',
    paymentMethod: 'UPI' as 'UPI' | 'Card' | 'NetBanking' | 'COD',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<UserOrder | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const validateDetails = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@'))
      errs.email = 'Valid email address is required';
    if (!formData.phone.trim() || formData.phone.length < 10)
      errs.phone = '10-digit phone number is required';
    if (!formData.addressLine.trim()) errs.addressLine = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.postalCode.trim() || formData.postalCode.length < 5)
      errs.postalCode = 'Valid PIN / postal code required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDetails()) {
      setStep('payment');
    }
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    setSupabaseStatus('Transmitting to Maison database...');

    const orderId = `VEL-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: UserOrder = {
      orderId,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      items: [...items],
      subtotal,
      discount: discountAmount,
      total: finalTotal,
      shippingAddress: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        addressLine: formData.addressLine,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
      },
      paymentMethod: formData.paymentMethod,
      status: 'Confirmed',
    };

    // Attempt Supabase backend sync
    try {
      const result = await syncOrderToSupabase({
        order_id: orderId,
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.phone,
        shipping_address: formData.addressLine,
        city: formData.city,
        postal_code: formData.postalCode,
        country: 'India',
        payment_method: formData.paymentMethod,
        total_amount: finalTotal,
        currency: 'INR',
        order_items: items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          price: i.price,
          size: i.size,
        })),
        status: 'Order Placed (Demo)',
      });

      if (result.success) {
        setSupabaseStatus(`Synced to backend table: ${result.table}`);
      } else {
        setSupabaseStatus('Archived in local database (Supabase table standby)');
      }
    } catch (e) {
      setSupabaseStatus('Archived in local database');
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmedOrder(newOrder);
      setStep('confirmation');
      onOrderSuccess(newOrder);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#171515] border border-[#C2A064]/40 rounded-xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden my-6">
        {/* Top Header */}
        <div className="p-6 border-b border-[#C2A064]/20 bg-[#1E1A1B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C2A064]" />
            <h2 className="font-serif text-xl tracking-wider text-[#F3EDE3]">
              {step === 'confirmation' ? 'Order Confirmed' : 'Haute Parfumerie Checkout'}
            </h2>
          </div>

          {step !== 'confirmation' && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#A89F93] hover:text-[#F3EDE3] hover:bg-[#421C27] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Demo Mode Notice Banner as mandated */}
        <div className="px-6 py-2 bg-[#421C27]/40 border-b border-[#C2A064]/20 flex items-center justify-between text-xs font-sans text-[#DFC48E]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C2A064]" />
            <span>Maison Velmora Private Concierge • Demo Mode (No Actual Charge Incurred)</span>
          </span>
          <span className="text-[11px] text-[#A89F93] hidden sm:inline">256-Bit SSL Secured</span>
        </div>

        {/* STEP 1: DELIVERY & CONTACT DETAILS */}
        {step === 'details' && (
          <form onSubmit={handleProceedToPayment} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-sans uppercase tracking-wider text-[#A89F93] block mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Maharaja Vikramaditya / Elena Rostova"
                  className={`w-full px-3.5 py-2.5 rounded bg-[#1E1A1B] border text-sm text-[#F3EDE3] focus:outline-none ${
                    errors.fullName ? 'border-rose-500' : 'border-[#C2A064]/30 focus:border-[#C2A064]'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-rose-400 font-sans mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-sans uppercase tracking-wider text-[#A89F93] block mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="concierge@velmora.com"
                  className={`w-full px-3.5 py-2.5 rounded bg-[#1E1A1B] border text-sm text-[#F3EDE3] focus:outline-none ${
                    errors.email ? 'border-rose-500' : 'border-[#C2A064]/30 focus:border-[#C2A064]'
                  }`}
                />
                {errors.email && (
                  <p className="text-[11px] text-rose-400 font-sans mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-sans uppercase tracking-wider text-[#A89F93] block mb-1.5">
                  Mobile Number (For Courier Tracking) *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className={`w-full px-3.5 py-2.5 rounded bg-[#1E1A1B] border text-sm text-[#F3EDE3] focus:outline-none ${
                    errors.phone ? 'border-rose-500' : 'border-[#C2A064]/30 focus:border-[#C2A064]'
                  }`}
                />
                {errors.phone && (
                  <p className="text-[11px] text-rose-400 font-sans mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-sans uppercase tracking-wider text-[#A89F93] block mb-1.5">
                  PIN / Postal Code *
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="400001"
                  className={`w-full px-3.5 py-2.5 rounded bg-[#1E1A1B] border text-sm text-[#F3EDE3] focus:outline-none ${
                    errors.postalCode ? 'border-rose-500' : 'border-[#C2A064]/30 focus:border-[#C2A064]'
                  }`}
                />
                {errors.postalCode && (
                  <p className="text-[11px] text-rose-400 font-sans mt-1">{errors.postalCode}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-sans uppercase tracking-wider text-[#A89F93] block mb-1.5">
                  Street Address & Apartment / Estate *
                </label>
                <input
                  type="text"
                  value={formData.addressLine}
                  onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                  placeholder="Penthouse 42B, Oberoi Sky Heights, Nariman Point"
                  className={`w-full px-3.5 py-2.5 rounded bg-[#1E1A1B] border text-sm text-[#F3EDE3] focus:outline-none ${
                    errors.addressLine ? 'border-rose-500' : 'border-[#C2A064]/30 focus:border-[#C2A064]'
                  }`}
                />
                {errors.addressLine && (
                  <p className="text-[11px] text-rose-400 font-sans mt-1">{errors.addressLine}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-sans uppercase tracking-wider text-[#A89F93] block mb-1.5">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Mumbai"
                  className={`w-full px-3.5 py-2.5 rounded bg-[#1E1A1B] border text-sm text-[#F3EDE3] focus:outline-none ${
                    errors.city ? 'border-rose-500' : 'border-[#C2A064]/30 focus:border-[#C2A064]'
                  }`}
                />
                {errors.city && (
                  <p className="text-[11px] text-rose-400 font-sans mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-sans uppercase tracking-wider text-[#A89F93] block mb-1.5">
                  State
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded bg-[#1E1A1B] border border-[#C2A064]/30 text-sm text-[#F3EDE3] focus:outline-none focus:border-[#C2A064]"
                >
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Rajasthan">Rajasthan</option>
                </select>
              </div>
            </div>

            {/* Complimentary Gift Message */}
            <div>
              <label className="text-xs font-sans uppercase tracking-wider text-[#A89F93] block mb-1.5 flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-[#C2A064]" />
                <span>Complimentary Hand-Written Calligraphy Note (Optional)</span>
              </label>
              <textarea
                rows={2}
                value={formData.giftNote}
                onChange={(e) => setFormData({ ...formData, giftNote: e.target.value })}
                placeholder="Compose a bespoke note to be sealed in our signature wax envelope..."
                className="w-full px-3.5 py-2 rounded bg-[#1E1A1B] border border-[#C2A064]/30 text-xs sm:text-sm text-[#F3EDE3] focus:outline-none focus:border-[#C2A064]"
              />
            </div>

            {/* Continue Button */}
            <div className="pt-4 border-t border-[#C2A064]/20 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#A89F93] font-sans block">Total Investment</span>
                <span className="font-serif text-2xl text-[#DFC48E]">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="submit"
                className="py-3.5 px-8 rounded bg-gradient-to-r from-[#C2A064] via-[#DFC48E] to-[#C2A064] text-[#171515] font-sans font-semibold text-xs tracking-[0.2em] uppercase hover:brightness-110 shadow-lg flex items-center gap-2"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: PAYMENT METHOD SELECTION */}
        {step === 'payment' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1">
              <h3 className="font-serif text-2xl text-[#F3EDE3]">
                Select Preferred Payment Concierge
              </h3>
              <p className="text-xs text-[#A89F93] font-sans">
                All transactions are verified under 256-bit AES encryption.
              </p>
            </div>

            {/* Payment Method Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: 'UPI',
                  title: 'Instant UPI / QR',
                  desc: 'Google Pay, PhonePe, Paytm & BHIM UPI',
                  icon: QrCode,
                },
                {
                  id: 'Card',
                  title: 'Luxury Card (Visa / Amex)',
                  desc: 'Centurion, Platinum, Infinite & World Elite',
                  icon: CreditCard,
                },
                {
                  id: 'NetBanking',
                  title: 'Private Banking',
                  desc: 'HDFC Imperia, ICICI Wealth, Axis Burgundy',
                  icon: Building2,
                },
                {
                  id: 'COD',
                  title: 'Insured Armored COD',
                  desc: 'Pay upon delivery via POS or cash',
                  icon: Banknote,
                },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = formData.paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() =>
                      setFormData({ ...formData, paymentMethod: m.id as any })
                    }
                    className={`p-4 rounded-lg border text-left flex items-start gap-3 transition-all ${
                      isSelected
                        ? 'border-[#C2A064] bg-[#421C27]/60 shadow-[0_0_15px_rgba(194,160,100,0.25)]'
                        : 'border-[#C2A064]/20 bg-[#1E1A1B] hover:border-[#C2A064]/50'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 mt-0.5 ${
                        isSelected ? 'text-[#DFC48E]' : 'text-[#A89F93]'
                      }`}
                    />
                    <div>
                      <h4 className="font-sans font-medium text-sm text-[#F3EDE3]">
                        {m.title}
                      </h4>
                      <p className="text-xs text-[#A89F93] font-sans mt-0.5">{m.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Order Review Box */}
            <div className="p-4 rounded-lg bg-[#1E1A1B] border border-[#C2A064]/20 space-y-2 text-xs font-sans">
              <div className="flex justify-between text-[#A89F93]">
                <span>Delivering To:</span>
                <span className="text-[#F3EDE3]">
                  {formData.fullName}, {formData.city}
                </span>
              </div>
              <div className="flex justify-between text-[#A89F93]">
                <span>Items Subtotal:</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Privilege Code ({discountCode}):</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-[#A89F93]">
                <span>Insured White-Glove Courier:</span>
                <span className="text-[#DFC48E]">Complimentary</span>
              </div>
              <div className="pt-2 border-t border-[#C2A064]/20 flex justify-between items-baseline">
                <span className="text-sm text-[#F3EDE3] font-medium">Final Amount:</span>
                <span className="font-serif text-2xl text-[#DFC48E]">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setStep('details')}
                className="text-xs font-sans tracking-widest uppercase text-[#A89F93] hover:text-[#F3EDE3]"
              >
                ← Back to Details
              </button>

              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="py-4 px-8 rounded bg-gradient-to-r from-[#C2A064] via-[#DFC48E] to-[#C2A064] text-[#171515] font-sans font-semibold text-xs tracking-[0.2em] uppercase hover:brightness-110 shadow-lg flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <span>Confirm Order (Demo)</span>
                    <PackageCheck className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ORDER CONFIRMATION VIEW */}
        {step === 'confirmation' && confirmedOrder && (
          <div className="p-8 sm:p-10 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#421C27] border border-[#C2A064] mx-auto flex items-center justify-center text-[#DFC48E] shadow-[0_0_25px_rgba(194,160,100,0.3)]">
              <CheckCircle2 className="w-8 h-8 text-[#DFC48E]" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#C2A064]">
                Maison Velmora Acquisition Confirmed
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F3EDE3]">
                Thank You, {confirmedOrder.shippingAddress.fullName}
              </h2>
              <p className="text-sm text-[#A89F93] max-w-md mx-auto font-sans">
                Your bespoke order reference is{' '}
                <span className="text-[#DFC48E] font-medium tracking-wider">
                  {confirmedOrder.orderId}
                </span>
                . Our atelier perfumers have received your allocation and are preparing your flacons.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="max-w-md mx-auto p-4 rounded-lg bg-[#1E1A1B] border border-[#C2A064]/25 text-left text-xs font-sans space-y-2.5">
              <div className="flex justify-between border-b border-[#C2A064]/15 pb-2">
                <span className="text-[#A89F93]">Order Reference:</span>
                <span className="text-[#DFC48E] font-mono font-medium">
                  {confirmedOrder.orderId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A89F93]">Payment Method:</span>
                <span className="text-[#F3EDE3]">{confirmedOrder.paymentMethod} (Demo)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A89F93]">Destination:</span>
                <span className="text-[#F3EDE3]">
                  {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.postalCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A89F93]">Estimated Delivery:</span>
                <span className="text-[#DFC48E]">2-3 Business Days (White Glove)</span>
              </div>
              <div className="pt-2 border-t border-[#C2A064]/15 flex justify-between items-baseline">
                <span className="font-medium text-[#F3EDE3]">Total Investment:</span>
                <span className="font-serif text-xl text-[#DFC48E]">
                  ₹{confirmedOrder.total.toLocaleString('en-IN')}
                </span>
              </div>

              {supabaseStatus && (
                <div className="pt-1 text-[11px] text-emerald-400 text-center font-sans">
                  ✓ {supabaseStatus}
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="py-3.5 px-8 rounded bg-gradient-to-r from-[#C2A064] to-[#DFC48E] text-[#171515] font-sans font-semibold text-xs tracking-widest uppercase hover:brightness-110"
            >
              Continue Exploring VELMORA
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
