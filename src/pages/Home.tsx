
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Hero />
      <Features />
      <Services />
      <Testimonials />
      <FAQ />
      <Contact />
    </div>
  );
};

export default Home;
