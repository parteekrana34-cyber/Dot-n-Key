import React from 'react';
import { X, User, Package, MapPin, Award, Sparkles, Heart } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderHistory: string[];
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  orderHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#FFD1DC]/40 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#FFE5EC] via-[#FFF0F3] to-[#EDE9FE] border-b border-[#F0E6E1] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-[#FF6584] border border-[#FFD1DC]">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg text-[#1E1B1D]">
                Glow Club Member
              </h2>
              <p className="text-xs text-[#7A6E75]">Student Demo Profile • Tier: Dewy Glow</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white text-[#7A6E75] hover:text-[#1E1B1D] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {/* Points Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFF0F3] to-[#FFF7ED] border border-[#FFD1DC] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF6584]">
                Available Glow Coins
              </span>
              <p className="text-2xl font-black text-[#1E1B1D] mt-0.5">350 🪙</p>
              <p className="text-[11px] text-[#7A6E75]">Redeemable for ₹175 off your next order</p>
            </div>
            <button className="px-3.5 py-1.5 rounded-xl bg-white text-[#E11D48] text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer">
              Redeem
            </button>
          </div>

          {/* Orders Section */}
          <div>
            <h3 className="font-bold text-sm text-[#1E1B1D] mb-2 flex items-center gap-1.5">
              <Package className="w-4 h-4 text-[#FF6584]" />
              <span>Recent Demo Orders ({orderHistory.length})</span>
            </h3>

            {orderHistory.length === 0 ? (
              <div className="p-4 rounded-2xl bg-[#FAF7F5] border border-[#EFE5E0] text-center text-xs text-[#7A6E75]">
                No orders placed in this session yet. Complete checkout to see orders appear here!
              </div>
            ) : (
              <div className="space-y-2">
                {orderHistory.map((id) => (
                  <div
                    key={id}
                    className="p-3 rounded-xl bg-[#FAF7F5] border border-[#EFE5E0] flex justify-between items-center text-xs"
                  >
                    <div>
                      <p className="font-bold text-[#1E1B1D]">Order #{id}</p>
                      <p className="text-[10px] text-[#7A6E75]">Processing • Free Express Delivery</p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] font-bold text-[10px]">
                      Confirmed
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Address */}
          <div>
            <h3 className="font-bold text-sm text-[#1E1B1D] mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#FF6584]" />
              <span>Default Delivery Address</span>
            </h3>
            <div className="p-3 rounded-xl bg-[#FAF7F5] border border-[#EFE5E0] text-xs text-[#52474E]">
              <p className="font-bold text-[#1E1B1D]">Aarav Patel (Home)</p>
              <p>Flat 402, Sunshine Heights, MG Road</p>
              <p>Mumbai, Maharashtra - 400001</p>
              <p className="text-[11px] text-[#8C828A] mt-1">+91 9876543210</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
