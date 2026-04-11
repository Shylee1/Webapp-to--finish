"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const useCases = [
  {
    id: 1,
    category: "Healthcare",
    title: "Predictive Diagnostics",
    description: "Early disease detection with 99.7% accuracy using multi-modal analysis of patient data, imaging, and genomic information.",
    metric: "99.7%",
    metricLabel: "Accuracy",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    category: "Finance",
    title: "Fraud Detection",
    description: "Real-time transaction analysis preventing $2.3B in fraudulent activities across 50M+ daily transactions.",
    metric: "$2.3B",
    metricLabel: "Protected",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    category: "Manufacturing",
    title: "Predictive Maintenance",
    description: "Reducing unplanned downtime by 73% through AI-powered equipment monitoring and failure prediction.",
    metric: "73%",
    metricLabel: "Less Downtime",
    image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    category: "Research",
    title: "Drug Discovery",
    description: "Accelerating molecule screening from years to weeks, identifying promising candidates 100x faster.",
    metric: "100x",
    metricLabel: "Faster",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop",
  },
]

export function ShowcaseSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % useCases.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + useCases.length) % useCases.length)
  }

  return (
    <section ref={ref} className="relative py-32 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 hero-glow opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-[#C65D00]" />
              <span className="text-xs font-semibold text-[#C65D00] uppercase tracking-[0.3em]">
                Use Cases
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold tracking-tight"
              style={{ fontFamily: 'Unbounded' }}
            >
              <span className="text-white">Transforming</span>
              <br />
              <span className="text-zinc-600">Industries</span>
            </motion.h2>
          </div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <button
              onClick={prevSlide}
              className="w-12 h-12 flex items-center justify-center border border-white/10 text-white hover:border-[#0FECEC] hover:text-[#0FECEC] transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="text-sm text-zinc-500">
              <span className="text-white font-mono">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              <span className="font-mono">{String(useCases.length).padStart(2, '0')}</span>
            </div>
            <button
              onClick={nextSlide}
              className="w-12 h-12 flex items-center justify-center border border-white/10 text-white hover:border-[#0FECEC] hover:text-[#0FECEC] transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>

        {/* Showcase Cards */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden group">
                <img
                  src={useCases[activeIndex].image}
                  alt={useCases[activeIndex].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-[#0FECEC]/10 mix-blend-overlay" />
                
                {/* Floating Metric */}
                <div className="absolute bottom-6 left-6 glass-heavy p-6">
                  <div className="text-4xl font-black text-[#0FECEC]" style={{ fontFamily: 'Unbounded' }}>
                    {useCases[activeIndex].metric}
                  </div>
                  <div className="text-xs text-zinc-400 uppercase tracking-[0.2em] mt-1">
                    {useCases[activeIndex].metricLabel}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center py-8">
                <span className="text-[#C65D00] text-xs font-semibold uppercase tracking-[0.3em] mb-4">
                  {useCases[activeIndex].category}
                </span>
                
                <h3
                  className="text-3xl md:text-4xl font-bold text-white mb-6"
                  style={{ fontFamily: 'Unbounded' }}
                >
                  {useCases[activeIndex].title}
                </h3>
                
                <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                  {useCases[activeIndex].description}
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[#0FECEC] font-semibold hover:gap-4 transition-all group"
                >
                  Learn More
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicators */}
          <div className="flex gap-2 mt-12">
            {useCases.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-1 transition-all duration-500 ${
                  index === activeIndex
                    ? "w-12 bg-[#0FECEC]"
                    : "w-4 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Partners/Clients */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-24 pt-16 border-t border-white/5"
        >
          <p className="text-xs text-zinc-600 uppercase tracking-[0.3em] text-center mb-10">
            Trusted by Industry Leaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-40">
            {["Fortune", "Bloomberg", "MIT", "Stanford", "NASA", "DARPA"].map((name) => (
              <div
                key={name}
                className="text-xl font-bold text-white tracking-wider"
                style={{ fontFamily: 'Unbounded' }}
              >
                {name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
