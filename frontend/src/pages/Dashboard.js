import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Send, Menu, X, LogOut, User, Settings, MessageSquare, History, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_666bb9f1-3878-43b6-926b-3441c49d8146/artifacts/tgzddx89_IMG_3600.jpeg';

export const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user && !token) {
      navigate('/login');
    }
  }, [user, token, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await axios.post(
        `${API}/chat`,
        { message: inputValue },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
        error: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="h-screen bg-black flex overflow-hidden" data-testid="dashboard-page">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 0, opacity: sidebarOpen ? 1 : 0 }}
        className={`bg-[#050505] border-r border-white/5 flex flex-col overflow-hidden ${sidebarOpen ? '' : 'hidden'}`}
        data-testid="dashboard-sidebar"
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <img src={LOGO_URL} alt="NeurusAGi" className="h-12" />
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-[#0FECEC] bg-[#0FECEC]/10 border border-[#0FECEC]/30">
            <MessageSquare size={18} />
            <span className="text-sm font-medium">Chat</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-white hover:bg-white/5 transition-all">
            <History size={18} />
            <span className="text-sm font-medium">History</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-white hover:bg-white/5 transition-all">
            <Settings size={18} />
            <span className="text-sm font-medium">Settings</span>
          </button>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#C65D00]/20 border border-[#C65D00]/30 flex items-center justify-center">
              <User size={18} className="text-[#C65D00]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user?.name || 'User'}</p>
              <p className="text-zinc-500 text-xs truncate">{user?.email || ''}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-zinc-500 hover:text-white hover:bg-white/5 border border-white/10 transition-all"
            data-testid="dashboard-logout-btn"
          >
            <LogOut size={16} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-[#050505] border-b border-white/5 flex items-center justify-between px-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-zinc-500 hover:text-white"
            data-testid="dashboard-sidebar-toggle"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-2 text-[#0FECEC]">
            <Sparkles size={18} />
            <span className="text-sm font-medium">NeurusAGi Assistant</span>
          </div>
          <div className="w-10" />
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6" data-testid="chat-messages">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="relative mb-8">
                <div className="absolute inset-0 blur-3xl bg-[#0FECEC]/10" />
                <img src={LOGO_URL} alt="NeurusAGi" className="relative h-32" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome to NeurusAGi</h2>
              <p className="text-zinc-500 max-w-md">
                Start a conversation with your AI assistant. Type a message below to begin.
              </p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  data-testid={`chat-message-${message.role}`}
                >
                  <div className={`max-w-[80%] px-6 py-4 ${
                    message.role === 'user'
                      ? 'chat-message-user'
                      : message.error
                      ? 'bg-red-500/10 border border-red-500/30'
                      : 'chat-message-ai'
                  }`}>
                    <p className="text-white whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs text-zinc-600 mt-2">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="chat-message-ai px-6 py-4">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#0FECEC] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-[#0FECEC] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-[#0FECEC] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-white/5 bg-[#050505]">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="w-full input-neurus px-6 py-4 pr-14 text-lg"
                disabled={loading}
                data-testid="chat-input"
              />
              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-[#0FECEC]/10 hover:bg-[#0FECEC]/20 disabled:opacity-30 transition-colors"
                data-testid="chat-send-btn"
              >
                <Send size={20} className="text-[#0FECEC]" />
              </button>
            </div>
            <p className="text-center text-zinc-600 text-xs mt-3">
              NeurusAGi adapts to your local compliance requirements automatically.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
