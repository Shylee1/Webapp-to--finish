"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Send, CheckCircle, Mail, MapPin, Phone, MessageSquare, Building, Users } from "lucide-react"

const contactReasons = [
  { value: "sales", label: "Sales Inquiry", icon: Building },
  { value: "support", label: "Technical Support", icon: MessageSquare },
  { value: "partnership", label: "Partnership", icon: Users },
  { value: "other", label: "Other", icon: Mail },
]

const offices = [
  {
    city: "San Francisco",
    address: "548 Market St, Suite 12000",
    phone: "+1 (415) 555-0123",
    type: "HQ",
  },
  {
    city: "London",
    address: "1 Canada Square, Canary Wharf",
    phone: "+44 20 7946 0958",
    type: "EU",
  },
  {
    city: "Tokyo",
    address: "Shibuya Scramble Square, 2-24-12",
    phone: "+81 3-1234-5678",
    type: "APAC",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    reason: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
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
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-20" />
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#0FECEC]" />
              <span className="text-xs font-semibold text-[#0FECEC] uppercase tracking-[0.3em]">
                Contact
              </span>
            </div>

            <h1
              className="text-5xl md:text-6xl font-black tracking-tighter mb-8"
              style={{ fontFamily: "Unbounded" }}
            >
              <span className="text-white">Get in</span>
              <br />
              <span className="text-[#0FECEC] text-glow">Touch</span>
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Have questions about NeurusAGi? Want to discuss enterprise solutions? We&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-heavy p-12 text-center"
                >
                  <CheckCircle size={64} className="text-[#0FECEC] mx-auto mb-6" />
                  <h2
                    className="text-2xl font-bold text-white mb-4"
                    style={{ fontFamily: "Unbounded" }}
                  >
                    Message Sent!
                  </h2>
                  <p className="text-zinc-400 mb-8">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: "", email: "", company: "", reason: "", message: "" })
                    }}
                    className="btn-secondary"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onSubmit={handleSubmit}
                  className="glass-heavy p-8 space-y-6"
                >
                  {/* Reason Selection */}
                  <div>
                    <label className="block text-sm text-zinc-400 mb-3">
                      What can we help you with?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {contactReasons.map((reason) => (
                        <button
                          key={reason.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, reason: reason.value })}
                          className={`p-4 text-center transition-all ${
                            formData.reason === reason.value
                              ? "bg-[#0FECEC]/10 border border-[#0FECEC] text-[#0FECEC]"
                              : "glass-light text-zinc-400 hover:text-white hover:border-white/20"
                          }`}
                        >
                          <reason.icon size={20} className="mx-auto mb-2" />
                          <span className="text-xs font-medium">{reason.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

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
                        placeholder="John Doe"
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
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full input-neurus px-4"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full input-neurus px-4 py-3 resize-none"
                      placeholder="Tell us about your project or question..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3
                  className="text-xl font-semibold text-white mb-6"
                  style={{ fontFamily: "Unbounded" }}
                >
                  Global Offices
                </h3>

                <div className="space-y-4">
                  {offices.map((office) => (
                    <div key={office.city} className="glass-light p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-white">{office.city}</h4>
                        <span className="text-[10px] font-mono text-[#0FECEC] bg-[#0FECEC]/10 px-2 py-1">
                          {office.type}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm text-zinc-500">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-zinc-600" />
                          {office.address}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-zinc-600" />
                          {office.phone}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-neon p-6"
              >
                <h4 className="font-semibold text-white mb-3">Enterprise Support</h4>
                <p className="text-sm text-zinc-400 mb-4">
                  Existing enterprise customers can reach our dedicated support team 24/7.
                </p>
                <a
                  href="mailto:enterprise@neurusagi.com"
                  className="text-[#0FECEC] text-sm font-semibold hover:underline"
                >
                  enterprise@neurusagi.com
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-light p-6"
              >
                <h4 className="font-semibold text-white mb-3">Response Time</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Sales inquiries</span>
                    <span className="text-[#0FECEC]">&lt; 4 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Support requests</span>
                    <span className="text-[#0FECEC]">&lt; 24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Enterprise (24/7)</span>
                    <span className="text-[#C65D00]">&lt; 1 hour</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
