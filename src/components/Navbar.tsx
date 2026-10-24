import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Sparkles, 
  LogOut, 
  ShieldCheck, 
  Package, 
  ChevronDown,
  LayoutDashboard
} from 'lucide-react';
import { UserProfile } from '../types/jewellery';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onOpenAdmin: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
  currentUser: UserProfile | null;
  onLogout: () => void;
  onOpenOrders?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAuth,
  onOpenAdmin,
  onNavigate,
  activeSection = 'home',
  currentUser,
  onLogout,
  onOpenOrders,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Collections', id: 'collections' },
    { label: 'New Arrivals', id: 'new-arrivals' },
    { label: 'Best Sellers', id: 'best-sellers' },
    { label: 'About Us', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const isLoggedIn = !!currentUser;
  const userName = currentUser?.name || '';
  const isAdmin = currentUser?.role === 'admin';

  return (
    <>
      {/* Top Luxury Announcement Bar - Refined & Customer-Facing */}
      <div className="bg-[#241F1C] text-[#EFEAE2] text-[11px] sm:text-xs py-2 px-4 sm:px-8 tracking-widest uppercase font-sans border-b border-[#3D342F] flex items-center justify-between">
        <div className="hidden lg:flex items-center gap-2 text-[#C5A880] text-[10px]">
          <span>Atelier Salons: Milan · Antwerp · Mumbai</span>
        </div>

        <div className="flex items-center justify-center gap-2 mx-auto lg:mx-0">
          <Sparkles className="w-3 h-3 text-[#C5A880] shrink-0" />
          <span>Complimentary Insured Courier &amp; Bespoke Packaging Across India (Orders &gt; ₹25,000)</span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[10px] text-[#B5A69B]">
          <span>Currency: INR (₹)</span>
          <span className="text-[#594C44]">|</span>
          <span className="text-[#C5A880]">Certified GIA &amp; IGI</span>
        </div>
      </div>

      {/* Sticky Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/98 backdrop-blur-md shadow-sm border-b border-[#E6DFD5]'
            : 'bg-[#FAF7F2] border-b border-[#EDE6DC]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu trigger */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#2A2421] hover:text-[#8C6D46] transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo - Zone 1 */}
            <div className="flex-1 md:flex-initial text-center md:text-left">
              <button
                onClick={() => handleLinkClick('home')}
                className="group inline-flex flex-col items-center md:items-start text-left focus:outline-none"
              >
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.24em] font-medium text-[#2A2421] group-hover:text-[#8C6D46] transition-colors uppercase">
                  PAYORA JEWELS
                </span>
                <span className="text-[9px] tracking-[0.38em] text-[#8C7B70] uppercase font-sans -mt-1 hidden sm:block">
                  Haute Joaillerie Atelier
                </span>
              </button>
            </div>

            {/* Navigation Links - Zone 2 */}
            <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
              {navLinks.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className={`text-xs uppercase tracking-[0.18em] transition-colors relative py-1 font-medium ${
                      isActive
                        ? 'text-[#2A2421] font-semibold'
                        : 'text-[#645850] hover:text-[#2A2421]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A880]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action Icons - Zone 3 */}
            <div className="flex items-center space-x-1 sm:space-x-3">
              {/* Search */}
              <button
                onClick={onOpenSearch}
                className="p-2 text-[#4A3F38] hover:text-[#2A2421] hover:bg-[#F3EDE2] rounded-full transition-colors relative focus:outline-none"
                aria-label="Search jewelry catalog"
                title="Search collection"
              >
                <Search className="w-5 h-5 stroke-[1.6]" />
              </button>

              {/* Wishlist */}
              <button
                onClick={onOpenWishlist}
                className="p-2 text-[#4A3F38] hover:text-[#2A2421] hover:bg-[#F3EDE2] rounded-full transition-colors relative focus:outline-none"
                aria-label="View wishlist"
                title="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.6]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#8C6D46] text-white text-[10px] font-sans font-semibold rounded-full flex items-center justify-center tabular-nums shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag / Cart */}
              <button
                onClick={onOpenCart}
                className="p-2 text-[#4A3F38] hover:text-[#2A2421] hover:bg-[#F3EDE2] rounded-full transition-colors relative focus:outline-none"
                aria-label="View shopping bag"
                title="Cart"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.6]" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#2A2421] text-[#EFEAE2] text-[10px] font-sans font-semibold rounded-full flex items-center justify-center tabular-nums shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Profile / Account Dropdown */}
              <div className="relative" ref={profileMenuRef}>
                {isLoggedIn ? (
                  <div>
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="p-1.5 sm:px-3 sm:py-1.5 text-[#4A3F38] hover:text-[#2A2421] hover:bg-[#F3EDE2] rounded-full sm:rounded-sm transition-colors relative focus:outline-none flex items-center gap-2 border border-transparent hover:border-[#DDD3C7]"
                      aria-label="User Account Menu"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#2A2421] text-[#EFEAE2] flex items-center justify-center font-serif text-xs font-semibold">
                        {userName ? userName.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <span className="hidden lg:inline text-xs font-sans font-medium text-[#2A2421] max-w-[100px] truncate">
                        {userName}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#8C7B70] hidden lg:block" />
                    </button>

                    {/* Functional Profile Dropdown Menu */}
                    {profileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-72 bg-[#FAF7F2] border border-[#DDD3C7] shadow-2xl py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                        {/* Profile Info Header */}
                        <div className="px-4 py-3 border-b border-[#EAE3D8] bg-[#F5EFEB]">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#2A2421] text-[#FAF7F2] flex items-center justify-center font-serif text-lg">
                              {userName ? userName.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-serif text-sm font-semibold text-[#2A2421] truncate">
                                {userName}
                              </p>
                              <p className="text-[11px] text-[#8C7B70] truncate">
                                {currentUser?.email}
                              </p>
                              <span className="inline-block mt-0.5 text-[9px] uppercase tracking-wider text-[#8C6D46] font-semibold">
                                {isAdmin ? 'Authorized Administrator' : 'VIP Atelier Member'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Menu Actions */}
                        <div className="py-2 text-xs">
                          {isAdmin && (
                            <button
                              onClick={() => {
                                setProfileDropdownOpen(false);
                                onOpenAdmin();
                              }}
                              className="w-full text-left px-4 py-2.5 text-[#8C6D46] hover:bg-[#F2ECE2] flex items-center gap-2.5 font-semibold transition-colors"
                            >
                              <LayoutDashboard className="w-4 h-4 text-[#8C6D46]" />
                              <span>Open Atelier Admin Dashboard</span>
                            </button>
                          )}

                          <button
                            onClick={() => {
                              setProfileDropdownOpen(false);
                              if (onOpenOrders) onOpenOrders();
                              else onOpenAuth();
                            }}
                            className="w-full text-left px-4 py-2 text-[#4A3F38] hover:bg-[#F2ECE2] flex items-center gap-2.5 transition-colors"
                          >
                            <Package className="w-4 h-4 text-[#8C7B70]" />
                            <span>My Acquisitions &amp; Orders</span>
                          </button>

                          <button
                            onClick={() => {
                              setProfileDropdownOpen(false);
                              onOpenWishlist();
                            }}
                            className="w-full text-left px-4 py-2 text-[#4A3F38] hover:bg-[#F2ECE2] flex items-center justify-between transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <Heart className="w-4 h-4 text-[#8C7B70]" />
                              <span>Saved Pieces (Wishlist)</span>
                            </div>
                            {wishlistCount > 0 && (
                              <span className="text-[10px] bg-[#E5DDD0] px-1.5 py-0.5 rounded text-[#2A2421] font-semibold">
                                {wishlistCount}
                              </span>
                            )}
                          </button>

                          <button
                            onClick={() => {
                              setProfileDropdownOpen(false);
                              onOpenAuth();
                            }}
                            className="w-full text-left px-4 py-2 text-[#4A3F38] hover:bg-[#F2ECE2] flex items-center gap-2.5 transition-colors"
                          >
                            <User className="w-4 h-4 text-[#8C7B70]" />
                            <span>Account Details &amp; Addresses</span>
                          </button>
                        </div>

                        {/* Logout Divider */}
                        <div className="pt-2 border-t border-[#EAE3D8] px-2">
                          <button
                            onClick={() => {
                              setProfileDropdownOpen(false);
                              onLogout();
                            }}
                            className="w-full text-left px-3 py-2 text-red-800 hover:bg-red-50 text-xs flex items-center gap-2 font-medium transition-colors"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out of Atelier</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Guest: Sign In Button */
                  <button
                    onClick={onOpenAuth}
                    className="p-2 sm:px-3 sm:py-1.5 text-[#4A3F38] hover:text-[#2A2421] hover:bg-[#F3EDE2] rounded-full sm:rounded-sm transition-colors relative focus:outline-none flex items-center gap-1.5 text-xs font-medium"
                    aria-label="Sign In"
                    title="Client Sign In"
                  >
                    <User className="w-5 h-5 stroke-[1.6]" />
                    <span className="hidden sm:inline uppercase tracking-wider text-[11px] font-semibold">
                      Sign In
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF7F2] border-b border-[#E6DFD5] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className="text-left text-sm uppercase tracking-[0.16em] text-[#2A2421] py-2 border-b border-[#F0EAE1] hover:text-[#8C6D46] transition-colors"
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile Account Row */}
              {isLoggedIn ? (
                <div className="pt-2 pb-1 space-y-2">
                  <div className="flex items-center justify-between text-xs py-2 border-b border-[#F0EAE1]">
                    <span className="text-[#6E6056]">Signed in as:</span>
                    <strong className="text-[#2A2421] font-semibold">{userName}</strong>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAdmin();
                      }}
                      className="w-full text-left text-xs uppercase tracking-wider text-[#8C6D46] font-semibold py-2"
                    >
                      Open Admin Dashboard &rarr;
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left text-xs uppercase tracking-wider text-red-800 font-medium py-2"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="text-left text-sm uppercase tracking-[0.16em] text-[#8C6D46] font-semibold py-2 border-b border-[#F0EAE1] hover:text-[#2A2421] transition-colors"
                >
                  Sign In / Create Account &rarr;
                </button>
              )}
            </div>

            <div className="pt-3 flex items-center justify-between text-xs text-[#8C7B70]">
              <span>Complimentary Concierge Consultation</span>
              <span className="text-[#2A2421] font-semibold">18K &amp; Certified Gems</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
