import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// SEO configuration for each page
const seoConfig = {
  '/': {
    title: 'NeurusAGi | A Quantum Leap in Intelligence - Advanced AI Solutions',
    description: 'NeurusAGi delivers cutting-edge artificial intelligence solutions. Experience the future of AI with our quantum-powered intelligence platform.',
    keywords: 'AI, artificial intelligence, AGI, machine learning, deep learning, NeurusAGi, quantum AI',
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "NeurusAGi Home",
      "description": "NeurusAGi delivers cutting-edge artificial intelligence solutions.",
      "url": "https://neurusagi.com/"
    }
  },
  '/about': {
    title: 'About NeurusAGi | Our Mission & Vision in AI Innovation',
    description: 'Learn about NeurusAGi\'s mission to revolutionize artificial intelligence. Discover our team, values, and commitment to worldwide compliance.',
    keywords: 'about NeurusAGi, AI company, AI mission, AI vision, AI team, AI compliance',
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About NeurusAGi",
      "description": "Learn about NeurusAGi's mission to revolutionize artificial intelligence.",
      "url": "https://neurusagi.com/about"
    }
  },
  '/pricing': {
    title: 'NeurusAGi Pricing | AI Solutions Plans & Packages',
    description: 'Choose your intelligence level with NeurusAGi\'s flexible pricing plans. Enterprise AI solutions for every business size.',
    keywords: 'AI pricing, NeurusAGi plans, AI subscription, enterprise AI pricing, AI packages',
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "NeurusAGi Pricing",
      "description": "Choose your intelligence level with NeurusAGi's flexible pricing plans.",
      "url": "https://neurusagi.com/pricing"
    }
  },
  '/news': {
    title: 'NeurusAGi News | Latest AI Updates & Announcements',
    description: 'Stay updated with the latest news, updates, and announcements from NeurusAGi. AI industry insights and company developments.',
    keywords: 'AI news, NeurusAGi updates, AI announcements, AI industry news, AI developments',
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "NeurusAGi News",
      "description": "Stay updated with the latest news and announcements from NeurusAGi.",
      "url": "https://neurusagi.com/news"
    }
  },
  '/investors': {
    title: 'Invest in NeurusAGi | AI Investment Opportunities',
    description: 'Invest in the future of AI with NeurusAGi. Explore investment opportunities in cutting-edge artificial intelligence technology.',
    keywords: 'AI investment, invest in AI, NeurusAGi investors, AI funding, AI venture capital',
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "NeurusAGi Investors",
      "description": "Invest in the future of AI with NeurusAGi.",
      "url": "https://neurusagi.com/investors"
    }
  },
  '/contact': {
    title: 'Contact NeurusAGi | Get in Touch With Our AI Team',
    description: 'Contact NeurusAGi for inquiries about our AI solutions. Reach out to our team for support, partnerships, or general questions.',
    keywords: 'contact NeurusAGi, AI support, AI inquiries, NeurusAGi team, AI partnership',
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact NeurusAGi",
      "description": "Contact NeurusAGi for inquiries about our AI solutions.",
      "url": "https://neurusagi.com/contact"
    }
  },
  '/login': {
    title: 'Login | NeurusAGi Dashboard',
    description: 'Login to your NeurusAGi account to access your AI dashboard and manage your intelligence solutions.',
    keywords: 'NeurusAGi login, AI dashboard login, NeurusAGi account',
    noIndex: true
  },
  '/register': {
    title: 'Register | Create Your NeurusAGi Account',
    description: 'Create your NeurusAGi account to get started with our advanced AI solutions. Join the future of intelligence today.',
    keywords: 'NeurusAGi register, create AI account, sign up NeurusAGi',
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Register for NeurusAGi",
      "description": "Create your NeurusAGi account to get started with advanced AI solutions.",
      "url": "https://neurusagi.com/register"
    }
  },
  '/dashboard': {
    title: 'Dashboard | NeurusAGi',
    description: 'Your NeurusAGi dashboard. Manage your AI solutions and settings.',
    noIndex: true
  }
};

export const SEO = () => {
  const location = useLocation();

  useEffect(() => {
    const config = seoConfig[location.pathname] || seoConfig['/'];
    
    // Update title
    document.title = config.title;
    
    // Update or create meta tags
    const updateMeta = (name, content, property = false) => {
      const attr = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    // Basic SEO
    updateMeta('description', config.description);
    updateMeta('keywords', config.keywords);
    
    // Robots
    if (config.noIndex) {
      updateMeta('robots', 'noindex, nofollow');
    } else {
      updateMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://neurusagi.com${location.pathname}`);
    
    // Open Graph
    updateMeta('og:title', config.title, true);
    updateMeta('og:description', config.description, true);
    updateMeta('og:url', `https://neurusagi.com${location.pathname}`, true);
    
    // Twitter
    updateMeta('twitter:title', config.title, true);
    updateMeta('twitter:description', config.description, true);
    updateMeta('twitter:url', `https://neurusagi.com${location.pathname}`, true);
    
    // Schema.org structured data
    if (config.schema) {
      let schemaScript = document.getElementById('page-schema');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'page-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(config.schema);
    }
    
  }, [location.pathname]);

  return null;
};
