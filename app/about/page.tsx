"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { ArrowRight, Target, Lightbulb, Shield, Users, Globe, Award } from "lucide-react"
import Link from "next/link"

const LOGO_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo1-IKwHh98l81IzlyGCGFZSpIAmjqQnHC.jpeg"

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We exist to democratize access to artificial general intelligence, ensuring its benefits reach every corner of humanity.",
    color: "cyan",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We push the boundaries of what&apos;s possible, combining quantum computing with neural architectures in unprecedented ways.",
    color: "orange",
  },
  {
    icon: Shield,
    title: "Ethical AI",
    description: "Safety and alignment are not afterthoughts. We build responsible AI systems that prioritize human values.",
    color: "cyan",
  },
]

const team = [
  {
    name: "Dr. Elena Vasquez",
    role: "Founder & CEO",
    bio: "Former DeepMind researcher, 15 years in AI/ML",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=faces",
  },
  {
    name: "Dr. James Chen",
    role: "CTO",
    bio: "Ex-Google Brain, quantum computing pioneer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces",
  },
  {
    name: "Sarah Mitchell",
    role: "Chief Science Officer",
    bio: "Stanford PhD, 50+ published papers",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=faces",
  },
  {
    name: "Marcus Rodriguez",
    role: "VP Engineering",
    bio: "Built infrastructure at Scale AI",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=faces",
  },
]

const milestones = [
  { year: "2022", title: "Founded", description: "NeurusAGi founded in Palo Alto" },
  { year: "2023", title: "Seed Round", description: "$50M raised, 50 employees" },
  { year: "2024", title: "Series A", description: "$150M, launched Q-Neural v1" },
  { year: "2025", title: "Series B", description: "$300M, 500+ enterprise clients" },
  { year: "2026", title: "Series C", description: "$500M, global expansion" },
]

const compliance = [
  "SOC 2 Type II",
  "HIPAA",
  "GDPR",
  "ISO 27001",
  "FedRAMP",
  "PCI DSS",
  "CCPA",
  "AI Act",
]

export default function AboutPage() {
  return (
    <main className="relative bg-black">
      <div className="noise fixed inset-0 pointer-events-none z-50" />
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-30" />
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#0FECEC]" />
                <span className="text-xs font-semibold text-[#0FECEC] uppercase tracking-[0.3em]">
                  About Us
                </span>
              </div>

              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8"
                style={{ fontFamily: "Unbounded" }}
              >
                <span className="text-white">Building the</span>
                <br />
                <span className="text-[#0FECEC] text-glow">Future of</span>
                <br />
                <span className="text-white">Intelligence</span>
              </h1>

              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                NeurusAGi was founded with a singular vision: to create artificial general intelligence 
                that amplifies human potential. We combine breakthrough quantum computing research with 
                advanced neural architectures to build AI systems that think, reason, and evolve.
              </p>

              <p className="text-zinc-500 leading-relaxed">
                Our team of world-class researchers, engineers, and visionaries work tirelessly to push 
                the boundaries of what&apos;s possible, while ensuring our technology remains safe, ethical, 
                and beneficial to all of humanity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square">
                <div className="absolute inset-0 border border-[#0FECEC]/20 rounded-full rotate-slow" />
                <div className="absolute inset-12 overflow-hidden rounded-full">
                  <img
                    src={LOGO_URL}
                    alt="NeurusAGi"
                    className="w-full h-full object-cover float"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-[#030303]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
              style={{ fontFamily: "Unbounded" }}
            >
              <span className="text-white">Our</span>{" "}
              <span className="text-zinc-600">Values</span>
            </h2>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
              The principles that guide every decision we make
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="feature-card group"
              >
                <div
                  className={`w-16 h-16 flex items-center justify-center mb-6 ${
                    value.color === "cyan"
                      ? "bg-[#0FECEC]/10 border border-[#0FECEC]/30"
                      : "bg-[#C65D00]/10 border border-[#C65D00]/30"
                  }`}
                >
                  <value.icon
                    size={28}
                    className={value.color === "cyan" ? "text-[#0FECEC]" : "text-[#C65D00]"}
                  />
                </div>
                <h3
                  className="text-2xl font-semibold text-white mb-4"
                  style={{ fontFamily: "Unbounded" }}
                >
                  {value.title}
                </h3>
                <p className="text-zinc-500 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#C65D00]" />
              <span className="text-xs font-semibold text-[#C65D00] uppercase tracking-[0.3em]">
                Our Journey
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight"
              style={{ fontFamily: "Unbounded" }}
            >
              <span className="text-white">Milestones</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#0FECEC] via-[#C65D00] to-transparent" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <div className="glass-light p-6 inline-block">
                      <span className="text-[#0FECEC] font-mono text-sm">{milestone.year}</span>
                      <h3 className="text-xl font-semibold text-white mt-1">{milestone.title}</h3>
                      <p className="text-zinc-500 text-sm mt-2">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0FECEC] border-4 border-black" />

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-32 bg-[#030303]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
                style={{ fontFamily: "Unbounded" }}
              >
                <span className="text-white">Meet the</span>
                <br />
                <span className="text-[#C65D00]">Visionaries</span>
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Our leadership team brings together decades of experience from the world&apos;s leading 
                AI research labs, tech companies, and academic institutions.
              </p>
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                Join Our Team
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="feature-card p-0 overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                    <p className="text-[#0FECEC] text-sm mb-2">{member.role}</p>
                    <p className="text-zinc-500 text-sm">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-32 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
              style={{ fontFamily: "Unbounded" }}
            >
              <span className="text-white">Worldwide</span>{" "}
              <span className="text-[#0FECEC]">Compliance</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
              We maintain the highest standards of security and regulatory compliance, ensuring your 
              data is protected across all jurisdictions.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {compliance.map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-light p-4 text-center hover:border-[#0FECEC]/30 transition-colors"
                >
                  <span className="text-[#0FECEC] font-mono text-sm">{cert}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
