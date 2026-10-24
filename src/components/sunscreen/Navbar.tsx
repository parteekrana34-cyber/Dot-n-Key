import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Truck,
  ChevronDown,
  Sparkles,
  Ticket,
  ChevronRight,
  Flame,
  Sun,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { SkinConcernCategory } from '../../types/sunscreen';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  userName?: string;
  isLoggedIn: boolean;
  activeConcern: SkinConcernCategory;
  onSelectConcern: (concern: SkinConcernCategory) => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAuth: () => void;
  onOpenQuiz: () => void;
  onScrollToTop: () => void;
  onScrollToBestsellers: () => void;
  onScrollToConcerns: () => void;
  onScrollToOffers: () => void;
  onOpenAbout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  userName,
  isLoggedIn,
  activeConcern,
  onSelectConcern,
  onOpenSearch,
  onOpenCart,
  onOpenWishlist,
  onOpenAuth,
  onOpenQuiz,
  onScrollToTop,
  onScrollToBestsellers,
  onScrollToConcerns,
  onScrollToOffers,
  onOpenAbout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showOrderTracker, setShowOrderTracker] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackStatus, setTrackStatus] = useState<string | null>(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    setTrackStatus('Order #DK-' + trackingNumber.replace(/\D/g, '').slice(0, 5) + ' is In Transit with Blue Dart. Expected Delivery: Tomorrow by 4:00 PM.');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenSearch();
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#F5D5DE] shadow-xs">
      {/* 1. Main Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#633D4B] hover:bg-[#FCEEF2] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Left: BLOOM & BLUSH Official Brand Wordmark */}
          <button
            onClick={onScrollToTop}
            className="focus:outline-none flex items-center cursor-pointer select-none shrink-0"
          >
            <div className="flex flex-col text-left">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#633D4B] font-display uppercase">
                BLOOM &amp; BLUSH
              </span>
            </div>
          </button>

          {/* Center/Right: Wide Search Bar with [⚲ Search For Facewash] */}
          <div className="flex-1 max-w-xl mx-2 sm:mx-6 hidden sm:block">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search For Sunscreen, Facewash, Serums..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onClick={onOpenSearch}
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl border border-[#F5D5DE] bg-[#FCEEF2]/40 hover:bg-white text-xs sm:text-sm text-[#633D4B] placeholder:text-[#8E6B78] focus:outline-none focus:border-[#FF8C9A] focus:ring-2 focus:ring-[#FF8C9A]/20 transition-all cursor-pointer"
              />
              <Search className="w-4 h-4 text-[#8E6B78] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </form>
          </div>

          {/* Right: Quick Action Icons (Truck, Bag, User) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Mobile Search trigger */}
            <button
              onClick={onOpenSearch}
              className="sm:hidden p-2 rounded-full text-[#633D4B] hover:bg-[#FCEEF2] transition-colors"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Delivery Truck (Track Order) */}
            <div className="relative">
              <button
                onClick={() => setShowOrderTracker(!showOrderTracker)}
                className="p-2 sm:p-2.5 rounded-full text-[#633D4B] hover:bg-[#FCEEF2] hover:text-[#FF8C9A] transition-colors relative cursor-pointer"
                title="Track Your Order"
                aria-label="Track Order"
              >
                <Truck className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#FF8C9A] ring-2 ring-white" />
              </button>

              {/* Order Tracker Popover */}
              {showOrderTracker && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-[#F5D5DE] p-4 z-50 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-[#FCEEF2]">
                    <span className="text-xs font-black text-[#633D4B] flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-[#FF8C9A]" />
                      <span>Track Sunscreen Shipment</span>
                    </span>
                    <button
                      onClick={() => setShowOrderTracker(false)}
                      className="text-[#8E6B78] hover:text-[#633D4B] cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <form onSubmit={handleTrackSubmit} className="mt-3 space-y-2">
                    <input
                      type="text"
                      placeholder="Enter Order ID (e.g. DK-98214)"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#F5D5DE] text-xs text-[#633D4B] focus:outline-none focus:border-[#FF8C9A]"
                    />
                    <button
                      type="submit"
                      className="w-full py-2 rounded-xl bg-[#FF8C9A] hover:bg-[#FF7586] text-white text-xs font-black transition-all cursor-pointer shadow-xs"
                    >
                      Track Order
                    </button>
                  </form>
                  {trackStatus && (
                    <div className="mt-3 p-2.5 rounded-xl bg-[#FCEEF2] border border-[#F5D5DE] text-[11px] text-[#633D4B] font-semibold leading-relaxed">
                      {trackStatus}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Shopping Bag Icon with Badge */}
            <button
              onClick={onOpenCart}
              className="p-2 sm:p-2.5 rounded-full text-[#633D4B] hover:bg-[#FCEEF2] transition-colors relative cursor-pointer"
              title="Shopping Bag"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="absolute top-1 right-0.5 sm:top-1.5 sm:right-1 min-w-4 h-4 px-1 rounded-full bg-[#FF8C9A] text-white text-[10px] font-black flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* User Account Icon */}
            <button
              onClick={onOpenAuth}
              className="p-2 sm:p-2.5 rounded-full text-[#633D4B] hover:bg-[#FCEEF2] transition-colors relative cursor-pointer"
              title={isLoggedIn ? `Logged in as ${userName}` : 'Sign In / Register'}
              aria-label="Account"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* 2. Sub-Navigation Bar (SHOP ALL, SKIN CONCERN, INGREDIENTS, SKIN TYPE, BEST SELLERS, NEW ARRIVALS, BLOGS) */}
        <div className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 py-2.5 border-t border-[#F5D5DE] text-xs font-bold uppercase tracking-wider text-[#633D4B]">
          {/* SHOP ALL */}
          <div
            className="relative group"
            onMouseEnter={() => setActiveDropdown('shop')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => onSelectConcern('All Sunscreens')}
              className="flex items-center gap-1 hover:text-[#FF8C9A] transition-colors cursor-pointer py-1"
            >
              <span>SHOP ALL</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8E6B78]" />
            </button>
            {activeDropdown === 'shop' && (
              <div className="absolute top-full left-0 w-56 bg-white rounded-2xl shadow-xl border border-[#F5D5DE] p-3 space-y-1 z-50 animate-fadeIn">
                <button
                  onClick={() => {
                    onSelectConcern('All Sunscreens');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#F9DDE5] hover:text-[#633D4B] transition-colors font-bold"
                >
                  ☀️ Sunscreens (SPF 50+)
                </button>
                <button
                  onClick={() => {
                    onSelectConcern('Lightweight Daily Sunscreen');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#F9DDE5] hover:text-[#633D4B] transition-colors font-bold"
                >
                  💧 Tinted Sunscreens &amp; Sticks
                </button>
                <button
                  onClick={() => {
                    onSelectConcern('Oily Skin');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#F9DDE5] hover:text-[#633D4B] transition-colors font-bold"
                >
                  🧴 Daily Matte Gel Creams
                </button>
                <button
                  onClick={() => {
                    onScrollToBestsellers();
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#F9DDE5] hover:text-[#FF8C9A] transition-colors font-black text-[#FF8C9A]"
                >
                  🔥 Viral Combos &amp; Kits
                </button>
              </div>
            )}
          </div>

          {/* SKIN CONCERN */}
          <div
            className="relative group"
            onMouseEnter={() => setActiveDropdown('concern')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={onScrollToConcerns}
              className="flex items-center gap-1 hover:text-[#FF8C9A] transition-colors cursor-pointer py-1"
            >
              <span>SKIN CONCERN</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8E6B78]" />
            </button>
            {activeDropdown === 'concern' && (
              <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-[#F5D5DE] p-3 space-y-1 z-50 animate-fadeIn">
                {[
                  { label: 'Oily & Acne-Prone Skin', concern: 'Oily Skin' as const },
                  { label: 'Dry & Damaged Barrier', concern: 'Dry Skin' as const },
                  { label: 'Sensitive & Red Skin', concern: 'Sensitive Skin' as const },
                  { label: 'Dull Skin & Dark Spots', concern: 'Dull-Looking Skin' as const },
                  { label: 'Combination T-Zone', concern: 'Combination Skin' as const },
                ].map((c) => (
                  <button
                    key={c.concern}
                    onClick={() => {
                      onSelectConcern(c.concern);
                      setActiveDropdown(null);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#F9DDE5] hover:text-[#633D4B] transition-colors font-bold"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INGREDIENTS */}
          <div
            className="relative group"
            onMouseEnter={() => setActiveDropdown('ingredients')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => onSelectConcern('All Sunscreens')}
              className="flex items-center gap-1 hover:text-[#FF8C9A] transition-colors cursor-pointer py-1"
            >
              <span>INGREDIENTS</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8E6B78]" />
            </button>
            {activeDropdown === 'ingredients' && (
              <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-[#F5D5DE] p-3 space-y-1 z-50 animate-fadeIn">
                <button
                  onClick={() => {
                    onSelectConcern('Combination Skin');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#F9DDE5] font-bold text-[#633D4B]"
                >
                  🍉 Watermelon &amp; Hyaluronic
                </button>
                <button
                  onClick={() => {
                    onSelectConcern('Dull-Looking Skin');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#F9DDE5] font-bold text-[#633D4B]"
                >
                  🍊 Vitamin C &amp; Blood Orange
                </button>
                <button
                  onClick={() => {
                    onSelectConcern('Oily Skin');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#F9DDE5] font-bold text-[#633D4B]"
                >
                  🌿 Cica &amp; Niacinamide
                </button>
                <button
                  onClick={() => {
                    onSelectConcern('Dry Skin');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#F9DDE5] font-bold text-[#633D4B]"
                >
                  💧 5 Ceramides &amp; Hyaluronic
                </button>
                <button
                  onClick={() => {
                    onSelectConcern('Lightweight Daily Sunscreen');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#F9DDE5] font-bold text-[#633D4B]"
                >
                  🍓 Strawberry Seed Oil
                </button>
              </div>
            )}
          </div>

          {/* SKIN TYPE */}
          <div
            className="relative group"
            onMouseEnter={() => setActiveDropdown('skinType')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={onScrollToConcerns}
              className="flex items-center gap-1 hover:text-[#FF8C9A] transition-colors cursor-pointer py-1"
            >
              <span>SKIN TYPE</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8E6B78]" />
            </button>
            {activeDropdown === 'skinType' && (
              <div className="absolute top-full left-0 w-56 bg-white rounded-2xl shadow-xl border border-[#F5D5DE] p-3 space-y-1 z-50 animate-fadeIn">
                <button
                  onClick={() => {
                    onSelectConcern('Oily Skin');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#F9DDE5] font-bold text-[#633D4B]"
                >
                  Oily Skin (Matte Finish)
                </button>
                <button
                  onClick={() => {
                    onSelectConcern('Dry Skin');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#F9DDE5] font-bold text-[#633D4B]"
                >
                  Dry Skin (Rich Hydration)
                </button>
                <button
                  onClick={() => {
                    onSelectConcern('Combination Skin');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#F9DDE5] font-bold text-[#633D4B]"
                >
                  Combination Skin (Aqua Dew)
                </button>
                <button
                  onClick={() => {
                    onSelectConcern('Sensitive Skin');
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-[#F9DDE5] font-bold text-[#633D4B]"
                >
                  Sensitive Skin (Fragrance Free)
                </button>
              </div>
            )}
          </div>

          {/* BEST SELLERS */}
          <button
            onClick={onScrollToBestsellers}
            className="hover:text-[#FF8C9A] transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>BEST SELLERS</span>
            <Flame className="w-3.5 h-3.5 text-[#FF8C9A] animate-bounce" />
          </button>

          {/* NEW ARRIVALS */}
          <button
            onClick={() => {
              const el = document.getElementById('shop-by-section') || document.getElementById('bestsellers-carousel');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#FF8C9A] transition-colors cursor-pointer"
          >
            NEW ARRIVALS
          </button>

          {/* BLOGS / SPF GUIDE */}
          <button
            onClick={() => {
              const el = document.getElementById('spf-guide-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else onOpenAbout();
            }}
            className="hover:text-[#FF8C9A] transition-colors cursor-pointer"
          >
            BLOGS
          </button>
        </div>
      </div>

      {/* 3. Promotional Gradient Banner Bar */}
      <div className="w-full px-2 sm:px-6 lg:px-8 pb-2 pt-1 bg-white">
        <button
          onClick={() => setShowOfferModal(true)}
          className="w-full py-2 sm:py-2.5 px-4 rounded-full bg-gradient-to-r from-[#F9DDE5] via-[#FCEEF2] to-[#F9DDE5] border border-[#F5D5DE] shadow-xs flex items-center justify-center gap-2 hover:shadow-md transition-all cursor-pointer group"
        >
          <Ticket className="w-4 h-4 text-[#FF8C9A] transform -rotate-12 group-hover:rotate-0 transition-transform" />
          <span className="text-xs sm:text-sm font-black text-[#633D4B] tracking-wide uppercase">
            UPTO 20% OFF <span className="font-semibold text-[#8E6B78]">+</span> <span className="text-[#FF8C9A] font-black italic">Free Gifts</span>
          </span>
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-[#FF8C9A] shadow-xs group-hover:translate-x-0.5 transition-transform border border-[#F5D5DE]">
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

      {/* Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#F5D5DE] text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#F9DDE5] to-[#FCEEF2] flex items-center justify-center mx-auto text-xl shadow-md border border-[#F5D5DE]">
              🎟️
            </div>
            <h3 className="text-xl font-black text-[#633D4B]">
              Unlock Up to 20% OFF + Free Gifts
            </h3>
            <p className="text-xs text-[#8E6B78] leading-relaxed">
              Use code <strong className="text-[#633D4B] font-black bg-[#F9DDE5] px-2 py-0.5 rounded-lg border border-[#F5D5DE]">GLOW20</strong> at checkout on all SPF 50+ Sunscreens. Orders above ₹999 receive a complimentary Mini Watermelon Face Wash!
            </p>
            <div className="p-3 bg-[#FCEEF2] rounded-2xl border border-[#F5D5DE] text-xs font-bold text-[#633D4B]">
              Coupon automatically applied for your session!
            </div>
            <button
              onClick={() => setShowOfferModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#FF8C9A] hover:bg-[#FF7586] text-white font-black text-xs cursor-pointer shadow-md shadow-[#FF8C9A]/30 transition-all"
            >
              Start Shopping Sunscreens
            </button>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#F5D5DE] bg-white px-4 pt-3 pb-6 space-y-2 animate-fadeIn shadow-xl">
          <div className="grid grid-cols-2 gap-2 pt-1 pb-3 text-xs font-bold">
            <button
              onClick={() => {
                onSelectConcern('All Sunscreens');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2.5 rounded-xl bg-[#FCEEF2] text-[#633D4B] hover:bg-[#F9DDE5]"
            >
              Shop All SPF 50+
            </button>
            <button
              onClick={() => {
                onScrollToBestsellers();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2.5 rounded-xl bg-[#FCEEF2] text-[#FF8C9A] hover:bg-[#F9DDE5] flex items-center justify-between font-black"
            >
              <span>Best Sellers</span>
              <Flame className="w-3.5 h-3.5 text-[#FF8C9A]" />
            </button>
            <button
              onClick={() => {
                onScrollToConcerns();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2.5 rounded-xl bg-[#FCEEF2] text-[#633D4B] hover:bg-[#F9DDE5]"
            >
              Skin Concerns
            </button>
            <button
              onClick={() => {
                onOpenQuiz();
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2.5 rounded-xl bg-[#F9DDE5] text-[#633D4B] font-black border border-[#F5D5DE]"
            >
              SPF Match Quiz
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
