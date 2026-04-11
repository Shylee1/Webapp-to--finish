"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Play, Zap, Brain, Cpu } from "lucide-react"

const LOGO_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo1-IKwHh98l81IzlyGCGFZSpIAmjqQnHC.jpeg"

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles = []
      const count = Math.floor((canvas.width * canvas.height) / 15000)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(15, 236, 236, ${p.opacity})`
        ctx.fill()

        // Connect nearby particles
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(15, 236, 236, ${0.1 * (1 - dist / 120)})`
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }

    resize()
    createParticles()
    animate()

    window.addEventListener("resize", () => {
      resize()
      createParticles()
    })

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-60"
    />
  )
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Particle Background */}
      <ParticleField />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute inset-0 hero-glow-orange" />
      
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Floating Logo Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="relative w-[600px] h-[600px] opacity-10">
          <img
            src={LOGO_URL}
            alt=""
            className="w-full h-full object-contain float"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>
      </motion.div>

      {/* Scan Line Effect */}
      <div className="scan-line" />

      {/* Main Content */}
      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20"
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-light px-4 py-2 mb-8"
            >
              <div className="w-2 h-2 bg-[#0FECEC] animate-pulse" />
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.2em]">
                Now in Beta
              </span>
              <span className="text-xs text-[#0FECEC]">v2.0</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] mb-8"
              style={{ fontFamily: 'Unbounded' }}
            >
              <span className="text-white">A Quantum</span>
              <br />
              <span className="text-[#0FECEC] text-glow">Leap in</span>
              <br />
              <span className="text-white">Intelligence</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-zinc-400 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl"
            >
              Pioneering the future of artificial general intelligence with
              breakthrough quantum-enhanced neural architectures that adapt,
              evolve, and transcend.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/register" className="btn-primary pulse-glow flex items-center gap-2">
                Start Building
                <ArrowRight size={18} />
              </Link>
              <button className="btn-secondary flex items-center gap-2">
                <Play size={16} className="ml-1" />
                Watch Demo
              </button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-white/10"
            >
              {[
                { value: "10B+", label: "Parameters" },
                { value: "99.9%", label: "Uptime" },
                { value: "<50ms", label: "Latency" },
              ].map((stat) => (
                <div key={stat.label} className="text-left">
                  <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'Unbounded' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-500 uppercase tracking-[0.2em]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - 3D Brain Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="lg:col-span-5 relative hidden lg:block"
          >
            <div className="relative aspect-square">
              {/* Rotating Ring */}
              <div className="absolute inset-0 border border-[#0FECEC]/20 rounded-full rotate-slow" />
              <div className="absolute inset-8 border border-[#C65D00]/20 rounded-full rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
              <div className="absolute inset-16 border border-[#0FECEC]/10 rounded-full rotate-slow" style={{ animationDuration: '25s' }} />

              {/* Center Brain Image */}
              <div className="absolute inset-20 overflow-hidden rounded-full">
                <img
                  src={LOGO_URL}
                  alt="NeurusAGi Neural Network"
                  className="w-full h-full object-cover float"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-10 right-10 glass-neon p-4"
              >
                <Brain size={24} className="text-[#0FECEC]" />
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute bottom-20 left-0 glass-light p-4"
              >
                <Cpu size={24} className="text-[#C65D00]" />
              </motion.div>

              <motion.div
                animate={{ y: [-5, 15, -5] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="absolute top-1/2 -right-4 glass-light p-4"
              >
                <Zap size={24} className="text-[#0FECEC]" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-zinc-600 uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-6 h-10 border border-zinc-700 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 bg-[#0FECEC] rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
