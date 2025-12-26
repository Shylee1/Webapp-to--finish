import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, TrendingUp, Users, Globe, Shield } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const TEAM_IMAGE = 'https://images.unsplash.com/photo-1600068485133-e0ef65324a22?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxmdXR1cmlzdGljJTIwb2ZmaWNlJTIwdGVhbSUyMGNvbGxhYm9yYXRpb24lMjBzaWxob3VldHRlfGVufDB8fHx8MTc2Njc1MDcwMXww&ixlib=rb-4.1.0&q=85';

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

    try {
      await axios.post(`${API}/investor-inquiries`, formData);
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Join us in building the next generation of artificial intelligence. NeurusAGi is pioneering worldwide-compliant AI solutions for enterprises across the globe.
              </p>
              
              {/* Key Metrics Placeholder */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: TrendingUp, label: 'Growth Potential', value: 'High' },
                  { icon: Users, label: 'Target Market', value: 'Global' },
                  { icon: Globe, label: 'Coverage', value: 'Worldwide' },
                  { icon: Shield, label: 'Compliance', value: 'Full' }
                ].map((item) => (
                  <div key={item.label} className="glass-light p-4">
                    <item.icon size={20} className="text-[#C65D00] mb-2" />
                    <p className="text-zinc-500 text-xs uppercase tracking-wider">{item.label}</p>
                    <p className="text-white font-semibold">{item.value}</p>
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
              <img 
                src={TEAM_IMAGE} 
                alt="Investment Opportunity" 
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent" />
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
            <p className="text-zinc-500">
              Interested in learning more? Get in touch with our investor relations team.
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
                Your inquiry has been received. Our investor relations team will be in touch shortly.
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
                    <option value="<100k">Less than $100K</option>
                    <option value="100k-500k">$100K - $500K</option>
                    <option value="500k-1m">$500K - $1M</option>
                    <option value="1m-5m">$1M - $5M</option>
                    <option value="5m+">$5M+</option>
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
                  placeholder="Tell us about your interest in NeurusAGi..."
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
