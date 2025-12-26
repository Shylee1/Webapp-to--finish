import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_666bb9f1-3878-43b6-926b-3441c49d8146/artifacts/tgzddx89_IMG_3600.jpeg';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/news', label: 'News' },
  { path: '/investors', label: 'Investors' },
  { path: '/contact', label: 'Contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-heavy" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" data-testid="nav-logo">
            <img src={LOGO_URL} alt="NeurusAGi" className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                className={`text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-[#0FECEC]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  data-testid="nav-dashboard-btn"
                  className="btn-primary text-sm px-6 py-3"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  data-testid="nav-logout-btn"
                  className="btn-secondary text-sm px-6 py-3"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  data-testid="nav-login-btn"
                  className="btn-secondary text-sm px-6 py-3"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  data-testid="nav-register-btn"
                  className="btn-primary text-sm px-6 py-3"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white"
            data-testid="nav-mobile-toggle"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-heavy border-t border-white/10"
            data-testid="nav-mobile-menu"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between py-3 px-4 ${
                    location.pathname === link.path
                      ? 'text-[#0FECEC] bg-[#0FECEC]/10'
                      : 'text-zinc-400'
                  }`}
                >
                  {link.label}
                  <ChevronRight size={16} />
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 space-y-3">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block w-full btn-primary text-center text-sm py-3"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="block w-full btn-secondary text-center text-sm py-3"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block w-full btn-secondary text-center text-sm py-3"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="block w-full btn-primary text-center text-sm py-3"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
