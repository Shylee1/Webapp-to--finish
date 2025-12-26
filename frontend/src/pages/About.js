import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Heart } from 'lucide-react';

const TEAM_IMAGE = 'https://images.unsplash.com/photo-1600068485133-e0ef65324a22?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxmdXR1cmlzdGljJTIwb2ZmaWNlJTIwdGVhbSUyMGNvbGxhYm9yYXRpb24lMjBzaWxob3VldHRlfGVufDB8fHx8MTc2Njc1MDcwMXww&ixlib=rb-4.1.0&q=85';
const ABSTRACT_IMAGE = 'https://images.unsplash.com/photo-1684394944551-6c55a647337b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHw0fHxmdXR1cmlzdGljJTIwYXJ0aWZpY2lhbCUyMGludGVsbGlnZW5jZSUyMGJyYWluJTIwZ2xvd2luZyUyMG5ldXJhbCUyMG5ldHdvcmt8ZW58MHx8fHwxNzY2NzUwNjk4fDA&ixlib=rb-4.1.0&q=85';

export const About = () => {
  return (
    <div className="min-h-screen bg-black pt-20" data-testid="about-page">
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
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                We are pioneering the future of artificial intelligence, building technology that seamlessly integrates with businesses worldwide while respecting local regulations and cultural nuances.
              </p>
              <p className="text-zinc-500 leading-relaxed">
                Our mission is to democratize access to advanced AI capabilities, ensuring that organizations of all sizes can leverage the power of next-generation intelligence.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={ABSTRACT_IMAGE} 
                  alt="AI Technology" 
                  className="w-full h-[400px] object-cover"
                  data-testid="about-hero-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-[#050505]" data-testid="values-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              <span className="text-white">Our </span>
              <span className="text-[#C65D00]">Core Values</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Mission', description: 'To revolutionize how businesses interact with AI, making advanced intelligence accessible, compliant, and secure for organizations worldwide.' },
              { icon: Eye, title: 'Vision', description: 'A future where AI amplifies human potential, respects privacy, and operates within the ethical and legal frameworks of every jurisdiction.' },
              { icon: Heart, title: 'Values', description: 'Innovation with integrity. We believe technology should serve humanity while protecting individual rights and promoting global cooperation.' }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-light p-8"
                data-testid={`value-card-${index}`}
              >
                <div className="w-14 h-14 flex items-center justify-center bg-[#C65D00]/10 border border-[#C65D00]/30 mb-6">
                  <item.icon size={28} className="text-[#C65D00]" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{item.description}</p>
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
              <img 
                src={TEAM_IMAGE} 
                alt="Our Team" 
                className="w-full h-[500px] object-cover"
                data-testid="team-image"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                <span className="text-white">The Team Behind </span>
                <span className="text-[#0FECEC]">The Vision</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                Our team consists of world-class researchers, engineers, and visionaries united by a common goal: building AI that works for everyone.
              </p>
              <p className="text-zinc-500 leading-relaxed mb-8">
                With expertise spanning machine learning, regulatory compliance, enterprise systems, and human-computer interaction, we bring together diverse perspectives to solve complex challenges.
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

      {/* Global Compliance */}
      <section className="py-32 bg-[#050505]" data-testid="compliance-section">
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
            <p className="text-zinc-400 text-lg leading-relaxed mb-10">
              NeurusAGi automatically adapts to local and federal regulations in all countries. Our intelligent compliance engine ensures your AI operations meet the specific legal requirements of each jurisdiction where you operate.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['GDPR', 'CCPA', 'HIPAA', 'SOC2', 'ISO 27001', 'LGPD', 'PDPA', 'POPIA'].map((cert) => (
                <div key={cert} className="glass-light p-4 text-center">
                  <span className="text-[#0FECEC] font-mono text-sm">{cert}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
