import React from 'react';
import { Sparkles } from 'lucide-react';

interface GlowNestLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const GlowNestLogo: React.FC<GlowNestLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Playful Dot & Key icon mark */}
      <div
        className={`${iconSizes[size]} rounded-2xl bg-gradient-to-tr from-[#FF6584] via-[#F43F5E] to-[#FB7185] flex items-center justify-center text-white font-bold shadow-md shadow-[#FF6584]/25 transform -rotate-3 hover:rotate-0 transition-transform duration-300`}
      >
        <span>&bull;&amp;&bull;</span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`${titleSizes[size]} font-black tracking-tight font-display text-[#1E1B1D] lowercase`}
          >
            dot <span className="text-[#FF6584]">&amp;</span> key
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
        </div>
        {showTagline && (
          <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#9C929A] -mt-1 flex items-center gap-1">
            SKINCARE <Sparkles className="w-2.5 h-2.5 text-[#F59E0B] inline" />
          </span>
        )}
      </div>
    </div>
  );
};

export const DotKeyLogo = GlowNestLogo;
