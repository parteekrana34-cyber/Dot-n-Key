import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Star,
  CheckCircle2,
  Camera,
  Image as ImageIcon,
  ThumbsUp,
  X,
  Upload,
  Filter,
  ArrowUpDown,
  Sparkles,
  Heart,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Check,
  AlertCircle,
  HelpCircle,
  Database,
} from 'lucide-react';
import { CustomerReview } from '../../types/sunscreen';
import {
  getStoredCustomerReviews,
  saveCustomerReview,
  calculateReviewStats,
  ReviewStats,
} from '../../lib/reviewsStorage';

interface CustomerReviewsSectionProps {
  productName?: string;
  productId?: string;
  onReviewAdded?: (newCount: number, newRating: number) => void;
  className?: string;
}

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({
  productName = 'Bloom & Blush Watermelon Cooling Sunscreen SPF 50+',
  productId,
  onReviewAdded,
  className = '',
}) => {
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);
  const [filterWithPhotosOnly, setFilterWithPhotosOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest'>('recent');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [likedReviewIds, setLikedReviewIds] = useState<string[]>([]);

  // Write Review Modal State
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [skinType, setSkinType] = useState('Combination Skin');
  const [recommended, setRecommended] = useState(true);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [backendSavedNotice, setBackendSavedNotice] = useState<string | null>(null);

  // Photo Lightbox modal
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load reviews on mount
  useEffect(() => {
    const loaded = getStoredCustomerReviews();
    setReviews(loaded);
  }, []);

  // Compute Statistics
  const stats: ReviewStats = useMemo(() => {
    return calculateReviewStats(reviews);
  }, [reviews]);

  // Filter & Sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    let result = [...reviews];

    // Filter by star
    if (selectedStarFilter !== null) {
      result = result.filter((r) => Math.round(r.rating) === selectedStarFilter);
    }

    // Filter by photos
    if (filterWithPhotosOnly) {
      result = result.filter((r) => r.photos && r.photos.length > 0);
    }

    // Sorting
    if (sortBy === 'highest') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'lowest') {
      result.sort((a, b) => a.rating - b.rating);
    } else {
      // most recent first (rev-init IDs or date order)
      result.sort((a, b) => (b.id > a.id ? 1 : -1));
    }

    return result;
  }, [reviews, selectedStarFilter, filterWithPhotosOnly, sortBy]);

  // Visible reviews slice
  const visibleReviews = showAllReviews
    ? filteredAndSortedReviews
    : filteredAndSortedReviews.slice(0, 4);

  // Customer photo preview gallery (all photos across reviews)
  const allCustomerPhotos = useMemo(() => {
    const list: { photo: string; author: string; rating: number; title: string }[] = [];
    reviews.forEach((r) => {
      if (r.photos && r.photos.length > 0) {
        r.photos.forEach((p) => {
          list.push({ photo: p, author: r.author, rating: r.rating, title: r.reviewTitle });
        });
      }
    });
    return list;
  }, [reviews]);

  // Handle Photo File Upload
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.size > 5 * 1024 * 1024) {
      setFormErrors((prev) => ({ ...prev, photo: 'File size must be less than 5MB' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setUploadedPhotos((prev) => [...prev, reader.result as string]);
        setFormErrors((prev) => {
          const updated = { ...prev };
          delete updated.photo;
          return updated;
        });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLikeReview = (id: string) => {
    if (likedReviewIds.includes(id)) {
      setLikedReviewIds((prev) => prev.filter((x) => x !== id));
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, likes: Math.max(0, (r.likes || 0) - 1) } : r))
      );
    } else {
      setLikedReviewIds((prev) => [...prev, id]);
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, likes: (r.likes || 0) + 1 } : r))
      );
    }
  };

  // Handle Review Submission
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!authorName.trim()) {
      errors.authorName = 'Please enter your name.';
    } else if (authorName.trim().length < 2) {
      errors.authorName = 'Name must be at least 2 characters.';
    }

    if (!reviewTitle.trim()) {
      errors.reviewTitle = 'Please enter a review headline.';
    } else if (reviewTitle.trim().length < 4) {
      errors.reviewTitle = 'Headline must be at least 4 characters.';
    }

    if (!reviewComment.trim()) {
      errors.reviewComment = 'Please write your review experience.';
    } else if (reviewComment.trim().length < 15) {
      errors.reviewComment = 'Review text should be at least 15 characters long.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      const result = await saveCustomerReview({
        author: authorName.trim(),
        rating: reviewRating,
        reviewTitle: reviewTitle.trim(),
        comment: reviewComment.trim(),
        skinType,
        productName,
        recommended,
        photos: uploadedPhotos,
        verified: false,
      });

      const updatedReviews = [result.review, ...reviews];
      setReviews(updatedReviews);

      const newStats = calculateReviewStats(updatedReviews);
      if (onReviewAdded) {
        onReviewAdded(newStats.totalReviews, newStats.averageRating);
      }

      setSubmissionSuccess(true);
      setBackendSavedNotice(
        result.savedToBackend
          ? 'Synchronized with Supabase backend!'
          : 'Saved to local demo storage.'
      );

      // Reset form fields
      setAuthorName('');
      setReviewRating(5);
      setReviewTitle('');
      setReviewComment('');
      setUploadedPhotos([]);

      setTimeout(() => {
        setSubmissionSuccess(false);
        setIsWriteModalOpen(false);
      }, 2200);
    } catch (err) {
      setFormErrors({ submit: 'Failed to save review. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white rounded-3xl border border-[#F5D5DE] p-6 sm:p-8 md:p-10 shadow-soft ${className}`}>
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#F5D5DE]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#FCEEF2] text-[#633D4B] border border-[#F5D5DE] shadow-xs mb-2">
            <Heart className="w-3.5 h-3.5 fill-[#FF8C9A] text-[#FF8C9A]" />
            <span>Verified Feedback &amp; Ratings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#633D4B] tracking-tight font-display">
            Customer Reviews
          </h2>
          <p className="text-xs sm:text-sm text-[#8E6B78] mt-1 leading-relaxed">
            Real feedback from customers on texture, zero white cast, and sun protection for {productName}.
          </p>
        </div>

        {/* Top Write a Review Action */}
        <button
          onClick={() => {
            setSubmissionSuccess(false);
            setFormErrors({});
            setIsWriteModalOpen(true);
          }}
          className="px-6 py-3 rounded-2xl bg-[#FF8C9A] hover:bg-[#FF7586] text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg shadow-[#FF8C9A]/25 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shrink-0 active:scale-98"
        >
          <Sparkles className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Ratings Overview Card & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-3xl bg-[#FCEEF2]/60 border border-[#F5D5DE] mb-10">
        {/* Left Column: Big Average Score */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-4 border-b lg:border-b-0 lg:border-r border-[#F5D5DE]">
          <span className="text-5xl sm:text-6xl font-black text-[#633D4B] font-display tracking-tight">
            {stats.averageRating}
          </span>
          <div className="flex items-center gap-1 text-[#FF8C9A] my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(stats.averageRating)
                    ? 'fill-[#FF8C9A] text-[#FF8C9A]'
                    : 'text-[#F5CAD4]'
                }`}
              />
            ))}
          </div>
          <p className="text-xs font-bold text-[#633D4B]">
            Based on <strong>{stats.totalReviews.toLocaleString()}</strong> reviews
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[11px] font-bold text-[#15803D] border border-[#F5D5DE] shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
            <span>{stats.recommendPercentage}% of customers recommend this</span>
          </div>
        </div>

        {/* Right Column: 5-Star to 1-Star Rating Distribution Bars */}
        <div className="lg:col-span-8 space-y-2.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const starKey = star as 1 | 2 | 3 | 4 | 5;
            const count = stats.distribution[starKey] || 0;
            const pct = stats.distributionPercentages[starKey] || 0;
            const isFilterActive = selectedStarFilter === star;

            return (
              <button
                key={star}
                onClick={() => setSelectedStarFilter(isFilterActive ? null : star)}
                className={`w-full flex items-center gap-3 text-xs text-left group cursor-pointer p-1.5 rounded-xl transition-colors ${
                  isFilterActive ? 'bg-[#F9DDE5]/80 font-bold' : 'hover:bg-white/70'
                }`}
                title={`Filter by ${star} star reviews`}
              >
                <div className="flex items-center gap-1 w-14 shrink-0 font-extrabold text-[#633D4B]">
                  <span>{star}</span>
                  <Star className="w-3.5 h-3.5 fill-[#FF8C9A] text-[#FF8C9A]" />
                </div>

                {/* Progress Bar Container */}
                <div className="flex-1 h-3 rounded-full bg-white border border-[#F5D5DE] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF8C9A] to-[#FF7586] rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="w-16 text-right shrink-0 text-[11px] text-[#8E6B78] font-semibold">
                  <span>{count}</span>
                  <span className="text-[#8E6B78]/70 ml-1">({pct}%)</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Customer-Uploaded Photos Strip ("Product Results & Real Skin Usage") */}
      {allCustomerPhotos.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#FF8C9A]" />
              <h3 className="font-black text-sm sm:text-base text-[#633D4B] font-display">
                Customer Photos &amp; Texture Swatches ({allCustomerPhotos.length})
              </h3>
            </div>
            <button
              onClick={() => setFilterWithPhotosOnly(!filterWithPhotosOnly)}
              className={`text-xs font-bold transition-colors cursor-pointer ${
                filterWithPhotosOnly
                  ? 'text-[#FF8C9A] underline'
                  : 'text-[#8E6B78] hover:text-[#633D4B]'
              }`}
            >
              {filterWithPhotosOnly ? 'Show all reviews' : 'Filter reviews with photos'}
            </button>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {allCustomerPhotos.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActiveLightboxPhoto(item.photo)}
                className="group relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-[#FCEEF2] border border-[#F5D5DE] shrink-0 cursor-pointer shadow-xs hover:shadow-md hover:scale-103 transition-all"
                title={`Uploaded by ${item.author}`}
              >
                <img
                  src={item.photo}
                  alt={`Customer product result ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold bg-black/60 px-2 py-0.5 rounded-full">
                    Zoom
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sorting & Filter Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#FCEEF2]/40 border border-[#F5D5DE] mb-6">
        {/* Left: Star & Photo Quick Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black text-[#633D4B] flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#FF8C9A]" />
            <span>Filter:</span>
          </span>

          <button
            onClick={() => setSelectedStarFilter(null)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedStarFilter === null
                ? 'bg-[#FF8C9A] text-white shadow-xs'
                : 'bg-white text-[#633D4B] border border-[#F5D5DE] hover:bg-[#F9DDE5]'
            }`}
          >
            All Stars
          </button>

          {[5, 4, 3].map((star) => (
            <button
              key={star}
              onClick={() => setSelectedStarFilter(selectedStarFilter === star ? null : star)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                selectedStarFilter === star
                  ? 'bg-[#FF8C9A] text-white shadow-xs'
                  : 'bg-white text-[#633D4B] border border-[#F5D5DE] hover:bg-[#F9DDE5]'
              }`}
            >
              <span>{star}</span>
              <Star className="w-3 h-3 fill-current" />
            </button>
          ))}

          <button
            onClick={() => setFilterWithPhotosOnly(!filterWithPhotosOnly)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterWithPhotosOnly
                ? 'bg-[#633D4B] text-white shadow-xs'
                : 'bg-white text-[#633D4B] border border-[#F5D5DE] hover:bg-[#F9DDE5]'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>With Photos Only</span>
          </button>

          {selectedStarFilter !== null && (
            <button
              onClick={() => {
                setSelectedStarFilter(null);
                setFilterWithPhotosOnly(false);
              }}
              className="text-[11px] text-[#FF8C9A] font-bold hover:underline ml-1 cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Right: Sorting Select */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-[#633D4B] flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#FF8C9A]" />
            <span>Sort:</span>
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-[#F5D5DE] rounded-xl px-3 py-1.5 text-xs font-bold text-[#633D4B] focus:outline-none focus:ring-2 focus:ring-[#FF8C9A]/30 focus:border-[#FF8C9A] cursor-pointer"
          >
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Rated (5★ First)</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>
      </div>

      {/* Review Cards Grid */}
      {visibleReviews.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-3xl bg-[#FCEEF2]/40 border border-[#F5D5DE] space-y-3">
          <p className="font-bold text-sm text-[#633D4B]">No reviews match your selected filter.</p>
          <button
            onClick={() => {
              setSelectedStarFilter(null);
              setFilterWithPhotosOnly(false);
            }}
            className="text-xs font-bold text-[#FF8C9A] hover:underline cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {visibleReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 sm:p-6 rounded-3xl bg-white border border-[#F5D5DE] hover:border-[#FF8C9A] shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: Stars, Verified Tag & Date */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1 text-[#FF8C9A]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-[#FF8C9A] text-[#FF8C9A]' : 'text-[#F5CAD4]'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {rev.verified ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#15803D] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified Buyer
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#633D4B] bg-[#FCEEF2] px-2.5 py-0.5 rounded-full border border-[#F5D5DE]">
                        Community Review
                      </span>
                    )}
                    <span className="text-[11px] text-[#8E6B78]">{rev.date}</span>
                  </div>
                </div>

                {/* Review Title */}
                <h4 className="font-black text-sm sm:text-base text-[#633D4B] mb-2 leading-snug font-display">
                  "{rev.reviewTitle}"
                </h4>

                {/* Review Text */}
                <p className="text-xs text-[#8E6B78] leading-relaxed mb-4">
                  {rev.comment}
                </p>

                {/* Customer Uploaded Photos in Card */}
                {rev.photos && rev.photos.length > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    {rev.photos.map((p, pIdx) => (
                      <div
                        key={pIdx}
                        onClick={() => setActiveLightboxPhoto(p)}
                        className="w-16 h-16 rounded-xl overflow-hidden border border-[#F5D5DE] cursor-pointer hover:opacity-90 transition-opacity bg-[#FCEEF2] shrink-0"
                      >
                        <img src={p} alt="User review photo" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer: Author info & Helpful like button */}
              <div className="pt-3.5 border-t border-[#F5D5DE] flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-xs text-[#633D4B]">{rev.author}</p>
                  {rev.skinType && (
                    <p className="text-[10px] text-[#8E6B78]">{rev.skinType}</p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {rev.isDemoSubmission && (
                    <span className="text-[9px] font-bold text-[#8E6B78] bg-[#FCEEF2] px-2 py-0.5 rounded-md border border-[#F5D5DE]">
                      Demo
                    </span>
                  )}
                  <button
                    onClick={() => handleLikeReview(rev.id)}
                    className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                      likedReviewIds.includes(rev.id)
                        ? 'bg-[#FF8C9A] text-white shadow-xs'
                        : 'bg-[#FCEEF2] text-[#633D4B] hover:bg-[#F9DDE5]'
                    }`}
                    title="Mark review as helpful"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>Helpful {rev.likes ? `(${rev.likes})` : ''}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View All Reviews / Show Less Toggle Button */}
      {filteredAndSortedReviews.length > 4 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="px-6 py-3 rounded-2xl bg-white hover:bg-[#FCEEF2] border border-[#F5D5DE] hover:border-[#FF8C9A] text-[#633D4B] font-extrabold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>
              {showAllReviews
                ? 'Show Fewer Reviews'
                : `View All ${filteredAndSortedReviews.length} Reviews`}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-[#FF8C9A] transition-transform ${
                showAllReviews ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      )}

      {/* WRITE A REVIEW MODAL DIALOG */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#F5D5DE] my-auto max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-[#F9DDE5] via-[#FCEEF2] to-[#F9DDE5] border-b border-[#F5D5DE] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#FF8C9A] text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-[#633D4B] font-display">
                    Write a Customer Review
                  </h3>
                  <p className="text-[11px] text-[#8E6B78]">{productName}</p>
                </div>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-[#F9DDE5] text-[#8E6B78] hover:text-[#633D4B] flex items-center justify-center shadow-xs border border-[#F5D5DE] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {submissionSuccess ? (
                <div className="text-center py-10 space-y-3 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-[#ECFDF5] text-[#15803D] flex items-center justify-center mx-auto border border-[#A7F3D0]">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-black text-[#633D4B] font-display">
                    Thank You for Your Feedback!
                  </h4>
                  <p className="text-xs text-[#8E6B78] max-w-xs mx-auto">
                    Your review has been published. The overall ratings and stats have been updated.
                  </p>
                  {backendSavedNotice && (
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#FCEEF2] text-[#633D4B] border border-[#F5D5DE]">
                      {backendSavedNotice}
                    </span>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Demo Backend Notice */}
                  <div className="p-3 rounded-2xl bg-[#FCEEF2] border border-[#F5D5DE] text-[11px] text-[#633D4B] flex items-start gap-2">
                    <Database className="w-4 h-4 text-[#FF8C9A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold">Transparent Review Policy:</strong> Submitted reviews are stored locally in your demo environment and mirrored to your database backend when active. We distinguish genuine community demo submissions from store-verified buyers.
                    </div>
                  </div>

                  {/* Star Rating Selector */}
                  <div>
                    <label className="block text-xs font-black text-[#633D4B] uppercase tracking-wider mb-1.5">
                      Overall Rating <span className="text-[#FF8C9A]">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const isFilled =
                            (hoverRating !== null ? hoverRating : reviewRating) >= star;
                          return (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setReviewRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(null)}
                              className="p-1 cursor-pointer hover:scale-115 transition-transform"
                              aria-label={`${star} star rating`}
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  isFilled
                                    ? 'fill-[#FF8C9A] text-[#FF8C9A]'
                                    : 'text-[#F5CAD4]'
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                      <span className="text-xs font-extrabold text-[#633D4B] ml-2">
                        {reviewRating === 5
                          ? '5.0 - Holy Grail! Loved it 💖'
                          : reviewRating === 4
                          ? '4.0 - Very Good'
                          : reviewRating === 3
                          ? '3.0 - Average'
                          : reviewRating === 2
                          ? '2.0 - Below Expectation'
                          : '1.0 - Did not like'}
                      </span>
                    </div>
                  </div>

                  {/* Customer Name */}
                  <div>
                    <label className="block text-xs font-black text-[#633D4B] uppercase tracking-wider mb-1">
                      Your Name <span className="text-[#FF8C9A]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Radhika Sen"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full bg-[#FCEEF2]/40 border border-[#F5D5DE] rounded-xl px-3.5 py-2.5 text-xs text-[#633D4B] font-semibold placeholder:text-[#8E6B78] focus:outline-none focus:ring-2 focus:ring-[#FF8C9A]/30 focus:border-[#FF8C9A]"
                    />
                    {formErrors.authorName && (
                      <p className="text-[11px] font-bold text-[#FF8C9A] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{formErrors.authorName}</span>
                      </p>
                    )}
                  </div>

                  {/* Skin Type / Concern Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-black text-[#633D4B] uppercase tracking-wider mb-1">
                        Your Skin Type
                      </label>
                      <select
                        value={skinType}
                        onChange={(e) => setSkinType(e.target.value)}
                        className="w-full bg-[#FCEEF2]/40 border border-[#F5D5DE] rounded-xl px-3 py-2.5 text-xs text-[#633D4B] font-semibold focus:outline-none focus:ring-2 focus:ring-[#FF8C9A]/30 focus:border-[#FF8C9A] cursor-pointer"
                      >
                        <option value="Oily Skin">Oily Skin</option>
                        <option value="Combination Skin">Combination Skin</option>
                        <option value="Dry Skin">Dry Skin</option>
                        <option value="Sensitive Skin">Sensitive Skin</option>
                        <option value="Normal Skin">Normal Skin</option>
                      </select>
                    </div>

                    {/* Recommend toggle */}
                    <div>
                      <label className="block text-xs font-black text-[#633D4B] uppercase tracking-wider mb-1">
                        Recommend Formula?
                      </label>
                      <div className="flex items-center gap-2 pt-0.5">
                        <button
                          type="button"
                          onClick={() => setRecommended(true)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            recommended
                              ? 'bg-[#FF8C9A] text-white shadow-xs'
                              : 'bg-[#FCEEF2] text-[#633D4B] border border-[#F5D5DE]'
                          }`}
                        >
                          Yes, recommend 💖
                        </button>
                        <button
                          type="button"
                          onClick={() => setRecommended(false)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            !recommended
                              ? 'bg-[#633D4B] text-white shadow-xs'
                              : 'bg-[#FCEEF2] text-[#633D4B] border border-[#F5D5DE]'
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Review Title */}
                  <div>
                    <label className="block text-xs font-black text-[#633D4B] uppercase tracking-wider mb-1">
                      Review Title / Headline <span className="text-[#FF8C9A]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Absoloutely zero white cast & melts like water!"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      className="w-full bg-[#FCEEF2]/40 border border-[#F5D5DE] rounded-xl px-3.5 py-2.5 text-xs text-[#633D4B] font-semibold placeholder:text-[#8E6B78] focus:outline-none focus:ring-2 focus:ring-[#FF8C9A]/30 focus:border-[#FF8C9A]"
                    />
                    {formErrors.reviewTitle && (
                      <p className="text-[11px] font-bold text-[#FF8C9A] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{formErrors.reviewTitle}</span>
                      </p>
                    )}
                  </div>

                  {/* Review Description */}
                  <div>
                    <label className="block text-xs font-black text-[#633D4B] uppercase tracking-wider mb-1">
                      Review Description <span className="text-[#FF8C9A]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell other skincare lovers about your experience: texture, scent, eye stinging, finish under makeup..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full bg-[#FCEEF2]/40 border border-[#F5D5DE] rounded-xl p-3.5 text-xs text-[#633D4B] font-medium placeholder:text-[#8E6B78] focus:outline-none focus:ring-2 focus:ring-[#FF8C9A]/30 focus:border-[#FF8C9A]"
                    />
                    {formErrors.reviewComment && (
                      <p className="text-[11px] font-bold text-[#FF8C9A] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{formErrors.reviewComment}</span>
                      </p>
                    )}
                  </div>

                  {/* Photo Upload: Product Results & Real Usage */}
                  <div>
                    <label className="block text-xs font-black text-[#633D4B] uppercase tracking-wider mb-1.5">
                      Upload Photos (Optional - Results &amp; Usage)
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoSelect}
                      className="hidden"
                    />

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2.5 rounded-xl bg-white border border-dashed border-[#FF8C9A] hover:bg-[#FCEEF2] text-[#633D4B] text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#FF8C9A]" />
                        <span>Add Photo</span>
                      </button>

                      {/* Photo Previews */}
                      {uploadedPhotos.map((photo, pIdx) => (
                        <div
                          key={pIdx}
                          className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#F5D5DE] group"
                        >
                          <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removePhoto(pIdx)}
                            className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            title="Remove photo"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    {formErrors.photo && (
                      <p className="text-[11px] font-bold text-[#FF8C9A] mt-1">
                        {formErrors.photo}
                      </p>
                    )}
                  </div>

                  {formErrors.submit && (
                    <p className="text-xs font-bold text-[#FF8C9A]">{formErrors.submit}</p>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-2xl bg-[#FF8C9A] hover:bg-[#FF7586] disabled:opacity-50 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg shadow-[#FF8C9A]/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Publishing Review...</span>
                      ) : (
                        <>
                          <span>Submit Customer Review</span>
                          <Sparkles className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PHOTO LIGHTBOX MODAL */}
      {activeLightboxPhoto && (
        <div
          onClick={() => setActiveLightboxPhoto(null)}
          className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn cursor-pointer"
        >
          <div className="relative max-w-2xl max-h-[85vh] overflow-hidden rounded-3xl bg-white p-2 shadow-2xl">
            <button
              onClick={() => setActiveLightboxPhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#633D4B] flex items-center justify-center shadow-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activeLightboxPhoto}
              alt="Customer product photo zoom"
              className="w-full h-full max-h-[80vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
