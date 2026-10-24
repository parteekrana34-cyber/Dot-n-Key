import React, { useState } from 'react';
import { 
  X, 
  User, 
  Lock, 
  Mail, 
  CheckCircle, 
  Package, 
  LogOut, 
  ShieldCheck, 
  KeyRound, 
  AlertCircle,
  MapPin,
  Phone,
  LayoutDashboard
} from 'lucide-react';
import { UserProfile, OrderRecord } from '../types/jewellery';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  onUpdateProfile?: (updated: UserProfile) => void;
  onOpenAdmin?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  onUpdateProfile,
  onOpenAdmin,
}) => {
  const [tab, setTab] = useState<'login' | 'signup' | 'admin'>('login');
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Editable profile address fields when logged in
  const [editingAddress, setEditingAddress] = useState(false);
  const [savedAddress, setSavedAddress] = useState(currentUser?.address || 'Nariman Point, Marine Drive');
  const [savedCity, setSavedCity] = useState(currentUser?.city || 'Mumbai');
  const [savedPostal, setSavedPostal] = useState(currentUser?.postalCode || '400021');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both your email and password.');
      return;
    }

    if (password.length < 4) {
      setErrorMsg('Password must be at least 4 characters.');
      return;
    }

    // Determine user name from email prefix or capitalize
    const derivedName = email.split('@')[0];
    const formattedName = derivedName
      ? derivedName.charAt(0).toUpperCase() + derivedName.slice(1)
      : 'Collector Member';

    // Check if this is saved in registered users in localStorage
    try {
      const storedUsersRaw = localStorage.getItem('payora_registered_users');
      const usersList = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
      const matched = usersList.find((u: any) => u.email.toLowerCase() === email.toLowerCase());

      const userProfile: UserProfile = {
        name: matched ? matched.name : formattedName,
        email: email.trim().toLowerCase(),
        role: 'customer',
        phone: matched?.phone || '+91 98301 24590',
        address: matched?.address || '42 Altamount Road',
        city: matched?.city || 'Mumbai',
        postalCode: matched?.postalCode || '400026',
        joinedDate: matched?.joinedDate || 'October 2026',
        orders: currentUser?.orders || [],
      };

      onLogin(userProfile);
      setSuccessMsg('Successfully signed in.');
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 700);
    } catch {
      const userProfile: UserProfile = {
        name: formattedName,
        email: email.trim().toLowerCase(),
        role: 'customer',
        joinedDate: 'October 2026',
        orders: currentUser?.orders || [],
      };
      onLogin(userProfile);
      onClose();
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    if (!password || password.length < 5) {
      setErrorMsg('Security passphrase must be at least 5 characters.');
      return;
    }

    const newUser: UserProfile = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: 'customer',
      phone: phone.trim() || '+91 98301 24590',
      address: 'Sea Face Residences, Worli',
      city: 'Mumbai',
      postalCode: '400018',
      joinedDate: 'October 2026',
      orders: [],
    };

    // Store in localStorage
    try {
      const storedUsersRaw = localStorage.getItem('payora_registered_users');
      const usersList = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
      usersList.push(newUser);
      localStorage.setItem('payora_registered_users', JSON.stringify(usersList));
    } catch {
      // ignore
    }

    onLogin(newUser);
    setSuccessMsg('Circle account created successfully.');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 700);
  };

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const key = adminKey.trim();
    // Authorized admin credentials check
    if (
      key === 'payora2026' || 
      key === 'admin' || 
      key === 'payora-admin' || 
      (email.includes('admin') && password.length >= 4)
    ) {
      const adminUser: UserProfile = {
        name: 'Atelier Director (Admin)',
        email: email || 'admin@payorajewels.com',
        role: 'admin',
        joinedDate: 'Inception 2026',
      };
      onLogin(adminUser);
      setSuccessMsg('Authorized as Administrator.');
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
        if (onOpenAdmin) onOpenAdmin();
      }, 700);
    } else {
      setErrorMsg('Invalid Administrator Passcode. Authorized personnel only.');
    }
  };

  const handleSaveAddress = () => {
    if (currentUser && onUpdateProfile) {
      onUpdateProfile({
        ...currentUser,
        address: savedAddress,
        city: savedCity,
        postalCode: savedPostal,
      });
    }
    setEditingAddress(false);
  };

  const isLoggedIn = !!currentUser;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#FAF7F2] max-w-lg w-full border border-[#DDD3C7] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#EAE3D8] flex items-center justify-between bg-[#FAF7F2]">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.24em] text-[#8C6D46] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>PAYORA JEWELS CIRCLE</span>
            </div>
            <h2 className="font-serif text-2xl text-[#2A2421] font-medium tracking-tight mt-0.5">
              {isLoggedIn 
                ? 'Collector Profile & Orders' 
                : tab === 'login' 
                ? 'Client Sign In' 
                : tab === 'signup' 
                ? 'Create Circle Profile' 
                : 'Staff & Atelier Admin Access'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#6E6056] hover:text-[#2A2421] hover:bg-[#F2ECE2] rounded-full transition-colors focus:outline-none"
            aria-label="Close authentication modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Logged in state view */}
        {isLoggedIn ? (
          <div className="p-6 sm:p-8 space-y-6 max-h-[82vh] overflow-y-auto">
            {/* User Identity Card */}
            <div className="flex items-start justify-between p-4 bg-[#F5EFEB] border border-[#E7DFD4]">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#2A2421] text-[#EFEAE2] flex items-center justify-center font-serif text-xl font-medium shrink-0">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <p className="font-serif text-lg font-medium text-[#2A2421] leading-tight">
                    {currentUser.name}
                  </p>
                  <p className="text-xs text-[#8C7B70] mt-0.5">{currentUser.email}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C6D46] font-semibold bg-[#EBE2D5] px-2 py-0.5">
                      {currentUser.role === 'admin' ? 'Atelier Administrator' : 'Haute Circle Connoisseur'}
                    </span>
                    <span className="text-[10px] text-[#A6978C]">
                      Member since {currentUser.joinedDate || '2026'}
                    </span>
                  </div>
                </div>
              </div>

              {currentUser.role === 'admin' && onOpenAdmin && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAdmin();
                  }}
                  className="px-3 py-1.5 bg-[#C5A880] text-[#1E1917] hover:bg-[#B5966B] text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </button>
              )}
            </div>

            {/* Saved Delivery Destination */}
            <div className="p-4 bg-white border border-[#E7DFD4] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#6E6056] font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8C6D46]" />
                  <span>Primary Insured Delivery Address</span>
                </span>
                <button
                  onClick={() => setEditingAddress(!editingAddress)}
                  className="text-xs text-[#8C6D46] hover:text-[#2A2421] underline font-medium"
                >
                  {editingAddress ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {editingAddress ? (
                <div className="space-y-2 pt-2">
                  <input
                    type="text"
                    value={savedAddress}
                    onChange={(e) => setSavedAddress(e.target.value)}
                    placeholder="Address line"
                    className="w-full px-3 py-1.5 border border-[#DDD3C7] text-xs bg-[#FAF7F2]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={savedCity}
                      onChange={(e) => setSavedCity(e.target.value)}
                      placeholder="City"
                      className="w-full px-3 py-1.5 border border-[#DDD3C7] text-xs bg-[#FAF7F2]"
                    />
                    <input
                      type="text"
                      value={savedPostal}
                      onChange={(e) => setSavedPostal(e.target.value)}
                      placeholder="Postal code"
                      className="w-full px-3 py-1.5 border border-[#DDD3C7] text-xs bg-[#FAF7F2]"
                    />
                  </div>
                  <button
                    onClick={handleSaveAddress}
                    className="px-4 py-1.5 bg-[#2A2421] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#8C6D46] transition-colors"
                  >
                    Save Address
                  </button>
                </div>
              ) : (
                <p className="text-xs text-[#4A3F38]">
                  {currentUser.address || savedAddress}, {currentUser.city || savedCity} - {currentUser.postalCode || savedPostal}
                </p>
              )}
            </div>

            {/* Recent Orders / Acquisitions */}
            <div>
              <h3 className="text-xs uppercase tracking-wider text-[#6E6056] font-semibold mb-3 flex items-center gap-2">
                <Package className="w-4 h-4 text-[#8C6D46]" />
                <span>Atelier Acquisitions &amp; Orders</span>
              </h3>

              {currentUser.orders && currentUser.orders.length > 0 ? (
                <div className="space-y-2 text-xs">
                  {currentUser.orders.map((ord) => (
                    <div key={ord.id} className="p-3 bg-white border border-[#E7DFD4] space-y-1.5">
                      <div className="flex justify-between items-center font-medium">
                        <span className="text-[#2A2421] font-mono font-bold">{ord.id}</span>
                        <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold">
                          {ord.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#7A6C63] flex justify-between">
                        <span>Date: {ord.date}</span>
                        <span className="font-semibold text-[#2A2421] tabular-nums">
                          ₹{ord.totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8C7B70]">
                        Items: {ord.items.map((i) => `${i.productName} (x${i.quantity})`).join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-white border border-[#E7DFD4] text-center text-xs text-[#8C7B70] space-y-1">
                  <p className="font-medium text-[#2A2421]">No acquisitions placed yet.</p>
                  <p>Pieces you order through insured checkout will appear here.</p>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-[#EAE3D8] flex gap-3">
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full py-3 border border-[#2A2421] text-[#2A2421] hover:bg-[#2A2421] hover:text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out of Atelier Circle</span>
              </button>
            </div>
          </div>
        ) : (
          /* Login / Signup / Admin Login form */
          <div className="p-6 sm:p-8">
            {/* Feedback Notifications */}
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Tabs */}
            <div className="flex border-b border-[#EAE3D8] mb-6">
              <button
                onClick={() => {
                  setTab('login');
                  setErrorMsg('');
                }}
                className={`flex-1 pb-3 text-xs uppercase tracking-wider font-medium text-center transition-colors ${
                  tab === 'login'
                    ? 'border-b-2 border-[#2A2421] text-[#2A2421] font-semibold'
                    : 'text-[#8C7B70] hover:text-[#2A2421]'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setTab('signup');
                  setErrorMsg('');
                }}
                className={`flex-1 pb-3 text-xs uppercase tracking-wider font-medium text-center transition-colors ${
                  tab === 'signup'
                    ? 'border-b-2 border-[#2A2421] text-[#2A2421] font-semibold'
                    : 'text-[#8C7B70] hover:text-[#2A2421]'
                }`}
              >
                Register
              </button>
              <button
                onClick={() => {
                  setTab('admin');
                  setErrorMsg('');
                }}
                className={`pb-3 px-3 text-xs uppercase tracking-wider font-medium text-center transition-colors ${
                  tab === 'admin'
                    ? 'border-b-2 border-[#8C6D46] text-[#8C6D46] font-semibold'
                    : 'text-[#A09085] hover:text-[#8C6D46]'
                }`}
                title="Atelier staff authorized access"
              >
                Admin Access
              </button>
            </div>

            {/* TAB 1: LOGIN */}
            {tab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6E6056] font-medium mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C7B70] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. collector@domain.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#DDD3C7] text-xs text-[#2A2421] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6E6056] font-medium mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#8C7B70] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#DDD3C7] text-xs text-[#2A2421] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#2A2421] text-white hover:bg-[#8C6D46] text-xs uppercase tracking-[0.2em] font-semibold transition-colors shadow-sm"
                  >
                    Sign In to Atelier Circle
                  </button>
                </div>

                <div className="text-center text-[11px] text-[#8C7B70] pt-2">
                  <span>New collector? </span>
                  <button
                    type="button"
                    onClick={() => setTab('signup')}
                    className="text-[#2A2421] font-semibold underline underline-offset-2 ml-1"
                  >
                    Create an account
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: REGISTER */}
            {tab === 'signup' && (
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6E6056] font-medium mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C7B70] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Parteek Rana"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#DDD3C7] text-xs text-[#2A2421] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6E6056] font-medium mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C7B70] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#DDD3C7] text-xs text-[#2A2421] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6E6056] font-medium mb-1">
                    Contact Phone (For Insured Handover)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C7B70] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98301 24590"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#DDD3C7] text-xs text-[#2A2421] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6E6056] font-medium mb-1">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#8C7B70] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 5 characters"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#DDD3C7] text-xs text-[#2A2421] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#2A2421] text-white hover:bg-[#8C6D46] text-xs uppercase tracking-[0.2em] font-semibold transition-colors shadow-sm"
                  >
                    Create Circle Profile
                  </button>
                </div>

                <div className="text-center text-[11px] text-[#8C7B70] pt-2">
                  <span>Already registered? </span>
                  <button
                    type="button"
                    onClick={() => setTab('login')}
                    className="text-[#2A2421] font-semibold underline underline-offset-2 ml-1"
                  >
                    Sign in here
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: ADMIN ACCESS */}
            {tab === 'admin' && (
              <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
                <div className="p-3 bg-[#F4EFE6] border border-[#E5DDD0] text-xs text-[#6B5E55] leading-relaxed">
                  <p className="font-semibold text-[#2A2421] mb-1">Atelier Administrator Authentication</p>
                  This portal is reserved for authorized managers of PAYORA JEWELS to manage catalogue vaults, order fulfillments, and client inquiries.
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6E6056] font-medium mb-1">
                    Staff Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C7B70] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@payorajewels.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#DDD3C7] text-xs text-[#2A2421] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6E6056] font-medium mb-1">
                    Master Admin Passcode
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-[#8C7B70] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={adminKey}
                      onChange={(e) => setAdminKey(e.target.value)}
                      placeholder="Enter administrator passcode (demo: payora2026)"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#DDD3C7] text-xs text-[#2A2421] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <p className="text-[10px] text-[#8C7B70] mt-1">
                    Authorized key hint: <code className="bg-[#EAE3D8] px-1 py-0.5 text-[#2A2421]">payora2026</code>
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#8C6D46] text-white hover:bg-[#2A2421] text-xs uppercase tracking-[0.2em] font-semibold transition-colors shadow-sm"
                  >
                    Authenticate Admin Access
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
