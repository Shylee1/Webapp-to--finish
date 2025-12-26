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

function App() {
  return (
    <AuthProvider>
      <div className="App min-h-screen bg-black">
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
      </div>
    </AuthProvider>
  );
}

export default App;
