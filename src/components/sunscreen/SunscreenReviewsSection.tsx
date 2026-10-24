import React from 'react';
import { CustomerReviewsSection } from './CustomerReviewsSection';

export const SunscreenReviewsSection: React.FC = () => {
  return (
    <section id="reviews-section" className="py-12 sm:py-16 bg-[#FCEEF2] border-b border-[#F5D5DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CustomerReviewsSection
          productName="Bloom & Blush Sunscreen Range"
          className="shadow-card"
        />
      </div>
    </section>
  );
};
