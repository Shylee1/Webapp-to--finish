import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Pricing } from "./pages/Pricing";
import { News } from "./pages/News";
import { Investors } from "./pages/Investors";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminChangePassword } from "./pages/admin/AdminChangePassword";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { Toaster } from "./components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";

// Layout with Navbar and Footer for public pages
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

// Auth/Admin layout without Navbar/Footer
const AuthLayout = ({ children }) => (
  <>{children}</>
);

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_666bb9f1-3878-43b6-926b-3441c49d8146/artifacts/tgzddx89_IMG_3600.jpeg';

function App() {
  return (
    <AuthProvider>
      <div className="App min-h-screen bg-black relative">
        {/* Global fixed background logo - visible on all pages */}
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `url(${LOGO_URL})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundColor: '#000000',
            opacity: 0.15
          }}
        />
        <div className="relative z-10">
        <BrowserRouter>
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
            <Route path="/news" element={<PublicLayout><News /></PublicLayout>} />
            <Route path="/investors" element={<PublicLayout><Investors /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            
            {/* User Auth Pages */}
            <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
            <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
            
            {/* User Dashboard */}
            <Route path="/dashboard" element={<AuthLayout><Dashboard /></AuthLayout>} />
            
            {/* Executive Admin Routes */}
            <Route path="/admin/login" element={<AuthLayout><AdminLogin /></AuthLayout>} />
            <Route path="/admin/change-password" element={<AuthLayout><AdminChangePassword /></AuthLayout>} />
            <Route path="/admin/dashboard" element={<AuthLayout><AdminDashboard /></AuthLayout>} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Analytics />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
