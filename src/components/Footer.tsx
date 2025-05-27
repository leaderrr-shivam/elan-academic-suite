
import { Mail, MapPin } from "lucide-react";

export const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-indigo-900/10"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent mb-4">
                  EduElan
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Premium academic solutions for BCA Data Analytics students. Professional, reliable, and results-driven educational support for your success.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-slate-400">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>eduelandesk@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-400">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>Serving Students Across India</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => scrollToSection('home')}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    Our Services
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('testimonials')}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    Success Stories
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('faq')}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Our Services</h4>
              <ul className="space-y-3">
                <li>
                  <span className="text-slate-400">Major Project Reports</span>
                </li>
                <li>
                  <span className="text-slate-400">Assignment Solutions</span>
                </li>
                <li>
                  <span className="text-slate-400">Viva Preparation</span>
                </li>
                <li>
                  <span className="text-slate-400">Guide Arrangement</span>
                </li>
                <li>
                  <span className="text-slate-400">Academic Excellence Support</span>
                </li>
              </ul>
            </div>

            {/* Legal & Policies */}
            <div>
              <h4 className="text-xl font-bold text-white mb-6">Legal & Policies</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/privacy-policy" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/refund-policy" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a href="/terms-conditions" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="/disclaimer" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 hover:translate-x-1 transform">
                    Disclaimer
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-sm text-slate-500">
                  © 2025 EduElan. All rights reserved.
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  Not affiliated with Amity University. This is an independent academic service provider.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-lg px-4 py-2 backdrop-blur-sm">
                <p className="text-sm text-red-300 font-medium text-center">
                  ⚠️ No refunds after payment completion
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
