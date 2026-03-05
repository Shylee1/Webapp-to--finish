import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Mail, MapPin, Phone } from 'lucide-react';
import axios from 'axios';
import DOMPurify from 'dompurify';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Sanitize all inputs before submission
    const sanitizedData = {
      name: DOMPurify.sanitize(formData.name),
      email: DOMPurify.sanitize(formData.email),
      subject: DOMPurify.sanitize(formData.subject),
      message: DOMPurify.sanitize(formData.message)
    };

    try {
      await axios.post(`${API}/contact`, sanitizedData);
      setSubmitted(true);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    // Sanitize input on change
    const sanitized = DOMPurify.sanitize(e.target.value);
    setFormData({ ...formData, [e.target.name]: sanitized });
  };

  return (
    <div className="min-h-screen bg-black pt-20" data-testid="contact-page">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-6">
              <span className="text-white">Get in</span>
              <br />
              <span className="text-[#0FECEC]">Touch</span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto" data-testid="contact-subtitle">
              {/* Subtitle placeholder */}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" data-testid="contact-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1 space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                <p className="text-zinc-500 leading-relaxed" data-testid="contact-info-desc">
                  {/* Description placeholder */}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#0FECEC]/10 border border-[#0FECEC]/30">
                    <Mail size={20} className="text-[#0FECEC]" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-sm">Email</p>
                    <p className="text-white" data-testid="contact-email">{/* Email placeholder */}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#0FECEC]/10 border border-[#0FECEC]/30">
                    <Phone size={20} className="text-[#0FECEC]" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-sm">Phone</p>
                    <p className="text-white" data-testid="contact-phone">{/* Phone placeholder */}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#0FECEC]/10 border border-[#0FECEC]/30">
                    <MapPin size={20} className="text-[#0FECEC]" />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-sm">Location</p>
                    <p className="text-white" data-testid="contact-location">{/* Location placeholder */}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              {submitted ? (
                <div
                  className="glass-heavy p-12 text-center"
                  data-testid="contact-form-success"
                >
                  <CheckCircle size={64} className="text-[#0FECEC] mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                  <p className="text-zinc-400">
                    Thank you for reaching out.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="glass-heavy p-8 space-y-6"
                  data-testid="contact-form"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full input-neurus px-4"
                        data-testid="contact-name-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-400 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full input-neurus px-4"
                        data-testid="contact-email-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full input-neurus px-4"
                      data-testid="contact-subject-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full input-neurus px-4 py-3 resize-none"
                      data-testid="contact-message-input"
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm" data-testid="contact-form-error">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                    data-testid="contact-submit-btn"
                  >
                    {loading ? 'Sending...' : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
