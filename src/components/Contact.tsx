
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Get Your Academic Solutions Today
          </h2>
          <p className="text-xl text-slate-300">
            Ready to excel in your BCA Data Analytics journey? Contact us now!
          </p>
        </div>

        <div className="bg-slate-700/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-600">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-slate-600/50 border-slate-500 text-white placeholder-slate-400"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-slate-600/50 border-slate-500 text-white placeholder-slate-400"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-200 mb-2">
                Subject Interest
              </label>
              <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                <SelectTrigger className="bg-slate-600/50 border-slate-500 text-white">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="major-project" className="text-white hover:bg-slate-600">Major Project</SelectItem>
                  <SelectItem value="intelligent-game-design" className="text-white hover:bg-slate-600">Intelligent Game Design</SelectItem>
                  <SelectItem value="design-thinking" className="text-white hover:bg-slate-600">Design Thinking</SelectItem>
                  <SelectItem value="both-subjects" className="text-white hover:bg-slate-600">Both Subjects</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-200 mb-2">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Describe what you need"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="bg-slate-600/50 border-slate-500 text-white placeholder-slate-400 min-h-[120px]"
                required
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-4 text-lg rounded-xl"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
