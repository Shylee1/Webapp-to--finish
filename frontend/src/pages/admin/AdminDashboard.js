import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, FileText, MessageSquare, DollarSign,
  Settings, LogOut, Menu, X, TrendingUp, TrendingDown, Activity,
  Eye, Search, Plus, Edit, Trash2, Send, RefreshCw, Download,
  BarChart3, PieChart, Calendar, Bell, ChevronDown
} from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_666bb9f1-3878-43b6-926b-3441c49d8146/artifacts/tgzddx89_IMG_3600.jpeg';

export const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [investorInquiries, setInvestorInquiries] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  // Article form state
  const [articleForm, setArticleForm] = useState({ title: '', excerpt: '', category: '', content: '' });
  const [editingArticle, setEditingArticle] = useState(null);

  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchDashboardData();
  }, [token, navigate, fetchDashboardData]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const getAuthHeaders = () => ({ headers: { Authorization: `Bearer ${token}` } });

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, articlesRes, contactsRes, inquiriesRes] = await Promise.all([
        axios.get(`${API}/admin/stats`, getAuthHeaders()),
        axios.get(`${API}/admin/users`, getAuthHeaders()),
        axios.get(`${API}/admin/articles`, getAuthHeaders()),
        axios.get(`${API}/admin/contacts`, getAuthHeaders()),
        axios.get(`${API}/admin/investor-inquiries`, getAuthHeaders())
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setArticles(articlesRes.data);
      setContacts(contactsRes.data);
      setInvestorInquiries(inquiriesRes.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  // Article CRUD - NO SANITIZATION (per user request)
  const handleCreateArticle = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/admin/articles`, articleForm, getAuthHeaders());
      setArticleForm({ title: '', excerpt: '', category: '', content: '' });
      fetchDashboardData();
    } catch (err) {
      console.error('Failed to create article');
    }
  };

  const handleUpdateArticle = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/admin/articles/${editingArticle}`, articleForm, getAuthHeaders());
      setArticleForm({ title: '', excerpt: '', category: '', content: '' });
      setEditingArticle(null);
      fetchDashboardData();
    } catch (err) {
      console.error('Failed to update article');
    }
  };

  const handleDeleteArticle = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      await axios.delete(`${API}/admin/articles/${id}`, getAuthHeaders());
      fetchDashboardData();
    } catch (err) {
      console.error('Failed to delete article');
    }
  };

  const startEditArticle = (article) => {
    setEditingArticle(article.id);
    setArticleForm({
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      content: article.content || ''
    });
  };

  // Admin Chat - NO SANITIZATION (per user request)
  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { role: 'user', content: chatInput, timestamp: new Date().toISOString() };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    try {
      const response = await axios.post(`${API}/admin/chat`, { message: chatInput }, getAuthHeaders());
      const aiMsg = { role: 'assistant', content: response.data.response, timestamp: new Date().toISOString() };
      setChatMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg = { role: 'assistant', content: 'Error processing request.', timestamp: new Date().toISOString() };
      setChatMessages(prev => [...prev, errorMsg]);
    }
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'articles', label: 'News/Articles', icon: FileText },
    { id: 'contacts', label: 'Contacts', icon: MessageSquare },
    { id: 'investors', label: 'Investor Inquiries', icon: DollarSign },
    { id: 'financials', label: 'Financials', icon: BarChart3 },
    { id: 'chat', label: 'Admin Chat', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="glass-light p-6" data-testid={`stat-${title.toLowerCase().replace(/\s/g, '-')}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 flex items-center justify-center bg-${color}/10 border border-${color}/30`}>
          <Icon size={24} className={`text-${color}`} style={{ color }} />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <p className="text-zinc-500 text-sm mb-1">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );

  return (
    <div className="h-screen bg-black flex overflow-hidden" data-testid="admin-dashboard">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 0, opacity: sidebarOpen ? 1 : 0 }}
        className={`bg-[#050505] border-r border-white/5 flex flex-col overflow-hidden ${sidebarOpen ? '' : 'hidden'}`}
        data-testid="admin-sidebar"
      >
        <div className="p-6 border-b border-white/5">
          <img src={LOGO_URL} alt="NeurusAGi" className="h-12" />
          <p className="text-[#C65D00] text-xs uppercase tracking-wider mt-2">Executive Admin</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-all ${activeSection === item.id
                ? 'text-[#C65D00] bg-[#C65D00]/10 border border-[#C65D00]/30'
                : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
              data-testid={`admin-nav-${item.id}`}
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 border border-white/10 transition-all"
            data-testid="admin-logout-btn"
          >
            <LogOut size={18} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-[#050505] border-b border-white/5 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-zinc-500 hover:text-white"
              data-testid="admin-sidebar-toggle"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-lg font-semibold text-white capitalize">{activeSection}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-zinc-500 hover:text-white relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#C65D00] rounded-full" />
            </button>
            <button onClick={fetchDashboardData} className="p-2 text-zinc-500 hover:text-white">
              <RefreshCw size={20} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-8 h-8 border-2 border-[#C65D00] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Overview Section */}
              {activeSection === 'overview' && (
                <div className="space-y-8" data-testid="admin-overview">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Users" value={stats?.total_users || 0} change={stats?.user_growth} icon={Users} color="#0FECEC" />
                    <StatCard title="Articles" value={stats?.total_articles || 0} icon={FileText} color="#C65D00" />
                    <StatCard title="Contact Msgs" value={stats?.total_contacts || 0} icon={MessageSquare} color="#0FECEC" />
                    <StatCard title="Investor Inquiries" value={stats?.total_inquiries || 0} icon={DollarSign} color="#C65D00" />
                  </div>

                  {/* Placeholder for Charts */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="glass-light p-6 h-80" data-testid="chart-placeholder-1">
                      <h3 className="text-white font-semibold mb-4">User Growth Chart</h3>
                      <div className="flex items-center justify-center h-full text-zinc-500">
                        {/* Chart integration placeholder */}
                      </div>
                    </div>
                    <div className="glass-light p-6 h-80" data-testid="chart-placeholder-2">
                      <h3 className="text-white font-semibold mb-4">Revenue Analytics</h3>
                      <div className="flex items-center justify-center h-full text-zinc-500">
                        {/* Chart integration placeholder */}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Users Section */}
              {activeSection === 'users' && (
                <div className="space-y-6" data-testid="admin-users">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">User Management</h2>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input
                          type="text"
                          placeholder="Search users..."
                          className="input-neurus pl-10 pr-4 py-2 w-64"
                          data-testid="admin-users-search"
                        />
                      </div>
                      <button className="btn-primary text-sm px-4 py-2" data-testid="admin-export-users">
                        <Download size={16} className="inline mr-2" />
                        Export
                      </button>
                    </div>
                  </div>

                  <div className="glass-light overflow-hidden">
                    <table className="w-full" data-testid="admin-users-table">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="text-left text-zinc-400 text-sm font-medium px-6 py-4">Name</th>
                          <th className="text-left text-zinc-400 text-sm font-medium px-6 py-4">Email</th>
                          <th className="text-left text-zinc-400 text-sm font-medium px-6 py-4">Country</th>
                          <th className="text-left text-zinc-400 text-sm font-medium px-6 py-4">Joined</th>
                          <th className="text-left text-zinc-400 text-sm font-medium px-6 py-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-t border-white/5 hover:bg-white/5">
                            <td className="px-6 py-4 text-white">{user.name}</td>
                            <td className="px-6 py-4 text-zinc-400">{user.email}</td>
                            <td className="px-6 py-4 text-zinc-400">{user.country}</td>
                            <td className="px-6 py-4 text-zinc-500 text-sm">{new Date(user.created_at).toLocaleDateString()}</td>
                            <td className="px-6 py-4">
                              <button className="p-2 text-zinc-500 hover:text-[#0FECEC]"><Eye size={16} /></button>
                              <button className="p-2 text-zinc-500 hover:text-[#C65D00]"><Edit size={16} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Articles Section */}
              {activeSection === 'articles' && (
                <div className="space-y-6" data-testid="admin-articles">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">News & Articles Management</h2>
                  </div>

                  {/* Article Form - NO SANITIZATION */}
                  <form
                    onSubmit={editingArticle ? handleUpdateArticle : handleCreateArticle}
                    className="glass-heavy p-6 space-y-4"
                    data-testid="admin-article-form"
                  >
                    <h3 className="text-white font-semibold">{editingArticle ? 'Edit Article' : 'Create New Article'}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Article Title"
                        value={articleForm.title}
                        onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                        className="input-neurus px-4"
                        required
                        data-testid="admin-article-title"
                      />
                      <input
                        type="text"
                        placeholder="Category"
                        value={articleForm.category}
                        onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                        className="input-neurus px-4"
                        required
                        data-testid="admin-article-category"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Excerpt (short description)"
                      value={articleForm.excerpt}
                      onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                      className="w-full input-neurus px-4"
                      required
                      data-testid="admin-article-excerpt"
                    />
                    <textarea
                      placeholder="Full article content..."
                      value={articleForm.content}
                      onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                      className="w-full input-neurus px-4 py-3 h-40 resize-none"
                      data-testid="admin-article-content"
                    />
                    <div className="flex gap-4">
                      <button type="submit" className="btn-primary text-sm px-6 py-3" data-testid="admin-article-submit">
                        {editingArticle ? 'Update Article' : 'Publish Article'}
                      </button>
                      {editingArticle && (
                        <button
                          type="button"
                          onClick={() => { setEditingArticle(null); setArticleForm({ title: '', excerpt: '', category: '', content: '' }); }}
                          className="btn-secondary text-sm px-6 py-3"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>

                  {/* Articles List */}
                  <div className="glass-light overflow-hidden">
                    <table className="w-full" data-testid="admin-articles-table">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="text-left text-zinc-400 text-sm font-medium px-6 py-4">Title</th>
                          <th className="text-left text-zinc-400 text-sm font-medium px-6 py-4">Category</th>
                          <th className="text-left text-zinc-400 text-sm font-medium px-6 py-4">Published</th>
                          <th className="text-left text-zinc-400 text-sm font-medium px-6 py-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {articles.map((article) => (
                          <tr key={article.id} className="border-t border-white/5 hover:bg-white/5">
                            <td className="px-6 py-4 text-white">{article.title}</td>
                            <td className="px-6 py-4 text-[#0FECEC] text-sm">{article.category}</td>
                            <td className="px-6 py-4 text-zinc-500 text-sm">{new Date(article.published_at).toLocaleDateString()}</td>
                            <td className="px-6 py-4">
                              <button onClick={() => startEditArticle(article)} className="p-2 text-zinc-500 hover:text-[#0FECEC]"><Edit size={16} /></button>
                              <button onClick={() => handleDeleteArticle(article.id)} className="p-2 text-zinc-500 hover:text-red-500"><Trash2 size={16} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Contacts Section */}
              {activeSection === 'contacts' && (
                <div className="space-y-6" data-testid="admin-contacts">
                  <h2 className="text-xl font-semibold text-white">Contact Messages</h2>
                  <div className="grid gap-4">
                    {contacts.map((contact) => (
                      <div key={contact.id} className="glass-light p-6" data-testid={`contact-${contact.id}`}>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-white font-semibold">{contact.name}</p>
                            <p className="text-zinc-500 text-sm">{contact.email}</p>
                          </div>
                          <p className="text-zinc-600 text-xs">{new Date(contact.created_at).toLocaleString()}</p>
                        </div>
                        <p className="text-[#0FECEC] text-sm mb-2">{contact.subject}</p>
                        <p className="text-zinc-400">{contact.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Investor Inquiries Section */}
              {activeSection === 'investors' && (
                <div className="space-y-6" data-testid="admin-investors">
                  <h2 className="text-xl font-semibold text-white">Investor Inquiries</h2>
                  <div className="grid gap-4">
                    {investorInquiries.map((inquiry) => (
                      <div key={inquiry.id} className="glass-light p-6" data-testid={`inquiry-${inquiry.id}`}>
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-white font-semibold">{inquiry.name}</p>
                            <p className="text-zinc-500 text-sm">{inquiry.email}</p>
                            {inquiry.company && <p className="text-[#C65D00] text-sm">{inquiry.company}</p>}
                          </div>
                          <div className="text-right">
                            {inquiry.investment_range && (
                              <p className="text-[#0FECEC] font-mono text-sm">{inquiry.investment_range}</p>
                            )}
                            <p className="text-zinc-600 text-xs">{new Date(inquiry.created_at).toLocaleString()}</p>
                          </div>
                        </div>
                        {inquiry.message && <p className="text-zinc-400">{inquiry.message}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Financials Section */}
              {activeSection === 'financials' && (
                <div className="space-y-6" data-testid="admin-financials">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Financial Overview</h2>
                    <button className="btn-secondary text-sm px-4 py-2" data-testid="admin-connect-accounting">
                      Connect Accounting Software
                    </button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="glass-light p-6" data-testid="financial-revenue">
                      <p className="text-zinc-500 text-sm mb-2">Total Revenue</p>
                      <p className="text-3xl font-bold text-white" data-testid="revenue-value">{/* Value placeholder */}</p>
                    </div>
                    <div className="glass-light p-6" data-testid="financial-mrr">
                      <p className="text-zinc-500 text-sm mb-2">MRR</p>
                      <p className="text-3xl font-bold text-white" data-testid="mrr-value">{/* Value placeholder */}</p>
                    </div>
                    <div className="glass-light p-6" data-testid="financial-arr">
                      <p className="text-zinc-500 text-sm mb-2">ARR</p>
                      <p className="text-3xl font-bold text-white" data-testid="arr-value">{/* Value placeholder */}</p>
                    </div>
                  </div>

                  <div className="glass-light p-6 h-96" data-testid="financial-chart">
                    <h3 className="text-white font-semibold mb-4">Revenue Over Time</h3>
                    <div className="flex items-center justify-center h-full text-zinc-500">
                      {/* Financial chart integration placeholder */}
                    </div>
                  </div>

                  <div className="glass-heavy p-6" data-testid="accounting-integration">
                    <h3 className="text-white font-semibold mb-4">Accounting Software Integration</h3>
                    <p className="text-zinc-500 mb-4">
                      {/* Integration description placeholder */}
                    </p>
                    <div className="flex gap-4">
                      <button className="glass-light px-6 py-3 text-zinc-400 hover:text-white" data-testid="connect-quickbooks">
                        {/* QuickBooks placeholder */}
                      </button>
                      <button className="glass-light px-6 py-3 text-zinc-400 hover:text-white" data-testid="connect-xero">
                        {/* Xero placeholder */}
                      </button>
                      <button className="glass-light px-6 py-3 text-zinc-400 hover:text-white" data-testid="connect-freshbooks">
                        {/* FreshBooks placeholder */}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Admin Chat Section */}
              {activeSection === 'chat' && (
                <div className="flex flex-col h-[calc(100vh-180px)]" data-testid="admin-chat">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {chatMessages.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-zinc-500">Start a conversation with the admin assistant</p>
                      </div>
                    ) : (
                      chatMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[70%] px-6 py-4 ${msg.role === 'user'
                            ? 'bg-[#C65D00]/10 border border-[#C65D00]/30'
                            : 'bg-[#0FECEC]/10 border border-[#0FECEC]/30'
                            }`}>
                            <p className="text-white">{msg.content}</p>
                            <p className="text-xs text-zinc-600 mt-2">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={chatEndRef} />
                  </div>
                  <form onSubmit={handleSendChat} className="flex gap-4">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 input-neurus px-4"
                      data-testid="admin-chat-input"
                    />
                    <button type="submit" className="btn-primary px-6" data-testid="admin-chat-send">
                      <Send size={18} />
                    </button>
                  </form>
                </div>
              )}

              {/* Settings Section */}
              {activeSection === 'settings' && (
                <div className="space-y-6" data-testid="admin-settings">
                  <h2 className="text-xl font-semibold text-white">System Settings</h2>
                  <div className="grid gap-6">
                    <div className="glass-light p-6">
                      <h3 className="text-white font-semibold mb-4">Security</h3>
                      <Link to="/admin/change-password" className="text-[#0FECEC] hover:underline">
                        Change Password
                      </Link>
                    </div>
                    <div className="glass-light p-6" data-testid="settings-integrations">
                      <h3 className="text-white font-semibold mb-4">Integrations</h3>
                      <p className="text-zinc-500">{/* Integrations placeholder */}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
