import React, { useState } from 'react';
import { Sparkles, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { SHOP_BY_ITEMS, ShopByItem } from '../../data/sunscreenCatalog';
import { SunscreenProduct } from '../../types/sunscreen';

interface ShopBySectionProps {
  onAddToCart: (item: {
    id: string;
    name: string;
    price: number;
    size: string;
    image: string;
    subtitle?: string;
  }) => void;
  onQuickView: (product: SunscreenProduct) => void;
  fullProducts: SunscreenProduct[];
}

export const ShopBySection: React.FC<ShopBySectionProps> = ({
  onAddToCart,
  onQuickView,
  fullProducts,
}) => {
  const [activeTab, setActiveTab] = useState<'New Arrivals' | 'Routine'>('New Arrivals');
  const [selectedShades, setSelectedShades] = useState<Record<string, number>>({
    'plushie-jelly-lip-balm': 0,
    'strawberry-dew-tinted-sunscreen-shopby': 0,
    'meltie-lip-balm': 0,
  });
  const [addedItemIds, setAddedItemIds] = useState<string[]>([]);

  const filteredItems = SHOP_BY_ITEMS.filter((item) =>
    activeTab === 'New Arrivals' ? item.category === 'New Arrivals' : true
  );

  const handleAdd = (item: ShopByItem) => {
    onAddToCart({
      id: item.id,
      name: item.name,
      price: item.discountPrice,
      size: item.sizes?.[0] || item.shadeName || 'Standard',
      image: item.image,
      subtitle: item.tag,
    });

    setAddedItemIds((prev) => [...prev, item.id]);
    setTimeout(() => {
      setAddedItemIds((prev) => prev.filter((id) => id !== item.id));
    }, 1800);
  };

  const handleOpenQuickView = (item: ShopByItem) => {
    const match =
      fullProducts.find((p) => p.id === item.id || item.name.toLowerCase().includes(p.name.toLowerCase().slice(0, 15))) ||
      fullProducts[0];
    onQuickView(match);
  };

  return (
    <section id="shop-by-section" className="py-12 sm:py-16 bg-white border-b border-[#F5D5DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Dark Rose & Coral Pink Accents */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#FCEEF2] text-[#633D4B] border border-[#F5D5DE] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FF8C9A]" />
              <span>Fresh Fruit Drop</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#633D4B] tracking-tight font-display">
              Shop By
            </h2>
            <p className="text-xs sm:text-sm text-[#8E6B78] mt-1 leading-relaxed">
              Explore the latest viral launches, plumping lip glazes, and daily barrier creams.
            </p>
          </div>

          {/* Category Tabs: New Arrivals | Routine */}
          <div className="flex items-center gap-2 p-1.5 bg-[#FCEEF2] rounded-2xl border border-[#F5D5DE] self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('New Arrivals')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'New Arrivals'
                  ? 'bg-[#FF8C9A] text-white shadow-xs'
                  : 'text-[#633D4B] hover:text-[#FF8C9A]'
              }`}
            >
              New Arrivals ✨
            </button>
            <button
              onClick={() => setActiveTab('Routine')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'Routine'
                  ? 'bg-[#FF8C9A] text-white shadow-xs'
                  : 'text-[#633D4B] hover:text-[#FF8C9A]'
              }`}
            >
              All Glow Routine 🌿
            </button>
          </div>
        </div>

        {/* Product Cards Grid: Pure White Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {filteredItems.map((item) => {
            const isAdded = addedItemIds.includes(item.id);
            const activeShadeIdx = selectedShades[item.id] ?? 0;

            return (
              <div
                key={item.id}
                className="group flex flex-col bg-white rounded-3xl border border-[#F5D5DE] hover:border-[#FF8C9A] p-3 sm:p-3.5 shadow-soft hover:shadow-card-hover transition-all duration-300"
              >
                {/* Image Container with Badges */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#FCEEF2] mb-3">
                  {/* Tag Pill at top left */}
                  <div className="absolute top-2 left-2 z-10">
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#F9DDE5] text-[#633D4B] shadow-xs border border-[#F5D5DE]"
                    >
                      {item.tag}
                    </span>
                  </div>

                  {/* Quick View Button */}
                  <button
                    onClick={() => handleOpenQuickView(item)}
                    className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs text-[#633D4B] hover:text-[#FF8C9A] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xs cursor-pointer border border-[#F5D5DE]"
                    title="Quick View"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Skin Type / Category Tag */}
                {item.skinType && (
                  <p className="text-[10px] font-black uppercase tracking-wider text-[#8E6B78] truncate mb-1">
                    {item.skinType}
                  </p>
                )}

                {/* Shade name / selector if available */}
                {item.shadeName && (
                  <p className="text-[11px] font-medium text-[#8E6B78] truncate mb-1.5">
                    {item.shadeName}
                  </p>
                )}

                {/* Shade Swatch Dots */}
                {item.shades && item.shades.length > 0 && (
                  <div className="flex items-center gap-1.5 mb-2">
                    {item.shades.map((hex, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() =>
                          setSelectedShades((prev) => ({ ...prev, [item.id]: sIdx }))
                        }
                        className={`w-3.5 h-3.5 rounded-full border transition-transform cursor-pointer ${
                          activeShadeIdx === sIdx
                            ? 'scale-125 border-[#633D4B] ring-2 ring-[#FF8C9A]/40'
                            : 'border-black/20 hover:scale-110'
                        }`}
                        style={{ backgroundColor: hex }}
                        title={`Shade ${sIdx + 1}`}
                      />
                    ))}
                    <span className="text-[10px] text-[#8E6B78] font-semibold ml-1">
                      {item.shades.length} shades
                    </span>
                  </div>
                )}

                {/* Size Pills */}
                {item.sizes && (
                  <div className="flex items-center gap-1 mb-2">
                    {item.sizes.map((sz, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-[#FCEEF2] border border-[#F5D5DE] text-[10px] font-bold text-[#633D4B]"
                      >
                        {sz}
                      </span>
                    ))}
                  </div>
                )}

                {/* Product Name in Dark Rose */}
                <h3 className="font-extrabold text-xs sm:text-sm text-[#633D4B] group-hover:text-[#FF8C9A] transition-colors line-clamp-2 leading-snug mb-2 flex-1">
                  {item.name}
                </h3>

                {/* Star Rating in Coral Pink */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="flex items-center text-[#FF8C9A]">
                    <Star className="w-3.5 h-3.5 fill-[#FF8C9A]" />
                    <span className="text-xs font-black text-[#633D4B] ml-1">{item.rating}</span>
                  </div>
                  <span className="text-[10px] font-medium text-[#8E6B78]">
                    ({item.reviewsCount})
                  </span>
                </div>

                {/* Price Row */}
                <div className="flex items-baseline gap-2 pt-1 border-t border-[#F5D5DE] mb-3">
                  <span className="text-sm sm:text-base font-black text-[#633D4B]">
                    ₹{item.discountPrice}
                  </span>
                  <span className="text-xs text-[#8E6B78] line-through font-medium">
                    ₹{item.price}
                  </span>
                  <span className="text-[10px] font-black text-[#633D4B] bg-[#F9DDE5] px-1.5 py-0.2 rounded-md">
                    {Math.round(((item.price - item.discountPrice) / item.price) * 100)}% off
                  </span>
                </div>

                {/* Add to Bag CTA Button in Coral Pink */}
                <button
                  onClick={() => handleAdd(item)}
                  className={`w-full py-2.5 px-3 rounded-2xl font-black text-xs transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${
                    isAdded
                      ? 'bg-[#633D4B] text-white shadow-xs'
                      : 'bg-[#FF8C9A] hover:bg-[#FF7586] text-white shadow-[#FF8C9A]/25 active:scale-[0.98]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
