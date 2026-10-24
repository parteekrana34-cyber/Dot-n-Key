import React, { useState, useRef } from 'react';
import {
  Sun,
  Sparkles,
  ArrowRight,
  X,
  ShieldCheck,
  Check,
  Heart,
  Droplets,
  Flame,
  Zap,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from 'lucide-react';
import watermelonMovingVideo from '../../assets/videos/dotkey_watermelon_cooling_moving.mp4';
import watermelonPosterImg from '../../assets/images/dotkey_watermelon_pin_poster.jpg';
import { SkinConcernCategory } from '../../types/sunscreen';

interface HeroBannerSliderProps {
  onShopSunscreens: () => void;
  onExploreBestsellers: () => void;
  onOpenQuiz: () => void;
  onSelectConcern: (concern: SkinConcernCategory) => void;
}

export const HeroBannerSlider: React.FC<HeroBannerSliderProps> = ({
  onShopSunscreens,
  onExploreBestsellers,
  onOpenQuiz,
  onSelectConcern,
}) => {
  const [showAskAiWidget, setShowAskAiWidget] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="w-full relative overflow-hidden bg-[#FCEEF2]">
      {/* BEAUTIFUL PASTEL PINK HERO BANNER WITH LIVE MOVING ANIMATION */}
      <section
        aria-label="Bloom & Blush Sunscreen Summer Campaign"
        className="relative w-full min-h-[500px] sm:min-h-[580px] md:min-h-[640px] lg:min-h-[680px] bg-gradient-to-r from-[#F9DDE5] via-[#FCEEF2] to-[#F5D5DE] flex items-center overflow-hidden border-b border-[#F5D5DE]"
      >
        {/* Soft Rosy Ambient Glows with subtle floating animation */}
        <div className="absolute inset-0 pointer-events-none opacity-60">
          <div className="absolute top-8 left-1/4 w-[500px] h-[300px] bg-white rounded-full blur-3xl transform -rotate-6 animate-float" />
          <div className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-[#F9DDE5] rounded-full blur-3xl animate-float-reverse" />
        </div>

        {/* Content Container */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Featured Moving Animation Video (Replacing static image) */}
          <div className="lg:col-span-6 flex justify-center items-center relative order-2 lg:order-1">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group bg-white animate-fadeIn">
              {/* High-definition Moving Video from Pinterest */}
              <video
                ref={videoRef}
                src={watermelonMovingVideo}
                poster={watermelonPosterImg}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover object-center transform group-hover:scale-103 transition-transform duration-700"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Live Video Indicator Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold border border-white/20">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>Live Moving Animation</span>
              </div>

              {/* Floating Audio & Playback Controls on Video */}
              <div className="absolute top-4 right-16 z-20 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#633D4B] flex items-center justify-center shadow-md transition-all cursor-pointer"
                  title={isPlaying ? 'Pause Animation' : 'Play Animation'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-[#633D4B] flex items-center justify-center shadow-md transition-all cursor-pointer"
                  title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Angled Cute Sticker on Bottle */}
              <div className="absolute bottom-5 left-4 sm:bottom-7 sm:left-6 z-20 transform -rotate-6 hover:rotate-0 transition-transform duration-300 animate-float">
                <div className="p-1 rounded-full bg-white/95 shadow-lg border border-[#F5D5DE]">
                  <div className="px-3.5 py-1.5 rounded-full bg-[#FF8C9A] text-white font-black text-[11px] sm:text-xs tracking-wider uppercase shadow-xs flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span>LIVE MOVING TEXTURE</span>
                  </div>
                </div>
              </div>

              {/* Sun Protection Label badge */}
              <div className="absolute top-4 right-4 z-20">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-white/95 text-[#633D4B] shadow-md border border-[#F5D5DE] flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-[#FF8C9A] fill-[#FF8C9A] animate-spin-slow" />
                  <span>SPF 50+</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Pastel Pink Korean Skincare Aesthetic Headlines & Coral Pink CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center items-start space-y-3 sm:space-y-4 lg:pl-4 text-left order-1 lg:order-2">
            {/* Soft Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-[#633D4B] border border-[#F5D5DE] shadow-xs text-xs font-black uppercase tracking-wider animate-fadeIn">
              <Heart className="w-3.5 h-3.5 fill-[#FF8C9A] text-[#FF8C9A]" />
              <span>Live Motion Animation • Viral Watermelon SPF</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#633D4B] tracking-tight leading-[1.08] font-display animate-fadeIn">
              This SPF 50 Sunscreen Feels Like Ice — <br className="hidden sm:inline" />
              <span className="text-[#FF8C9A] underline decoration-[#F9DDE5] decoration-wavy">
                And Actually Works
              </span>{' '}
              🍉
            </h1>

            {/* Sub-description */}
            <p className="text-[#8E6B78] text-xs sm:text-sm md:text-base font-medium max-w-lg leading-relaxed pt-1 animate-fadeIn">
              India’s viral Watermelon Cooling Sunscreen SPF 50+ PA++++ with Hyaluronic acid. Weightless water-burst aqua-gel that absorbs in seconds with zero white cast.
            </p>

            {/* Coral Pink CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={onShopSunscreens}
                className="px-7 sm:px-8 py-3.5 rounded-2xl bg-[#FF8C9A] hover:bg-[#FF7586] text-white font-black text-sm sm:text-base shadow-lg shadow-[#FF8C9A]/30 hover:scale-102 active:scale-98 transition-all duration-200 cursor-pointer flex items-center gap-2"
              >
                <span>Shop Watermelon SPF</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreBestsellers}
                className="px-6 sm:px-7 py-3.5 rounded-2xl bg-white hover:bg-[#FAF7F5] text-[#633D4B] border border-[#F5D5DE] hover:border-[#FF8C9A] font-extrabold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                Explore Sunscreens
              </button>
            </div>

            {/* Trust Pill Checklist */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2 text-xs font-bold text-[#633D4B]">
              <span className="flex items-center gap-1.5 bg-white/90 border border-[#F5D5DE] px-3 py-1 rounded-full shadow-xs">
                <Check className="w-3.5 h-3.5 text-[#FF8C9A]" />
                Zero White Cast Guarantee
              </span>
              <span className="flex items-center gap-1.5 bg-white/90 border border-[#F5D5DE] px-3 py-1 rounded-full shadow-xs">
                <Droplets className="w-3.5 h-3.5 text-[#FF8C9A]" />
                Water-Burst Dewy Texture
              </span>
              <span className="flex items-center gap-1.5 bg-white/90 border border-[#F5D5DE] px-3 py-1 rounded-full shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FF8C9A]" />
                Dermatologist Tested
              </span>
            </div>
          </div>
        </div>

        {/* Floating SPF Match Quiz Widget on Bottom-Right */}
        {showAskAiWidget && (
          <aside
            aria-label="Sunscreen finder quiz prompt"
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-xl border border-[#F5D5DE] max-w-[240px] animate-fadeIn animate-float"
          >
            <div className="flex items-center justify-between text-xs font-extrabold text-[#633D4B] mb-1">
              <span>Find Your SPF Match</span>
              <button
                onClick={() => setShowAskAiWidget(false)}
                className="text-[#8E6B78] hover:text-[#633D4B] p-0.5 rounded-full hover:bg-[#FCEEF2] cursor-pointer"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xl">🌸</span>
              <button
                onClick={onOpenQuiz}
                className="flex-1 py-1.5 px-3 rounded-xl bg-[#FF8C9A] hover:bg-[#FF7586] text-white text-xs font-black shadow-xs transition-all cursor-pointer"
              >
                Take SPF Quiz
              </button>
            </div>
          </aside>
        )}
      </section>

      {/* CONTINUOUS MOVING ANIMATION MARQUEE TICKER */}
      <div className="w-full bg-[#FF8C9A] text-white py-3 overflow-hidden border-y border-[#F5D5DE] select-none shadow-xs">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-xs font-black tracking-widest uppercase">
          {[1, 2, 3].map((rep) => (
            <React.Fragment key={rep}>
              <span className="flex items-center gap-2">
                <Sun className="w-4 h-4 fill-white animate-spin-slow" />
                <span>WATERMELON COOLING SPF 50+</span>
              </span>
              <span className="text-white/60">•</span>
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>10% TRIPLE VITAMIN C + E GLOW</span>
              </span>
              <span className="text-white/60">•</span>
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 fill-white" />
                <span>DRAGON FRUIT BOUNCE JELLY</span>
              </span>
              <span className="text-white/60">•</span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>ZERO WHITE CAST GUARANTEE</span>
              </span>
              <span className="text-white/60">•</span>
              <span className="flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                <span>5 CERAMIDES BARRIER REPAIR</span>
              </span>
              <span className="text-white/60">•</span>
              <span className="flex items-center gap-2">
                <Flame className="w-4 h-4 fill-white" />
                <span>STRAWBERRY DEW TINTED SPF 50+</span>
              </span>
              <span className="text-white/60">•</span>
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 fill-white" />
                <span>WATER RESISTANT 80 MINS</span>
              </span>
              <span className="text-white/60">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Prominent "Sunscreen" Section Header Directly Under Banner */}
      <section
        aria-label="Sunscreen collection overview"
        className="py-6 sm:py-8 text-center bg-white border-b border-[#F5D5DE]"
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#FCEEF2] text-[#633D4B] text-[11px] font-black uppercase tracking-wider mb-2 border border-[#F5D5DE]">
            <Sparkles className="w-3 h-3 text-[#FF8C9A]" />
            <span>Curated Korean Sun Care</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#633D4B] tracking-tight font-display">
            Sunscreen
          </h2>
          <p className="text-xs sm:text-sm text-[#8E6B78] mt-1.5 max-w-xl mx-auto leading-relaxed">
            Broad Spectrum Protection • Lightweight &amp; Water-Burst Formulations • In-Vivo Tested SPF 50+ PA++++
          </p>
        </div>
      </section>
    </div>
  );
};
