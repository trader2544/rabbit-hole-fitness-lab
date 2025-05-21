
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  const scrollToContent = () => {
    const contentElement = document.getElementById("content");
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-accent to-background py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center opacity-0 animate-fade-in">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-fitness-800 to-fitness-600 bg-clip-text text-transparent">
              Dive Deep Into the Science of Fitness
            </span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Explore the biology of exercise, master calisthenics, and optimize your nutrition with science-backed resources and interactive tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/tools")}
              className="font-medium"
            >
              Try Our Fitness Tools
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate("/resources")}
              className="font-medium"
            >
              Explore Resources
            </Button>
          </div>
          <div className="mt-12">
            <button 
              onClick={scrollToContent} 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <span>Discover More</span>
              <ArrowDown size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.1),transparent)] pointer-events-none"></div>
    </section>
  );
};

export default Hero;
