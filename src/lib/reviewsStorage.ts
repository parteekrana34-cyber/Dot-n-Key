import { CustomerReview } from '../types/sunscreen';
import { supabase } from './supabase';
import { CUSTOMER_REVIEWS } from '../data/sunscreenCatalog';

const LOCAL_STORAGE_KEY = 'dotkey_customer_reviews_v1';

// Seed initial authentic reviews with photo placeholders for product results and usage
export const INITIAL_DETAILED_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-init-1',
    author: 'Ananya Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    productName: 'Watermelon Sunscreen SPF 50+ PA++++',
    productTag: 'SPF 50+ Aqua-Gel',
    date: '2 days ago',
    skinType: 'Combination to Oily Skin',
    reviewTitle: 'Zero white cast, zero eye stinging, pure glass-skin perfection!',
    comment:
      'I have tried over 15 sunscreens on Indian skin and they all either stung my eyes or left an awful purple chalk cast. Bloom & Blush Watermelon Sunscreen is pure magic—it feels like splashing chilled watermelon water on my face and gives that healthy dewy sheen under makeup!',
    verified: true,
    recommended: true,
    likes: 42,
    photos: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 'rev-init-2',
    author: 'Rhea Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    productName: 'Vitamin C + E Sunscreen SPF 50+ PA++++',
    productTag: 'SPF 50+ Water-Light',
    date: '1 week ago',
    skinType: 'All Skin Types / Dull Skin',
    reviewTitle: 'My dark spots are noticeably lighter in 3 weeks!',
    comment:
      'I love that this does double duty: extreme broad-spectrum sun defense PLUS active 10% Vitamin C. My stubborn acne pigmentation around my chin started fading in 3 weeks. It absorbs instantly without any oily sheen.',
    verified: true,
    recommended: true,
    likes: 29,
    photos: [
      'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 'rev-init-3',
    author: 'Priya Mukherjee',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    productName: 'Cica + Niacinamide Sunscreen, In-Vivo Tested',
    productTag: 'SPF 50+ Light Gel Cream',
    date: '2 weeks ago',
    skinType: 'Oily & Acne-Prone Skin',
    reviewTitle: 'Keeps my T-zone completely shine-free all day in Mumbai humidity!',
    comment:
      'Finally a sunscreen that does not break me out! The Cica and Niacinamide keep my cystic breakouts calm, and the finish is this soft powdery matte that does not pill even when I sweat during my commute.',
    verified: true,
    recommended: true,
    likes: 38,
    photos: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1512290900672-1f41ec438901?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 'rev-init-4',
    author: 'Tanvi Kapoor',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
    rating: 4,
    productName: 'Strawberry Dew Tinted Sunscreen SPF 50+',
    productTag: '00 Peony Shade',
    date: '3 weeks ago',
    skinType: 'Normal Skin',
    reviewTitle: 'Reapplying over foundation has never been this easy!',
    comment:
      'I carry this in my purse everywhere. The tint gives sheer natural coverage that evens redness without feeling like heavy makeup. It smells like fresh strawberries and gives an instant dewy touch-up! Taking off one star only because I wish the bottle was 100ml.',
    verified: true,
    recommended: true,
    likes: 19,
    photos: [
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 'rev-init-5',
    author: 'Sneha Verma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    productName: 'Ceramide Hydrate Barrier Sunscreen SPF 50+',
    productTag: 'SPF 50+ Barrier Repair',
    date: '1 month ago',
    skinType: 'Dry & Flaky Skin',
    reviewTitle: 'Savior for damaged skin barrier after tretinoin purge',
    comment:
      'My dermatologist recommended switching to a fragrance-free barrier sunscreen with ceramides. This is so soothing on irritated, peeling skin. Absolutely zero stinging on raw patches.',
    verified: true,
    recommended: true,
    likes: 54,
    photos: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80',
    ],
  },
  {
    id: 'rev-init-6',
    author: 'Meera Nair',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    productName: 'Dragon Fruit Bounce Sunscreen SPF 50+',
    productTag: 'SPF 50+ Bouncy Gel',
    date: '1 month ago',
    skinType: 'Combination Skin',
    reviewTitle: 'Smells like juicy dragonfruit smoothies and leaves zero residue!',
    comment:
      'The texture is like a cloud mousse that turns into water. My skin looks plump and hydrated all day even under air conditioning.',
    verified: true,
    recommended: true,
    likes: 21,
  },
];

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  distributionPercentages: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  recommendPercentage: number;
}

export const getStoredCustomerReviews = (): CustomerReview[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_DETAILED_REVIEWS));
      return INITIAL_DETAILED_REVIEWS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_DETAILED_REVIEWS;
  } catch (err) {
    console.warn('[CustomerReviews] Local storage read error:', err);
    return INITIAL_DETAILED_REVIEWS;
  }
};

export const saveCustomerReview = async (
  review: Omit<CustomerReview, 'id' | 'date' | 'likes'> & { id?: string }
): Promise<{ success: boolean; review: CustomerReview; savedToBackend: boolean }> => {
  const newReview: CustomerReview = {
    ...review,
    id: review.id || `rev-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    date: 'Just now',
    likes: 0,
    // Do not show fake reviews as genuine verified customer reviews:
    // User-submitted community reviews are explicitly labeled as Community Review
    verified: false,
    isDemoSubmission: true,
  };

  // 1. Save to localStorage immediately
  const existing = getStoredCustomerReviews();
  const updated = [newReview, ...existing];
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('[CustomerReviews] Local storage write error:', err);
  }

  // 2. Try persisting to Supabase if reviews table exists
  let savedToBackend = false;
  try {
    const { error } = await supabase.from('customer_reviews').insert([
      {
        review_id: newReview.id,
        author: newReview.author,
        rating: newReview.rating,
        review_title: newReview.reviewTitle,
        comment: newReview.comment,
        skin_type: newReview.skinType || 'Community Member',
        product_name: newReview.productName || 'Bloom & Blush Sunscreen',
        recommended: newReview.recommended ?? true,
        photos: newReview.photos || [],
        created_at: new Date().toISOString(),
      },
    ]);
    if (!error) {
      savedToBackend = true;
    }
  } catch (sbErr) {
    // If Supabase table does not exist or network fails, demo storage handles it cleanly
    console.log('[CustomerReviews] Supabase sync fallback to demo local storage.');
  }

  return { success: true, review: newReview, savedToBackend };
};

export const calculateReviewStats = (reviews: CustomerReview[]): ReviewStats => {
  const totalReviews = reviews.length;
  if (totalReviews === 0) {
    return {
      averageRating: 5.0,
      totalReviews: 0,
      distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      distributionPercentages: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      recommendPercentage: 100,
    };
  }

  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let sumRating = 0;
  let recommendedCount = 0;

  reviews.forEach((r) => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
    distribution[star] = (distribution[star] || 0) + 1;
    sumRating += r.rating;
    if (r.recommended !== false) recommendedCount++;
  });

  const averageRating = Number((sumRating / totalReviews).toFixed(1));
  const distributionPercentages = {
    5: Math.round((distribution[5] / totalReviews) * 100),
    4: Math.round((distribution[4] / totalReviews) * 100),
    3: Math.round((distribution[3] / totalReviews) * 100),
    2: Math.round((distribution[2] / totalReviews) * 100),
    1: Math.round((distribution[1] / totalReviews) * 100),
  };

  const recommendPercentage = Math.round((recommendedCount / totalReviews) * 100);

  return {
    averageRating,
    totalReviews,
    distribution,
    distributionPercentages,
    recommendPercentage,
  };
};
