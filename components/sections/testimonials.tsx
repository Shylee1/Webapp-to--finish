"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "NeurusAGi has fundamentally transformed how we approach drug discovery. What used to take years now happens in weeks.",
    author: "Dr. Sarah Chen",
    role: "Chief Science Officer",
    company: "Vertex Pharmaceuticals",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces",
  },
  {
    quote: "The quantum neural networks deliver accuracy levels we thought were impossible. Our fraud detection improved by 340%.",
    author: "Marcus Rodriguez",
    role: "VP of Engineering",
    company: "Global Finance Corp",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
  },
  {
    quote: "We evaluated every AGI platform on the market. NeurusAGi was the only one that delivered on its promises at scale.",
    author: "Dr. James Liu",
    role: "Director of AI Research",
    company: "MIT Media Lab",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
  },
]

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative py-32 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 hero-glow-orange opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-3 mb-16"
        >
          <div className="h-px w-12 bg-[#C65D00]" />
          <span className="text-xs font-semibold text-[#C65D00] uppercase tracking-[0.3em]">
            Testimonials
          </span>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index }}
              className="group"
            >
              <div className="glass-light p-8 h-full flex flex-col transition-all duration-500 hover:border-[#C65D00]/30">
                {/* Quote Icon */}
                <Quote
                  size={32}
                  className="text-[#C65D00]/30 mb-6 transform group-hover:scale-110 transition-transform"
                />

                {/* Quote */}
                <blockquote className="text-white text-lg leading-relaxed mb-8 flex-grow">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="w-12 h-12 overflow-hidden rounded-full">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-zinc-500">
                      {testimonial.role} @ {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "500+", label: "Enterprise Clients" },
            { value: "10B+", label: "API Calls/Day" },
            { value: "99.99%", label: "Uptime SLA" },
            { value: "4.9/5", label: "Customer Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl md:text-4xl font-black text-white mb-2"
                style={{ fontFamily: 'Unbounded' }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-zinc-500 uppercase tracking-[0.2em]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
