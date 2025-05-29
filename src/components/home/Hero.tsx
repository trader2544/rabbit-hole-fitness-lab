
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, Clock, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Users, value: "500+", label: "Clients Transformed" },
    { icon: Star, value: "4.9", label: "Average Rating" },
    { icon: Clock, value: "24/7", label: "AI Support" },
    { icon: Award, value: "4", label: "Expert Trainers" }
  ];

  return (
    <section className="relative bg-white min-h-screen flex items-center">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-60"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Main Message */}
            <div className="text-left">
              <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600 mb-8">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Science-Based Fitness Excellence
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-light mb-6 text-gray-900 leading-tight">
                Transform Your
                <br />
                <span className="font-semibold">Body & Mind</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
                Experience premium fitness coaching with certified trainers, advanced nutrition science, and AI-powered guidance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
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
                  onClick={() => navigate("/tools")}
                  className="border-2 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-none px-8 py-6 text-lg font-normal"
                >
                  Explore Tools
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start mb-2">
                      <stat.icon className="h-5 w-5 text-gray-400 mr-2" />
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Services Grid */}
            <div className="bg-gray-50 p-8 lg:p-12">
              <h3 className="text-2xl font-light text-gray-900 mb-8 text-center">
                Premium Services
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white p-6 border-l-4 border-black">
                  <h4 className="font-semibold text-gray-900 mb-2">Personal Training</h4>
                  <p className="text-gray-600 text-sm mb-3">Online & in-person sessions with certified experts</p>
                  <div className="text-sm text-gray-500">From $25/hour</div>
                </div>

                <div className="bg-white p-6 border-l-4 border-gray-300">
                  <h4 className="font-semibold text-gray-900 mb-2">Premium Coaching</h4>
                  <p className="text-gray-600 text-sm mb-3">Comprehensive programs with nutrition & lifestyle</p>
                  <div className="text-sm text-gray-500">From $149/month</div>
                </div>

                <div className="bg-white p-6 border-l-4 border-gray-300">
                  <h4 className="font-semibold text-gray-900 mb-2">Master Classes</h4>
                  <p className="text-gray-600 text-sm mb-3">Advanced technique courses & specialty training</p>
                  <div className="text-sm text-gray-500">From $49/class</div>
                </div>

                <div className="bg-white p-6 border-l-4 border-gray-300">
                  <h4 className="font-semibold text-gray-900 mb-2">AI Coach 24/7</h4>
                  <p className="text-gray-600 text-sm mb-3">Instant guidance & personalized recommendations</p>
                  <div className="text-sm text-gray-500">$19/month</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500">
                  Join our exclusive community of high-performers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
