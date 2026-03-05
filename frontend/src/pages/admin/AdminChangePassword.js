import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertTriangle } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_666bb9f1-3878-43b6-926b-3441c49d8146/artifacts/tgzddx89_IMG_3600.jpeg';

export const AdminChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('admin_token');
      await axios.post(
        `${API}/admin/change-password`,
        { current_password: currentPassword, new_password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4" data-testid="admin-change-password-page">
      <div className="absolute inset-0 hero-glow opacity-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="text-center mb-8">
          <img src={LOGO_URL} alt="NeurusAGi" className="h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white">Password Change Required</h1>
        </div>

        <div className="glass-heavy p-4 mb-6 border-[#C65D00]/50 flex items-center gap-3">
          <AlertTriangle className="text-[#C65D00]" />
          <p className="text-zinc-400 text-sm">
            For security, you must change your password on first login.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-heavy p-8 space-y-6" data-testid="admin-change-password-form">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Current Password</label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full input-neurus px-4"
              data-testid="admin-current-password-input"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">New Password</label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              className="w-full input-neurus px-4"
              data-testid="admin-new-password-input"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Confirm New Password</label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full input-neurus px-4"
              data-testid="admin-confirm-password-input"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showPasswords}
              onChange={(e) => setShowPasswords(e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-zinc-500 text-sm">Show passwords</label>
          </div>

          {error && (
            <p className="text-red-500 text-sm" data-testid="admin-change-password-error">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C65D00]/10 text-[#C65D00] border border-[#C65D00]/50 hover:bg-[#C65D00] hover:text-white py-3 font-bold uppercase tracking-wider transition-all disabled:opacity-50"
            data-testid="admin-change-password-btn"
          >
            {loading ? 'Updating...' : 'Change Password'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
