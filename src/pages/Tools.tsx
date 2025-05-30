
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import BMICalculator from "@/components/tools/BMICalculator";
import CalorieCalculator from "@/components/tools/CalorieCalculator";
import ExerciseChat from "@/components/tools/ExerciseChat";
import { useLocation, useNavigate } from "react-router-dom";
import { Calculator, MessageSquare, Crown, ArrowRight } from "lucide-react";

const Tools = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const defaultTab = location.pathname.includes("/chat") ? "chat" : "calculators";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              AI-Powered Fitness Tools
            </div>
            
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-gray-900 leading-tight">
              Intelligent <span className="font-semibold">Fitness Tools</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Access precision calculators and AI-powered recommendations to optimize your fitness journey with scientific accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue={defaultTab} className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-none h-12">
                <TabsTrigger 
                  value="calculators"
                  className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-600 rounded-none font-normal"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Free Calculators
                </TabsTrigger>
                <TabsTrigger 
                  value="chat"
                  className="data-[state=active]:bg-white data-[state=active]:text-black text-gray-600 rounded-none font-normal"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  AI Coach Pro
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="calculators" className="space-y-12">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-light text-gray-900 mb-4">Free Precision Tools</h3>
                  <p className="text-gray-600">Calculate your metrics with scientific accuracy</p>
                </div>
                
                <div className="grid grid-cols-1 gap-8">
                  <BMICalculator />
                  <CalorieCalculator />
                </div>

                {/* Upgrade Section */}
                <div className="bg-gray-50 p-8 text-center">
                  <Crown className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Want More Advanced Tools?</h4>
                  <p className="text-gray-600 mb-6">Access macro calculators, training load metrics, and personalized recommendations</p>
                  <Button 
                    onClick={() => navigate("/resources#premium")}
                    className="bg-black text-white hover:bg-gray-800 rounded-none px-6"
                  >
                    Upgrade to Premium - $19/month
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="chat">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-light text-gray-900 mb-4">AI Exercise Coach</h3>
                  <p className="text-gray-600">Get instant, personalized workout recommendations</p>
                  
                  <div className="bg-gray-50 p-6 mt-6">
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                      <span>Premium Feature</span>
                      <span>•</span>
                      <span>$19/month</span>
                      <span>•</span>
                      <span>Cancel anytime</span>
                    </div>
                  </div>
                </div>
                
                <ExerciseChat />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tools;
