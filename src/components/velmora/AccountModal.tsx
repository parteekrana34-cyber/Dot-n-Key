import React, { useState } from 'react';
import {
  X,
  User,
  Crown,
  Package,
  Sparkles,
  ShieldCheck,
  LogOut,
  Mail,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { UserOrder } from '../../types/perfume';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: UserOrder[];
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  const [tab, setTab] = useState<'profile' | 'orders' | 'login'>('profile');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // default logged in as VIP demo patron

  // Login form state
  const [email, setEmail] = useState('patron.vip@velmora.com');
  const [password, setPassword] = useState('••••••••');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  if (!isOpen) return null;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setTab('profile');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#171515] border border-[#C2A064]/40 rounded-xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden my-6">
        {/* Header */}
        <div className="p-6 border-b border-[#C2A064]/20 bg-[#1E1A1B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-[#C2A064]" />
            <h2 className="font-serif text-xl tracking-wider text-[#F3EDE3]">
              Maison Velmora VIP Circle
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#A89F93] hover:text-[#F3EDE3] hover:bg-[#421C27] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isLoggedIn ? (
          <div>
            {/* Tabs */}
            <div className="flex border-b border-[#C2A064]/20 bg-[#1A1617] px-6 text-xs font-sans uppercase tracking-wider">
              <button
                onClick={() => setTab('profile')}
                className={`py-3.5 mr-6 transition-colors relative ${
                  tab === 'profile'
                    ? 'text-[#DFC48E] font-medium'
                    : 'text-[#A89F93] hover:text-[#F3EDE3]'
                }`}
              >
                VIP Member Dossier
                {tab === 'profile' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C2A064]" />
                )}
              </button>

              <button
                onClick={() => setTab('orders')}
                className={`py-3.5 transition-colors relative flex items-center gap-1.5 ${
                  tab === 'orders'
                    ? 'text-[#DFC48E] font-medium'
                    : 'text-[#A89F93] hover:text-[#F3EDE3]'
                }`}
              >
                <span>Acquisitions & Orders</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#421C27] text-[#DFC48E] text-[10px]">
                  {orders.length}
                </span>
                {tab === 'orders' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C2A064]" />
                )}
              </button>
            </div>

            {/* Profile Tab */}
            {tab === 'profile' && (
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#421C27] to-[#171515] border-2 border-[#C2A064] flex items-center justify-center text-xl font-brand font-bold text-[#DFC48E] shadow-[0_0_20px_rgba(194,160,100,0.25)]">
                    V
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-2xl text-[#F3EDE3]">
                        Lord Sterling & Associates
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-sans uppercase tracking-widest bg-[#421C27] text-[#DFC48E] border border-[#C2A064]/40">
                        Gold Tier Patron
                      </span>
                    </div>
                    <p className="text-xs text-[#A89F93] font-sans mt-0.5">
                      patron.vip@velmora.com • Member since 2024
                    </p>
                  </div>
                </div>

                {/* VIP Privileges Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-lg bg-[#1E1A1B] border border-[#C2A064]/20 space-y-1">
                    <Sparkles className="w-4 h-4 text-[#C2A064]" />
                    <h4 className="font-sans font-medium text-xs text-[#F3EDE3]">
                      Early Harvest Access
                    </h4>
                    <p className="text-[11px] text-[#A89F93] font-sans">
                      48-hour pre-launch access to rare vintage harvest batches.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[#1E1A1B] border border-[#C2A064]/20 space-y-1">
                    <ShieldCheck className="w-4 h-4 text-[#C2A064]" />
                    <h4 className="font-sans font-medium text-xs text-[#F3EDE3]">
                      White-Glove Courier
                    </h4>
                    <p className="text-[11px] text-[#A89F93] font-sans">
                      Complimentary climate-controlled express shipping nationwide.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-[#1E1A1B] border border-[#C2A064]/20 space-y-1">
                    <Crown className="w-4 h-4 text-[#C2A064]" />
                    <h4 className="font-sans font-medium text-xs text-[#F3EDE3]">
                      Bespoke Master Flacons
                    </h4>
                    <p className="text-[11px] text-[#A89F93] font-sans">
                      Complimentary personalized gold foil engraving on 100ml bottles.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#C2A064]/15 flex justify-between items-center">
                  <span className="text-xs text-[#A89F93] font-sans">
                    Need fragrance consultation? Direct concierge: concierge@velmora.com
                  </span>

                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="flex items-center gap-1.5 text-xs text-[#A89F93] hover:text-rose-400 font-sans"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {tab === 'orders' && (
              <div className="p-6 sm:p-8 space-y-4">
                {orders.length === 0 ? (
                  <div className="text-center py-10 space-y-2">
                    <Package className="w-8 h-8 text-[#C2A064]/60 mx-auto" />
                    <p className="font-serif text-lg text-[#F3EDE3]">No previous acquisitions</p>
                    <p className="text-xs text-[#A89F93] font-sans">
                      Your completed perfume acquisitions will appear here.
                    </p>
                  </div>
                ) : (
                  orders.map((ord) => (
                    <div
                      key={ord.orderId}
                      className="p-4 rounded-lg bg-[#1E1A1B] border border-[#C2A064]/20 space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs font-sans">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[#DFC48E] font-medium">
                            {ord.orderId}
                          </span>
                          <span className="text-[#A89F93]">• {ord.date}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 text-[10px] uppercase tracking-wider font-semibold">
                          {ord.status}
                        </span>
                      </div>

                      <div className="divide-y divide-[#C2A064]/10 text-xs font-sans">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="py-1.5 flex justify-between text-[#F3EDE3]">
                            <span>
                              {item.name} ({item.size}) x {item.quantity}
                            </span>
                            <span className="text-[#DFC48E]">
                              ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-[#C2A064]/15 flex justify-between items-baseline text-xs font-sans">
                        <span className="text-[#A89F93]">Total Settled:</span>
                        <span className="font-serif text-base text-[#DFC48E]">
                          ₹{ord.total.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ) : (
          /* Login / Register Form */
          <form onSubmit={handleAuthSubmit} className="p-6 sm:p-8 space-y-5">
            <div className="text-center space-y-1">
              <h3 className="font-serif text-2xl text-[#F3EDE3]">
                {authMode === 'login' ? 'Sign In to Your VIP Dossier' : 'Join Maison Velmora Circle'}
              </h3>
              <p className="text-xs text-[#A89F93] font-sans">
                Access curated privileges, order records, and private reserves.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-[#A89F93] font-sans uppercase tracking-wider block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#A89F93] absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded bg-[#1E1A1B] border border-[#C2A064]/30 text-sm text-[#F3EDE3] focus:outline-none focus:border-[#C2A064]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-[#A89F93] font-sans uppercase tracking-wider block mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#A89F93] absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded bg-[#1E1A1B] border border-[#C2A064]/30 text-sm text-[#F3EDE3] focus:outline-none focus:border-[#C2A064]"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded bg-gradient-to-r from-[#C2A064] via-[#DFC48E] to-[#C2A064] text-[#171515] font-sans font-semibold text-xs tracking-[0.2em] uppercase hover:brightness-110 shadow-lg"
            >
              {authMode === 'login' ? 'Sign In to Account' : 'Create Exclusive Account'}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-xs text-[#DFC48E] hover:underline font-sans"
              >
                {authMode === 'login'
                  ? "Don't have an account yet? Create one"
                  : 'Already a patron? Sign in'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
