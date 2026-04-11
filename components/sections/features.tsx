"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Brain,
  Cpu,
  Shield,
  Zap,
  Globe,
  Code2,
  LineChart,
  Lock,
  Layers,
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Quantum Neural Networks",
    description:
      "Harness the power of quantum computing with neural architectures that process information in superposition states, achieving exponential speedups in pattern recognition.",
    color: "cyan",
    stats: "1000x faster",
  },
  {
    icon: Cpu,
    title: "Adaptive Architecture",
    description:
      "Self-modifying neural topologies that evolve in real-time, dynamically adjusting to new data patterns without retraining.",
    color: "orange",
    stats: "Zero downtime",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Military-grade encryption with quantum-resistant algorithms. Your data remains sovereign with on-premise deployment options.",
    color: "cyan",
    stats: "SOC2 Type II",
  },
  {
    icon: Zap,
    title: "Sub-50ms Inference",
    description:
      "Ultra-low latency responses powered by distributed edge computing and optimized tensor operations.",
    color: "orange",
    stats: "<50ms global",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description:
      "Seamlessly scale from prototype to planet-wide deployment with our distributed infrastructure spanning 40+ regions.",
    color: "cyan",
    stats: "40+ regions",
  },
  {
    icon: Code2,
    title: "Developer First",
    description:
      "Comprehensive SDKs in every major language. RESTful APIs, GraphQL, and WebSocket support out of the box.",
    color: "orange",
    stats: "12 SDKs",
  },
]

const capabilities = [
  { icon: LineChart, label: "Real-time Analytics" },
  { icon: Lock, label: "Zero Trust Security" },
  { icon: Layers, label: "Multi-modal Processing" },
]

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-32 bg-[#030303] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-dense opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0FECEC]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0FECEC]/30 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-[#0FECEC]" />
            <span className="text-xs font-semibold text-[#0FECEC] uppercase tracking-[0.3em]">
              Capabilities
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            style={{ fontFamily: 'Unbounded' }}
          >
            <span className="text-white">Intelligence</span>
            <br />
            <span className="text-zinc-600">Redefined</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-zinc-500 text-lg leading-relaxed"
          >
            Built from the ground up for the next generation of AI applications.
            Every component engineered for maximum performance and reliability.
          </motion.p>
        </div>

        {/* Features Grid - Bento Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className={`group feature-card relative ${
                index === 0 ? "lg:col-span-2 lg:row-span-1" : ""
              }`}
            >
              {/* Hover Glow */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  feature.color === "cyan"
                    ? "bg-gradient-to-br from-[#0FECEC]/5 to-transparent"
                    : "bg-gradient-to-br from-[#C65D00]/5 to-transparent"
                }`}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`w-14 h-14 flex items-center justify-center mb-6 ${
                    feature.color === "cyan"
                      ? "bg-[#0FECEC]/10 border border-[#0FECEC]/30"
                      : "bg-[#C65D00]/10 border border-[#C65D00]/30"
                  }`}
                >
                  <feature.icon
                    size={24}
                    className={
                      feature.color === "cyan"
                        ? "text-[#0FECEC]"
                        : "text-[#C65D00]"
                    }
                  />
                </div>

                {/* Content */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3
                    className="text-xl font-semibold text-white group-hover:text-[#0FECEC] transition-colors"
                    style={{ fontFamily: 'Unbounded' }}
                  >
                    {feature.title}
                  </h3>
                  <span
                    className={`text-xs font-mono px-2 py-1 ${
                      feature.color === "cyan"
                        ? "text-[#0FECEC] bg-[#0FECEC]/10"
                        : "text-[#C65D00] bg-[#C65D00]/10"
                    }`}
                  >
                    {feature.stats}
                  </span>
                </div>

                <p className="text-zinc-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Corner Accent */}
              <div
                className={`absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity ${
                  feature.color === "cyan"
                    ? "bg-gradient-to-bl from-[#0FECEC]/10 to-transparent"
                    : "bg-gradient-to-bl from-[#C65D00]/10 to-transparent"
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* Capabilities Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 p-6 glass-light"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {capabilities.map((cap) => (
              <div
                key={cap.label}
                className="flex items-center gap-3 text-zinc-400 hover:text-[#0FECEC] transition-colors"
              >
                <cap.icon size={20} />
                <span className="text-sm font-medium">{cap.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
