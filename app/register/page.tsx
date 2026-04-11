"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Eye, EyeOff, Check, Zap, Shield, Globe } from "lucide-react"

const LOGO_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo1-IKwHh98l81IzlyGCGFZSpIAmjqQnHC.jpeg"

const benefits = [
  { icon: Zap, text: "10B+ parameter models at your fingertips" },
  { icon: Shield, text: "Enterprise-grade security & compliance" },
  { icon: Globe, text: "Global infrastructure, local latency" },
]

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
  })
  const [agreed, setAgreed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle registration
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-3 mb-12">
            <div className="w-10 h-10 overflow-hidden">
              <img src={LOGO_URL} alt="NeurusAGi" className="w-full h-full object-cover" />
            </div>
            <span className="text-white font-bold text-xl" style={{ fontFamily: "Unbounded" }}>
              Neurus<span className="text-[#0FECEC]">AGi</span>
            </span>
          </Link>

          {/* Header */}
          <div className="mb-10">
            <h1
              className="text-3xl lg:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "Unbounded" }}
            >
              Start building
            </h1>
            <p className="text-zinc-500">
              Create your account and unlock the future of AI.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-neurus w-full px-4"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Work Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-neurus w-full px-4"
                placeholder="john@company.com"
                required
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="input-neurus w-full px-4"
                placeholder="Company Inc."
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input-neurus w-full px-4 pr-12"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-zinc-600 mt-2">
                Minimum 8 characters with uppercase, lowercase, and numbers
              </p>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 py-2">
              <button
                type="button"
                onClick={() => setAgreed(!agreed)}
                className={`w-5 h-5 flex items-center justify-center border transition-all flex-shrink-0 mt-0.5 ${
                  agreed
                    ? "bg-[#0FECEC] border-[#0FECEC]"
                    : "border-zinc-700 hover:border-zinc-500"
                }`}
              >
                {agreed && <Check size={12} className="text-black" />}
              </button>
              <p className="text-sm text-zinc-500">
                I agree to the{" "}
                <Link href="/terms" className="text-[#0FECEC] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[#0FECEC] hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!agreed}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Account
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-xs text-zinc-600 uppercase tracking-wider">Or continue with</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="py-3 px-4 border border-zinc-800 text-white hover:border-zinc-600 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>
            <button className="py-3 px-4 border border-zinc-800 text-white hover:border-zinc-600 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-sm text-zinc-500 mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-[#0FECEC] hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Panel - Benefits */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-16 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0FECEC]/10 via-transparent to-[#C65D00]/10" />
        <div className="absolute inset-0 bg-grid opacity-30" />

        {/* Floating Brain */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-20">
          <img src={LOGO_URL} alt="" className="w-full h-full object-contain float" />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10 max-w-md"
        >
          <h2
            className="text-4xl font-bold text-white mb-6"
            style={{ fontFamily: "Unbounded" }}
          >
            Join the AGI revolution
          </h2>
          <p className="text-zinc-400 text-lg mb-10">
            Thousands of developers and enterprises are already building the future with NeurusAGi.
          </p>

          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-4 p-4 glass-light"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-[#0FECEC]/10 border border-[#0FECEC]/30">
                  <benefit.icon size={20} className="text-[#0FECEC]" />
                </div>
                <span className="text-white">{benefit.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
            <div>
              <div className="text-3xl font-bold text-white" style={{ fontFamily: "Unbounded" }}>
                50K+
              </div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">Developers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white" style={{ fontFamily: "Unbounded" }}>
                1M+
              </div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">API Calls/Day</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white" style={{ fontFamily: "Unbounded" }}>
                99.9%
              </div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider">Uptime</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
