
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              EduElan
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a href="#home" className="text-slate-700 hover:text-blue-600 transition-colors">
                Home
              </a>
              <a href="#services" className="text-slate-700 hover:text-blue-600 transition-colors">
                Services
              </a>
              <a href="#testimonials" className="text-slate-700 hover:text-blue-600 transition-colors">
                Testimonials
              </a>
              <a href="#faq" className="text-slate-700 hover:text-blue-600 transition-colors">
                FAQ
              </a>
              <a href="#contact" className="text-slate-700 hover:text-blue-600 transition-colors">
                Contact
              </a>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 py-2 rounded-lg">
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-slate-200">
              <a href="#home" className="block px-3 py-2 text-slate-700 hover:text-blue-600">
                Home
              </a>
              <a href="#services" className="block px-3 py-2 text-slate-700 hover:text-blue-600">
                Services
              </a>
              <a href="#testimonials" className="block px-3 py-2 text-slate-700 hover:text-blue-600">
                Testimonials
              </a>
              <a href="#faq" className="block px-3 py-2 text-slate-700 hover:text-blue-600">
                FAQ
              </a>
              <a href="#contact" className="block px-3 py-2 text-slate-700 hover:text-blue-600">
                Contact
              </a>
              <Button className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
