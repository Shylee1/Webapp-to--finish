"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Check, Sparkles, Zap, HelpCircle, ArrowRight } from "lucide-react"
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
      "Standard latency (~500ms)",
      "Basic analytics",
    ],
    cta: "Start Free",
    href: "/register",
    featured: false,
    popular: false,
  },
  {
    id: "cortex",
    name: "Cortex",
    price: "$49",
    period: "/month",
    description: "For indie developers and startups",
    features: [
      "25,000 API calls/month",
      "Standard neural models",
      "Email support",
      "Better latency (~200ms)",
      "Advanced analytics",
      "Webhook integrations",
    ],
    cta: "Get Started",
    href: "/register?plan=cortex",
    featured: false,
    popular: false,
  },
  {
    id: "synapse",
    name: "Synapse",
    price: "$199",
    period: "/month",
    description: "For growing teams and products",
    features: [
      "100,000 API calls/month",
      "Advanced neural models",
      "Priority support (24h)",
      "Low latency (~100ms)",
      "Custom fine-tuning",
      "Team collaboration",
      "SSO integration",
    ],
    cta: "Get Started",
    href: "/register?plan=synapse",
    featured: false,
    popular: true,
  },
  {
    id: "quantum",
    name: "Quantum",
    price: "$499",
    period: "/month",
    description: "For scaling businesses",
    features: [
      "500,000 API calls/month",
      "Quantum neural networks",
      "Priority support (4h)",
      "Ultra-low latency (~50ms)",
      "Advanced fine-tuning",
      "Dedicated resources",
      "SLA guarantee (99.9%)",
      "Custom integrations",
    ],
    cta: "Get Started",
    href: "/register?plan=quantum",
    featured: false,
    popular: false,
  },
  {
    id: "singularity",
    name: "Singularity",
    price: "$2,499",
    period: "/month",
    description: "Enterprise-grade AGI infrastructure",
    features: [
      "Unlimited API calls",
      "Full quantum neural access",
      "Dedicated support (1h)",
      "Minimal latency (~20ms)",
      "Custom model training",
      "On-premise option",
      "SLA guarantee (99.99%)",
      "White-label solutions",
      "Compliance packages",
    ],
    cta: "Contact Sales",
    href: "/contact",
    featured: true,
    popular: false,
  },
  {
    id: "omniscience",
    name: "Omniscience",
    price: "Custom",
    period: "",
    description: "For world-changing organizations",
    features: [
      "Everything in Singularity",
      "Dedicated infrastructure",
      "24/7 on-call engineers",
      "Custom SLAs",
      "Joint R&D programs",
      "Board-level briefings",
      "Exclusive early access",
      "Co-development rights",
    ],
    cta: "Contact Us",
    href: "/contact",
    featured: false,
    popular: false,
  },
]

const faqs = [
  {
    q: "What counts as an API call?",
    a: "Each request to any NeurusAGi API endpoint counts as one API call. Streaming responses count as a single call regardless of tokens streamed.",
  },
  {
    q: "Can I switch plans anytime?",
    a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, with prorated billing for upgrades.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, wire transfers for annual plans, and can accommodate enterprise billing requirements.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "Yes, all paid plans come with a 14-day free trial. No credit card required to start.",
  },
]

export default function PricingPage() {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  return (
    <main className="relative bg-black">
      <div className="noise fixed inset-0 pointer-events-none z-50" />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-20" />
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#0FECEC]" />
              <span className="text-xs font-semibold text-[#0FECEC] uppercase tracking-[0.3em]">
                Pricing
              </span>
              <div className="h-px w-12 bg-[#0FECEC]" />
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8"
              style={{ fontFamily: "Unbounded" }}
            >
              <span className="text-white">Choose Your</span>
              <br />
              <span className="text-[#0FECEC] text-glow">Intelligence Level</span>
            </h1>

            <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10">
              Transparent pricing that scales with your needs. Start free, upgrade when ready.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 glass-light p-2">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 text-sm font-semibold transition-all ${
                  billingCycle === "monthly"
                    ? "bg-[#0FECEC] text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-6 py-2 text-sm font-semibold transition-all flex items-center gap-2 ${
                  billingCycle === "annual"
                    ? "bg-[#0FECEC] text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Annual
                <span className="text-[10px] bg-[#C65D00] text-white px-2 py-0.5 rounded-full">
                  -20%
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
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
                  hoveredTier && hoveredTier !== tier.id ? "opacity-50" : "opacity-100"
                }`}
              >
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 -z-10 blur-2xl transition-opacity duration-500 ${
                    hoveredTier === tier.id ? "opacity-30" : "opacity-0"
                  } ${tier.featured ? "bg-[#C65D00]" : "bg-[#0FECEC]"}`}
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
                  <div className="mb-6">
                    <h3
                      className={`text-xl font-bold mb-2 ${
                        tier.featured
                          ? "text-[#C65D00]"
                          : tier.popular
                          ? "text-[#0FECEC]"
                          : "text-white"
                      }`}
                      style={{ fontFamily: "Unbounded" }}
                    >
                      {tier.name}
                    </h3>
                    <p className="text-sm text-zinc-500">{tier.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span
                      className="text-4xl font-black text-white"
                      style={{ fontFamily: "Unbounded" }}
                    >
                      {tier.price === "Free" || tier.price === "Custom"
                        ? tier.price
                        : billingCycle === "annual"
                        ? `$${Math.round(parseInt(tier.price.replace("$", "")) * 0.8)}`
                        : tier.price}
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
                    href={tier.href}
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
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-[#030303]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl font-bold tracking-tight mb-4"
              style={{ fontFamily: "Unbounded" }}
            >
              <span className="text-white">Frequently Asked</span>{" "}
              <span className="text-zinc-600">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-light p-6"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle size={20} className="text-[#0FECEC] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                    <p className="text-zinc-500">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-zinc-500 mb-4">Still have questions?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[#0FECEC] font-semibold hover:gap-4 transition-all"
            >
              Contact our sales team
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
