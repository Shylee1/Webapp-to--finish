import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Shield, Zap, Globe, Lock, Cpu } from 'lucide-react';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_666bb9f1-3878-43b6-926b-3441c49d8146/artifacts/tgzddx89_IMG_3600.jpeg';

const features = [
  {
    icon: Brain,
    title: 'Advanced AI',
    description: 'Next-generation artificial intelligence powered by cutting-edge neural architectures.'
  },
  {
    icon: Globe,
    title: 'Global Compliance',
    description: 'Automatically adapts to local and federal regulations in all countries worldwide.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Military-grade encryption and security protocols protecting your data.'
  },
  {
    icon: Zap,
    title: 'Real-time Processing',
    description: 'Lightning-fast responses with minimal latency for seamless interactions.'
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Your data never leaves your control. Complete sovereignty over your information.'
  },
  {
    icon: Cpu,
    title: 'Scalable Infrastructure',
    description: 'Built to handle enterprise workloads from startup to global scale.'
  }
];

export const Home = () => {
  return (
    <div className="min-h-screen bg-black" data-testid="home-page">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 hero-glow" />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-none mb-6">
                <span className="text-white">A Quantum</span>
                <br />
                <span className="text-[#0FECEC]">Leap in</span>
                <br />
                <span className="text-white">Intelligence</span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                Experience the future of AI. NeurusAGi delivers enterprise-grade artificial intelligence with worldwide compliance, adapting to your local regulatory requirements automatically.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/register" 
                  className="btn-primary flex items-center gap-2 pulse-glow"
                  data-testid="hero-get-started-btn"
                >
                  Get Started
                  <ArrowRight size={18} />
                </Link>
                <Link 
                  to="/about" 
                  className="btn-secondary"
                  data-testid="hero-learn-more-btn"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>

            {/* Logo/Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 blur-3xl bg-[#0FECEC]/20 rounded-full" />
                <img 
                  src={LOGO_URL} 
                  alt="NeurusAGi" 
                  className="relative w-full max-w-lg float"
                  data-testid="hero-logo"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-zinc-600 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-[#0FECEC] rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 bg-[#050505]" data-testid="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              <span className="text-white">Built for the </span>
              <span className="text-[#0FECEC]">Future</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Enterprise-grade AI infrastructure designed to scale with your ambitions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="feature-card group"
                data-testid={`feature-card-${index}`}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-[#0FECEC]/10 border border-[#0FECEC]/30 mb-6 group-hover:bg-[#0FECEC]/20 transition-all">
                  <feature.icon size={24} className="text-[#0FECEC]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden" data-testid="cta-section">
        <div className="absolute inset-0 hero-glow opacity-50" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
              Join the next generation of intelligent enterprises. Start your journey with NeurusAGi today.
            </p>
            <Link 
              to="/pricing" 
              className="btn-primary inline-flex items-center gap-2"
              data-testid="cta-view-pricing-btn"
            >
              View Pricing
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
