import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import axios from 'axios';
import DOMPurify from 'dompurify';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Investors = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    investment_range: '',
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
      company: DOMPurify.sanitize(formData.company),
      investment_range: DOMPurify.sanitize(formData.investment_range),
      message: DOMPurify.sanitize(formData.message)
    };

    try {
      await axios.post(`${API}/investor-inquiries`, sanitizedData);
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit inquiry. Please try again.');
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
    <div className="min-h-screen bg-black pt-20" data-testid="investors-page">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-6">
                <span className="text-white">Invest in the</span>
                <br />
                <span className="text-[#C65D00]">Future of AI</span>
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8" data-testid="investor-description">
                {/* Description placeholder */}
              </p>
              
              {/* Key Info Placeholders */}
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="glass-light p-4" data-testid={`investor-stat-${i}`}>
                    <div className="w-5 h-5 bg-[#C65D00]/20 mb-2" />
                    <p className="text-zinc-500 text-xs uppercase tracking-wider">{/* Label */}</p>
                    <p className="text-white font-semibold">{/* Value */}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="w-full h-[500px] bg-gradient-to-br from-[#0FECEC]/10 to-[#C65D00]/10">
                {/* Image placeholder */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-[#050505]" data-testid="investor-form-section">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Investor Inquiry
            </h2>
            <p className="text-zinc-500" data-testid="investor-form-subtitle">
              {/* Subtitle placeholder */}
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-heavy p-12 text-center"
              data-testid="investor-form-success"
            >
              <CheckCircle size={64} className="text-[#0FECEC] mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
              <p className="text-zinc-400">
                Your inquiry has been received.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="glass-heavy p-8 space-y-6"
              data-testid="investor-form"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full input-neurus px-4"
                    data-testid="investor-name-input"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full input-neurus px-4"
                    data-testid="investor-email-input"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Company / Fund</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full input-neurus px-4"
                    data-testid="investor-company-input"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Investment Range</label>
                  <select
                    name="investment_range"
                    value={formData.investment_range}
                    onChange={handleChange}
                    className="w-full input-neurus px-4 appearance-none bg-black"
                    data-testid="investor-range-select"
                  >
                    <option value="">Select range</option>
                    {/* Options to be filled */}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full input-neurus px-4 py-3 resize-none"
                  data-testid="investor-message-input"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm" data-testid="investor-form-error">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                data-testid="investor-submit-btn"
              >
                {loading ? 'Submitting...' : (
                  <>
                    Submit Inquiry
                    <Send size={18} />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
};
