import React from 'react';
import { Instagram, Heart, ArrowUpRight } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data/products';

export const InstagramSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAF7F2] border-b border-[#EAE3D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#8C6D46] font-medium mb-2">
            <Instagram className="w-3.5 h-3.5" />
            <span>Editorial Visuals</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#2A2421] tracking-tight">
            Follow @payorajewels
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-[#6E6056] font-light">
            Immerse yourself in our private vault archives, behind-the-scenes goldsmithing, and collector moments.
          </p>
        </div>

        {/* 5-Column Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square overflow-hidden bg-[#ECE4D8] border border-[#E0D5C7] cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Hover Dark Overlay with Details */}
              <div className="absolute inset-0 bg-[#2A2421]/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-white">
                <div className="flex justify-between items-center text-xs text-[#E8D7C1]">
                  <Instagram className="w-4 h-4" />
                  <div className="flex items-center gap-1 text-[11px]">
                    <Heart className="w-3 h-3 fill-current text-[#C5A880]" />
                    <span>{post.likes}</span>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] text-[#EFEAE2] font-light line-clamp-3 leading-snug">
                    {post.caption}
                  </p>
                  <p className="text-[10px] text-[#C5A880] mt-1 font-mono">{post.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subtle Social Follow CTA */}
        <div className="mt-10 text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#2A2421] text-[#2A2421] hover:bg-[#2A2421] hover:text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span>Join Our 180k+ Community On Instagram</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
