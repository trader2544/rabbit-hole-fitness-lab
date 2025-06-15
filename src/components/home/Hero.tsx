import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, Clock, Award, CheckCircle, ShoppingBag, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    { icon: Users, value: "500+", label: "Clients Transformed" },
    { icon: Star, value: "4.9", label: "Average Rating" },
    { icon: Clock, value: "24/7", label: "AI Support" },
    { icon: Award, value: "4", label: "Expert Trainers" }
  ];

  const services = [
    {
      title: "Advanced Fitness Tools",
      description: "Precision calculators and AI-powered assistance.",
      features: ["BMI Calculator", "Calorie Tracker", "AI Coach"],
      link: "/tools",
      requiresAuth: false
    },
    {
      title: "Education & Resources",
      description: "In-depth courses, articles, and a free resource library.",
      features: ["Expert Courses", "Free Guides", "Video Library"],
      link: "/education",
      requiresAuth: false
    },
    {
      title: "Elite Personal Training",
      description: "1-on-1 sessions with certified professionals.",
      features: ["Online & In-person", "Custom Programs", "Progress Tracking"],
      link: "/trainers",
      requiresAuth: true
    },
    {
      title: "Premium Equipment",
      description: "Curated fitness gear & supplements.",
      features: ["Expert Tested", "Free Shipping", "Quality Guarantee"],
      link: "/shop",
      requiresAuth: false
    }
  ];

  const handleServiceClick = (service: any) => {
    if (service.requiresAuth && !user) {
      navigate('/auth');
    } else {
      navigate(service.link);
    }
  };

  return (
    <section className="relative bg-white min-h-screen flex items-center pt-16 md:pt-0">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-60"></div>
      
      <div className="container mx-auto px-4 relative z-10 pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Main Message */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600 mb-8">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Science-Based Fitness Excellence
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-gray-900 leading-tight">
                Transform Your
                <br />
                <span className="font-semibold">Body & Mind</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg leading-relaxed mx-auto lg:mx-0">
                Experience premium fitness coaching with certified trainers, advanced nutrition science, and AI-powered guidance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
                {user ? (
                  <>
                    <Button 
                      size="lg" 
                      onClick={() => navigate("/trainers")}
                      className="bg-black text-white hover:bg-gray-800 rounded-none px-8 py-6 text-lg font-normal"
                    >
                      Book Elite Trainer
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      onClick={() => navigate("/shop")}
                      className="border-2 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-none px-8 py-6 text-lg font-normal"
                    >
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Shop Equipment
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      size="lg" 
                      onClick={() => navigate("/auth")}
                      className="bg-black text-white hover:bg-gray-800 rounded-none px-8 py-6 text-lg font-normal"
                    >
                      <UserPlus className="mr-2 h-5 w-5" />
                      Join Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      onClick={() => navigate("/shop")}
                      className="border-2 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-none px-8 py-6 text-lg font-normal"
                    >
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Shop Equipment
                    </Button>
                  </>
                )}
              </div>

              {/* Stats - Mobile Optimized */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left p-4 lg:p-0">
                    <div className="flex items-center justify-center lg:justify-start mb-2">
                      <stat.icon className="h-5 w-5 text-gray-400 mr-2" />
                    </div>
                    <div className="text-xl lg:text-2xl font-semibold text-gray-900">{stat.value}</div>
                    <div className="text-xs lg:text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Services Grid - Mobile Optimized */}
            <div className="bg-gray-50 p-6 lg:p-12 rounded-none">
              <h3 className="text-xl lg:text-2xl font-light text-gray-900 mb-8 text-center">
                Our Core Offerings
              </h3>
              
              <div className="space-y-4 lg:space-y-6">
                {services.map((service, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-4 lg:p-6 border-l-4 border-black cursor-pointer hover:shadow-md transition-shadow group"
                    onClick={() => handleServiceClick(service)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm lg:text-base">{service.title}</h4>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                    <p className="text-gray-600 text-xs lg:text-sm mb-3">{service.description}</p>
                    <div className="flex flex-wrap gap-1 lg:gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs text-gray-500">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    {service.requiresAuth && !user && (
                      <p className="text-xs text-blue-600 mt-2">Sign in required</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 lg:mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-xs lg:text-sm text-gray-500 mb-4">
                  Join our exclusive community of high-performers
                </p>
                <Button 
                  onClick={() => user ? navigate("/trainers") : navigate("/auth")}
                  className="w-full bg-black text-white hover:bg-gray-800 rounded-none py-3"
                >
                  {user ? "Start Your Journey" : "Join Now"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
