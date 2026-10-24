import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, CheckCircle, Sparkles } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Bespoke Diamond Commission',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch {
      // fallback
    }

    try {
      const { supabase } = await import('../lib/supabase');
      // Attempt saving inquiry into 'inquiries' or 'contact' table if available
      for (const tbl of ['inquiries', 'contact_inquiries', 'inquiry', 'contact']) {
        const { error } = await supabase.from(tbl).insert([{
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          created_at: new Date().toISOString(),
        }]);
        if (!error) break;
      }
    } catch {
      // fallback
    }

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#FAF7F2] max-w-2xl w-full border border-[#DDD3C7] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#EAE3D8] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#8C6D46] font-semibold">
              ATELIER CONCIERGE
            </span>
            <h2 className="font-serif text-2xl text-[#2A2421] font-medium tracking-tight">
              Connect With Our Master Jewellers
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#6E6056] hover:text-[#2A2421] hover:bg-[#F2ECE2] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl text-[#2A2421]">Concierge Request Received</h3>
            <p className="text-xs text-[#7A6C63] max-w-md mx-auto leading-relaxed">
              Our Senior Gemological Director will contact you within 4 hours to confirm your private consultation or bespoke commission details.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 bg-[#2A2421] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#8C6D46] transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Left Info Bar */}
            <div className="md:col-span-2 bg-[#F3EDE2] p-6 space-y-6 text-xs text-[#5C4F46] border-b md:border-b-0 md:border-r border-[#E7DFD4]">
              <div>
                <p className="font-serif text-lg text-[#2A2421] mb-2">Private Salons</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#8C6D46] shrink-0 mt-0.5" />
                    <span>Via Montenapoleone 18, 20121 Milan, Italy</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#8C6D46] shrink-0 mt-0.5" />
                    <span>Hoveniersstraat 42, 2018 Antwerp, Belgium</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#DDD3C7]">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#8C6D46]" />
                  <span>+1 (800) 492-7012 (Toll Free)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#8C6D46]" />
                  <span>concierge@payorajewels.com</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <form onSubmit={handleSubmit} className="md:col-span-3 p-6 space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#6E6056] font-medium mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DDD3C7] text-xs text-[#2A2421] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#6E6056] font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="eleanor@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DDD3C7] text-xs text-[#2A2421] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#6E6056] font-medium mb-1">
                  Inquiry Purpose
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DDD3C7] text-xs text-[#2A2421] focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="Bespoke Diamond Commission">Bespoke Diamond Commission</option>
                  <option value="Bridal Suite Consultation">Bridal Suite Consultation</option>
                  <option value="Private Salon Viewing">Private Salon Viewing (Milan / NY)</option>
                  <option value="Order & Certification Inquiry">Order &amp; Certification Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#6E6056] font-medium mb-1">
                  Special Instructions or Desired Date
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about your requirements, gemstone preferences, or questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#DDD3C7] text-xs text-[#2A2421] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#2A2421] text-white hover:bg-[#8C6D46] text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Concierge Request</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
