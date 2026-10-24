export type CategoryType = 
  | 'All'
  | 'Rings'
  | 'Earrings'
  | 'Necklaces'
  | 'Bracelets'
  | 'Bridal Jewellery'
  | 'Luxury Collection';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: CategoryType;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isSignature?: boolean;
  image: string;
  secondaryImage?: string;
  description: string;
  materials: string;
  gemstone: string;
  karat: string;
  availableMetals: ('18K Yellow Gold' | '18K Rose Gold' | '18K White Gold' | 'Platinum')[];
  availableSizes?: string[];
  inStock: boolean;
  specifications: {
    weight: string;
    diamondClarity: string;
    certification: string;
    origin: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedMetal: string;
  selectedSize?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  productName: string;
}

export interface CategoryInfo {
  id: CategoryType;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface OrderRecord {
  id: string;
  date: string;
  items: {
    productName: string;
    quantity: number;
    metal: string;
    size?: string;
    price: number;
    image: string;
  }[];
  totalAmount: number;
  status: string;
  paymentMethod: string;
  shippingAddress: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  orders?: OrderRecord[];
  joinedDate?: string;
}
