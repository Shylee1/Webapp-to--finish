import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_666bb9f1-3878-43b6-926b-3441c49d8146/artifacts/tgzddx89_IMG_3600.jpeg';

export const Footer = () => {
  return (
    <footer className="relative bg-[#050505] border-t border-white/5" data-testid="footer">
      {/* Background texture */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1746470427581-43fbb9a04afb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMHF1YW50dW0lMjBjb21wdXRpbmclMjB0ZWNobm9sb2d5JTIwZGFyayUyMGJhY2tncm91bmR8ZW58MHx8fHwxNzY2NzUwNzAwfDA&ixlib=rb-4.1.0&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img src={LOGO_URL} alt="NeurusAGi" className="h-16 w-auto" />
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              A quantum leap in intelligence. Empowering businesses with next-generation AI solutions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-[#0FECEC] hover:text-[#0FECEC] transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-[#0FECEC] hover:text-[#0FECEC] transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-[#0FECEC] hover:text-[#0FECEC] transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Navigation</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Pricing', 'News', 'Investors', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-zinc-500 hover:text-[#0FECEC] transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Compliance'].map((item) => (
                <li key={item}>
                  <a 
                    href="#"
                    className="text-zinc-500 hover:text-[#0FECEC] transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#0FECEC] mt-0.5" />
                <span className="text-zinc-500 text-sm">contact@neurusagi.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[#0FECEC] mt-0.5" />
                <span className="text-zinc-500 text-sm">+1 (555) 000-0000</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#0FECEC] mt-0.5" />
                <span className="text-zinc-500 text-sm">Silicon Valley, CA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} NeurusAGi. All rights reserved.
          </p>
          <p className="text-zinc-600 text-sm">
            Worldwide Compliant AI Solutions
          </p>
        </div>
      </div>
    </footer>
  );
};
