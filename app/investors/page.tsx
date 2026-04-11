"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Send, CheckCircle, TrendingUp, Users, Globe, Award, DollarSign, Target, Cpu, Shield } from "lucide-react"

const keyMetrics = [
  { icon: TrendingUp, label: "Revenue Growth", value: "340%", sublabel: "YoY" },
  { icon: Users, label: "Enterprise Clients", value: "500+", sublabel: "Fortune 500" },
  { icon: Globe, label: "Global Reach", value: "40+", sublabel: "Countries" },
  { icon: Award, label: "Patents Filed", value: "127", sublabel: "Granted" },
]

const fundingRounds = [
  { round: "Seed", amount: "$50M", date: "Q2 2023", lead: "Andreessen Horowitz" },
  { round: "Series A", amount: "$150M", date: "Q4 2023", lead: "Sequoia Capital" },
  { round: "Series B", amount: "$300M", date: "Q3 2024", lead: "Tiger Global" },
  { round: "Series C", amount: "$500M", date: "Q1 2026", lead: "A16Z, Sequoia, Tiger" },
]

const investmentRanges = [
  "$100K - $500K",
  "$500K - $1M",
  "$1M - $5M",
  "$5M - $10M",
  "$10M+",
]

const highlights = [
  {
    icon: Target,
    title: "Market Opportunity",
    description: "The AGI market is projected to reach $1.3T by 2030. We&apos;re positioned to capture significant market share with our quantum neural technology.",
  },
  {
    icon: Cpu,
    title: "Technology Moat",
    description: "127 patents protect our quantum neural architecture. Our 3-year head start in quantum-AI integration creates substantial barriers to entry.",
  },
  {
    icon: Shield,
    title: "Enterprise Ready",
    description: "SOC2, HIPAA, GDPR, and FedRAMP compliant. Trusted by Fortune 500 companies in healthcare, finance, and defense.",
  },
]

export default function InvestorsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    investment_range: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSubmitted(true)
    setLoading(false)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <main className="relative bg-black">
      <div className="noise fixed inset-0 pointer-events-none z-50" />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-glow-orange opacity-30" />
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#C65D00]" />
                <span className="text-xs font-semibold text-[#C65D00] uppercase tracking-[0.3em]">
                  Investor Relations
                </span>
              </div>

              <h1
                className="text-5xl md:text-6xl font-black tracking-tighter mb-8"
                style={{ fontFamily: "Unbounded" }}
              >
                <span className="text-white">Invest in the</span>
                <br />
                <span className="text-[#C65D00] text-glow-orange">Future of AI</span>
              </h1>

              <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                NeurusAGi is pioneering the next generation of artificial general intelligence. 
                Join us in building technology that will reshape every industry on Earth.
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                {keyMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="glass-light p-4"
                  >
                    <metric.icon size={20} className="text-[#C65D00] mb-2" />
                    <p className="text-xs text-zinc-500 uppercase tracking-wider">{metric.label}</p>
                    <p className="text-2xl font-bold text-white" style={{ fontFamily: "Unbounded" }}>
                      {metric.value}
                    </p>
                    <p className="text-xs text-zinc-600">{metric.sublabel}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                  alt="Investment Growth"
                  className="w-full rounded-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-[#C65D00]/10 mix-blend-overlay" />
                
                {/* Floating Card */}
                <div className="absolute bottom-6 left-6 right-6 glass-heavy p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider">Total Raised</p>
                      <p className="text-3xl font-bold text-white" style={{ fontFamily: "Unbounded" }}>
                        $1B+
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-zinc-500 uppercase tracking-wider">Valuation</p>
                      <p className="text-3xl font-bold text-[#C65D00]" style={{ fontFamily: "Unbounded" }}>
                        $8B
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="py-24 bg-[#030303]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <span className="text-white">Why Invest in</span>{" "}
              <span className="text-[#0FECEC]">NeurusAGi</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="feature-card"
              >
                <div className="w-14 h-14 flex items-center justify-center bg-[#C65D00]/10 border border-[#C65D00]/30 mb-6">
                  <highlight.icon size={24} className="text-[#C65D00]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{highlight.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Funding History */}
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#0FECEC]" />
              <span className="text-xs font-semibold text-[#0FECEC] uppercase tracking-[0.3em]">
                Funding History
              </span>
            </div>
            <h2
              className="text-3xl font-bold tracking-tight"
              style={{ fontFamily: "Unbounded" }}
            >
              <span className="text-white">Our Journey</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {fundingRounds.map((round, index) => (
              <motion.div
                key={round.round}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-light p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#0FECEC]/10 border border-[#0FECEC]/30">
                    <DollarSign size={20} className="text-[#0FECEC]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{round.round}</h3>
                    <p className="text-sm text-zinc-500">{round.lead}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#0FECEC]" style={{ fontFamily: "Unbounded" }}>
                    {round.amount}
                  </p>
                  <p className="text-xs text-zinc-600">{round.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investor Inquiry Form */}
      <section className="py-24 bg-[#030303]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl font-bold text-white mb-4"
              style={{ fontFamily: "Unbounded" }}
            >
              Investor Inquiry
            </h2>
            <p className="text-zinc-500">
              Interested in learning more? Submit your inquiry and our investor relations team will be in touch.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-heavy p-12 text-center"
            >
              <CheckCircle size={64} className="text-[#0FECEC] mx-auto mb-6" />
              <h3
                className="text-2xl font-bold text-white mb-4"
                style={{ fontFamily: "Unbounded" }}
              >
                Thank You
              </h3>
              <p className="text-zinc-400">
                Your inquiry has been received. Our investor relations team will contact you within 48 hours.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="glass-heavy p-8 space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full input-neurus px-4"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full input-neurus px-4"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Company / Fund</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full input-neurus px-4"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Investment Range</label>
                  <select
                    name="investment_range"
                    value={formData.investment_range}
                    onChange={handleChange}
                    className="w-full input-neurus px-4 appearance-none bg-black"
                  >
                    <option value="">Select range</option>
                    {investmentRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full input-neurus px-4 py-3 resize-none"
                  placeholder="Tell us about your investment thesis and interest in NeurusAGi..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit Inquiry
                    <Send size={18} />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
