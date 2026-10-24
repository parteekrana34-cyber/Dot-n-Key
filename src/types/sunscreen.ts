export type SkinConcernCategory =
  | 'All Sunscreens'
  | 'Oily Skin'
  | 'Dry Skin'
  | 'Sensitive Skin'
  | 'Combination Skin'
  | 'Dull-Looking Skin'
  | 'Lightweight Daily Sunscreen';

export type SunscreenFinish =
  | 'Dewy Aqua Finish'
  | 'Soft Matte Non-Greasy'
  | 'Water-Light Glow'
  | 'Nourishing Velvet'
  | 'Hydrating Sheen'
  | 'Invisible Powder Finish'
  | 'Natural Dewy Sheen'
  | 'Ultra-Matte Oil Control';

export interface KeyIngredient {
  name: string;
  benefit: string;
  percentage?: string;
}

export interface ProductSizeOption {
  size: string;
  price: number;
  originalPrice: number;
}

export interface SunscreenProduct {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  spfRating: string; // e.g. "SPF 50+"
  paRating: string; // e.g. "PA++++"
  uvFilters: string; // e.g. "Hybrid UV Filters + Blue Light & IR Shield"
  skinConcerns: SkinConcernCategory[];
  suitableForSkin: string; // e.g. "Oily, Combination & Acne-Prone Skin"
  finish: SunscreenFinish;
  texture: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  sizes: ProductSizeOption[];
  defaultSize: string;
  image: string;
  galleryImages: string[];
  keyIngredients: KeyIngredient[];
  fragranceFree: boolean;
  waterResistant: string; // e.g. "Water & Sweat Resistant for 80 mins"
  whiteCast: string; // e.g. "Zero White Cast Guarantee"
  howToApply: string;
  fullIngredients: string;
  isBestseller?: boolean;
  isNew?: boolean;
  inStock: boolean;
  colorTheme: {
    primary: string;
    light: string;
    accent: string;
    border: string;
    badgeBg: string;
    badgeText: string;
  };
}

export interface CartItem {
  cartId: string;
  productId: string;
  name: string;
  subtitle: string;
  spf: string;
  size: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  finish: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  productName?: string;
  productTag?: string;
  date: string;
  skinType?: string;
  reviewTitle: string;
  comment: string;
  verified: boolean;
  photos?: string[];
  likes?: number;
  recommended?: boolean;
  isDemoSubmission?: boolean;
}

export interface UserAccount {
  name: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
  savedAddresses: {
    name: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  }[];
  glowPoints: number;
}
