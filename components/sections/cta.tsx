"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-40 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <motion.div
          animate={{
            background: [
              "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(15, 236, 236, 0.15) 0%, transparent 70%)",
              "radial-gradient(ellipse 60% 40% at 30% 60%, rgba(198, 93, 0, 0.1) 0%, transparent 70%)",
              "radial-gradient(ellipse 80% 50% at 70% 40%, rgba(15, 236, 236, 0.15) 0%, transparent 70%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0"
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0FECEC]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0FECEC]/50 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 glass-neon px-5 py-2 mb-8"
          >
            <Sparkles size={14} className="text-[#0FECEC]" />
            <span className="text-xs font-semibold text-[#0FECEC] uppercase tracking-[0.2em]">
              The Future is Now
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8"
            style={{ fontFamily: 'Unbounded' }}
          >
            <span className="text-white">Ready to</span>
            <br />
            <span className="text-[#0FECEC] text-glow glitch-text">Transcend?</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto"
          >
            Join the companies already building the future with NeurusAGi.
            Start free, scale infinitely.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/register"
              className="btn-primary pulse-glow flex items-center gap-2 text-base px-8 py-5"
            >
              Start Building Free
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/contact"
              className="btn-secondary flex items-center gap-2 text-base px-8 py-5"
            >
              Schedule Demo
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-600"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#0FECEC] rounded-full" />
              <span>Free tier forever</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#C65D00] rounded-full" />
              <span>Enterprise ready</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
