
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Users, Award, Clock, Shield } from "lucide-react";

const About = () => {
  const stats = [
    { icon: <Users className="w-8 h-8" />, number: "5000+", label: "Happy Students" },
    { icon: <Award className="w-8 h-8" />, number: "98%", label: "Success Rate" },
    { icon: <Clock className="w-8 h-8" />, number: "24/7", label: "Support" },
    { icon: <Shield className="w-8 h-8" />, number: "100%", label: "Confidential" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              About EduElan
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Your trusted partner in academic excellence, dedicated to helping students achieve their educational goals
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-700 mb-6">
                At EduElan, we believe that every student deserves access to quality academic support. Our mission is to provide comprehensive, reliable, and affordable academic assistance that helps students excel in their studies while maintaining the highest standards of integrity and quality.
              </p>
              <p className="text-lg text-slate-700 mb-6">
                We understand the challenges students face in today's competitive academic environment. That's why we've built a platform that combines expert knowledge, cutting-edge technology, and personalized support to deliver exceptional results.
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300">
                Get Started Today
              </Button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Why Choose Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Expert Team</h4>
                    <p className="text-slate-600">Qualified professionals with advanced degrees and industry experience</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Quality Assurance</h4>
                    <p className="text-slate-600">Rigorous quality checks and plagiarism-free guarantee</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Timely Delivery</h4>
                    <p className="text-slate-600">Always on time, with rush options available for urgent needs</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">24/7 Support</h4>
                    <p className="text-slate-600">Round-the-clock customer support for all your queries</p>
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
