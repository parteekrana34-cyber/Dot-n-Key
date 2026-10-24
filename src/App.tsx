import React, { useState, useEffect } from 'react';
import { SUNSCREEN_PRODUCTS } from './data/sunscreenCatalog';
import {
  SunscreenProduct,
  CartItem,
  SkinConcernCategory,
  UserAccount,
} from './types/sunscreen';

// Sunscreen Store Components
import { AnnouncementBar } from './components/sunscreen/AnnouncementBar';
import { Navbar } from './components/sunscreen/Navbar';
import { HeroBannerSlider } from './components/sunscreen/HeroBannerSlider';
import { MostLovedComparisonChart } from './components/sunscreen/MostLovedComparisonChart';
import { ProductCarousel } from './components/sunscreen/ProductCarousel';
import { ShopBySection } from './components/sunscreen/ShopBySection';
import { ExploreRangeSection } from './components/sunscreen/ExploreRangeSection';
import { ShopBySkinConcern } from './components/sunscreen/ShopBySkinConcern';
import { ProductGrid } from './components/sunscreen/ProductGrid';
import { SpfEducationSection } from './components/sunscreen/SpfEducationSection';
import { SunscreenReviewsSection } from './components/sunscreen/SunscreenReviewsSection';
import { SunscreenFaqSection } from './components/sunscreen/SunscreenFaqSection';
import { SummerFlatlayShowcase } from './components/sunscreen/SummerFlatlayShowcase';
import { WatermelonMotionShowcase } from './components/sunscreen/WatermelonMotionShowcase';
import { Footer } from './components/sunscreen/Footer';
import { ScrollControls } from './components/sunscreen/ScrollControls';

// Modals & Drawers
import { ProductDetailModal } from './components/sunscreen/ProductDetailModal';
import { CartDrawer } from './components/sunscreen/CartDrawer';
import { WishlistDrawer } from './components/sunscreen/WishlistDrawer';
import { SearchModal } from './components/sunscreen/SearchModal';
import { SunscreenFinderQuizModal } from './components/sunscreen/SunscreenFinderQuizModal';
import { AuthModal } from './components/sunscreen/AuthModal';
import { CheckoutModal } from './components/sunscreen/CheckoutModal';
import { AboutSunscreenModal } from './components/sunscreen/AboutSunscreenModal';
import { AdminDashboardModal } from './components/sunscreen/AdminDashboardModal';

// Mobile Bottom Navigation Bar Icons
import { Home, Sun, Heart, ShoppingBag, Grid, Sparkles, Shield } from 'lucide-react';

export default function App() {
  const [products] = useState<SunscreenProduct[]>(SUNSCREEN_PRODUCTS);
  const [selectedConcern, setSelectedConcern] = useState<SkinConcernCategory>('All Sunscreens');

  // Active product for dedicated details view / modal
  const [activeProduct, setActiveProduct] = useState<SunscreenProduct | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Cart State (Persisted in localStorage)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('dotkey_sunscreen_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Default starter item showcasing Watermelon Sunscreen
    return [
      {
        cartId: `sample-cart-watermelon-1`,
        productId: SUNSCREEN_PRODUCTS[0].id,
        name: SUNSCREEN_PRODUCTS[0].name,
        subtitle: SUNSCREEN_PRODUCTS[0].subtitle,
        spf: SUNSCREEN_PRODUCTS[0].spfRating,
        size: '50g Tube',
        price: SUNSCREEN_PRODUCTS[0].price,
        originalPrice: SUNSCREEN_PRODUCTS[0].originalPrice,
        image: SUNSCREEN_PRODUCTS[0].image,
        quantity: 1,
        finish: SUNSCREEN_PRODUCTS[0].finish,
      },
    ];
  });

  // Wishlist State (Persisted in localStorage)
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dotkey_sunscreen_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [SUNSCREEN_PRODUCTS[1].id, SUNSCREEN_PRODUCTS[5].id];
  });

  // User Account State
  const [user, setUser] = useState<UserAccount>(() => {
    try {
      const saved = localStorage.getItem('dotkey_sunscreen_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      name: 'Ananya',
      email: 'ananya@example.com',
      phone: '9876543210',
      isLoggedIn: true,
      savedAddresses: [],
      glowPoints: 250,
    };
  });

  // Modals Visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dotkey_sunscreen_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('dotkey_sunscreen_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('dotkey_sunscreen_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  // Derived counts
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  // Cart Handlers
  const handleAddToCart = (product: SunscreenProduct, size: string, quantity = 1) => {
    const sizeObj = product.sizes.find((s) => s.size === size) || product.sizes[0];
    const existingIndex = cartItems.findIndex(
      (item) => item.productId === product.id && item.size === size
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        cartId: `${product.id}-${size}-${Date.now()}`,
        productId: product.id,
        name: product.name,
        subtitle: product.subtitle,
        spf: product.spfRating,
        size: size,
        price: sizeObj.price,
        originalPrice: sizeObj.originalPrice || product.originalPrice,
        image: product.image,
        quantity: quantity,
        finish: product.finish,
      };
      setCartItems((prev) => [newItem, ...prev]);
    }
  };

  const handleAddToCartFromShopBy = (item: {
    id: string;
    name: string;
    price: number;
    size: string;
    image: string;
    subtitle?: string;
  }) => {
    const existingIndex = cartItems.findIndex(
      (ci) => ci.productId === item.id && ci.size === item.size
    );
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        cartId: `${item.id}-${item.size}-${Date.now()}`,
        productId: item.id,
        name: item.name,
        subtitle: item.subtitle || 'Bloom & Blush Skincare',
        spf: 'SPF 50+',
        size: item.size,
        price: item.price,
        originalPrice: Math.round(item.price * 1.18),
        image: item.image,
        quantity: 1,
        finish: 'Water-Light Glow',
      };
      setCartItems((prev) => [newItem, ...prev]);
    }
  };

  const handleBuyNow = (product: SunscreenProduct, size: string, quantity = 1) => {
    handleAddToCart(product, size, quantity);
    setIsDetailModalOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateCartQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(cartId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: SunscreenProduct) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const handleRemoveFromWishlist = (product: SunscreenProduct) => {
    setWishlistIds((prev) => prev.filter((id) => id !== product.id));
  };

  // Detail Modal
  const handleOpenDetailModal = (product: SunscreenProduct) => {
    setActiveProduct(product);
    setIsDetailModalOpen(true);
  };

  // Navigation and Scrolling
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToBestsellers = () => {
    const el = document.getElementById('bestsellers-carousel');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToConcerns = () => {
    const el = document.getElementById('skin-concerns-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToCatalog = () => {
    setSelectedConcern('All Sunscreens');
    const el = document.getElementById('sunscreen-catalog-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToFaqs = () => {
    const el = document.getElementById('sunscreen-faqs-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FCEEF2] text-[#633D4B] flex flex-col font-sans selection:bg-[#F9DDE5] selection:text-[#633D4B] pb-16 sm:pb-0">
      {/* 1. Slim Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        userName={user.name}
        isLoggedIn={user.isLoggedIn}
        activeConcern={selectedConcern}
        onSelectConcern={(c) => {
          setSelectedConcern(c);
          handleScrollToCatalog();
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onScrollToTop={handleScrollToTop}
        onScrollToBestsellers={handleScrollToBestsellers}
        onScrollToConcerns={handleScrollToConcerns}
        onScrollToOffers={() => {
          setSelectedConcern('All Sunscreens');
          handleScrollToCatalog();
        }}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 3. Large Hero Banner Slider with Home Page Photo */}
        <HeroBannerSlider
          onShopSunscreens={handleScrollToCatalog}
          onExploreBestsellers={handleScrollToBestsellers}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onSelectConcern={(c) => {
            setSelectedConcern(c);
            handleScrollToCatalog();
          }}
        />

        {/* 4. Most Loved SPF 50+ Sunscreens Comparison Chart (matching user's uploaded photo) */}
        <MostLovedComparisonChart
          products={products}
          onSelectProduct={handleOpenDetailModal}
        />

        {/* 5. Horizontally Scrolling Sunscreen Product Carousel (4 desktop / 2 mobile) */}
        <div id="bestsellers-carousel">
          <ProductCarousel
            products={products}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={handleOpenDetailModal}
          />
        </div>

        {/* 5b. Live Watermelon Cooling Moving Animation Showcase (from User Pinterest pin) */}
        <div id="watermelon-motion-showcase">
          <WatermelonMotionShowcase
            product={products.find((p) => p.id === 'watermelon-cooling-sunscreen') || products[1]}
            onAddToCart={handleAddToCart}
            onQuickView={handleOpenDetailModal}
            onOpenQuiz={() => setIsQuizOpen(true)}
          />
        </div>

        {/* 6. Shop By: New Arrivals & Routine (Screenshot 4) */}
        <div id="shop-by-section">
          <ShopBySection
            fullProducts={products}
            onAddToCart={handleAddToCartFromShopBy}
            onQuickView={handleOpenDetailModal}
          />
        </div>

        {/* 7. Explore Our Range (Screenshot 5) */}
        <div id="explore-range-section">
          <ExploreRangeSection
            onSelectConcern={(c) => {
              setSelectedConcern(c);
              handleScrollToCatalog();
            }}
            onExploreRange={(rangeId) => {
              handleScrollToCatalog();
            }}
          />
        </div>

        {/* 7b. Summer Sunscreen Flatlay Spotlight (User Uploaded Showcase) */}
        <SummerFlatlayShowcase
          onShopNow={handleScrollToCatalog}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* 8. Shop by Skin Concern Categories */}
        <ShopBySkinConcern
          selectedConcern={selectedConcern}
          onSelectConcern={setSelectedConcern}
        />

        {/* 9. Complete Sunscreen Product Grid & Filters */}
        <div id="sunscreen-catalog-grid">
          <ProductGrid
            products={products}
            selectedConcern={selectedConcern}
            onSelectConcern={setSelectedConcern}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onQuickView={handleOpenDetailModal}
          />
        </div>

        {/* 10. SPF Education Section & 2-Finger Rule Guide */}
        <div id="spf-guide-section">
          <SpfEducationSection />
        </div>

        {/* 11. Real Customer Reviews & Ratings */}
        <SunscreenReviewsSection />

        {/* 12. Frequently Asked Questions Accordion */}
        <div id="sunscreen-faqs-section">
          <SunscreenFaqSection />
        </div>
      </main>

      {/* 13. Footer with Admin Dashboard & Back to Top */}
      <Footer
        onSelectConcern={(c) => {
          setSelectedConcern(c);
          handleScrollToCatalog();
        }}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onScrollToFaqs={handleScrollToFaqs}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onScrollToTop={handleScrollToTop}
      />

      {/* Mobile Sticky Bottom Navigation Bar */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-[#F5D5DE] py-2 px-6 flex items-center justify-between z-40 shadow-lg">
        <button
          onClick={handleScrollToTop}
          className="flex flex-col items-center gap-1 text-[#633D4B] hover:text-[#FF8C9A] cursor-pointer"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        <button
          onClick={handleScrollToCatalog}
          className="flex flex-col items-center gap-1 text-[#633D4B] hover:text-[#FF8C9A] cursor-pointer"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-bold">Shop SPF</span>
        </button>

        <button
          onClick={() => setIsQuizOpen(true)}
          className="flex flex-col items-center gap-1 text-[#FF8C9A] cursor-pointer"
        >
          <Sun className="w-5 h-5 animate-spin-slow text-[#FF8C9A]" />
          <span className="text-[10px] font-bold">SPF Quiz</span>
        </button>

        <button
          onClick={() => setIsWishlistOpen(true)}
          className="flex flex-col items-center gap-1 text-[#633D4B] hover:text-[#FF8C9A] relative cursor-pointer"
        >
          <Heart className="w-5 h-5" />
          {wishlistIds.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF8C9A] text-white text-[9px] font-black rounded-full flex items-center justify-center">
              {wishlistIds.length}
            </span>
          )}
          <span className="text-[10px] font-bold">Wishlist</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 text-[#FF8C9A] relative cursor-pointer"
        >
          <ShoppingBag className="w-5 h-5" />
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF8C9A] text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-xs">
              {totalCartCount}
            </span>
          )}
          <span className="text-[10px] font-bold">Bag</span>
        </button>
      </div>

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={activeProduct}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        isWishlisted={activeProduct ? wishlistIds.includes(activeProduct.id) : false}
        allProducts={products}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={(p, size, q) => {
          handleAddToCart(p, size, q);
          setIsCartOpen(true);
        }}
        onBuyNow={handleBuyNow}
        onSelectRelated={(p) => setActiveProduct(p)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => setIsCheckoutOpen(true)}
        onShopSunscreens={handleScrollToCatalog}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(p, size) => handleAddToCart(p, size, 1)}
        onShopSunscreens={handleScrollToCatalog}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={handleOpenDetailModal}
      />

      <SunscreenFinderQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        products={products}
        onAddToCart={(p, size) => {
          handleAddToCart(p, size, 1);
          setIsCartOpen(true);
        }}
        onViewProduct={handleOpenDetailModal}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={user}
        onLoginSuccess={(name, email) =>
          setUser({ ...user, name, email, isLoggedIn: true, glowPoints: user.glowPoints + 100 })
        }
        onLogout={() => setUser({ ...user, isLoggedIn: false })}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={() => setCartItems([])}
        defaultEmail={user.email}
        defaultName={user.name}
        defaultPhone={user.phone}
      />

      <AboutSunscreenModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Admin Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Floating Scroll Controls: Back to Top ⬆ & Top to Back ⬇ */}
      <ScrollControls />
    </div>
  );
}
