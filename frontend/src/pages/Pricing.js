import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const tiers = [
  {
    id: 'neural-spark',
    name: 'Neural Spark',
    price: 'Free',
    description: 'Perfect for exploring NeurusAGi capabilities',
    features: [
      'Basic AI interactions',
      'Community support',
      'Limited API calls',
      'Standard response time'
    ],
    stripeLink: '#',
    popular: false
  },
  {
    id: 'cortex',
    name: 'Cortex',
    price: '$49',
    period: '/month',
    description: 'For individuals and small projects',
    features: [
      'Everything in Neural Spark',
      'Priority support',
      '10,000 API calls/month',
      'Faster response time',
      'Basic analytics'
    ],
    stripeLink: '#',
    popular: false
  },
  {
    id: 'synapse',
    name: 'Synapse',
    price: '$149',
    period: '/month',
    description: 'For growing teams and businesses',
    features: [
      'Everything in Cortex',
      '50,000 API calls/month',
      'Advanced analytics',
      'Custom model fine-tuning',
      'Team collaboration'
    ],
    stripeLink: '#',
    popular: true
  },
  {
    id: 'quantum',
    name: 'Quantum',
    price: '$399',
    period: '/month',
    description: 'For established businesses',
    features: [
      'Everything in Synapse',
      '200,000 API calls/month',
      'Dedicated support',
      'SLA guarantee',
      'Advanced integrations',
      'Compliance reports'
    ],
    stripeLink: '#',
    popular: false
  },
  {
    id: 'singularity',
    name: 'Singularity',
    price: '$999',
    period: '/month',
    description: 'Enterprise-grade AI infrastructure',
    features: [
      'Everything in Quantum',
      'Unlimited API calls',
      'Dedicated infrastructure',
      '24/7 premium support',
      'Custom compliance',
      'White-label options',
      'On-premise deployment'
    ],
    stripeLink: '#',
    popular: false,
    featured: true
  },
  {
    id: 'omniscience',
    name: 'Omniscience',
    price: 'Custom',
    description: 'Tailored solutions for global enterprises',
    features: [
      'Everything in Singularity',
      'Custom development',
      'Dedicated team',
      'Global deployment',
      'Custom SLAs',
      'Strategic partnership',
      'Executive support'
    ],
    stripeLink: '#',
    popular: false
  }
];

export const Pricing = () => {
  const [hoveredTier, setHoveredTier] = useState(null);

  return (
    <div className="min-h-screen bg-black pt-20" data-testid="pricing-page">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-6">
              <span className="text-white">Choose Your</span>
              <br />
              <span className="text-[#0FECEC]">Intelligence Level</span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Scale your AI capabilities with plans designed for every stage of growth. All plans include worldwide compliance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Grid - Holographic Deck */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" data-testid="pricing-grid">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredTier(tier.id)}
                onMouseLeave={() => setHoveredTier(null)}
                className={`relative group transition-all duration-500 ${
                  hoveredTier && hoveredTier !== tier.id ? 'opacity-40' : 'opacity-100'
                }`}
                data-testid={`pricing-card-${tier.id}`}
              >
                {/* Card */}
                <div className={`h-full pricing-card ${
                  tier.featured ? 'border-[#C65D00] shadow-[0_0_40px_rgba(198,93,0,0.2)]' : ''
                } ${tier.popular ? 'border-[#0FECEC]' : ''}`}>
                  
                  {/* Popular/Featured Badge */}
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0FECEC] text-black text-xs font-bold uppercase tracking-wider px-4 py-1">
                      Most Popular
                    </div>
                  )}
                  {tier.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C65D00] text-white text-xs font-bold uppercase tracking-wider px-4 py-1 flex items-center gap-1 glitch-text">
                      <Sparkles size={12} />
                      Enterprise
                    </div>
                  )}

                  {/* Tier Name */}
                  <h3 className={`text-2xl font-bold mb-2 ${
                    tier.featured ? 'text-[#C65D00]' : tier.popular ? 'text-[#0FECEC]' : 'text-white'
                  }`}>
                    {tier.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-4xl font-black text-white">{tier.price}</span>
                    {tier.period && <span className="text-zinc-500">{tier.period}</span>}
                  </div>

                  {/* Description */}
                  <p className="text-zinc-500 text-sm mb-6">{tier.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <Check size={16} className={`mt-0.5 flex-shrink-0 ${
                          tier.featured ? 'text-[#C65D00]' : 'text-[#0FECEC]'
                        }`} />
                        <span className="text-zinc-400">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <a
                    href={tier.stripeLink}
                    className={`block w-full text-center py-4 font-bold uppercase tracking-wider transition-all duration-300 ${
                      tier.featured 
                        ? 'bg-[#C65D00]/10 text-[#C65D00] border border-[#C65D00]/50 hover:bg-[#C65D00] hover:text-white'
                        : tier.popular
                        ? 'bg-[#0FECEC] text-black hover:shadow-[0_0_30px_rgba(15,236,236,0.5)]'
                        : 'bg-white/5 text-white border border-white/10 hover:border-[#0FECEC] hover:text-[#0FECEC]'
                    }`}
                    data-testid={`pricing-btn-${tier.id}`}
                  >
                    {tier.price === 'Free' ? 'Get Started' : tier.price === 'Custom' ? 'Contact Sales' : 'Subscribe'}
                  </a>
                </div>

                {/* Glow effect on hover */}
                <div className={`absolute inset-0 -z-10 blur-xl transition-opacity duration-500 ${
                  hoveredTier === tier.id ? 'opacity-30' : 'opacity-0'
                } ${
                  tier.featured ? 'bg-[#C65D00]' : 'bg-[#0FECEC]'
                }`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ/Info Section */}
      <section className="py-20 bg-[#050505]" data-testid="pricing-info">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">All Plans Include</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'SSL Encryption',
              'Global CDN',
              'Auto-scaling',
              'Compliance Tools'
            ].map((item) => (
              <div key={item} className="glass-light p-4">
                <span className="text-[#0FECEC] text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
