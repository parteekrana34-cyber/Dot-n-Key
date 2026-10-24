import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, Sparkles, Gift, Sun, Moon } from 'lucide-react';
import { VelmoraLogo } from './VelmoraLogo';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenFragranceFinder: () => void;
  onOpenGiftBoxBuilder: () => void;
  onSelectCategory: (category: string) => void;
  onNavigateHome: () => void;
  onNavigateStory: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
  onOpenFragranceFinder,
  onOpenGiftBoxBuilder,
  onSelectCategory,
  onNavigateHome,
  onNavigateStory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLight, toggleTheme } = useTheme();

  const handleNavClick = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Privilege Ribbon */}
      <div className={`py-1.5 px-4 text-center text-xs transition-colors duration-300 border-b ${
        isLight 
          ? 'bg-gradient-to-r from-[#F4EFE6] via-[#EFE5D5] to-[#F4EFE6] border-[#9A742A]/25 text-[#591D2D]' 
          : 'bg-gradient-to-r from-[#171515] via-[#421C27] to-[#171515] border-[#C2A064]/20 text-[#DFC48E]'
      }`}>
        <div className="flex items-center justify-center gap-2 max-w-7xl mx-auto">
          <Sparkles className={`w-3.5 h-3.5 animate-pulse ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
          <span className="tracking-widest uppercase font-sans text-[11px] font-medium">
            Maison Velmora: Complimentary White-Glove Courier & 2 Extrait Discovery Vials with Every Order
          </span>
          <Sparkles className={`w-3.5 h-3.5 animate-pulse hidden sm:inline ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className={`backdrop-blur-xl border-b transition-colors duration-300 ${
        isLight 
          ? 'bg-[#FAF7F2]/95 border-[#9A742A]/20 shadow-[0_4px_25px_rgba(154,116,42,0.06)]' 
          : 'bg-[#171515]/90 border-[#C2A064]/25 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isLight ? 'text-[#1A1616] hover:text-[#9A742A]' : 'text-[#F3EDE3] hover:text-[#C2A064]'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <button
            onClick={onNavigateHome}
            className="flex items-center text-left focus:outline-none group"
          >
            <VelmoraLogo size="md" />
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-7">
            <button
              onClick={onNavigateHome}
              className={`text-xs tracking-[0.2em] uppercase font-sans transition-colors relative py-1 group ${
                isLight ? 'text-[#1A1616] hover:text-[#9A742A]' : 'text-[#F3EDE3] hover:text-[#C2A064]'
              }`}
            >
              Home
              <span className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                isLight ? 'bg-[#9A742A]' : 'bg-[#C2A064]'
              }`} />
            </button>

            <button
              onClick={() => onSelectCategory('All Scents')}
              className={`text-xs tracking-[0.2em] uppercase font-sans transition-colors relative py-1 group ${
                isLight ? 'text-[#1A1616] hover:text-[#9A742A]' : 'text-[#F3EDE3] hover:text-[#C2A064]'
              }`}
            >
              Shop All
              <span className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                isLight ? 'bg-[#9A742A]' : 'bg-[#C2A064]'
              }`} />
            </button>

            <button
              onClick={() => onSelectCategory('Woody & Oud')}
              className={`text-xs tracking-[0.2em] uppercase font-sans transition-colors relative py-1 group ${
                isLight ? 'text-[#1A1616] hover:text-[#9A742A]' : 'text-[#F3EDE3] hover:text-[#C2A064]'
              }`}
            >
              Woody & Oud
              <span className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                isLight ? 'bg-[#9A742A]' : 'bg-[#C2A064]'
              }`} />
            </button>

            <button
              onClick={() => onSelectCategory('Floral')}
              className={`text-xs tracking-[0.2em] uppercase font-sans transition-colors relative py-1 group ${
                isLight ? 'text-[#1A1616] hover:text-[#9A742A]' : 'text-[#F3EDE3] hover:text-[#C2A064]'
              }`}
            >
              Floral
              <span className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                isLight ? 'bg-[#9A742A]' : 'bg-[#C2A064]'
              }`} />
            </button>

            <button
              onClick={() => onSelectCategory('Amber & Spicy')}
              className={`text-xs tracking-[0.2em] uppercase font-sans transition-colors relative py-1 group ${
                isLight ? 'text-[#1A1616] hover:text-[#9A742A]' : 'text-[#F3EDE3] hover:text-[#C2A064]'
              }`}
            >
              Amber & Spicy
              <span className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                isLight ? 'bg-[#9A742A]' : 'bg-[#C2A064]'
              }`} />
            </button>

            {/* Interactive Fragrance Finder Pill */}
            <button
              onClick={onOpenFragranceFinder}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border transition-all duration-300 text-xs tracking-wider uppercase font-medium ${
                isLight
                  ? 'border-[#9A742A]/50 bg-[#F4EFE6] text-[#591D2D] hover:bg-[#591D2D] hover:text-[#FAF7F2] hover:border-[#591D2D] shadow-[0_2px_10px_rgba(154,116,42,0.12)]'
                  : 'border-[#C2A064]/50 bg-[#421C27]/40 text-[#DFC48E] hover:bg-[#421C27] hover:border-[#C2A064] shadow-[0_0_12px_rgba(194,160,100,0.2)]'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
              <span>Fragrance Finder</span>
            </button>

            {/* Bespoke Gift Box */}
            <button
              onClick={onOpenGiftBoxBuilder}
              className={`flex items-center gap-1.5 text-xs tracking-[0.18em] uppercase font-sans transition-colors relative py-1 group ${
                isLight ? 'text-[#591D2D] hover:text-[#9A742A]' : 'text-[#DFC48E] hover:text-white'
              }`}
            >
              <Gift className={`w-3.5 h-3.5 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
              <span>Bespoke Gift Box</span>
            </button>

            <button
              onClick={onNavigateStory}
              className={`text-xs tracking-[0.2em] uppercase font-sans transition-colors relative py-1 group ${
                isLight ? 'text-[#4A4345] hover:text-[#9A742A]' : 'text-[#F3EDE3]/80 hover:text-[#C2A064]'
              }`}
            >
              Our Story
              <span className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                isLight ? 'bg-[#9A742A]' : 'bg-[#C2A064]'
              }`} />
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Theme Toggle (Light / Dark) */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all duration-300 flex items-center justify-center ${
                isLight 
                  ? 'border-[#9A742A]/40 bg-[#F4EFE6] text-[#1A1616] hover:bg-[#EDE5D5] hover:text-[#9A742A] shadow-sm' 
                  : 'border-[#C2A064]/40 bg-[#1E1A1B] text-[#DFC48E] hover:bg-[#282224] hover:text-[#C2A064]'
              }`}
              aria-label="Toggle Light/Dark Theme"
              title={isLight ? 'Switch to Dark Opulent Theme' : 'Switch to Light Luxury Theme'}
            >
              {isLight ? (
                <Moon className="w-4 h-4 text-[#7A5B1F]" />
              ) : (
                <Sun className="w-4 h-4 text-[#DFC48E]" />
              )}
            </button>

            {/* Search */}
            <button
              onClick={onOpenSearch}
              className={`p-2 transition-colors relative ${
                isLight ? 'text-[#1A1616] hover:text-[#9A742A]' : 'text-[#F3EDE3] hover:text-[#C2A064]'
              }`}
              aria-label="Search Fragrances"
              title="Search fragrances and notes"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account */}
            <button
              onClick={onOpenAccount}
              className={`p-2 transition-colors ${
                isLight ? 'text-[#1A1616] hover:text-[#9A742A]' : 'text-[#F3EDE3] hover:text-[#C2A064]'
              }`}
              aria-label="Client Account"
              title="VIP Client Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className={`p-2 transition-colors relative ${
                isLight ? 'text-[#1A1616] hover:text-[#9A742A]' : 'text-[#F3EDE3] hover:text-[#C2A064]'
              }`}
              aria-label="Wishlist"
              title="Saved Fragrances"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className={`absolute top-1 right-1 w-4 h-4 text-[10px] font-bold rounded-full flex items-center justify-center leading-none ${
                  isLight 
                    ? 'bg-[#591D2D] text-[#FAF7F2]' 
                    : 'bg-[#421C27] border border-[#C2A064] text-[#F3EDE3]'
                }`}>
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button
              onClick={onOpenCart}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 relative group ${
                isLight
                  ? 'border-[#9A742A]/40 bg-[#FFFFFF] text-[#1A1616] hover:border-[#9A742A] hover:bg-[#F4EFE6] shadow-sm'
                  : 'border-[#C2A064]/40 bg-[#1E1A1B] text-[#F3EDE3] hover:border-[#C2A064] hover:bg-[#2A1820]'
              }`}
              aria-label="Shopping Bag"
              title="View Shopping Bag"
            >
              <ShoppingBag className={`w-5 h-5 group-hover:scale-110 transition-transform ${
                isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'
              }`} />
              <span className="text-xs font-semibold tracking-wider font-sans">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden backdrop-blur-2xl border-b px-6 py-6 animate-fade-in space-y-4 transition-colors duration-300 ${
          isLight 
            ? 'bg-[#FAF7F2]/98 border-[#9A742A]/25 shadow-xl text-[#1A1616]' 
            : 'bg-[#171515]/95 border-[#C2A064]/30 text-[#F3EDE3]'
        }`}>
          {/* Theme switch row in mobile */}
          <div className="flex items-center justify-between pb-3 border-b border-[#9A742A]/20">
            <span className="text-xs uppercase tracking-widest font-sans font-medium">Appearance</span>
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${
                isLight 
                  ? 'bg-[#FFFFFF] border-[#9A742A]/40 text-[#591D2D]' 
                  : 'bg-[#1E1A1B] border-[#C2A064]/40 text-[#DFC48E]'
              }`}
            >
              {isLight ? <Moon className="w-3.5 h-3.5 text-[#7A5B1F]" /> : <Sun className="w-3.5 h-3.5 text-[#DFC48E]" />}
              <span>{isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 pb-3 border-b border-[#9A742A]/20">
            <button
              onClick={() => handleNavClick(onNavigateHome)}
              className={`text-left py-2 text-sm tracking-wider uppercase font-sans ${
                isLight ? 'text-[#1A1616] hover:text-[#9A742A]' : 'text-[#F3EDE3] hover:text-[#C2A064]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick(() => onSelectCategory('All Scents'))}
              className={`text-left py-2 text-sm tracking-wider uppercase font-sans ${
                isLight ? 'text-[#1A1616] hover:text-[#9A742A]' : 'text-[#F3EDE3] hover:text-[#C2A064]'
              }`}
            >
              Shop All
            </button>
            <button
              onClick={() => handleNavClick(() => onSelectCategory('Woody & Oud'))}
              className={`text-left py-2 text-sm tracking-wider uppercase font-sans ${
                isLight ? 'text-[#1A1616] hover:text-[#9A742A]' : 'text-[#F3EDE3] hover:text-[#C2A064]'
              }`}
            >
              Woody & Oud
            </button>
            <button
              onClick={() => handleNavClick(() => onSelectCategory('Floral'))}
              className={`text-left py-2 text-sm tracking-wider uppercase font-sans ${
                isLight ? 'text-[#1A1616] hover:text-[#9A742A]' : 'text-[#F3EDE3] hover:text-[#C2A064]'
              }`}
            >
              Floral
            </button>
            <button
              onClick={() => handleNavClick(() => onSelectCategory('Amber & Spicy'))}
              className={`text-left py-2 text-sm tracking-wider uppercase font-sans ${
                isLight ? 'text-[#1A1616] hover:text-[#9A742A]' : 'text-[#F3EDE3] hover:text-[#C2A064]'
              }`}
            >
              Amber & Spicy
            </button>
            <button
              onClick={() => handleNavClick(() => onSelectCategory('Fresh & Citrus'))}
              className={`text-left py-2 text-sm tracking-wider uppercase font-sans ${
                isLight ? 'text-[#1A1616] hover:text-[#9A742A]' : 'text-[#F3EDE3] hover:text-[#C2A064]'
              }`}
            >
              Fresh & Citrus
            </button>
            <button
              onClick={() => handleNavClick(() => onSelectCategory('Aquatic'))}
              className={`text-left py-2 text-sm tracking-wider uppercase font-sans ${
                isLight ? 'text-[#1A1616] hover:text-[#9A742A]' : 'text-[#F3EDE3] hover:text-[#C2A064]'
              }`}
            >
              Aquatic
            </button>
            <button
              onClick={() => handleNavClick(() => onSelectCategory('Luxury Gift Sets'))}
              className={`text-left py-2 text-sm tracking-wider uppercase font-sans ${
                isLight ? 'text-[#1A1616] hover:text-[#9A742A]' : 'text-[#F3EDE3] hover:text-[#C2A064]'
              }`}
            >
              Gift Sets
            </button>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => handleNavClick(onOpenFragranceFinder)}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg border font-medium text-sm tracking-wider uppercase transition-colors ${
                isLight
                  ? 'border-[#9A742A] bg-[#591D2D] text-[#FAF7F2] hover:bg-[#6E2437]'
                  : 'border-[#C2A064] bg-[#421C27] text-[#DFC48E] hover:bg-[#522331]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#DFC48E]" />
              Find Your Signature Scent (Quiz)
            </button>

            <button
              onClick={() => handleNavClick(onOpenGiftBoxBuilder)}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg border font-medium text-sm tracking-wider uppercase transition-colors ${
                isLight
                  ? 'border-[#9A742A]/40 bg-[#FFFFFF] text-[#1A1616] hover:bg-[#F4EFE6]'
                  : 'border-[#C2A064]/50 bg-[#1E1A1B] text-[#F3EDE3] hover:bg-[#252021]'
              }`}
            >
              <Gift className={`w-4 h-4 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
              Create a Bespoke Gift Box
            </button>

            <button
              onClick={() => handleNavClick(onNavigateStory)}
              className={`text-center py-2 text-xs tracking-widest uppercase font-sans ${
                isLight ? 'text-[#73696B] hover:text-[#9A742A]' : 'text-[#A89F93] hover:text-[#C2A064]'
              }`}
            >
              Our Story & Haute Parfumerie
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
