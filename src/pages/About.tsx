
import { Button } from "@/components/ui/button";
import { Users, Award, Clock, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  
  const stats = [
    { icon: <Users className="w-8 h-8" />, number: "5000+", label: "Happy Students" },
    { icon: <Award className="w-8 h-8" />, number: "98%", label: "Success Rate" },
    { icon: <Clock className="w-8 h-8" />, number: "24/7", label: "Support" },
    { icon: <Shield className="w-8 h-8" />, number: "100%", label: "Confidential" }
  ];

  const handleGetStarted = () => {
    navigate('/', { state: { scrollTo: 'services' } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              About EduAssist Pro
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A demonstration of enterprise-grade academic platform development with cutting-edge security and modern web technologies
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Project Mission</h2>
              <p className="text-lg text-slate-700 mb-6">
                EduAssist Pro serves as a comprehensive demonstration of full-stack development capabilities, showcasing 
                the creation of a sophisticated academic services platform with enterprise-level security, modern UI/UX 
                design, and robust backend architecture.
              </p>
              <p className="text-lg text-slate-700 mb-6">
                This portfolio project demonstrates proficiency in React, TypeScript, Supabase, and advanced security 
                implementation, representing the kind of high-quality, scalable applications that can be delivered 
                for real-world business needs.
              </p>
              <Button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Explore Demo Features
              </Button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Technical Highlights</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Full-Stack Architecture</h4>
                    <p className="text-slate-600">Complete React + TypeScript + Supabase implementation</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Enterprise Security</h4>
                    <p className="text-slate-600">Advanced encryption, RLS policies, and threat prevention</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Modern UI/UX</h4>
                    <p className="text-slate-600">Responsive design with shadcn/ui and Tailwind CSS</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Database Design</h4>
                    <p className="text-slate-600">Normalized schema with proper relationships and RLS</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                <div className="text-blue-600 mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.number}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Portfolio Demonstration</h3>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-6">
              This project showcases the ability to create production-ready applications with enterprise-level 
              features including user authentication, secure payment flows, administrative dashboards, real-time 
              updates, and comprehensive security measures.
            </p>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
              <Shield className="w-4 h-4 mr-2" />
              Built with Modern Technologies & Best Practices
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
