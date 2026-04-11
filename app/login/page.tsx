"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, EyeOff, ArrowRight, Github, Chrome } from "lucide-react"

const LOGO_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo1-IKwHh98l81IzlyGCGFZSpIAmjqQnHC.jpeg"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
  }

  return (
    <main className="relative min-h-screen bg-black flex">
      <div className="noise fixed inset-0 pointer-events-none z-50" />

      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 hero-glow opacity-40" />
        
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 overflow-hidden">
              <img src={LOGO_URL} alt="NeurusAGi" className="w-full h-full object-cover" />
            </div>
            <span className="text-white font-bold text-xl" style={{ fontFamily: "Unbounded" }}>
              Neurus<span className="text-[#0FECEC]">AGi</span>
            </span>
          </Link>

          {/* Center Content */}
          <div className="max-w-md">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-black tracking-tight mb-6"
              style={{ fontFamily: "Unbounded" }}
            >
              <span className="text-white">Welcome</span>
              <br />
              <span className="text-[#0FECEC]">Back</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 leading-relaxed"
            >
              Access your quantum neural networks, manage your AI deployments, and continue pushing the boundaries of intelligence.
            </motion.p>
          </div>

          {/* Quote */}
          <div className="glass-light p-6">
            <p className="text-zinc-300 italic mb-4">
              &ldquo;NeurusAGi has transformed how we approach complex problems. The speed and accuracy are unprecedented.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0FECEC]/20 to-[#C65D00]/20" />
              <div>
                <p className="text-white text-sm font-medium">Dr. Sarah Chen</p>
                <p className="text-zinc-500 text-xs">CSO, Vertex Pharmaceuticals</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden flex items-center gap-3 mb-12">
            <div className="w-10 h-10 overflow-hidden">
              <img src={LOGO_URL} alt="NeurusAGi" className="w-full h-full object-cover" />
            </div>
            <span className="text-white font-bold text-lg" style={{ fontFamily: "Unbounded" }}>
              Neurus<span className="text-[#0FECEC]">AGi</span>
            </span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2
              className="text-3xl font-bold text-white mb-2"
              style={{ fontFamily: "Unbounded" }}
            >
              Sign In
            </h2>
            <p className="text-zinc-500 mb-8">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#0FECEC] hover:underline">
                Create one
              </Link>
            </p>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button className="flex items-center justify-center gap-2 py-3 glass-light hover:border-white/20 transition-colors">
                <Chrome size={18} />
                <span className="text-sm text-zinc-400">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 glass-light hover:border-white/20 transition-colors">
                <Github size={18} />
                <span className="text-sm text-zinc-400">GitHub</span>
              </button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-black px-4 text-xs text-zinc-600 uppercase tracking-wider">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full input-neurus px-4"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-zinc-400">Password</label>
                  <Link href="/forgot-password" className="text-xs text-[#0FECEC] hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full input-neurus px-4 pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-zinc-600 text-center mt-8">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="text-zinc-400 hover:text-white">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-zinc-400 hover:text-white">
                Privacy Policy
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
