"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import Link from "next/link"

const newsArticles = [
  {
    id: 1,
    category: "Research",
    title: "Breakthrough in Quantum Neural Architecture Achieves Human-Level Reasoning",
    excerpt: "Our latest research paper demonstrates unprecedented reasoning capabilities in our Q-Neural v3 architecture, matching human performance on complex logical tasks.",
    date: "April 8, 2026",
    readTime: "5 min read",
    featured: true,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop",
  },
  {
    id: 2,
    category: "Product",
    title: "Introducing Singularity API v2.0",
    excerpt: "The most powerful AGI API ever built, now with real-time quantum processing and 10x faster inference.",
    date: "April 5, 2026",
    readTime: "3 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    category: "Company",
    title: "NeurusAGi Raises $500M Series C",
    excerpt: "Led by Andreessen Horowitz, our latest funding round values the company at $8 billion.",
    date: "April 2, 2026",
    readTime: "4 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    category: "Partnership",
    title: "Strategic Alliance with NVIDIA",
    excerpt: "Exclusive access to next-gen Blackwell GPUs for training our quantum neural networks.",
    date: "March 28, 2026",
    readTime: "3 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1591238372338-23a40f5e5a81?w=400&h=300&fit=crop",
  },
]

export function NewsPreviewSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const featuredArticle = newsArticles.find(a => a.featured)
  const otherArticles = newsArticles.filter(a => !a.featured)

  return (
    <section ref={ref} className="relative py-32 bg-[#030303] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-dense opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-[#0FECEC]" />
              <span className="text-xs font-semibold text-[#0FECEC] uppercase tracking-[0.3em]">
                Latest News
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold tracking-tight"
              style={{ fontFamily: 'Unbounded' }}
            >
              <span className="text-white">Stay</span>{" "}
              <span className="text-zinc-600">Updated</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-[#0FECEC] font-semibold hover:gap-4 transition-all group"
            >
              View All Articles
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* News Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Featured Article */}
          {featuredArticle && (
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="group row-span-2"
            >
              <Link href={`/news/${featuredArticle.id}`} className="block h-full">
                <div className="feature-card h-full p-0 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-64 lg:h-80 overflow-hidden">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="px-3 py-1 text-xs font-semibold text-black bg-[#0FECEC] uppercase tracking-wider">
                        {featuredArticle.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-sm text-zinc-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {featuredArticle.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {featuredArticle.readTime}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#0FECEC] transition-colors" style={{ fontFamily: 'Unbounded' }}>
                      {featuredArticle.title}
                    </h3>

                    <p className="text-zinc-500 leading-relaxed mb-6">
                      {featuredArticle.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-2 text-[#0FECEC] font-semibold text-sm">
                      Read Article
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Other Articles */}
          <div className="space-y-6">
            {otherArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="group"
              >
                <Link href={`/news/${article.id}`} className="block">
                  <div className="feature-card p-0 overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      {/* Thumbnail */}
                      <div className="relative w-full sm:w-40 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 hidden sm:block" />
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-grow">
                        <span className="text-[#C65D00] text-xs font-semibold uppercase tracking-wider">
                          {article.category}
                        </span>
                        
                        <h3 className="text-lg font-semibold text-white mt-2 mb-2 group-hover:text-[#0FECEC] transition-colors line-clamp-2">
                          {article.title}
                        </h3>

                        <div className="flex items-center gap-3 text-xs text-zinc-500">
                          <span>{article.date}</span>
                          <span>&bull;</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
