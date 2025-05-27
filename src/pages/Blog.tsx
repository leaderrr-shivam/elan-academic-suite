
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      title: "Tips for Writing Effective Academic Papers",
      excerpt: "Learn the essential techniques for crafting compelling academic papers that stand out.",
      date: "2024-01-15",
      author: "Dr. Sarah Johnson",
      category: "Writing Tips"
    },
    {
      title: "Time Management Strategies for Students",
      excerpt: "Discover proven methods to balance your studies, assignments, and personal life effectively.",
      date: "2024-01-10",
      author: "Prof. Michael Chen",
      category: "Study Skills"
    },
    {
      title: "Understanding Research Methodology",
      excerpt: "A comprehensive guide to choosing the right research methods for your academic projects.",
      date: "2024-01-05",
      author: "Dr. Emily Davis",
      category: "Research"
    },
    {
      title: "Citation and Referencing Best Practices",
      excerpt: "Master the art of proper citation to avoid plagiarism and enhance your academic credibility.",
      date: "2024-01-01",
      author: "Prof. David Wilson",
      category: "Academic Writing"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Academic Blog
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Insights, tips, and resources to help you excel in your academic journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {posts.map((post, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-900 mb-4 hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-slate-600 mb-6">{post.excerpt}</p>
                
                <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 group">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </article>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 text-lg rounded-xl hover:shadow-lg transition-all duration-300">
              View All Posts
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
