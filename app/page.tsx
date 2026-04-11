"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_666bb9f1-3878-43b6-926b-3441c49d8146/artifacts/tgzddx89_IMG_3600.jpeg"

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Fixed Background Logo */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${LOGO_URL})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundColor: "#000000",
          opacity: 0.15,
        }}
      />

      {/* Hero Section - Content scrolls over the fixed background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid opacity-30" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-none mb-6">
                <span className="text-white">A Quantum</span>
                <br />
                <span className="text-[#0FECEC]">Leap in</span>
                <br />
                <span className="text-white">Intelligence</span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
                Pioneering the future of artificial general intelligence with
                breakthrough quantum-enhanced neural architectures.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/register"
                  className="btn-primary flex items-center gap-2 pulse-glow"
                >
                  Get Started
                  <ArrowRight size={18} />
                </Link>
                <Link href="/about" className="btn-secondary">
                  Learn More
                </Link>
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
      <section className="relative py-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              <span className="text-white">Cutting-Edge AI Solutions</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Harnessing the power of quantum computing and advanced neural
              networks to deliver unprecedented capabilities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Quantum Processing",
                desc: "Leverage quantum computing for exponentially faster AI computations.",
              },
              {
                title: "Neural Architecture",
                desc: "Advanced neural networks that adapt and evolve in real-time.",
              },
              {
                title: "Secure Infrastructure",
                desc: "Enterprise-grade security protecting your data and models.",
              },
              {
                title: "Scalable Solutions",
                desc: "From startup to enterprise, our platform scales with your needs.",
              },
              {
                title: "Real-time Analytics",
                desc: "Instant insights powered by cutting-edge AI algorithms.",
              },
              {
                title: "API Integration",
                desc: "Seamlessly integrate our AI capabilities into your existing systems.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="feature-card group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-[#0FECEC]/10 border border-[#0FECEC]/30 mb-6">
                  <div className="w-4 h-4 bg-[#0FECEC]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-zinc-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
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
              Join the revolution in artificial intelligence. Start building the
              future today.
            </p>
            <Link
              href="/pricing"
              className="btn-primary inline-flex items-center gap-2"
            >
              View Pricing
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
