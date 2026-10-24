import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface VelmoraLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  inverted?: boolean;
}

export const VelmoraLogo: React.FC<VelmoraLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
  inverted = false,
}) => {
  const { isLight } = useTheme();
  const effectiveInverted = inverted;

  const monogramSizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  };

  const titleSizes = {
    sm: 'text-base tracking-[0.25em]',
    md: 'text-xl tracking-[0.3em]',
    lg: 'text-3xl tracking-[0.35em]',
    xl: 'text-4xl tracking-[0.4em]',
  };

  const textColor = effectiveInverted 
    ? 'text-[#F3EDE3]' 
    : isLight 
      ? 'text-[#1A1616]' 
      : 'text-[#F3EDE3]';

  const taglineColor = isLight && !effectiveInverted 
    ? 'text-[#9A742A]' 
    : 'text-[#C2A064]';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Refined Geometric Gold Monogram V */}
      <div
        className={`${monogramSizes[size]} relative flex items-center justify-center rounded-sm border ${
          isLight && !effectiveInverted 
            ? 'border-[#9A742A]/60 bg-gradient-to-br from-[#1A1616] via-[#351A22] to-[#1A1616] shadow-[0_2px_12px_rgba(154,116,42,0.2)]' 
            : 'border-[#C2A064]/50 bg-gradient-to-br from-[#1E1A1B] via-[#2A1820] to-[#171515] shadow-[0_0_15px_rgba(194,160,100,0.15)]'
        } transition-all duration-300 group-hover:scale-105`}
      >
        {/* Subtle Diamond Cut Accent */}
        <div className="absolute inset-[2px] border border-[#DFC48E]/30 pointer-events-none" />
        <span className="font-brand font-bold text-[#E5C992] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          V
        </span>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col">
        <span
          className={`font-brand font-semibold ${textColor} ${titleSizes[size]} leading-none transition-colors duration-200`}
        >
          VELMORA
        </span>
        {showTagline && (
          <span className={`text-[9px] tracking-[0.35em] ${taglineColor} uppercase font-sans mt-1 transition-colors duration-200`}>
            Haute Parfumerie
          </span>
        )}
      </div>
    </div>
  );
};
