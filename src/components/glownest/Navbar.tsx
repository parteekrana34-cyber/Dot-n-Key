import React, { useState } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Sparkles,
  Flame,
  Stars,
} from 'lucide-react';
import { DotKeyLogo } from './GlowNestLogo';
import { SkincareCategory } from '../../types/skincare';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  activeCategory: string;
  onSelectCategory: (category: SkincareCategory | string) => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
  onOpenSkinQuiz: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onScrollToTop: () => void;
  onScrollToBestsellers: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  activeCategory,
  onSelectCategory,
  onOpenSearch,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  onOpenSkinQuiz,
  onOpenAbout,
  onOpenContact,
  onScrollToTop,
  onScrollToBestsellers,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact navigation items from user specification:
  // Home, Shop All, Sunscreens, Moisturizers, Serums, Face Wash, Lip Care, Bestsellers, and New Arrivals.
  const navLinks = [
    { label: 'Home', action: onScrollToTop, isHome: true },
    { label: 'Shop All', category: 'All Products' },
    { label: 'Sunscreens', category: 'Sunscreens' },
    { label: 'Moisturizers', category: 'Moisturizers' },
    { label: 'Serums', category: 'Face Serums' },
    { label: 'Face Wash', category: 'Face Washes' },
    { label: 'Lip Care', category: 'Lip Care' },
    { label: 'Toners', category: 'Toners' },
    { label: 'Combos', category: 'Skincare Combos' },
    { label: 'Bestsellers', action: onScrollToBestsellers, isBestseller: true },
    { label: 'New Arrivals', filterTag: 'new' },
  ];

  const handleNavClick = (link: (typeof navLinks)[0]) => {
    if (link.action) {
      link.action();
    } else if (link.category) {
      onSelectCategory(link.category as SkincareCategory);
    } else if (link.filterTag === 'new') {
      onSelectCategory('NEW_ARRIVALS');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#F0E6E1] transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Left: Mobile hamburger & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#3D3338] hover:bg-[#FFE5EC]/50 hover:text-[#FF6584] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button
              onClick={onScrollToTop}
              className="focus:outline-none flex items-center cursor-pointer text-left"
            >
              <DotKeyLogo size="md" />
            </button>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive =
                (link.isHome && activeCategory === 'All Products') ||
                (link.category && activeCategory === link.category) ||
                (link.filterTag === 'new' && activeCategory === 'NEW_ARRIVALS');

              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className={`px-2.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center gap-1 ${
                    isActive
                      ? 'bg-[#FFE5EC] text-[#FF6584] shadow-xs font-bold'
                      : link.isBestseller
                      ? 'text-[#E11D48] hover:bg-[#FFF0F3]'
                      : 'text-[#4A3F45] hover:text-[#FF6584] hover:bg-[#FFF5F7]'
                  }`}
                >
                  {link.isBestseller && <Flame className="w-3.5 h-3.5 text-[#E11D48] animate-bounce" />}
                  {link.filterTag === 'new' && <Stars className="w-3.5 h-3.5 text-[#8B5CF6]" />}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions, Skin Quiz & Badged Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Skin Quiz CTA */}
            <button
              onClick={onOpenSkinQuiz}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FFE5EC] to-[#EDE9FE] text-[#B91C1C] border border-[#FECDD3] hover:shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF6584]" />
              Skin Quiz
            </button>

            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-full text-[#4A3F45] hover:text-[#FF6584] hover:bg-[#FFF0F3] transition-colors relative cursor-pointer"
              title="Search skincare products"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Icon */}
            <button
              onClick={onOpenAccount}
              className="p-2.5 rounded-full text-[#4A3F45] hover:text-[#FF6584] hover:bg-[#FFF0F3] transition-colors relative cursor-pointer"
              title="My Account & Rewards"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist Icon with badge */}
            <button
              onClick={onOpenWishlist}
              className="p-2.5 rounded-full text-[#4A3F45] hover:text-[#FF6584] hover:bg-[#FFF0F3] transition-colors relative cursor-pointer"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#FF6584] text-white text-[10px] font-bold flex items-center justify-center shadow-xs animate-scale-in">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Icon with badge */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-1.5 pl-3 pr-4 py-2 rounded-full bg-[#1E1B1D] text-white hover:bg-[#FF6584] transition-all shadow-sm cursor-pointer ml-1"
              title="Shopping Bag"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="text-xs font-bold">{cartCount}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#F0E6E1] bg-white px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-xl">
          <div className="grid grid-cols-2 gap-2 pt-1 pb-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-[#4A3F45] hover:bg-[#FFE5EC] hover:text-[#FF6584] flex items-center justify-between"
              >
                <span>{link.label}</span>
                {link.isBestseller && <Flame className="w-3.5 h-3.5 text-[#E11D48]" />}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#F0E6E1] flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenSkinQuiz();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FF6584] to-[#F43F5E] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              Find My 3-Step Routine (Quiz)
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  onOpenAbout();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 text-xs font-bold text-center rounded-lg bg-[#F5F2F0] text-[#63575F]"
              >
                About Dot &amp; Key
              </button>
              <button
                onClick={() => {
                  onOpenContact();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2 text-xs font-bold text-center rounded-lg bg-[#F5F2F0] text-[#63575F]"
              >
                Contact &amp; Help
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
