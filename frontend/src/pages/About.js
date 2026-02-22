import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Lightbulb, Rocket } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen pt-20" data-testid="about-page">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-6">
                <span className="text-white">About</span>
                <br />
                <span className="text-[#0FECEC]">NeurusAGi</span>
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8" data-testid="about-description-1">
                NeurusAGI is a high-performance artificial intelligence enterprise established to move beyond the limitations of legacy machine learning and deliver the world's first functional Artificial General Intelligence. Founded and led by CEO Jeremy Taylor, the company operates out of Tulsa, Oklahoma.
              </p>
              <p className="text-zinc-500 leading-relaxed" data-testid="about-description-2">
                Built upon a fundamental architectural shift from static transformer models to a Living Neural Network (LNN), a discovery-driven system first validated in February 2025. NeurusAGI focuses on autonomous, organic cognition and self-evolution, rejecting the pre-training methods of traditional AI in favor of a system that learns and adapts in real-time.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden h-[400px] bg-gradient-to-br from-[#0FECEC]/10 to-[#C65D00]/10">
                {/* Image placeholder */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32" data-testid="values-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6" data-testid="values-title">
              <span className="text-white">Our Core </span>
              <span className="text-[#C65D00]">Principles</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Precision', desc: '99.9% trajectory accuracy over 1,000+ task steps with 98.2% Zero-Shot Discovery. Industrial-grade performance that renders previous benchmarks obsolete.' },
              { icon: Lightbulb, title: 'Autonomy', desc: 'Self-Optimizing Genetic Bytecode evolves its own micro-instructions without manual retraining. A self-replicating enhancement swarm distributes workloads fractally.' },
              { icon: Rocket, title: 'Efficiency', desc: 'The Holographic Fractal Matrix stores one petabyte of semantic knowledge within a single gigabyte. Minimal hardware footprint with infinite scaling.' },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-light p-8"
                data-testid={`value-card-${index + 1}`}
              >
                <div className="w-14 h-14 flex items-center justify-center bg-[#C65D00]/10 border border-[#C65D00]/30 mb-6">
                  <value.icon size={28} className="text-[#C65D00]" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4" data-testid={`value-title-${index + 1}`}>
                  {value.title}
                </h3>
                <p className="text-zinc-500 leading-relaxed" data-testid={`value-desc-${index + 1}`}>
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32" data-testid="team-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="w-full h-[500px] bg-gradient-to-br from-[#0FECEC]/10 to-[#C65D00]/10">
                {/* Image placeholder */}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6" data-testid="team-title">
                <span className="text-white">Led by </span>
                <span className="text-[#0FECEC]">Jeremy Taylor</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6" data-testid="team-desc-1">
                NeurusAGI is founded and led by CEO Jeremy Taylor, who serves as the primary executive and sole architect of the platform. Under his leadership, the company validated its first functional AGI system in February 2025.
              </p>
              <p className="text-zinc-500 leading-relaxed mb-8" data-testid="team-desc-2">
                The company is building market traction through its forthcoming web application, providing an industrial-grade AGI standard that prioritizes accuracy, efficiency, and autonomous reasoning. Headquartered in Tulsa, Oklahoma with offices at 1001 S. Main St. STE 600, Kalispell, MT.
              </p>
              <Link 
                to="/contact" 
                className="btn-primary inline-flex items-center gap-2"
                data-testid="about-contact-btn"
              >
                Get in Touch
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-32" data-testid="compliance-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              <span className="text-white">Worldwide </span>
              <span className="text-[#0FECEC]">Compliance</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-10" data-testid="compliance-desc">
              NeurusAGI automatically adapts to local regulatory requirements across every jurisdiction it operates in, ensuring enterprise-grade compliance at all times.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['GDPR', 'CCPA', 'SOC 2', 'ISO 27001', 'HIPAA', 'FedRAMP', 'FinCEN', 'FATF'].map((badge) => (
                <div key={badge} className="glass-light p-4 text-center" data-testid={`compliance-badge-${badge}`}>
                  <span className="text-[#0FECEC] font-mono text-sm">{badge}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
