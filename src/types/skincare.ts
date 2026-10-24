export type SkincareCategory =
  | 'All Products'
  | 'Sunscreens'
  | 'Moisturizers'
  | 'Face Serums'
  | 'Face Washes'
  | 'Lip Care'
  | 'Toners'
  | 'Body Care'
  | 'Skincare Combos';

export type SkinConcern =
  | 'All Concerns'
  | 'Dullness & Glow'
  | 'Sun Protection'
  | 'Dryness & Dehydration'
  | 'Acne & Active Pores'
  | 'Damaged Barrier'
  | 'Dark Spots & Pigmentation';

export type SkinType =
  | 'All Skin Types'
  | 'Oily & Acne-Prone'
  | 'Dry & Sensitive'
  | 'Combination'
  | 'Normal';

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

export interface SkincareProduct {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  category: SkincareCategory;
  primaryConcern: SkinConcern;
  skinType: SkinType[];
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  sizes: ProductSizeOption[];
  defaultSize: string;
  image: string;
  textureImage?: string;
  keyIngredients: KeyIngredient[];
  routineStep: 'Cleanse' | 'Tone' | 'Treat' | 'Moisturize' | 'Protect' | 'Lip Care' | 'Body Care' | 'Full Routine';
  timeOfDay: 'AM' | 'PM' | 'AM & PM';
  texture: string;
  finish: string;
  pastelTheme: {
    bgLight: string;
    bgAccent: string;
    border: string;
    tagBg: string;
    tagText: string;
    accentColor: string;
  };
  benefits: string[];
  howToUse: string;
  fullIngredients: string;
  isBestseller?: boolean;
  isNew?: boolean;
  inStock: boolean;
}

export interface CartItem {
  cartId: string;
  productId: string;
  name: string;
  subtitle: string;
  size: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  category: SkincareCategory;
  pastelAccent: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  productName: string;
  productTag: string;
  date: string;
  skinType: string;
  skinConcern: string;
  reviewTitle: string;
  comment: string;
  verified: boolean;
}

export interface RoutineQuizAnswers {
  skinType: string;
  primaryConcern: string;
  sunExposure: string;
  routinePreference: string;
}
