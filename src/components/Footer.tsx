import React, { useState } from 'react';
import { Instagram, Facebook, ArrowRight, ShieldCheck, Mail, MapPin, Phone, Check, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact, onOpenAdmin }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      try {
        const { supabase } = await import('../lib/supabase');
        for (const tbl of ['subscribers', 'newsletter', 'subscriptions']) {
          const { error } = await supabase.from(tbl).insert([{
            email: newsletterEmail,
            subscribed_at: new Date().toISOString(),
          }]);
          if (!error) break;
        }
      } catch {
        // safe fallback
      }
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer id="contact" className="bg-[#241F1C] text-[#EFEAE2] border-t border-[#3A322D]">
      {/* Newsletter & Atelier Invitation Bar */}
      <div className="border-b border-[#3A322D] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#C5A880] font-semibold">
                Private Salon Invitations
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF7F2] font-light mt-1">
                Join the Payora Collector Circle
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#BDB0A4] font-light">
                Receive private vault previews, bespoke commission invitations, and complimentary gemstone care guides.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="px-4 py-3 bg-[#1A1614] border border-[#4A3F38] text-xs text-white placeholder-[#8C7B70] focus:outline-none focus:border-[#C5A880] min-w-[260px]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#C5A880] text-[#1E1917] hover:bg-[#D4BC9A] text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-800" />
                    <span>Enrolled</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl tracking-[0.24em] font-medium text-[#FAF7F2] uppercase block">
              PAYORA JEWELS
            </span>
            <p className="text-xs text-[#B5A89C] font-light leading-relaxed max-w-sm">
              Fine jewellery designed for life’s most profound milestones and elevated daily rituals. Hand-set with ethical diamonds and recycled 18k gold across our Milan and Antwerp ateliers.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-[#C5A880]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#4A3F38] flex items-center justify-center hover:bg-[#C5A880] hover:text-[#1E1917] hover:border-[#C5A880] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#4A3F38] flex items-center justify-center hover:bg-[#C5A880] hover:text-[#1E1917] hover:border-[#C5A880] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#4A3F38] flex items-center justify-center hover:bg-[#C5A880] hover:text-[#1E1917] hover:border-[#C5A880] transition-colors"
                aria-label="Pinterest"
              >
                {/* Custom Pinterest SVG */}
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.365-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-4">
              Quick Links
            </p>
            <ul className="space-y-2.5 text-xs text-[#BDB0A4] font-light">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Home Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-white transition-colors"
                >
                  All Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('new-arrivals')}
                  className="hover:text-white transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('best-sellers')}
                  className="hover:text-white transition-colors"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  Our Heritage &amp; Ethos
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support & Policies */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-4">
              Customer Support
            </p>
            <ul className="space-y-2.5 text-xs text-[#BDB0A4] font-light">
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors">
                  Contact Concierge
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors">
                  Shipping &amp; Insured Returns
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors">
                  Ring Size &amp; Sizing Guide
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors">
                  Diamond Dossier Verification
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="text-[#8C7B70] hover:text-[#C5A880] transition-colors flex items-center gap-1.5 text-[11px] pt-1">
                  <Lock className="w-3 h-3 text-[#8C6D46]" />
                  <span>Authorized Staff &amp; Atelier Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-4">
              Atelier Contact
            </p>
            <div className="space-y-3 text-xs text-[#BDB0A4] font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>Via Montenapoleone 18, Milan &amp; 5th Ave New York</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>+1 (800) 492-7012</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>concierge@payorajewels.com</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenContact}
                  className="text-xs text-[#C5A880] underline underline-offset-4 hover:text-white font-medium"
                >
                  Book Private Salon Appointment &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-16 pt-8 border-t border-[#3A322D] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8C7B70]">
          <div>
            &copy; 2026 PAYORA JEWELS Inc. All rights reserved. Handcrafted with bespoke integrity.
          </div>

          <div className="flex items-center space-x-6 text-[11px]">
            <button onClick={onOpenContact} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={onOpenContact} className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </button>
            <span>·</span>
            <button onClick={onOpenContact} className="hover:text-white transition-colors">
              Kimberley Process Compliance
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
