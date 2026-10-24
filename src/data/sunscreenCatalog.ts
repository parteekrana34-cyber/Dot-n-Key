import { SunscreenProduct, CustomerReview } from '../types/sunscreen';

// High-fidelity image assets generated directly matching the 5 user screenshots
import twoGirlsHeroImg from '../assets/images/dotkey_two_girls_hero_1792128494738.jpg';
import watermelonImg from '../assets/images/watermelon_sunscreen_1792127402703.jpg';
import vitCImg from '../assets/images/vitc_sunscreen_1792127420175.jpg';
import cicaImg from '../assets/images/cica_sunscreen_1792127434299.jpg';
import ceramideImg from '../assets/images/ceramide_sunscreen_1792127447841.jpg';
import dragonfruitImg from '../assets/images/dragonfruit_sunscreen_1792127464367.jpg';
import strawberryTintedImg from '../assets/images/strawberry_tinted_sunscreen_1792128511443.jpg';
import strawberryStickImg from '../assets/images/strawberry_sunscreen_stick_1792127481108.jpg';
import limeImg from '../assets/images/lime_sunscreen_1792127499497.jpg';
import dragonfruitJellyJarImg from '../assets/images/dragonfruit_jelly_jar_1792128529485.jpg';
import plushieLipBalmImg from '../assets/images/plushie_lip_balm_1792128551708.jpg';
import meltieLipBalmImg from '../assets/images/meltie_lip_balm_1792128568742.jpg';
import rangeWatermelonImg from '../assets/images/range_watermelon_1792128589596.jpg';
import rangeCeramidesImg from '../assets/images/range_ceramides_1792128609324.jpg';
import rangeStrawberryImg from '../assets/images/range_strawberry_1792128631344.jpg';
import rangeVitCImg from '../assets/images/range_vitc_1792128651605.jpg';
import dotkeyWatermelonTemplateImg from '../assets/images/dotkey_watermelon_template_1792386687901.jpg';

export const SUNSCREEN_HERO_IMAGE = dotkeyWatermelonTemplateImg;

export interface ShopByItem {
  id: string;
  name: string;
  category: 'New Arrivals' | 'Routine';
  tag: string;
  tagColor: string;
  skinType?: string;
  shadeName?: string;
  shades?: string[];
  sizes?: string[];
  price: number;
  discountPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
}

export interface RangeCardItem {
  id: string;
  title: string;
  tagline: string;
  image: string;
  bgColor: string;
  textColor: string;
}

export const SUNSCREEN_PRODUCTS: SunscreenProduct[] = [
  // 1. Vitamin C + E Sunscreen (Screenshot 1, 2, 3)
  {
    id: 'vitaminc-super-bright-sunscreen',
    name: 'Vitamin C + E Sunscreen SPF 50+ PA++++ With New-Age UV Filters',
    subtitle: 'SPF 50+ PA++++ Water-Light with Sicilian Blood Orange',
    tagline: 'Fights dullness & dark spots while shielding against intense sun rays',
    description:
      'India’s viral water-light sunscreen combining 10% stabilized Triple Vitamin C and Sicilian Blood Orange. Clinically formulated to brighten dull skin tone, fade stubborn sun spots, and provide all-day antioxidant photoprotection with zero stickiness.',
    spfRating: 'SPF 50+',
    paRating: 'PA++++',
    uvFilters: 'New-Age UV Filters • In-Vivo Tested Broad Spectrum',
    skinConcerns: ['All Sunscreens', 'Dull-Looking Skin', 'Lightweight Daily Sunscreen'],
    suitableForSkin: 'All Skin Types',
    finish: 'Water-Light Glow',
    texture: 'Fluid water-light essence that melts instantly',
    price: 595,
    originalPrice: 695,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 1833,
    sizes: [
      { size: '80g', price: 595, originalPrice: 695 },
      { size: '50g', price: 445, originalPrice: 525 },
    ],
    defaultSize: '80g',
    image: vitCImg,
    galleryImages: [vitCImg, twoGirlsHeroImg, rangeVitCImg],
    keyIngredients: [
      { name: 'Sicilian Blood Orange', benefit: 'Natural fruit active boosting luminosity & fading hyperpigmentation' },
      { name: 'Triple Vitamin C (Ethyl Ascorbic)', benefit: 'Stabilized antioxidant preventing photo-aging', percentage: '10%' },
      { name: 'Vitamin E & Ferulic Acid', benefit: 'Enhances UV protection stability and neutralizes free radicals' },
    ],
    fragranceFree: true,
    waterResistant: 'Water & Sweat Resistant for 80 mins',
    whiteCast: 'Zero White Cast Guarantee',
    howToApply:
      'Apply 2 finger lengths evenly over clean face and neck 15 minutes before stepping into the sun. Reapply every 2-3 hours.',
    fullIngredients:
      'Aqua, Citrus Sinensis (Blood Orange) Fruit Extract, 3-O-Ethyl Ascorbic Acid, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Tocopherol, Ferulic Acid, Hyaluronic Acid.',
    isBestseller: true,
    isNew: false,
    inStock: true,
    colorTheme: {
      primary: '#F97316',
      light: '#FFF7ED',
      accent: '#FFEDD5',
      border: '#FED7AA',
      badgeBg: '#FFEDD5',
      badgeText: '#C2410C',
    },
  },

  // 2. Watermelon Sunscreen (Screenshot 1, 2, 3)
  {
    id: 'watermelon-cooling-sunscreen',
    name: 'Watermelon Sunscreen SPF 50+ PA++++ With New-Age UV Filters',
    subtitle: 'SPF 50+ PA++++ Cooling Aqua-Gel with Hyaluronic Acid',
    tagline: 'Water-burst cooling hydration for oily & combination skin with zero white cast',
    description:
      'India’s most-loved viral sunscreen! Powered by juicy Watermelon fruit extract and multi-molecular Hyaluronic Acid, this ultra-lightweight aqua-gel delivers a non-oily dewy finish while protecting skin against UVA, UVB, blue light, and infrared radiation. Absorbs like water in under 10 seconds.',
    spfRating: 'SPF 50+',
    paRating: 'PA++++',
    uvFilters: 'New-Age UV Filters • In-Vivo Tested Hybrid Shield',
    skinConcerns: ['All Sunscreens', 'Oily Skin', 'Combination Skin', 'Lightweight Daily Sunscreen'],
    suitableForSkin: 'Oily & Combination Skin',
    finish: 'Dewy Aqua Finish',
    texture: 'Water-burst ultra-light cooling gel',
    price: 595,
    originalPrice: 695,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 1633,
    sizes: [
      { size: '80g', price: 595, originalPrice: 695 },
      { size: '50g', price: 445, originalPrice: 525 },
    ],
    defaultSize: '80g',
    image: watermelonImg,
    galleryImages: [watermelonImg, dotkeyWatermelonTemplateImg, twoGirlsHeroImg, rangeWatermelonImg],
    keyIngredients: [
      { name: 'Watermelon Extract', benefit: 'Instantly cools flushed skin & delivers natural vitamins A & C', percentage: '10%' },
      { name: 'Hyaluronic Acid Complex', benefit: 'Binds moisture deep within skin cells for continuous plumpness' },
      { name: 'Beetroot Extract', benefit: 'Natural antioxidant shield fighting environmental and UV free radicals' },
    ],
    fragranceFree: true,
    waterResistant: 'Water & Sweat Resistant for 80 mins',
    whiteCast: 'Zero White Cast Guarantee',
    howToApply:
      'Apply 2 finger lengths evenly across cleansed face and neck 15 minutes before stepping out into the sun. Reapply every 2 to 3 hours.',
    fullIngredients:
      'Aqua, Citrullus Lanatus (Watermelon) Extract, Ethylhexyl Methoxycinnamate, Zinc Oxide, Hyaluronic Acid, Beta Vulgaris (Beet) Root Extract, Niacinamide, Glycerin, Tocopheryl Acetate.',
    isBestseller: true,
    isNew: false,
    inStock: true,
    colorTheme: {
      primary: '#FF6584',
      light: '#FFF0F3',
      accent: '#FFE5EC',
      border: '#FFD1DC',
      badgeBg: '#FFE4E9',
      badgeText: '#D6336C',
    },
  },

  // 3. Strawberry Dew Tinted Sunscreen (Screenshot 3, 4)
  {
    id: 'strawberry-dew-tinted-sunscreen',
    name: 'Strawberry Dew Tinted Sunscreen SPF 50+ PA++++ With New-Age UV Filters',
    subtitle: 'Broad Spectrum Tinted Glow with Niacinamide & Strawberry',
    tagline: 'Lightweight tinted coverage, sheer natural blur, and SPF 50+ sun protection',
    description:
      'A multi-tasking tinted sunscreen that delivers light buildable coverage while shielding against UV rays. Infused with sweet strawberry seed oil, niacinamide, and hyaluronic acid for an instant dewy glow that evens skin tone without clogging pores.',
    spfRating: 'SPF 50+',
    paRating: 'PA++++',
    uvFilters: 'New-Age UV Filters • In-Vivo Tested Tinted Formula',
    skinConcerns: ['All Sunscreens', 'Lightweight Daily Sunscreen', 'Dull-Looking Skin'],
    suitableForSkin: 'All Skin Types • Peony - 00 Very Light with Cool Undertone',
    finish: 'Water-Light Glow',
    texture: 'Fluid tinted skin-tint emulsion in ergonomic curved bottle',
    price: 549,
    originalPrice: 649,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 1570,
    sizes: [
      { size: '50ml Bottle', price: 549, originalPrice: 649 },
    ],
    defaultSize: '50ml Bottle',
    image: strawberryTintedImg,
    galleryImages: [strawberryTintedImg, rangeStrawberryImg],
    keyIngredients: [
      { name: 'Strawberry Seed Extract', benefit: 'Natural ellagic acid defends against blue light and oxidative damage' },
      { name: 'Niacinamide (Vitamin B3)', benefit: 'Evens out skin tone, controls oil, and minimizes pores', percentage: '2%' },
      { name: 'Mineral Tint Pigments', benefit: 'Lightweight iron oxides that protect against blue light and blur imperfections' },
    ],
    fragranceFree: true,
    waterResistant: 'Water & Sweat Resistant for 80 mins',
    whiteCast: 'Zero White Cast Guarantee',
    howToApply:
      'Shake well. Dispense 2-3 drops onto fingertips and blend evenly over face and neck for an effortless tinted glow.',
    fullIngredients:
      'Aqua, Fragaria Ananassa (Strawberry) Fruit Extract, Niacinamide, Zinc Oxide, Iron Oxides (CI 77491, CI 77492, CI 77499), Hyaluronic Acid, Squalane.',
    isBestseller: true,
    isNew: false,
    inStock: true,
    colorTheme: {
      primary: '#F43F5E',
      light: '#FFF1F2',
      accent: '#FEE2E2',
      border: '#FECDD3',
      badgeBg: '#FFE4E6',
      badgeText: '#E11D48',
    },
  },

  // 4. Cica + Niacinamide Sunscreen (Screenshot 1, 2, 3)
  {
    id: 'cica-calming-sunscreen',
    name: 'Cica + Niacinamide Sunscreen, In-Vivo Tested SPF 50+ PA++++',
    subtitle: 'SPF 50+ PA++++ Light Gel-Cream with Cica & Niacinamide',
    tagline: 'Non-oily matte shield that deflates acne flare-ups and controls shine',
    description:
      'Designed specifically for acne-prone, reactive, and oily Indian skin. Infused with soothing Centella Asiatica (Cica) and oil-regulating Niacinamide, this featherlight gel-cream keeps excess midday shine at bay while preventing sun-induced breakouts.',
    spfRating: 'SPF 50+',
    paRating: 'PA++++',
    uvFilters: 'In-Vivo Tested Hybrid Non-Comedogenic UV Shield',
    skinConcerns: ['All Sunscreens', 'Oily Skin', 'Sensitive Skin'],
    suitableForSkin: 'Oily & Acne-Prone Skin',
    finish: 'Soft Matte Non-Greasy',
    texture: 'Cooling refreshing lime-tinted gel cream',
    price: 595,
    originalPrice: 695,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 1290,
    sizes: [
      { size: '80g', price: 595, originalPrice: 695 },
      { size: '50g', price: 445, originalPrice: 525 },
    ],
    defaultSize: '80g',
    image: cicaImg,
    galleryImages: [cicaImg, twoGirlsHeroImg],
    keyIngredients: [
      { name: 'Centella Asiatica (Cica)', benefit: 'Instantly soothes angry pimples, redness, and sun inflammation' },
      { name: 'Niacinamide (Vitamin B3)', benefit: 'Controls oil secretion and tightens dilated pore appearance', percentage: '2%' },
      { name: 'Salicylic Acid (BHA)', benefit: 'Unclogs sebum trapped inside pores while in the sun', percentage: '0.5%' },
    ],
    fragranceFree: true,
    waterResistant: 'Water & Sweat Resistant for 80 mins',
    whiteCast: 'Zero White Cast Guarantee',
    howToApply:
      'Apply two finger lengths evenly across entire face and neck. Gently tap into skin. Reapply throughout the day when in active sunlight.',
    fullIngredients:
      'Aqua, Centella Asiatica Leaf Extract, Niacinamide, Zinc Oxide, Ethylhexyl Triazone, Allantoin, Salicylic Acid, Glycerin, Silica.',
    isBestseller: true,
    isNew: false,
    inStock: true,
    colorTheme: {
      primary: '#10B981',
      light: '#ECFDF5',
      accent: '#D1FAE5',
      border: '#A7F3D0',
      badgeBg: '#D1FAE5',
      badgeText: '#047857',
    },
  },

  // 5. Barrier Repair Sunscreen (Screenshot 3)
  {
    id: 'ceramide-hydrate-sunscreen',
    name: 'Barrier Repair Sunscreen In-Vivo Tested SPF 50+ PA++++',
    subtitle: 'With 5 Ceramides & Hyaluronic Acid + Wild Blueberry',
    tagline: 'Deep barrier nourishment and comforting moisture shield for dry skin',
    description:
      'The holy grail sunscreen for dry, flaky, or barrier-compromised skin. Packed with 5 essential skin-identical ceramides, wild blueberry extract, and multi-depth hyaluronic acid, it wraps fragile skin in lasting hydration while blocking harsh UV rays.',
    spfRating: 'SPF 50+',
    paRating: 'PA++++',
    uvFilters: 'Broad Spectrum Physical + Chemical Barrier Defense',
    skinConcerns: ['All Sunscreens', 'Dry Skin', 'Sensitive Skin'],
    suitableForSkin: 'All Skin Types • Specially Dry Skin',
    finish: 'Nourishing Velvet',
    texture: 'Rich comforting hydrating milk cream',
    price: 595,
    originalPrice: 695,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 1420,
    sizes: [
      { size: '80g', price: 595, originalPrice: 695 },
      { size: '50g', price: 445, originalPrice: 525 },
    ],
    defaultSize: '80g',
    image: ceramideImg,
    galleryImages: [ceramideImg, rangeCeramidesImg],
    keyIngredients: [
      { name: '5 Essential Ceramides (NP, AP, EOP, NS, AS)', benefit: 'Repairs lipid gaps in the skin barrier to stop moisture evaporation', percentage: '1.5%' },
      { name: 'Wild Blueberry Extract', benefit: 'Anthocyanin-rich superfood combating urban environmental smog' },
      { name: 'Colloidal Oatmeal', benefit: 'Calms tightness, dry peeling, and sun sensitivity immediately' },
    ],
    fragranceFree: true,
    waterResistant: 'Water & Sweat Resistant for 80 mins',
    whiteCast: 'Zero White Cast Guarantee',
    howToApply:
      'Warm a coin-sized quantity between palms and massage gently into face, neck, and ears until completely absorbed.',
    fullIngredients:
      'Aqua, Ceramide NP, Ceramide AP, Ceramide EOP, Vaccinium Angustifolium (Blueberry) Fruit Extract, Colloidal Oatmeal, Sodium Hyaluronate, Titanium Dioxide, Zinc Oxide.',
    isBestseller: true,
    isNew: false,
    inStock: true,
    colorTheme: {
      primary: '#0284C7',
      light: '#E0F2FE',
      accent: '#BAE6FD',
      border: '#7DD3FC',
      badgeBg: '#E0F2FE',
      badgeText: '#0369A1',
    },
  },

  // 6. Dragon Fruit Bounce Sunscreen (Screenshot 2, 4)
  {
    id: 'dragon-fruit-bounce-sunscreen',
    name: 'Dragon Fruit Bounce Sunscreen SPF 50+ PA++++',
    subtitle: 'SPF 50+ PA++++ Ultra-Light Hydrating Gel',
    tagline: 'Plumping bounce, antioxidant protection, and instant glass-skin radiance',
    description:
      'A juicy antioxidant splash of pink dragon fruit extract and niacinamide. Formulated to improve skin elasticity, plump fine lines, and impart a bouncy glass-like glow without feeling heavy under high humidity.',
    spfRating: 'SPF 50+',
    paRating: 'PA++++',
    uvFilters: 'Weightless Photostable UV Filters • In-Vivo Tested',
    skinConcerns: ['All Sunscreens', 'Combination Skin', 'Oily Skin', 'Dull-Looking Skin'],
    suitableForSkin: 'Oily & Combination Skin',
    finish: 'Hydrating Sheen',
    texture: 'Bouncy pink jelly essence gel',
    price: 595,
    originalPrice: 695,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 1920,
    sizes: [
      { size: '80g', price: 595, originalPrice: 695 },
      { size: '50g', price: 445, originalPrice: 525 },
    ],
    defaultSize: '80g',
    image: dragonfruitImg,
    galleryImages: [dragonfruitImg, twoGirlsHeroImg],
    keyIngredients: [
      { name: 'Dragon Fruit Extract', benefit: 'Rich in vitamin C and polyphenols to revitalize tired skin' },
      { name: 'Niacinamide (Vitamin B3)', benefit: 'Enhances skin bounce, refines pores, and balances sebum' },
      { name: 'Hyaluronic Acid Complex', benefit: 'Traps ambient hydration in skin matrix' },
    ],
    fragranceFree: true,
    waterResistant: 'Water & Sweat Resistant for 80 mins',
    whiteCast: 'Zero White Cast Guarantee',
    howToApply:
      'Smooth 2 fingers of jelly gel over clean face and neck. Layering under makeup provides a smooth primer base.',
    fullIngredients:
      'Aqua, Hylocereus Undatus (Dragon Fruit) Fruit Extract, Niacinamide, Sodium Hyaluronate, Ethylhexyl Salicylate.',
    isBestseller: true,
    isNew: true,
    inStock: true,
    colorTheme: {
      primary: '#E11D48',
      light: '#FFF1F2',
      accent: '#FEE2E2',
      border: '#FECDD3',
      badgeBg: '#FFE4E6',
      badgeText: '#BE123C',
    },
  },

  // 7. Strawberry Dew SPF 50+ Sunscreen Stick (Screenshot 3, 4)
  {
    id: 'strawberry-dew-sunscreen-stick',
    name: 'Strawberry Dew SPF 50+ Sunscreen Stick',
    subtitle: 'Invisible Glow Touch-up On The Go with Strawberry Seed Oil',
    tagline: 'Twist-up portable SPF stick for effortless reapplication over makeup with zero mess',
    description:
      'The viral pocket-sized sunscreen stick! Formulated with strawberry seed oil, ceramides, and hyaluronic acid. Glides smoothly over makeup or bare skin to re-shield against UVA & UVB rays without dragging or disturbing foundation.',
    spfRating: 'SPF 50+',
    paRating: 'PA++++',
    uvFilters: 'Invisible Touch-up Photostable UV Stick',
    skinConcerns: ['All Sunscreens', 'Lightweight Daily Sunscreen'],
    suitableForSkin: 'All Skin Types',
    finish: 'Natural Dewy Sheen',
    texture: 'Velvety clear glide balm stick',
    price: 495,
    originalPrice: 595,
    discountPercent: 17,
    rating: 4.9,
    reviewsCount: 1340,
    sizes: [{ size: '15g Stick', price: 495, originalPrice: 595 }],
    defaultSize: '15g Stick',
    image: strawberryStickImg,
    galleryImages: [strawberryStickImg, rangeStrawberryImg],
    keyIngredients: [
      { name: 'Strawberry Seed Oil', benefit: 'Ellagic acid nourishes chapped skin and prevents photo-aging' },
      { name: 'Ceramides NP & AP', benefit: 'Fortifies lipid mantle on exposed cheekbones and nose' },
      { name: 'Vitamin E', benefit: 'Neutralizes free radicals triggered by intense midday sun' },
    ],
    fragranceFree: true,
    waterResistant: 'Water & Sweat Resistant for 80 mins',
    whiteCast: 'Zero White Cast Guarantee',
    howToApply:
      'Twist up and swipe 3-4 times across forehead, cheeks, nose, and chin. Perfect for 2-hour midday reapplication.',
    fullIngredients:
      'Dimethicone, Fragaria Ananassa Seed Oil, Ethylhexyl Methoxycinnamate, Zinc Oxide, Ceramide NP, Tocopherol.',
    isBestseller: true,
    isNew: true,
    inStock: true,
    colorTheme: {
      primary: '#FB7185',
      light: '#FFF1F2',
      accent: '#FFE4E6',
      border: '#FECDD3',
      badgeBg: '#FFE4E6',
      badgeText: '#E11D48',
    },
  },

  // 8. Lime & Mint Matte Sunscreen Fluid (Screenshot 3)
  {
    id: 'lime-mint-cooling-sunscreen',
    name: 'Lime & Mint Matte Sunscreen Fluid SPF 50+ PA++++',
    subtitle: 'Ultra Light | Water Resistant Matte Sunscreen Fluid',
    tagline: 'Instant oil-control cooling fluid with fresh lime extract and cooling menthol',
    description:
      'Engineered for hot, humid Indian summers. This ultra-lightweight lime & mint fluid controls excess sweat and sebum for up to 10 hours while delivering maximum SPF 50+ and PA++++ broad-spectrum sun defense.',
    spfRating: 'SPF 50+',
    paRating: 'PA++++',
    uvFilters: 'Ultra-Matte Hybrid UV Filter Matrix',
    skinConcerns: ['All Sunscreens', 'Oily Skin', 'Combination Skin'],
    suitableForSkin: 'Oily & Extremely Sweaty Skin',
    finish: 'Ultra-Matte Oil Control',
    texture: 'Watery cooling shake-fluid',
    price: 495,
    originalPrice: 595,
    discountPercent: 17,
    rating: 4.8,
    reviewsCount: 880,
    sizes: [{ size: '50ml', price: 495, originalPrice: 595 }],
    defaultSize: '50ml',
    image: limeImg,
    galleryImages: [limeImg, twoGirlsHeroImg],
    keyIngredients: [
      { name: 'Fresh Lime Fruit Extract', benefit: 'Natural astringent tightening visible pores & purifying sebum' },
      { name: 'Cooling Mint Water', benefit: 'Instantly cools hot facial skin and soothes sun prickles' },
      { name: 'Silica Micro-Spheres', benefit: 'Absorbs sweat and oil continuously throughout the day' },
    ],
    fragranceFree: true,
    waterResistant: 'Water & Sweat Resistant for 80 mins',
    whiteCast: 'Zero White Cast Guarantee',
    howToApply:
      'Shake well before each use. Dispense a coin-sized quantity and pat into face and neck until dry matte.',
    fullIngredients:
      'Aqua, Citrus Aurantifolia (Lime) Fruit Extract, Mentha Piperita (Peppermint) Leaf Extract, Silica, Zinc Oxide.',
    isBestseller: false,
    isNew: true,
    inStock: true,
    colorTheme: {
      primary: '#84CC16',
      light: '#F7FEE7',
      accent: '#ECFCCB',
      border: '#D9F99D',
      badgeBg: '#ECFCCB',
      badgeText: '#4D7C0F',
    },
  },
];

// Screenshot 4 items ("Shop By" New Arrivals & Routine items)
export const SHOP_BY_ITEMS: ShopByItem[] = [
  {
    id: 'plushie-jelly-lip-balm',
    name: 'Plushie Jelly Lip Balm',
    category: 'New Arrivals',
    tag: 'JUST IN 💖',
    tagColor: 'bg-[#FFE4E6] text-[#E11D48]',
    skinType: 'All Skin Tones',
    shadeName: 'Toffee Melt',
    shades: ['#B45309', '#BE123C', '#FB7185'],
    price: 299,
    discountPrice: 284,
    rating: 4.9,
    reviewsCount: 890,
    image: plushieLipBalmImg,
  },
  {
    id: 'dragon-fruit-jelly-moisturizer',
    name: 'Dragon Fruit Bounce Jelly Moisturizer With Plant PDRN',
    category: 'New Arrivals',
    tag: 'JUST IN 💖',
    tagColor: 'bg-[#FFE4E6] text-[#E11D48]',
    skinType: 'Oily & Combination Skin',
    sizes: ['60ml'],
    price: 499,
    discountPrice: 424,
    rating: 4.9,
    reviewsCount: 61,
    image: dragonfruitJellyJarImg,
  },
  {
    id: 'strawberry-dew-tinted-sunscreen-shopby',
    name: 'Strawberry Dew Tinted Sunscreen SPF 50+ PA++++ With New-Age UV Filters',
    category: 'New Arrivals',
    tag: 'BESTSELLER ⭐',
    tagColor: 'bg-[#FEF3C7] text-[#B45309]',
    skinType: 'All Skin Types',
    shadeName: 'Peony - 00 Very Light with Cool Undertone',
    shades: ['#FDE68A', '#FED7AA', '#FDBA74', '#FB923C', '#EA580C', '#C2410C'],
    price: 549,
    discountPrice: 467,
    rating: 4.8,
    reviewsCount: 1570,
    image: strawberryTintedImg,
  },
  {
    id: 'meltie-lip-balm',
    name: 'Meltie Lip Balm In-Vivo Tested SPF 50+ PA+++',
    category: 'New Arrivals',
    tag: 'JUST IN 💖',
    tagColor: 'bg-[#FFE4E6] text-[#E11D48]',
    skinType: 'All Skin Tones',
    shadeName: 'Cocoa Crème',
    shades: ['#78350F', '#881337', '#E11D48'],
    price: 249,
    discountPrice: 212,
    rating: 4.8,
    reviewsCount: 414,
    image: meltieLipBalmImg,
  },
  {
    id: 'dragon-fruit-bounce-sunscreen-shopby',
    name: 'Dragon Fruit Bounce Sunscreen SPF 50+ PA++++',
    category: 'New Arrivals',
    tag: 'JUST IN 💖',
    tagColor: 'bg-[#FFE4E6] text-[#E11D48]',
    skinType: 'Oily & Combination Skin',
    sizes: ['80g', '50g'],
    price: 595,
    discountPrice: 506,
    rating: 4.8,
    reviewsCount: 1920,
    image: dragonfruitImg,
  },
];

// Screenshot 5 items ("Explore Our Range")
export const EXPLORE_RANGE_CARDS: RangeCardItem[] = [
  {
    id: 'watermelon-aha',
    title: 'Watermelon + AHA',
    tagline: 'Cooling glow & pore tightening range',
    image: rangeWatermelonImg,
    bgColor: 'from-[#FFF0F3] to-[#FFE4E6]',
    textColor: 'text-[#E11D48]',
  },
  {
    id: 'hyaluronic-ceramides',
    title: 'Hyaluronic + Ceramides',
    tagline: '72hr deep water hydration & barrier repair',
    image: rangeCeramidesImg,
    bgColor: 'from-[#EFF6FF] to-[#DBEAFE]',
    textColor: 'text-[#0369A1]',
  },
  {
    id: 'strawberry-niacinamide',
    title: 'Strawberry + Niacinamide',
    tagline: 'Tinted glow, dark spot & lip care',
    image: rangeStrawberryImg,
    bgColor: 'from-[#FFF1F2] to-[#FECDD3]',
    textColor: 'text-[#BE123C]',
  },
  {
    id: 'vitaminc-orange',
    title: 'Vitamin C + Blood Orange',
    tagline: 'Super bright dark spot correction',
    image: rangeVitCImg,
    bgColor: 'from-[#FFF7ED] to-[#FFEDD5]',
    textColor: 'text-[#C2410C]',
  },
];

// Screenshot 1: Campaign Hero Carousel Slides
export const HERO_SLIDES = [
  {
    id: 1,
    tag: 'MOST LOVED SUN CARE',
    title: 'Your Daily Dose of Sun Protection ☀️',
    subtitle:
      'India’s viral zero-white-cast sunscreens powered by juicy fruit actives, new-age UV filters & clinically in-vivo tested SPF 50+ PA++++. Dewy, weightless, and beloved by over 1,00,000+ faces.',
    ctaPrimary: 'Shop Sunscreens',
    ctaSecondary: 'Explore Bestsellers',
    badgeText: 'SPF 50+ PA++++',
    badgeSub: 'Zero White Cast Guarantee',
    bgColor: 'from-[#FFF5F7] via-[#FFE5EC] to-[#FFF0ED]',
    accentColor: '#FF6584',
    image: twoGirlsHeroImg,
    features: ['In-Vivo Tested SPF 50+', 'Watermelon & Vitamin C', 'No White Cast • No Stinging'],
  },
  {
    id: 2,
    tag: 'NEW ARRIVAL • SHEER GLOW',
    title: 'Sun Protection Meets Dewy Skin Tint 🍓',
    subtitle:
      'Meet Strawberry Dew Tinted Sunscreen SPF 50+ PA++++. Featherlight mineral tint infused with fresh strawberry seed extract and 2% Niacinamide for sheer coverage and all-day UV defense.',
    ctaPrimary: 'Shop Tinted Sunscreen',
    ctaSecondary: 'Take SPF Match Quiz',
    badgeText: '00 Peony Shade',
    badgeSub: 'Ultra-Light Tinted Glow',
    bgColor: 'from-[#FFF1F2] via-[#FEE2E2] to-[#FFEDD5]',
    accentColor: '#F43F5E',
    image: strawberryTintedImg,
    features: ['Strawberry Seed Extract', 'Niacinamide 2%', 'Buildable Natural Blur'],
  },
  {
    id: 3,
    tag: 'SUPER BRIGHT RADIANCE',
    title: 'Say Bye to Dark Spots, Hello Golden Hour ☀️',
    subtitle:
      'Triple-stabilized 10% Vitamin C + Sicilian Blood Orange drops. Fades stubborn blemishes and post-acne marks with zero stinging.',
    ctaPrimary: 'Shop Vitamin C Sunscreen',
    ctaSecondary: 'View Clinical Results',
    badgeText: '10% Triple Vitamin C',
    badgeSub: 'Visible Glow in 14 Days',
    bgColor: 'from-[#FFF7ED] via-[#FFEDD5] to-[#FEF3C7]',
    accentColor: '#EA580C',
    image: vitCImg,
    features: ['Triple Vitamin C', 'Sicilian Blood Orange', 'Water-Light Fluid'],
  },
  {
    id: 4,
    tag: 'VIRAL BESTSELLER',
    title: 'Watermelon Cooling Hydration Aqua Shield 🍉',
    subtitle:
      'Instant -3°C cooling sensation on flushed Indian skin. Multi-depth hyaluronic acid and fresh watermelon fruit water for 24-hr dewy plumpness.',
    ctaPrimary: 'Shop Watermelon SPF',
    ctaSecondary: 'Explore All Sizes',
    badgeText: 'SPF 50+ Broad Spectrum',
    badgeSub: 'Water-Burst Aqua Fluid',
    bgColor: 'from-[#FFF0F3] via-[#FFE5EC] to-[#FFF7ED]',
    accentColor: '#FF6584',
    image: watermelonImg,
    features: ['Watermelon Cooling', 'Zero Grease', 'Hyaluronic Acid'],
  },
];

// Recreating the exact "Most Loved SPF 50+ Sunscreens" comparison chart from Screenshot 2
export const MOST_LOVED_SUNSCREENS_CHART = [
  {
    id: 'dragonfruit',
    productId: 'dragon-fruit-bounce-sunscreen',
    name: 'DRAGON FRUIT BOUNCE SUNSCREEN',
    badgeColor: 'bg-[#E11D48] text-white',
    pillBg: 'from-[#FFE4E6] to-[#FECDD3]',
    skinType: 'COMBINATION & OILY SKIN',
    skinTagColor: 'text-[#BE123C] bg-[#FFF1F2]',
    spf: 'SPF 50+',
    highlight: 'Plump Bouncy Glass Skin',
    image: dragonfruitImg,
  },
  {
    id: 'vitaminc',
    productId: 'vitaminc-super-bright-sunscreen',
    name: 'VITAMIN C WATER-LIGHT SUNSCREEN',
    badgeColor: 'bg-[#EA580C] text-white',
    pillBg: 'from-[#FFEDD5] to-[#FED7AA]',
    skinType: 'ALL SKIN TYPES',
    skinTagColor: 'text-[#C2410C] bg-[#FFF7ED]',
    spf: 'SPF 50+',
    highlight: 'Fights Dullness & Dark Spots',
    image: vitCImg,
  },
  {
    id: 'watermelon',
    productId: 'watermelon-cooling-sunscreen',
    name: 'WATERMELON COOLING SUNSCREEN',
    badgeColor: 'bg-[#FF6584] text-white',
    pillBg: 'from-[#FFE5EC] to-[#FFD1DC]',
    skinType: 'COMBINATION & OILY SKIN',
    skinTagColor: 'text-[#D6336C] bg-[#FFF0F3]',
    spf: 'SPF 50+',
    highlight: 'Non-Oily Dewy Aqua Finish',
    image: watermelonImg,
  },
  {
    id: 'ceramide',
    productId: 'ceramide-hydrate-sunscreen',
    name: 'CERAMIDE HYDRATE SUNSCREEN',
    badgeColor: 'bg-[#0284C7] text-white',
    pillBg: 'from-[#E0F2FE] to-[#BAE6FD]',
    skinType: 'DRY SKIN',
    skinTagColor: 'text-[#0369A1] bg-[#EFF6FF]',
    spf: 'SPF 50+',
    highlight: '5 Ceramides Barrier Repair',
    image: ceramideImg,
  },
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Ananya Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    productName: 'Watermelon Sunscreen SPF 50+ PA++++',
    productTag: 'SPF 50+ PA++++',
    date: '2 days ago',
    skinType: 'Combination to Oily Skin',
    reviewTitle: 'Zero white cast, zero eye stinging, pure perfection!',
    comment:
      'I have tried over 15 sunscreens on Indian skin and they all either stung my eyes or left an awful purple chalk cast. Bloom & Blush Watermelon Sunscreen is pure magic—it feels like splashing chilled watermelon water on my face and gives that healthy glass-skin sheen under makeup!',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Rhea Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    productName: 'Vitamin C + E Sunscreen SPF 50+ PA++++',
    productTag: 'SPF 50+ Water-Light',
    date: '1 week ago',
    skinType: 'All Skin Types / Dull Skin',
    reviewTitle: 'My dark spots are noticeably lighter!',
    comment:
      'I love that this does double duty: extreme broad-spectrum sun defense PLUS active 10% Vitamin C. My stubborn acne pigmentation around my chin started fading in 3 weeks. It absorbs instantly without any oily sheen.',
    verified: true,
  },
  {
    id: 'rev-3',
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
  },
  {
    id: 'rev-4',
    author: 'Tanvi Kapoor',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    productName: 'Strawberry Dew Tinted Sunscreen SPF 50+',
    productTag: '00 Peony Shade',
    date: 'Just now',
    skinType: 'Normal Skin',
    reviewTitle: 'Reapplying over foundation has never been this easy!',
    comment:
      'I carry this in my purse everywhere. The tint gives sheer natural coverage that evens redness without feeling like heavy makeup. It smells like fresh strawberries and gives an instant dewy touch-up!',
    verified: true,
  },
];

export const SUNSCREEN_FAQS = [
  {
    q: 'Will Bloom & Blush sunscreens leave a white cast on deeper Indian skin tones?',
    a: 'Absolutely not! All Bloom & Blush sunscreens are specifically formulated and tested on diverse Indian skin tones with modern micronized UV filters and water-burst textures that absorb completely clear with zero white or purplish cast.',
  },
  {
    q: 'What is the difference between SPF 50+ and PA++++?',
    a: 'SPF (Sun Protection Factor) measures protection against UVB rays that cause sunburns and skin cancer (SPF 50+ blocks 98% of UVB rays). PA (Protection Grade of UVA) measures defense against deep penetrating UVA rays that cause premature wrinkles, collagen loss, and dark pigmentation. PA++++ is the highest possible medical protection rating.',
  },
  {
    q: 'Can I apply Bloom & Blush sunscreen under makeup or foundation?',
    a: 'Yes! Both the Watermelon Cooling Aqua-Gel and Vitamin C Super Bright Sunscreen double as hydrating, glow-boosting makeup primers. They absorb in seconds without pilling or causing foundation to separate.',
  },
  {
    q: 'How much sunscreen should I apply for proper protection?',
    a: 'Dermatologists recommend the famous "Two-Finger Rule": squeeze two generous lines of sunscreen along the full length of your index and middle fingers. This provides the exact recommended 2mg/cm² coverage for your full face, neck, and ears.',
  },
  {
    q: 'How often should I reapply sunscreen during the day?',
    a: 'Reapplication is recommended every 2 to 3 hours when outdoors in direct sunlight, or immediately after excessive sweating or towel drying.',
  },
];

export const SPF_EDUCATION_CARDS = [
  {
    title: 'SPF 50+ (UVB Shield)',
    badge: 'Blocks 98% Rays',
    desc: 'Shields against burning UVB radiation that damages epidermal cells and triggers sunburns and DNA alterations.',
    color: 'from-[#FFF0F3] to-[#FFE5EC] border-[#FFD1DC] text-[#E11D48]',
  },
  {
    title: 'PA++++ (UVA Armor)',
    badge: '16x Collagen Defense',
    desc: 'The highest rating against UVA rays that penetrate deep into the dermis, causing sagging, fine lines, and dark sun spots.',
    color: 'from-[#FFF7ED] to-[#FFEDD5] border-[#FED7AA] text-[#EA580C]',
  },
  {
    title: 'Blue Light Filter',
    badge: 'Digital Screen Defense',
    desc: 'Neutralizes High-Energy Visible (HEV) blue light emitted from phones, laptops, and LED screens that cause oxidative stress.',
    color: 'from-[#E0F2FE] to-[#BAE6FD] border-[#7DD3FC] text-[#0284C7]',
  },
  {
    title: 'The 2-Finger Rule',
    badge: 'Dermatologist Standard',
    desc: 'Dispense two full finger strips for face and neck to ensure the clinically tested SPF 50+ protection level is achieved.',
    color: 'from-[#ECFDF5] to-[#D1FAE5] border-[#A7F3D0] text-[#059669]',
  },
];
