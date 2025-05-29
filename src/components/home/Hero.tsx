
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Calculator, MessageSquare, Users, Crown, BookOpen, Dumbbell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  const scrollToContent = () => {
    const contentElement = document.getElementById("content");
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    { icon: BookOpen, label: "Science-Based Content", color: "from-blue-500 to-blue-600" },
    { icon: Calculator, label: "Fitness Calculators", color: "from-green-500 to-green-600" },
    { icon: MessageSquare, label: "AI Exercise Chat", color: "from-purple-500 to-purple-600" },
    { icon: Users, label: "Personal Trainers", color: "from-orange-500 to-orange-600" },
    { icon: Crown, label: "Premium Coaching", color: "from-yellow-500 to-yellow-600" },
    { icon: Dumbbell, label: "Master Classes", color: "from-red-500 to-red-600" },
  ];

  return (
    <section className="relative bg-gradient-to-br from-fitness-50 via-accent to-fitness-100 min-h-screen flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.1),transparent)] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Content */}
            <div className="text-center lg:text-left opacity-0 animate-fade-in">
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                <Badge variant="secondary" className="text-sm font-medium">
                  🔬 Science-Based
                </Badge>
                <Badge variant="secondary" className="text-sm font-medium">
                  🎯 Results-Driven
                </Badge>
                <Badge variant="secondary" className="text-sm font-medium">
                  👥 Expert Trainers
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-fitness-800 via-fitness-600 to-fitness-500 bg-clip-text text-transparent">
                  Transform Your Body
                </span>
                <br />
                <span className="text-foreground">
                  With Science & Expertise
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto lg:mx-0">
                Master calisthenics, optimize nutrition, and train with certified personal trainers. 
                Get science-backed guidance with our interactive tools and premium coaching programs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/trainers")}
                  className="font-medium text-lg px-8 py-6 bg-gradient-to-r from-fitness-600 to-fitness-500 hover:from-fitness-700 hover:to-fitness-600"
                >
                  Book a Trainer
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => navigate("/tools")}
                  className="font-medium text-lg px-8 py-6 border-2"
                >
                  Try Free Tools
                </Button>
              </div>

              <div className="text-center lg:text-left">
                <p className="text-sm text-foreground/60 mb-2">Trusted by 500+ fitness enthusiasts</p>
                <div className="flex items-center justify-center lg:justify-start gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                  <span className="ml-2 text-sm text-foreground/70">4.9/5 rating</span>
                </div>
              </div>
            </div>

            {/* Right Column - Services Grid */}
            <div className="opacity-0 animate-fade-in animate-delay-200">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                <h3 className="text-2xl font-bold text-center mb-6 text-foreground">
                  Everything You Need to Succeed
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {services.map((service, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-xl bg-gradient-to-r ${service.color} text-white text-center transform hover:scale-105 transition-all duration-200 opacity-0 animate-fade-in animate-delay-${(index + 3) * 100}`}
                    >
                      <service.icon className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">{service.label}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 text-sm text-foreground/80">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Personal trainers across Kenya (Online & In-person)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>BMI & Calorie calculators with AI recommendations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Premium courses from $19.99/month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>24/7 exercise guidance & meal planning</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-center text-sm text-foreground/60">
                    <span className="font-semibold text-fitness-600">Starting from $25/hour</span> for online consultations
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center opacity-0 animate-fade-in animate-delay-500">
            <button 
              onClick={scrollToContent} 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-lg font-medium"
            >
              <span>Discover Our Complete Platform</span>
              <ArrowDown size={20} className="animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
