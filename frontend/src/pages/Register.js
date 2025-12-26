import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_666bb9f1-3878-43b6-926b-3441c49d8146/artifacts/tgzddx89_IMG_3600.jpeg';

// Country list for compliance
const countries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 
  'Japan', 'India', 'Brazil', 'Mexico', 'Spain', 'Italy', 'Netherlands', 
  'Singapore', 'South Korea', 'Other'
];

export const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.acceptTerms) {
      setError('Please accept the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        country: formData.country
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-20" data-testid="register-page">
      <div className="absolute inset-0 hero-glow opacity-20" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <img src={LOGO_URL} alt="NeurusAGi" className="h-20 mx-auto mb-4" />
          </Link>
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-zinc-500 mt-2">Join the future of AI</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-heavy p-8 space-y-5" data-testid="register-form">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full input-neurus px-4"
              placeholder="John Doe"
              data-testid="register-name-input"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full input-neurus px-4"
              placeholder="you@example.com"
              data-testid="register-email-input"
            />
          </div>

          {/* Country Selection for Compliance */}
          <div>
            <label className="block text-sm text-zinc-400 mb-2 flex items-center gap-2">
              <Globe size={14} className="text-[#0FECEC]" />
              Country (for compliance)
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full input-neurus px-4 appearance-none bg-black"
              data-testid="register-country-select"
            >
              <option value="">Select your country</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <p className="text-xs text-zinc-600 mt-1">
              NeurusAGi automatically complies with local regulations
            </p>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full input-neurus px-4 pr-12"
                placeholder="Min. 8 characters"
                data-testid="register-password-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full input-neurus px-4"
              placeholder="Confirm your password"
              data-testid="register-confirm-password-input"
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="mt-1 w-4 h-4 bg-black border border-white/20 rounded-none checked:bg-[#0FECEC]"
              data-testid="register-terms-checkbox"
            />
            <label className="text-sm text-zinc-500">
              I agree to the{' '}
              <a href="#" className="text-[#0FECEC] hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-[#0FECEC] hover:underline">Privacy Policy</a>
            </label>
          </div>

          {error && (
            <p className="text-red-500 text-sm" data-testid="register-error">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            data-testid="register-submit-btn"
          >
            {loading ? 'Creating account...' : (
              <>
                Create Account
                <ArrowRight size={18} />
              </>
            )}
          </button>

          <p className="text-center text-zinc-500 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-[#0FECEC] hover:underline" data-testid="register-login-link">
              Sign in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};
