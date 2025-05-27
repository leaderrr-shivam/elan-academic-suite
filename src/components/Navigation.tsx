
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, User, LogOut, Shield, Home, LayoutDashboard } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/components/AuthGuard";
import { signOutSecure } from "@/services/enhancedAuthService";
import { useToast } from "@/hooks/use-toast";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOutSecure();
      
      toast({
        title: "Signed Out Successfully",
        description: "You have been securely signed out.",
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Sign Out Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      // Enhanced scroll to section with better error handling
      try {
        const element = document.getElementById(sectionId);
        if (element) {
          // Calculate offset to account for fixed navigation
          const navHeight = 80; // Approximate navigation height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          console.warn(`Section with id "${sectionId}" not found`);
        }
      } catch (error) {
        console.error('Error scrolling to section:', error);
        // Fallback scroll method
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
    setIsOpen(false);
  };

  // Enhanced contact navigation logic
  const handleContactNavigation = () => {
    if (location.pathname === '/') {
      // If on home page, scroll to contact section
      scrollToSection('contact');
    } else {
      // If on any other page, navigate to contact page
      navigate('/contact');
    }
    setIsOpen(false);
  };

  // Enhanced navigation with proper scroll reset
  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('/')}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent"
            >
              EduElan
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('/')}
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors flex items-center space-x-1"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => handleNavigation('/about')}
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </button>
            <button
              onClick={handleContactNavigation}
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Contact
            </button>
          </div>

          {/* Desktop Auth & Cart */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">
                    {user.email?.split('@')[0]}
                  </span>
                </div>
                <Button
                  onClick={() => handleNavigation('/dashboard')}
                  variant="outline"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700 border-blue-200 hover:bg-blue-50 relative group"
                >
                  <LayoutDashboard className="w-4 h-4 animate-pulse" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Dashboard
                  </span>
                </Button>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="text-slate-600 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => handleNavigation('/auth')}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}
            
            <Button
              onClick={() => handleNavigation('/cart')}
              variant="outline"
              className="relative border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <ShoppingCart className="w-4 h-4" />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              onClick={() => handleNavigation('/cart')}
              variant="outline"
              size="sm"
              className="relative border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <ShoppingCart className="w-4 h-4" />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-blue-600"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-3">
              {user ? (
                <div className="flex flex-col space-y-3 bg-blue-50 p-3 rounded-lg mb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-700">
                        {user.email?.split('@')[0]}
                      </span>
                    </div>
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button
                    onClick={() => handleNavigation('/dashboard')}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2 animate-pulse" />
                    View Dashboard
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => handleNavigation('/auth')}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white mb-3"
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign In / Sign Up
                </Button>
              )}
              
              <button
                onClick={() => handleNavigation('/')}
                className="text-left text-slate-600 hover:text-blue-600 font-medium py-2 flex items-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-left text-slate-600 hover:text-blue-600 font-medium py-2"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-left text-slate-600 hover:text-blue-600 font-medium py-2"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-left text-slate-600 hover:text-blue-600 font-medium py-2"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-left text-slate-600 hover:text-blue-600 font-medium py-2"
              >
                FAQ
              </button>
              <button
                onClick={() => handleNavigation('/about')}
                className="text-left text-slate-600 hover:text-blue-600 font-medium py-2"
              >
                About
              </button>
              <button
                onClick={handleContactNavigation}
                className="text-left text-slate-600 hover:text-blue-600 font-medium py-2"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
