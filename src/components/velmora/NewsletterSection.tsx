import React, { useState } from 'react';
import { Mail, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const NewsletterSection: React.FC = () => {
  const { isLight } = useTheme();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubmitted(true);
    }
  };

  return (
    <section className={`py-20 transition-colors duration-300 border-b relative overflow-hidden ${
      isLight 
        ? 'bg-gradient-to-b from-[#F5EFE6] via-[#EFE7DA] to-[#FAF7F2] border-[#9A742A]/20' 
        : 'bg-gradient-to-b from-[#131111] via-[#1E1418] to-[#171515] border-[#C2A064]/25'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] uppercase tracking-[0.25em] font-sans ${
          isLight
            ? 'border-[#9A742A]/40 bg-[#FFFFFF] text-[#591D2D] shadow-sm'
            : 'border-[#C2A064]/40 bg-[#421C27]/50 text-[#DFC48E]'
        }`}>
          <Sparkles className={`w-3.5 h-3.5 ${isLight ? 'text-[#9A742A]' : 'text-[#C2A064]'}`} />
          <span>The Private Salon</span>
        </div>

        <h2 className={`font-serif text-3xl sm:text-5xl font-normal leading-tight transition-colors ${
          isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'
        }`}>
          Enter the VELMORA Circle
        </h2>

        <p className={`text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed transition-colors ${
          isLight ? 'text-[#5C5456]' : 'text-[#A89F93]'
        }`}>
          Subscribe to receive invitations to private harvests, limited-edition numbered flacon releases, and an immediate 10% courtesy privilege on your inaugural acquisition.
        </p>

        {submitted ? (
          <div className={`p-6 rounded-xl border max-w-md mx-auto space-y-2 animate-fade-in shadow-lg ${
            isLight
              ? 'bg-[#FFFFFF] border-[#9A742A]'
              : 'bg-[#1E1A1B] border-[#C2A064]'
          }`}>
            <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center ${
              isLight ? 'bg-[#591D2D] text-[#FAF7F2]' : 'bg-[#421C27] text-[#DFC48E]'
            }`}>
              <Check className="w-5 h-5" />
            </div>
            <h4 className={`font-serif text-xl ${isLight ? 'text-[#1A1616]' : 'text-[#F3EDE3]'}`}>
              Welcome to the Circle
            </h4>
            <p className={`text-xs font-sans ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
              Your 10% courtesy privilege code has been activated:
            </p>
            <div className={`py-2 px-4 rounded border text-sm font-mono tracking-widest font-bold ${
              isLight
                ? 'bg-[#FAF7F2] border-[#9A742A]/40 text-[#591D2D]'
                : 'bg-[#171515] border-[#C2A064]/40 text-[#DFC48E]'
            }`}>
              VELMORA10
            </div>
            <p className={`text-[10px] font-sans ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`}>
              Apply during checkout to receive your privilege deduction.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className={`w-4 h-4 absolute left-3.5 top-3.5 ${isLight ? 'text-[#73696B]' : 'text-[#A89F93]'}`} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your private email..."
                required
                className={`w-full pl-10 pr-4 py-3 rounded border text-sm focus:outline-none transition-colors ${
                  isLight
                    ? 'bg-[#FFFFFF] border-[#E5D9C5] text-[#1A1616] placeholder:text-[#968D8E] focus:border-[#9A742A]'
                    : 'bg-[#1E1A1B] border-[#C2A064]/30 text-[#F3EDE3] placeholder:text-[#A89F93]/60 focus:border-[#C2A064]'
                }`}
              />
            </div>
            <button
              type="submit"
              className={`py-3 px-6 rounded font-sans font-semibold text-xs tracking-[0.2em] uppercase shadow-lg flex items-center justify-center gap-2 transition-all ${
                isLight
                  ? 'bg-gradient-to-r from-[#1A1616] via-[#351B22] to-[#1A1616] text-[#FAF7F2] hover:shadow-xl'
                  : 'bg-gradient-to-r from-[#C2A064] via-[#DFC48E] to-[#C2A064] text-[#171515] hover:brightness-110'
              }`}
            >
              <span>Join Circle</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
