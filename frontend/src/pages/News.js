import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const News = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const articlesPerPage = 12;

  useEffect(() => {
    fetchArticles();
  }, [currentPage, searchQuery]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/articles`, {
        params: {
          page: currentPage,
          limit: articlesPerPage,
          search: searchQuery || undefined
        }
      });
      setArticles(response.data.articles);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-black pt-20" data-testid="news-page">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-glow opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-6">
              <span className="text-white">Latest</span>
              <br />
              <span className="text-[#0FECEC]">News & Updates</span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Stay informed with the latest developments in AI technology and NeurusAGi updates.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full input-neurus px-6 py-4 pr-14 text-lg"
                data-testid="news-search-input"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-[#0FECEC]/10 hover:bg-[#0FECEC]/20 transition-colors"
                data-testid="news-search-btn"
              >
                <Search size={20} className="text-[#0FECEC]" />
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" data-testid="articles-grid">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="glass-light p-6 animate-pulse">
                  <div className="h-48 bg-white/10 mb-4" />
                  <div className="h-4 bg-white/10 mb-2 w-1/4" />
                  <div className="h-6 bg-white/10 mb-2" />
                  <div className="h-4 bg-white/10 w-3/4" />
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-zinc-500 text-lg">No articles found.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group feature-card cursor-pointer"
                  data-testid={`article-card-${article.id}`}
                >
                  {/* Image placeholder */}
                  <div className="h-48 bg-gradient-to-br from-[#0FECEC]/20 to-[#C65D00]/20 mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid opacity-30" />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-[#0FECEC] font-mono text-xs uppercase tracking-wider">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-zinc-500 text-sm mb-3">
                    <Calendar size={14} />
                    <span>{new Date(article.published_at).toLocaleDateString()}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#0FECEC] transition-colors">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-[#0FECEC] text-sm font-medium">
                    <span>Read More</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-16" data-testid="pagination">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-3 glass-light disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#0FECEC] transition-colors"
                data-testid="pagination-prev"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex items-center gap-2">
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 text-sm font-medium transition-all ${
                        currentPage === page
                          ? 'bg-[#0FECEC] text-black'
                          : 'glass-light hover:border-[#0FECEC]'
                      }`}
                      data-testid={`pagination-page-${page}`}
                    >
                      {page}
                    </button>
                  );
                })}
                {totalPages > 5 && (
                  <>
                    <span className="text-zinc-500">...</span>
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className={`w-10 h-10 text-sm font-medium transition-all ${
                        currentPage === totalPages
                          ? 'bg-[#0FECEC] text-black'
                          : 'glass-light hover:border-[#0FECEC]'
                      }`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-3 glass-light disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#0FECEC] transition-colors"
                data-testid="pagination-next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
