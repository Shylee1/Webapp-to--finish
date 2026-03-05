import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_666bb9f1-3878-43b6-926b-3441c49d8146/artifacts/tgzddx89_IMG_3600.jpeg';

export const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API}/admin/login`, { username, password });
      const { token, requires_password_change } = response.data;
      
      localStorage.setItem('admin_token', token);
      
      if (requires_password_change) {
        navigate('/admin/change-password');
      } else {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4" data-testid="admin-login-page">
      <div className="absolute inset-0 hero-glow opacity-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="text-center mb-8">
          <img src={LOGO_URL} alt="NeurusAGi" className="h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white">Executive Admin</h1>
          <p className="text-zinc-500 mt-2">Secure access portal</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-heavy p-8 space-y-6" data-testid="admin-login-form">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-[#C65D00]/10 border border-[#C65D00]/30 mb-4">
            <Lock size={28} className="text-[#C65D00]" />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full input-neurus px-4"
              data-testid="admin-username-input"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full input-neurus px-4 pr-12"
                data-testid="admin-password-input"
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

          {error && (
            <p className="text-red-500 text-sm" data-testid="admin-login-error">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C65D00]/10 text-[#C65D00] border border-[#C65D00]/50 hover:bg-[#C65D00] hover:text-white py-3 font-bold uppercase tracking-wider transition-all disabled:opacity-50"
            data-testid="admin-login-btn"
          >
            {loading ? 'Authenticating...' : 'Access Dashboard'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
