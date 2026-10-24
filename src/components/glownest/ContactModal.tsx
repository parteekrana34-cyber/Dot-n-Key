import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { GlowNestLogo } from './GlowNestLogo';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Skin Consultation & Product Help',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#FFD1DC]/40 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#FFE5EC] via-[#FFF0F3] to-[#EDE9FE] border-b border-[#F0E6E1] flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-base sm:text-lg text-[#1E1B1D]">
              Get in Touch with Dot &amp; Key
            </h2>
            <p className="text-xs text-[#7A6E75]">We’d love to answer any routine questions!</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white text-[#7A6E75] hover:text-[#1E1B1D] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#DCFCE7] text-[#15803D] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#1E1B1D]">Message Sent!</h3>
              <p className="text-xs text-[#7A6E75]">
                Thank you for reaching out. Our skincare team will reply within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#1E1B1D] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diya Sen"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FAF7F5] border border-[#EFE5E0] rounded-xl px-3.5 py-2 text-xs font-medium text-[#1E1B1D] focus:outline-none focus:ring-1 focus:ring-[#FF6584]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E1B1D] mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="diya@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FAF7F5] border border-[#EFE5E0] rounded-xl px-3.5 py-2 text-xs font-medium text-[#1E1B1D] focus:outline-none focus:ring-1 focus:ring-[#FF6584]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E1B1D] mb-1">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#FAF7F5] border border-[#EFE5E0] rounded-xl px-3 py-2 text-xs font-medium text-[#1E1B1D] focus:outline-none focus:ring-1 focus:ring-[#FF6584]"
                >
                  <option value="Skin Consultation & Product Help">
                    Skin Consultation & Product Help
                  </option>
                  <option value="Order Tracking & Shipping Inquiry">
                    Order Tracking & Shipping Inquiry
                  </option>
                  <option value="Ingredients & Allergen Question">
                    Ingredients & Allergen Question
                  </option>
                  <option value="Student Project Feedback">Student Project Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E1B1D] mb-1">Message</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about your skin concern or feedback..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#FAF7F5] border border-[#EFE5E0] rounded-xl p-3 text-xs font-medium text-[#1E1B1D] focus:outline-none focus:ring-1 focus:ring-[#FF6584]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF6584] to-[#F43F5E] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>

              <div className="pt-2 border-t border-[#F0E6E1] text-[11px] text-[#7A6E75] space-y-1">
                <p>Email: care@dotandkey.com</p>
                <p>Mon - Sat: 9:00 AM - 7:00 PM IST</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
