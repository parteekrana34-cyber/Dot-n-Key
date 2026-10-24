import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  ArrowRight, 
  Printer, 
  Smartphone, 
  Banknote,
  Info
} from 'lucide-react';
import { CartItem, UserProfile, OrderRecord } from '../types/jewellery';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currentUser: UserProfile | null;
  onOrderCompleted: (order: OrderRecord) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currentUser,
  onOrderCompleted,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '+91 ',
    address: currentUser?.address || '',
    city: currentUser?.city || 'Mumbai',
    postalCode: currentUser?.postalCode || '',
    country: 'India',
    paymentMethod: 'upi',
    upiId: 'collector@okhdfcbank',
    cardNumber: '•••• •••• •••• 4829',
    cardExp: '08/28',
    cardCvc: '•••',
  });

  const [createdOrder, setCreatedOrder] = useState<OrderRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync with currentUser if it changes
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || currentUser.name,
        email: prev.email || currentUser.email,
        phone: prev.phone === '+91 ' ? (currentUser.phone || '+91 ') : prev.phone,
        address: prev.address || (currentUser.address || ''),
        city: prev.city || (currentUser.city || 'Mumbai'),
        postalCode: prev.postalCode || (currentUser.postalCode || ''),
      }));
    }
  }, [currentUser]);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedRef = `PY-${Math.floor(100000 + Math.random() * 900000)}`;
    const today = new Date().toISOString().split('T')[0];

    const orderRecord: OrderRecord = {
      id: generatedRef,
      date: today,
      items: items.map((i) => ({
        productName: i.product.name,
        quantity: i.quantity,
        metal: i.selectedMetal,
        size: i.selectedSize,
        price: i.product.price,
        image: i.product.image,
      })),
      totalAmount: subtotal,
      status: 'In Atelier Setting',
      paymentMethod:
        formData.paymentMethod === 'cod'
          ? 'Cash on Delivery (Armored Courier)'
          : formData.paymentMethod === 'upi'
          ? 'UPI Instant Transfer (Test Checkout)'
          : 'Credit / Debit Card (Test Checkout)',
      shippingAddress: `${formData.address}, ${formData.city} - ${formData.postalCode}, ${formData.country}`,
    };

    // Send order to backend API to update live management dashboard
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: generatedRef,
          customer: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.address}, ${formData.city} - ${formData.postalCode}, ${formData.country}`,
          city: formData.city,
          postalCode: formData.postalCode,
          item: items.length > 1 ? `${items[0].product.name} + ${items.length - 1} more` : items[0]?.product.name || 'Fine Jewel',
          items: items.map((i) => ({
            name: i.product.name,
            quantity: i.quantity,
            price: i.product.price,
            metal: i.selectedMetal,
            size: i.selectedSize,
          })),
          amount: subtotal,
          paymentMethod: orderRecord.paymentMethod,
        }),
      });
    } catch {
      // Backend request fallback
    }

    // Direct client sync to Supabase backend table
    try {
      const { syncOrderToSupabase } = await import('../lib/supabase');
      const supabaseResult = await syncOrderToSupabase({
        order_id: generatedRef,
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.phone,
        shipping_address: `${formData.address}, ${formData.city} - ${formData.postalCode}, ${formData.country}`,
        city: formData.city,
        postal_code: formData.postalCode,
        country: formData.country,
        payment_method: orderRecord.paymentMethod,
        total_amount: subtotal,
        currency: 'INR',
        order_items: items.map((i) => ({
          name: i.product.name,
          quantity: i.quantity,
          price: i.product.price,
          metal: i.selectedMetal,
          size: i.selectedSize,
        })),
        status: 'In Atelier Setting',
      });
      console.log('[Supabase Order Sync Response]:', supabaseResult);
    } catch (sbErr) {
      console.warn('[Supabase Order Sync Error]:', sbErr);
    }

    setCreatedOrder(orderRecord);
    setStep('confirmation');
    setIsSubmitting(false);
    onOrderCompleted(orderRecord);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#FAF7F2] max-w-2xl w-full border border-[#DDD3C7] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[#EAE3D8] flex items-center justify-between bg-[#FAF7F2]">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.24em] text-[#8C6D46] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>PAYORA JEWELS ATELIER</span>
            </div>
            <h2 className="font-serif text-2xl text-[#2A2421] font-medium tracking-tight mt-0.5">
              {step === 'confirmation' ? 'Order Confirmed' : 'Insured Checkout'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#6E6056] hover:text-[#2A2421] hover:bg-[#F2ECE2] rounded-full transition-colors focus:outline-none"
            aria-label="Close checkout modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Shipping Details */}
        {step === 'details' && (
          <form onSubmit={handleSubmitDetails} className="p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 text-xs text-[#8C6D46] font-medium uppercase tracking-wider mb-2">
              <Truck className="w-4 h-4 text-[#C5A880]" />
              <span>Step 1: Complimentary Armored Courier Destination</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6E6056] font-medium mb-1">
                  Recipient Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Parteek Rana"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD3C7] text-xs text-[#2A2421] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6E6056] font-medium mb-1">
                  Email (Dossier &amp; Tracking) *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD3C7] text-xs text-[#2A2421] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6E6056] font-medium mb-1">
                  Contact Phone (Courier Signature) *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98301 24590"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD3C7] text-xs text-[#2A2421] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6E6056] font-medium mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Mumbai, Delhi, Bangalore..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD3C7] text-xs text-[#2A2421] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-[#6E6056] font-medium mb-1">
                  Delivery Address (Building, Street, Landmark) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Suite / Apartment No., Residence Name, Road"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD3C7] text-xs text-[#2A2421] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6E6056] font-medium mb-1">
                  Postal Code / PIN *
                </label>
                <input
                  type="text"
                  required
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="e.g. 400021"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD3C7] text-xs text-[#2A2421] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6E6056] font-medium mb-1">
                  Country
                </label>
                <input
                  type="text"
                  disabled
                  value={formData.country}
                  className="w-full px-3.5 py-2.5 bg-[#F2ECE2] border border-[#DDD3C7] text-xs text-[#5C4F46] cursor-not-allowed"
                />
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="pt-4 border-t border-[#EAE3D8]">
              <div className="flex justify-between items-center text-xs mb-3">
                <span className="text-[#8C7B70] uppercase tracking-wider">Cart Contents ({items.length} items)</span>
                <span className="font-semibold text-[#2A2421] tabular-nums">
                  Subtotal: ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="max-h-28 overflow-y-auto space-y-2 no-scrollbar">
                {items.map((i, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs bg-white p-2 border border-[#E7DFD4]">
                    <div className="flex items-center gap-2">
                      <img src={i.product.image} alt={i.product.name} className="w-8 h-8 object-cover" />
                      <span className="truncate max-w-[200px] text-[#2A2421]">{i.product.name}</span>
                      <span className="text-[#8C7B70]">x{i.quantity}</span>
                    </div>
                    <span className="font-medium text-[#2A2421] tabular-nums">
                      ₹{(i.product.price * i.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#EAE3D8] flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-[#6E6056] hover:text-[#2A2421] underline"
              >
                Cancel &amp; Continue Shopping
              </button>
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#2A2421] text-white hover:bg-[#8C6D46] text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Selection */}
        {step === 'payment' && (
          <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 text-xs text-[#8C6D46] font-medium uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>Step 2: Choose Payment Method &amp; Complete Acquisition</span>
            </div>

            {/* Test / Demo Payment Notice */}
            <div className="p-3 bg-[#F4EFE6] border border-[#E5DDD0] text-xs text-[#6B5E55] flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#8C6D46] shrink-0 mt-0.5" />
              <span>
                <strong>Atelier Checkout Notice:</strong> Test/Demo checkout mode is active. Real transactions are not debited. Select your preferred method below to verify order routing.
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* UPI */}
              <label
                className={`p-4 border cursor-pointer transition-all flex flex-col justify-between ${
                  formData.paymentMethod === 'upi'
                    ? 'border-[#2A2421] bg-white shadow-sm ring-1 ring-[#2A2421]'
                    : 'border-[#DDD3C7] bg-[#F7F3EC]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Smartphone className="w-4 h-4 text-[#8C6D46]" />
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="accent-[#C5A880]"
                  />
                </div>
                <span className="text-xs font-semibold text-[#2A2421]">UPI / NetBanking</span>
                <span className="text-[10px] text-[#8C7B70]">GPay, PhonePe, Paytm, QR</span>
              </label>

              {/* Cash on Delivery */}
              <label
                className={`p-4 border cursor-pointer transition-all flex flex-col justify-between ${
                  formData.paymentMethod === 'cod'
                    ? 'border-[#2A2421] bg-white shadow-sm ring-1 ring-[#2A2421]'
                    : 'border-[#DDD3C7] bg-[#F7F3EC]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Banknote className="w-4 h-4 text-[#8C6D46]" />
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="accent-[#C5A880]"
                  />
                </div>
                <span className="text-xs font-semibold text-[#2A2421]">Cash on Delivery</span>
                <span className="text-[10px] text-[#8C7B70]">Armored Courier Handover</span>
              </label>

              {/* Card */}
              <label
                className={`p-4 border cursor-pointer transition-all flex flex-col justify-between ${
                  formData.paymentMethod === 'card'
                    ? 'border-[#2A2421] bg-white shadow-sm ring-1 ring-[#2A2421]'
                    : 'border-[#DDD3C7] bg-[#F7F3EC]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <CreditCard className="w-4 h-4 text-[#8C6D46]" />
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="accent-[#C5A880]"
                  />
                </div>
                <span className="text-xs font-semibold text-[#2A2421]">Credit / Debit Card</span>
                <span className="text-[10px] text-[#8C7B70]">Visa, Mastercard, Amex</span>
              </label>
            </div>

            {/* UPI details */}
            {formData.paymentMethod === 'upi' && (
              <div className="p-4 bg-white border border-[#DDD3C7] space-y-2">
                <label className="block text-[11px] uppercase tracking-wider text-[#6E6056] font-medium">
                  UPI ID (Virtual Payment Address)
                </label>
                <input
                  type="text"
                  value={formData.upiId}
                  onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                  placeholder="e.g. yourname@okhdfcbank"
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD3C7] text-xs font-mono"
                />
                <p className="text-[10px] text-[#8C7B70]">
                  Instant verification via NPCI Bharat UPI demo channel.
                </p>
              </div>
            )}

            {/* Card details */}
            {formData.paymentMethod === 'card' && (
              <div className="p-4 bg-white border border-[#DDD3C7] space-y-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#6E6056] font-medium mb-1">
                    Card Number (Demo)
                  </label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD3C7] text-xs font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#6E6056] font-medium mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={formData.cardExp}
                      onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD3C7] text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#6E6056] font-medium mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      value={formData.cardCvc}
                      onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#DDD3C7] text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* COD details */}
            {formData.paymentMethod === 'cod' && (
              <div className="p-4 bg-[#F5EFEB] border border-[#E7DFD4] text-xs text-[#5C4F46] leading-relaxed">
                <p className="font-semibold text-[#2A2421] mb-1">Cash on Delivery Conditions:</p>
                Please prepare the exact cash amount of <strong>₹{subtotal.toLocaleString('en-IN')}</strong> upon handover by the armored courier. Government-issued photo ID (Aadhaar or Passport) is required for precious jewelry verification.
              </div>
            )}

            <div className="pt-4 border-t border-[#EAE3D8] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs text-[#6E6056] hover:text-[#2A2421] underline"
              >
                &larr; Back to Shipping
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 bg-[#C5A880] text-[#1E1917] hover:bg-[#B49467] text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md flex items-center gap-2"
              >
                <span>Confirm &amp; Place Order (₹{subtotal.toLocaleString('en-IN')})</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Order Confirmation Receipt */}
        {step === 'confirmation' && createdOrder && (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#8C6D46] font-semibold">
                Order Confirmed — Preparing Atelier Shipment
              </p>
              <h3 className="font-serif text-3xl text-[#2A2421] font-medium mt-1">
                Thank You for Choosing Payora Jewels
              </h3>
              <p className="text-xs text-[#7A6C63] mt-2">
                Your order receipt, authentication certificates, and tracking link have been dispatched to <strong>{formData.email}</strong>.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#F6F1EA] border border-[#E7DFD4] p-5 text-left text-xs space-y-3">
              <div className="flex justify-between pb-2 border-b border-[#E0D5C7]">
                <span className="text-[#8C7B70]">Order Reference:</span>
                <span className="font-mono font-bold text-[#2A2421]">{createdOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C7B70]">Payment Method:</span>
                <span className="font-medium text-[#2A2421]">{createdOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C7B70]">Delivery Address:</span>
                <span className="font-medium text-[#2A2421]">{createdOrder.shippingAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C7B70]">Courier Status:</span>
                <span className="font-semibold text-emerald-800">{createdOrder.status}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E0D5C7]">
                <span className="text-[#8C7B70]">Total Charged:</span>
                <span className="font-semibold text-[#2A2421] text-sm tabular-nums">
                  ₹{createdOrder.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-2.5 border border-[#2A2421] text-[#2A2421] hover:bg-[#2A2421] hover:text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Dossier &amp; Receipt</span>
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#C5A880] text-[#1E1917] hover:bg-[#B49467] text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
