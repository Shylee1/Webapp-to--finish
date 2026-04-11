"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Check, Sparkles, ArrowRight, Zap } from "lucide-react"
import Link from "next/link"

const tiers = [
  {
    id: "spark",
    name: "Neural Spark",
    price: "Free",
    period: "forever",
    description: "Perfect for exploration and learning",
    features: [
      "1,000 API calls/month",
      "Basic neural models",
      "Community support",
      "Standard latency",
    ],
    cta: "Start Free",
    featured: false,
    popular: false,
  },
  {
    id: "synapse",
    name: "Synapse",
    price: "$99",
    period: "/month",
    description: "For growing teams and products",
    features: [
      "100,000 API calls/month",
      "Advanced neural models",
      "Priority support",
      "Low latency (<100ms)",
      "Custom fine-tuning",
    ],
    cta: "Get Started",
    featured: false,
    popular: true,
  },
  {
    id: "singularity",
    name: "Singularity",
    price: "Custom",
    period: "",
    description: "Enterprise-grade AGI infrastructure",
    features: [
      "Unlimited API calls",
      "Quantum neural networks",
      "Dedicated support",
      "Ultra-low latency (<20ms)",
      "On-premise deployment",
      "Custom model training",
    ],
    cta: "Contact Sales",
    featured: true,
    popular: false,
  },
]

export function PricingPreviewSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredTier, setHoveredTier] = useState<string | null>(null)

  return (
    <section ref={ref} className="relative py-32 bg-[#030303] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C65D00]/30 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-[#0FECEC]" />
            <span className="text-xs font-semibold text-[#0FECEC] uppercase tracking-[0.3em]">
              Pricing
            </span>
            <div className="h-px w-12 bg-[#0FECEC]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            style={{ fontFamily: 'Unbounded' }}
          >
            <span className="text-white">Choose Your</span>
            <br />
            <span className="text-[#0FECEC]">Intelligence Level</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 text-lg"
          >
            Scale from prototype to production with transparent pricing
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index }}
              onMouseEnter={() => setHoveredTier(tier.id)}
              onMouseLeave={() => setHoveredTier(null)}
              className={`relative group transition-all duration-500 ${
                hoveredTier && hoveredTier !== tier.id ? "opacity-50" : "opacity-100"
              }`}
            >
              {/* Glow Effect */}
              <div
                className={`absolute inset-0 -z-10 blur-2xl transition-opacity duration-500 ${
                  hoveredTier === tier.id ? "opacity-30" : "opacity-0"
                } ${
                  tier.featured ? "bg-[#C65D00]" : "bg-[#0FECEC]"
                }`}
              />

              <div
                className={`h-full pricing-card ${
                  tier.featured
                    ? "border-[#C65D00] shadow-[0_0_50px_rgba(198,93,0,0.2)]"
                    : tier.popular
                    ? "border-[#0FECEC]/50"
                    : ""
                }`}
              >
                {/* Badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0FECEC] text-black text-[10px] font-bold uppercase tracking-wider px-4 py-1 flex items-center gap-1">
                    <Zap size={10} />
                    Most Popular
                  </div>
                )}
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C65D00] text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1 flex items-center gap-1 glitch-text">
                    <Sparkles size={10} />
                    Enterprise
                  </div>
                )}

                {/* Content */}
                <div className="mb-8">
                  <h3
                    className={`text-xl font-bold mb-2 ${
                      tier.featured
                        ? "text-[#C65D00]"
                        : tier.popular
                        ? "text-[#0FECEC]"
                        : "text-white"
                    }`}
                    style={{ fontFamily: 'Unbounded' }}
                  >
                    {tier.name}
                  </h3>
                  <p className="text-sm text-zinc-500">{tier.description}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <span
                    className="text-4xl font-black text-white"
                    style={{ fontFamily: 'Unbounded' }}
                  >
                    {tier.price}
                  </span>
                  <span className="text-zinc-500 text-sm ml-1">{tier.period}</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check
                        size={16}
                        className={`mt-0.5 flex-shrink-0 ${
                          tier.featured ? "text-[#C65D00]" : "text-[#0FECEC]"
                        }`}
                      />
                      <span className="text-zinc-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={tier.featured ? "/contact" : "/register"}
                  className={`block w-full text-center py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300 ${
                    tier.featured
                      ? "bg-[#C65D00]/10 text-[#C65D00] border border-[#C65D00]/50 hover:bg-[#C65D00] hover:text-white"
                      : tier.popular
                      ? "bg-[#0FECEC] text-black hover:shadow-[0_0_40px_rgba(15,236,236,0.5)]"
                      : "bg-white/5 text-white border border-white/10 hover:border-[#0FECEC] hover:text-[#0FECEC]"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-zinc-500 mb-4">
            Need a custom solution?{" "}
            <Link href="/contact" className="text-[#0FECEC] hover:underline">
              Talk to our team
            </Link>
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            View full pricing details
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
