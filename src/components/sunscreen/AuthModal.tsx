import React, { useState } from 'react';
import { X, User, Mail, Lock, Eye, EyeOff, Sparkles, Sun, CheckCircle2, ShieldCheck } from 'lucide-react';
import { UserAccount } from '../../types/sunscreen';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount;
  onLoginSuccess: (name: string, email: string) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onLoginSuccess,
  onLogout,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (password.length < 6 && mode !== 'forgot') {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (mode === 'forgot') {
      setForgotSent(true);
      return;
    }

    const displayName = mode === 'register' && name ? name : email.split('@')[0];
    onLoginSuccess(displayName, email);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#F5D5DE] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#F9DDE5] via-[#FCEEF2] to-[#F9DDE5] border-b border-[#F5D5DE] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FF8C9A] text-white flex items-center justify-center shadow-xs">
              <Sun className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h2 className="font-black text-base text-[#633D4B] font-display">
                {user.isLoggedIn ? 'Your Sunscreen Club' : mode === 'login' ? 'Welcome Back!' : mode === 'register' ? 'Join Sunscreen Club' : 'Reset Password'}
              </h2>
              <p className="text-[11px] text-[#8E6B78]">
                {user.isLoggedIn ? user.email : 'Earn glow points on every SPF purchase'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-[#F9DDE5] text-[#8E6B78] hover:text-[#633D4B] flex items-center justify-center cursor-pointer border border-[#F5D5DE] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 bg-white">
          {user.isLoggedIn ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FCEEF2] border border-[#F5D5DE] text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-white text-[#FF8C9A] flex items-center justify-center mx-auto shadow-xs font-black text-lg border border-[#F5D5DE]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="font-black text-base text-[#633D4B] font-display">{user.name}</h3>
                <p className="text-xs text-[#8E6B78]">{user.email}</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-bold text-[#633D4B] shadow-xs border border-[#F5D5DE]">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF8C9A]" />
                  <span>{user.glowPoints} Sunscreen Glow Points</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FCEEF2]/60 border border-[#F5D5DE] space-y-1.5 text-xs text-[#633D4B]">
                <p className="font-bold text-[#633D4B]">Member Perks:</p>
                <p>• 15% discount on all SPF 50+ tubes &amp; sticks</p>
                <p>• Free mini sunscreen sample with every order</p>
                <p>• VIP priority summer dispatch</p>
              </div>

              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full py-3 rounded-xl border border-[#F5D5DE] hover:bg-[#FCEEF2] text-[#633D4B] hover:text-[#FF8C9A] text-xs font-black transition-all cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              {/* Tab Selector */}
              {mode !== 'forgot' && (
                <div className="flex border border-[#F5D5DE] p-1 rounded-2xl bg-[#FCEEF2]">
                  <button
                    onClick={() => {
                      setMode('login');
                      setError('');
                    }}
                    className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                      mode === 'login' ? 'bg-[#FF8C9A] text-white shadow-xs' : 'text-[#633D4B]'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setMode('register');
                      setError('');
                    }}
                    className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                      mode === 'register' ? 'bg-[#FF8C9A] text-white shadow-xs' : 'text-[#633D4B]'
                    }`}
                  >
                    Register
                  </button>
                </div>
              )}

              {/* Notice */}
              <div className="p-2.5 rounded-xl bg-[#FCEEF2] border border-[#F5D5DE] text-[10px] text-[#633D4B] leading-relaxed flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#FF8C9A]" />
                <span>
                  <strong>Demo Store Mode:</strong> Instant sign-in is provided for full checkout and wishlist demonstration.
                </span>
              </div>

              {forgotSent ? (
                <div className="text-center py-6 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#15803D] mx-auto" />
                  <h3 className="font-black text-sm text-[#633D4B] font-display">Password Reset Link Sent!</h3>
                  <p className="text-xs text-[#8E6B78]">
                    Check your inbox at <strong>{email}</strong> for instructions.
                  </p>
                  <button
                    onClick={() => {
                      setMode('login');
                      setForgotSent(false);
                    }}
                    className="text-xs font-bold text-[#FF8C9A] hover:underline"
                  >
                    Back to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {mode === 'register' && (
                    <div>
                      <label className="block text-xs font-bold text-[#633D4B] mb-1">Full Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#8E6B78] absolute left-3 top-2.5" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ananya Sharma"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-[#FCEEF2]/40 border border-[#F5D5DE] rounded-xl pl-9 pr-3 py-2 text-xs text-[#633D4B] focus:outline-none focus:ring-1 focus:ring-[#FF8C9A]"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-[#633D4B] mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#8E6B78] absolute left-3 top-2.5" />
                      <input
                        type="email"
                        required
                        placeholder="ananya@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#FCEEF2]/40 border border-[#F5D5DE] rounded-xl pl-9 pr-3 py-2 text-xs text-[#633D4B] focus:outline-none focus:ring-1 focus:ring-[#FF8C9A]"
                      />
                    </div>
                  </div>

                  {mode !== 'forgot' && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-[#633D4B]">Password</label>
                        {mode === 'login' && (
                          <button
                            type="button"
                            onClick={() => {
                              setMode('forgot');
                              setError('');
                            }}
                            className="text-[11px] font-bold text-[#FF8C9A] hover:underline"
                          >
                            Forgot Password?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#8E6B78] absolute left-3 top-2.5" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-[#FCEEF2]/40 border border-[#F5D5DE] rounded-xl pl-9 pr-10 py-2 text-xs text-[#633D4B] focus:outline-none focus:ring-1 focus:ring-[#FF8C9A]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-[#8E6B78] hover:text-[#633D4B]"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {error && <p className="text-xs font-bold text-[#FF8C9A]">{error}</p>}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#FF8C9A] hover:bg-[#FF7586] text-white text-xs font-black shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account & Claim 100 Points' : 'Send Reset Link'}
                  </button>

                  {mode === 'forgot' && (
                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setMode('login')}
                        className="text-xs font-bold text-[#8E6B78] hover:underline"
                      >
                        Back to Login
                      </button>
                    </div>
                  )}
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
