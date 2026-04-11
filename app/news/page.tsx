"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Search, Calendar, Clock, ArrowRight, Filter } from "lucide-react"
import Link from "next/link"

const categories = ["All", "Research", "Product", "Company", "Partnership", "Engineering"]

const articles = [
  {
    id: 1,
    category: "Research",
    title: "Breakthrough in Quantum Neural Architecture Achieves Human-Level Reasoning",
    excerpt: "Our latest research paper demonstrates unprecedented reasoning capabilities in our Q-Neural v3 architecture, matching human performance on complex logical tasks across multiple benchmarks.",
    date: "April 8, 2026",
    readTime: "5 min read",
    featured: true,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop",
  },
  {
    id: 2,
    category: "Product",
    title: "Introducing Singularity API v2.0: 10x Faster, Infinitely Smarter",
    excerpt: "The most powerful AGI API ever built, now with real-time quantum processing, 10x faster inference, and breakthrough multi-modal capabilities.",
    date: "April 5, 2026",
    readTime: "3 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    category: "Company",
    title: "NeurusAGi Raises $500M Series C at $8B Valuation",
    excerpt: "Led by Andreessen Horowitz with participation from Sequoia and Tiger Global, this round accelerates our path to artificial general intelligence.",
    date: "April 2, 2026",
    readTime: "4 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    category: "Partnership",
    title: "Strategic Alliance with NVIDIA for Next-Gen AI Hardware",
    excerpt: "Exclusive early access to Blackwell B300 GPUs, enabling unprecedented training performance for our quantum neural networks.",
    date: "March 28, 2026",
    readTime: "3 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1591238372338-23a40f5e5a81?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    category: "Engineering",
    title: "How We Achieved Sub-20ms Latency at Global Scale",
    excerpt: "A deep dive into our distributed inference architecture, edge caching strategies, and the optimizations that made ultra-low latency possible.",
    date: "March 25, 2026",
    readTime: "8 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    category: "Research",
    title: "Multi-Modal Understanding: When AI Sees, Hears, and Reasons Together",
    excerpt: "Our new architecture processes text, images, audio, and video simultaneously, achieving state-of-the-art performance on multi-modal benchmarks.",
    date: "March 20, 2026",
    readTime: "6 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    category: "Company",
    title: "Opening Our New Research Lab in London",
    excerpt: "Our third global research facility brings us closer to top European talent and academic partnerships with Oxford and Cambridge.",
    date: "March 15, 2026",
    readTime: "3 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop",
  },
  {
    id: 8,
    category: "Product",
    title: "Custom Model Fine-Tuning Now Available for All Plans",
    excerpt: "Train personalized AI models on your data with our new no-code fine-tuning interface, available starting from the Synapse plan.",
    date: "March 10, 2026",
    readTime: "4 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop",
  },
  {
    id: 9,
    category: "Partnership",
    title: "Healthcare AI Partnership with Mayo Clinic",
    excerpt: "Bringing quantum neural networks to medical diagnostics, with initial focus on early cancer detection and treatment optimization.",
    date: "March 5, 2026",
    readTime: "5 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
  },
]

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredArticle = articles.find((a) => a.featured)
  const regularArticles = filteredArticles.filter((a) => !a.featured)

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
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#0FECEC]" />
              <span className="text-xs font-semibold text-[#0FECEC] uppercase tracking-[0.3em]">
                News & Updates
              </span>
              <div className="h-px w-12 bg-[#0FECEC]" />
            </div>

            <h1
              className="text-5xl md:text-6xl font-black tracking-tighter mb-6"
              style={{ fontFamily: "Unbounded" }}
            >
              <span className="text-white">Latest from</span>
              <br />
              <span className="text-[#0FECEC] text-glow">NeurusAGi</span>
            </h1>

            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Research breakthroughs, product updates, and company news
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto"
          >
            {/* Search */}
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full input-neurus px-6 py-4 pr-14"
              />
              <Search
                size={20}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-semibold transition-all ${
                    selectedCategory === category
                      ? "bg-[#0FECEC] text-black"
                      : "glass-light text-zinc-400 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && selectedCategory === "All" && !searchQuery && (
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="group"
            >
              <Link href={`/news/${featuredArticle.id}`}>
                <div className="grid lg:grid-cols-2 gap-8 feature-card p-0 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-64 lg:h-full min-h-[300px] overflow-hidden">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                    <div className="absolute top-6 left-6">
                      <span className="px-3 py-1 text-xs font-semibold text-black bg-[#0FECEC] uppercase tracking-wider">
                        Featured
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <span className="text-[#C65D00] text-xs font-semibold uppercase tracking-wider mb-4">
                      {featuredArticle.category}
                    </span>

                    <h2
                      className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-[#0FECEC] transition-colors"
                      style={{ fontFamily: "Unbounded" }}
                    >
                      {featuredArticle.title}
                    </h2>

                    <p className="text-zinc-400 leading-relaxed mb-6">
                      {featuredArticle.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-zinc-500 mb-6">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {featuredArticle.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {featuredArticle.readTime}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-2 text-[#0FECEC] font-semibold">
                      Read Article
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {regularArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-zinc-500 text-lg">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <Link href={`/news/${article.id}`}>
                    <div className="feature-card p-0 overflow-hidden h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <span className="text-[#0FECEC] font-mono text-xs uppercase tracking-wider">
                            {article.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {article.date}
                          </span>
                          <span>&bull;</span>
                          <span>{article.readTime}</span>
                        </div>

                        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#0FECEC] transition-colors line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="text-zinc-500 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                          {article.excerpt}
                        </p>

                        <span className="inline-flex items-center gap-2 text-[#0FECEC] text-sm font-semibold">
                          Read More
                          <ArrowRight
                            size={14}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <button className="btn-secondary">Load More Articles</button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
