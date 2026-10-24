export type FragranceFamily = 
  | 'Woody & Oud'
  | 'Floral'
  | 'Fresh & Citrus'
  | 'Amber & Spicy'
  | 'Aquatic'
  | 'Unisex'
  | 'Travel-Size'
  | 'Luxury Gift Sets';

export type FragranceGender = 'Unisex' | 'For Him' | 'For Her';

export interface FragranceNotePyramid {
  top: string[];
  heart: string[];
  base: string[];
}

export interface PerfumeProduct {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  brand: 'VELMORA';
  family: FragranceFamily;
  gender: FragranceGender;
  concentration: string;
  price: number; // in INR
  originalPrice?: number;
  sizePrices: Record<string, number>;
  availableSizes: string[];
  defaultSize: string;
  image: string;
  secondaryImages?: string[];
  description: string;
  inspiration: string;
  notes: FragranceNotePyramid;
  intensity: 'Subtle Intimate' | 'Moderate Sillage' | 'Powerful Trail' | 'Beast Mode';
  vibe: 'Woody' | 'Warm' | 'Fresh' | 'Floral' | 'Spicy';
  recommendedOccasions: string[];
  longevity: string;
  sillage: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  isSignature?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
  family: FragranceFamily;
  isGiftBox?: boolean;
  giftBoxDetails?: {
    packagingName: string;
    perfumes: Array<{ name: string; size: string }>;
    cardMessage?: string;
    recipientName?: string;
  };
}

export interface BespokeCoffretItem {
  boxStyle: {
    id: string;
    name: string;
    description: string;
    colorHex: string;
    boxPrice: number;
  };
  selectedPerfumes: Array<{
    perfume: PerfumeProduct;
    size: string;
  }>;
  recipientName: string;
  giftMessage: string;
  waxSealColor: 'Royal Gold' | 'Obsidian Black' | 'Crimson Burgundy';
}

export interface FragranceQuizState {
  family: string;
  vibe: string;
  intensity: string;
  occasion: string;
  budget: string;
}

export interface UserOrder {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  shippingAddress: {
    fullName: string;
    phone: string;
    email: string;
    addressLine: string;
    city: string;
    state: string;
    postalCode: string;
  };
  paymentMethod: string;
  status: 'Confirmed' | 'Dispatched' | 'Delivered';
}
