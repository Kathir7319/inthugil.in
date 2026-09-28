// client/src/pages/ContactPage.jsx
import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Clock, MapPin, Send, CheckCircle2, ChevronDown, HelpCircle } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';
import { VelIcon } from '../components/common/VelIcon';
import { useSettings } from '../context/SettingsContext';
import { api } from '../services/api';

export const ContactPage = () => {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderNumber: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = settings?.faqs || [
    {
      q: "What is Inthugil's return & exchange policy?",
      a: "We offer an easy 7-day hassle-free return and exchange policy from the date of delivery. Items must be unused, unwashed, and with all original tags attached. We provide doorstep reverse pickups across most Indian pin codes."
    },
    {
      q: "How do I choose the right size?",
      a: "Our sizing follows standard Indian sizing from XS (34\") to XXL (44\"). You can click the 'Size Guide' button on any product page for exact bust, waist, and hip measurements in both inches and centimeters."
    },
    {
      q: "Are the fabrics pure cotton?",
      a: "Yes! Most of our everyday kurtis, co-ords, and loungewear pieces are crafted from 100% pure breathable cotton, premium modal, or luxurious rayon blends tested for color fastness and shrink resistance."
    },
    {
      q: "What payment methods are supported?",
      a: "We accept all major Indian payment methods powered securely by Razorpay: UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking, and Cash on Delivery (COD)."
    },
    {
      q: "How long does shipping take?",
      a: "Orders are dispatched within 24–48 hours from our fulfillment hub. Metro cities usually receive deliveries within 2–3 days, while other locations across India take 4–5 business days. You will receive an instant WhatsApp/SMS tracking link."
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    try {
      await api.sendContactMessage(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', orderNumber: '', message: '' });
    } catch (err) {
      setErrorMsg(err.message || 'Unable to send message right now');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-sand-50 min-h-screen pb-20">
      
      {/* Dynamic SEO Meta + FAQ Schema */}
      <SEOHead
        title="Contact Us | Inthugil"
        description="Have questions about your order, sizing, or styling advice? Contact the Inthugil support team. We typically respond within 24 hours."
        canonicalUrl="https://inthugil.in/contact-us"
        schemaType="FAQ"
        schemaData={{ faqs }}
      />

      {/* Header - Peacock Shades */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#02181F] via-[#052C37] via-[#074758] to-[#04332A] text-white py-16 sm:py-20 text-center px-4 border-b border-[#D4AF37]/30">
        <div 
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(14, 116, 144, 0.45) 0%, rgba(3, 105, 161, 0.2) 50%, transparent 70%)'
          }}
        />
        <div 
          className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full pointer-events-none blur-3xl opacity-50"
          style={{
            background: 'radial-gradient(circle, rgba(6, 78, 59, 0.55) 0%, rgba(4, 120, 87, 0.2) 50%, transparent 70%)'
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#063A48]/85 border border-[#D4AF37]/50 text-[#FDE68A] px-4 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md">
            <VelIcon className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Customer Care • Somanur, Coimbatore</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            We'd Love to Hear From You
          </h1>
          <p className="text-teal-100/90 text-sm sm:text-base font-normal max-w-xl mx-auto leading-relaxed">
            Have a question about your order, sizing, or styling advice? Our support team is here to assist you every step of the way.
          </p>
        </div>
      </section>

      {/* Content Form & Channels Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-sand-200 shadow-soft space-y-6">
              <h2 className="font-serif text-2xl font-bold text-regal-900">
                Get In Touch
              </h2>
              <p className="text-xs text-sand-600 leading-relaxed">
                Whether you need styling assistance, order tracking updates, or custom inquiries, our support team in Somanur, Coimbatore is ready.
              </p>

              <div className="space-y-4 pt-2 text-xs sm:text-sm">
                <a
                  href={`mailto:${settings?.contactInfo?.email || 'care@inthugil.in'}`}
                  className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-sand-50 transition text-regal-900 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 group-hover:bg-brand-500 group-hover:text-white transition">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-sand-500 block font-medium">Email Support</span>
                    <strong className="font-bold text-regal-900">{settings?.contactInfo?.email || 'care@inthugil.in'}</strong>
                  </div>
                </a>

                <a
                  href={`https://wa.me/917708971359`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-sand-50 transition text-regal-900 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-sand-500 block font-medium">WhatsApp Assistance</span>
                    <strong className="font-bold text-regal-900">{settings?.contactInfo?.phone || '+91 7708 971 359'}</strong>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-3 rounded-2xl text-regal-900">
                  <div className="w-10 h-10 rounded-xl bg-sand-100 text-sand-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-sand-500 block font-medium">Operating Hours</span>
                    <strong className="font-bold text-regal-900">Mon - Sat: 9:30 AM – 7:00 PM IST</strong>
                    <p className="text-[11px] text-sand-500 mt-0.5">We typically respond within 24 hours.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-2xl text-regal-900">
                  <div className="w-10 h-10 rounded-xl bg-sand-100 text-sand-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-sand-500 block font-medium">Studio & Fulfillment</span>
                    <strong className="font-bold text-regal-900">{settings?.contactInfo?.address || 'Somanur, Coimbatore'}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 border border-sand-200 shadow-soft">
              <h2 className="font-serif text-2xl font-bold text-regal-900 mb-2">
                Send Us a Note
              </h2>
              <p className="text-xs text-sand-500 mb-6">
                Fill in the details below and our team will get back to you promptly.
              </p>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="font-serif text-xl font-bold text-regal-900">
                    Thank You for Reaching Out!
                  </h3>
                  <p className="text-xs text-sand-600 max-w-sm mx-auto">
                    We have received your message. Our customer grace team typically responds within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-bold text-brand-600 hover:underline"
                  >
                    Send another message &rarr;
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-regal-900 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Radhika Sundaram"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-sand-50 border border-sand-300 rounded-xl px-4 py-2.5 text-xs text-regal-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-regal-900 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="radhika@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-sand-50 border border-sand-300 rounded-xl px-4 py-2.5 text-xs text-regal-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-regal-900 mb-1">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 7708 971 359"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-sand-50 border border-sand-300 rounded-xl px-4 py-2.5 text-xs text-regal-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-regal-900 mb-1">
                        Order Number (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. INTH-84920"
                        value={formData.orderNumber}
                        onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                        className="w-full bg-sand-50 border border-sand-300 rounded-xl px-4 py-2.5 text-xs text-regal-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-regal-900 mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="How can we assist you with sizing, fabric details, or order inquiries?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-sand-50 border border-sand-300 rounded-xl px-4 py-2.5 text-xs text-regal-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  {errorMsg && <p className="text-xs text-rose-600">{errorMsg}</p>}

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-sand-500 italic">
                      We typically respond within 24 hours.
                    </span>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition duration-200"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* FAQs Block with Schema Integration */}
        <div id="faqs" className="mt-20 pt-12 border-t border-sand-200">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest font-semibold text-brand-600 block mb-1">
              Quick Answers
            </span>
            <h2 className="font-serif text-3xl font-bold text-regal-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-sand-200 overflow-hidden shadow-soft transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-regal-900 hover:text-brand-600 transition"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-brand-500 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-sand-400 shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180 text-brand-600' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs text-sand-600 leading-relaxed border-t border-sand-100 bg-sand-50/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
