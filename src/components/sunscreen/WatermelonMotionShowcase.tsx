import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Eye,
  ShieldCheck,
  Droplets,
  Flame,
  Check,
  Maximize2,
  Minimize2,
  ExternalLink,
} from 'lucide-react';
import watermelonMovingVideo from '../../assets/videos/dotkey_watermelon_cooling_moving.mp4';
import watermelonPosterImg from '../../assets/images/dotkey_watermelon_pin_poster.jpg';
import { SunscreenProduct } from '../../types/sunscreen';

interface WatermelonMotionShowcaseProps {
  product?: SunscreenProduct;
  onAddToCart: (product: SunscreenProduct, size: string, quantity?: number) => void;
  onQuickView: (product: SunscreenProduct) => void;
  onOpenQuiz: () => void;
}

export const WatermelonMotionShowcase: React.FC<WatermelonMotionShowcaseProps> = ({
  product,
  onAddToCart,
  onQuickView,
  onOpenQuiz,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isPipOpen, setIsPipOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState<number>(0);

  // Auto-play safely
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted until interaction
        setIsPlaying(false);
      });
    }
  }, []);

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

  const handleReplay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const benefits = [
    {
      emoji: '🍉',
      title: 'Watermelon & Hyaluronic Acid',
      desc: 'Infused with cold-pressed watermelon extract that deeply drenches thirsty skin with vitamins A & C.',
      stat: '72hr Deep Hydration',
    },
    {
      emoji: '❄️',
      title: 'Instant -5°C Skin Cooling',
      desc: 'Melts on contact like ice water, instantly calming flushed, sun-heated Indian skin.',
      stat: 'Zero Eye Stinging',
    },
    {
      emoji: '🛡️',
      title: 'New-Age UV Filters SPF 50+',
      desc: 'Certified PA++++ broad spectrum shield preventing tanning, photo-aging, and blue light damage.',
      stat: 'In-Vivo Tested',
    },
    {
      emoji: '💧',
      title: 'Zero White Cast Aqua-Gel',
      desc: 'Translucent water-burst texture absorbs in under 10 seconds with a clean, weightless dewy glow.',
      stat: 'Invisible on All Skin Tones',
    },
  ];

  return (
    <section className="relative py-12 sm:py-16 bg-gradient-to-b from-[#FCEEF2] via-white to-[#FCEEF2] border-y border-[#F5D5DE] overflow-hidden">
      {/* Background soft ambient glowing circles */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-[#F9DDE5]/60 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#FF8C9A]/15 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header Pill & Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#FCEEF2] text-[#633D4B] border border-[#F5D5DE] shadow-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF8C9A] animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-[#FF8C9A]" />
            <span>Live Motion Video • Pinterest Feature</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#633D4B] tracking-tight font-display leading-tight">
            This SPF 50 Sunscreen Feels Like Ice on Your Skin — <br className="hidden sm:inline" />
            <span className="text-[#FF8C9A] underline decoration-[#F9DDE5] decoration-wavy">
              And It Actually Works 🍉
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#8E6B78] font-medium mt-3 leading-relaxed max-w-2xl mx-auto">
            Watch the moving texture of India’s viral <strong>Bloom &amp; Blush Watermelon Hyaluronic Cooling Sunscreen SPF 50+ PA++++</strong>. Ultra-light aqua-gel with cooling water droplets that absorb in seconds with zero residue.
          </p>
        </div>

        {/* Main Grid: Left Moving Video Card + Right Sensory Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Moving Video Player in Premium Phone / Device Glass Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-[36px] bg-white p-3 sm:p-4 shadow-2xl border-4 border-white/80 ring-1 ring-[#F5D5DE] group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Outer decorative glow */}
              <div className="absolute -inset-1 rounded-[40px] bg-gradient-to-tr from-[#FF8C9A]/30 to-[#F9DDE5]/50 -z-10 blur-md opacity-80" />

              {/* Video Screen Container */}
              <div className="relative aspect-[9/16] rounded-[28px] overflow-hidden bg-[#FCEEF2] shadow-inner border border-[#F5D5DE]">
                <video
                  ref={videoRef}
                  src={watermelonMovingVideo}
                  poster={watermelonPosterImg}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover select-none"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* Top Overlay Badge */}
                <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-20 pointer-events-none">
                  <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1.5 border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                    <span>Live Moving Animation</span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-white/90 text-[#633D4B] text-[10px] font-black tracking-wider uppercase border border-[#F5D5DE] shadow-xs">
                    SPF 50+ PA++++
                  </span>
                </div>

                {/* Floating Texture Water Droplet Badge */}
                <div className="absolute bottom-16 left-3.5 z-20 pointer-events-none animate-float">
                  <div className="px-3 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md text-[#633D4B] text-xs font-black shadow-lg border border-[#F5D5DE] flex items-center gap-2">
                    <span className="text-base">🍉</span>
                    <div>
                      <p className="text-[10px] font-bold text-[#FF8C9A] leading-tight">Instant Cooling</p>
                      <p className="text-xs font-black text-[#633D4B] leading-tight">-5°C Water-Burst</p>
                    </div>
                  </div>
                </div>

                {/* Video Controls Bar Overlay */}
                <div
                  className={`absolute bottom-3 inset-x-3 z-30 flex items-center justify-between p-2 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 transition-opacity duration-300 ${
                    isHovered || !isPlaying ? 'opacity-100' : 'opacity-85 sm:opacity-0 sm:group-hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      className="w-8 h-8 rounded-xl bg-white text-[#633D4B] hover:bg-[#FF8C9A] hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white text-white hover:text-[#633D4B] flex items-center justify-center transition-colors cursor-pointer"
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={handleReplay}
                      className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white text-white hover:text-[#633D4B] flex items-center justify-center transition-colors cursor-pointer"
                      title="Replay from start"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => setIsPipOpen(true)}
                    className="px-2.5 py-1 rounded-xl bg-white/20 hover:bg-white text-white hover:text-[#633D4B] text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    title="Pop out mini-player while browsing"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Mini Player</span>
                  </button>
                </div>
              </div>

              {/* Caption under phone frame */}
              <div className="pt-3 px-2 flex items-center justify-between text-xs text-[#8E6B78]">
                <span className="font-bold text-[#633D4B]">50g Aqua-Gel Tube</span>
                <span className="font-extrabold text-[#15803D]">★★★★★ 4.9 (1,633 reviews)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sensory Science, Benefits, & Purchase CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCEEF2] text-[#633D4B] text-xs font-black border border-[#F5D5DE]">
                <span>Viral Bestseller</span>
                <span className="text-[#FF8C9A]">•</span>
                <span>Watermelon Hyaluronic Acid</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#633D4B] font-display">
                Engineered for High Humidity &amp; Sunny Summers
              </h3>
              <p className="text-xs sm:text-sm text-[#8E6B78] leading-relaxed">
                Traditional sunscreens feel heavy, chalky, and trigger breakouts in warm weather. Our breakthrough Watermelon Cooling Aqua-Gel is powered by micro-encapsulated water droplets that burst upon skin contact, leaving skin feeling chilled, matte-fresh, and glowing.
              </p>
            </div>

            {/* Interactive 4-Benefit Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((b, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedBenefit(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedBenefit === idx
                      ? 'bg-white border-[#FF8C9A] shadow-md scale-101'
                      : 'bg-[#FCEEF2]/60 border-[#F5D5DE] hover:bg-white hover:border-[#FF8C9A]/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0 p-1 bg-white rounded-xl shadow-xs border border-[#F5D5DE]">
                      {b.emoji}
                    </span>
                    <div>
                      <h4 className="text-xs font-black text-[#633D4B] mb-0.5">{b.title}</h4>
                      <p className="text-[11px] text-[#8E6B78] leading-snug mb-2">{b.desc}</p>
                      <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-black bg-[#F9DDE5] text-[#633D4B] border border-[#F5D5DE]">
                        {b.stat}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Box & Action Buttons */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#F5D5DE] shadow-card">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl font-black text-[#633D4B] font-display">₹445</span>
                    <span className="text-base text-[#8E6B78] line-through font-semibold">₹525</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#F9DDE5] text-[#633D4B] border border-[#F5D5DE]">
                      Save 15%
                    </span>
                  </div>
                  <p className="text-[11px] text-[#15803D] font-bold mt-1">
                    Free Express Shipping • COD Available • 50g Bottle
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-extrabold text-[#633D4B] bg-[#FCEEF2] px-3 py-1 rounded-full border border-[#F5D5DE]">
                    In Stock &amp; Ready to Ship
                  </span>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    if (product) {
                      onAddToCart(product, '50g', 1);
                    }
                  }}
                  className="w-full py-3.5 rounded-2xl bg-[#FF8C9A] hover:bg-[#FF7586] text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg shadow-[#FF8C9A]/30 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Watermelon SPF to Bag</span>
                </button>

                <button
                  onClick={() => {
                    if (product) {
                      onQuickView(product);
                    }
                  }}
                  className="w-full py-3.5 rounded-2xl bg-[#633D4B] hover:bg-[#7D4E5E] text-white font-black text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Product Details &amp; Reviews</span>
                </button>
              </div>

              {/* Pinterest source note */}
              <div className="mt-3.5 pt-3 border-t border-[#F5D5DE] flex items-center justify-between text-[11px] text-[#8E6B78]">
                <span className="flex items-center gap-1.5">
                  <span className="text-[#FF8C9A]">●</span>
                  Featured from Bloom &amp; Blush Pinterest video campaign
                </span>
                <a
                  href="https://pin.it/2bNMvVoN7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF8C9A] font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>View Original Pin</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING PICTURE-IN-PICTURE (PIP) MINI-PLAYER */}
      {isPipOpen && (
        <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 w-52 sm:w-60 rounded-3xl bg-white/95 backdrop-blur-md p-2 shadow-2xl border-2 border-[#FF8C9A] animate-fadeIn">
          <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black">
            <video
              src={watermelonMovingVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setIsPipOpen(false)}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer transition-colors"
              title="Close mini player"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
            <div className="absolute bottom-2 inset-x-2 text-center">
              <span className="text-[10px] font-black text-white bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-xs">
                Watermelon SPF 50+
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setIsPipOpen(false);
              if (product) onQuickView(product);
            }}
            className="w-full mt-1.5 py-1.5 rounded-xl bg-[#FF8C9A] text-white text-[11px] font-black hover:bg-[#FF7586] transition-colors cursor-pointer"
          >
            Shop This SPF
          </button>
        </div>
      )}
    </section>
  );
};
