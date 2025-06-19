
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, MessageCircle, Target, Zap, TrendingUp, Clock } from "lucide-react";
import BMICalculator from "@/components/tools/BMICalculator";
import CalorieCalculator from "@/components/tools/CalorieCalculator";
import ExerciseChat from "@/components/tools/ExerciseChat";
import { useIsMobile } from "@/hooks/use-mobile";

const Tools = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className={`${isMobile ? 'py-8' : 'py-12 md:py-16'} bg-white border-b border-gray-100`}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center">
            <div className={`inline-flex items-center bg-gray-50 rounded-full ${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm'} text-gray-600 ${isMobile ? 'mb-3' : 'mb-6'} border border-gray-200`}>
              <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
              Fitness Tools
            </div>
            
            <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-semibold ${isMobile ? 'mb-2' : 'mb-4'} text-gray-900 leading-tight`}>
              Advanced Fitness Tools
            </h1>
            
            <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-gray-600 ${isMobile ? 'mb-4' : 'mb-8'} max-w-2xl mx-auto leading-relaxed`}>
              Precision calculators and AI-powered assistance to optimize your fitness journey with data-driven insights.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className={`${isMobile ? 'py-6' : 'py-12'}`}>
        <div className="container mx-auto px-4 max-w-6xl">
          <Tabs defaultValue="calculators" className={`${isMobile ? 'space-y-4' : 'space-y-8'}`}>
            <TabsList className={`grid w-full grid-cols-2 ${isMobile ? 'max-w-xs' : 'max-w-sm'} mx-auto bg-white border border-gray-200 p-1`}>
              <TabsTrigger value="calculators" className={`data-[state=active]:bg-black data-[state=active]:text-white ${isMobile ? 'text-xs' : ''}`}>
                <Calculator className={`${isMobile ? 'mr-1 h-3 w-3' : 'mr-2 h-4 w-4'}`} />
                Calculators
              </TabsTrigger>
              <TabsTrigger value="chat" className={`data-[state=active]:bg-black data-[state=active]:text-white ${isMobile ? 'text-xs' : ''}`}>
                <MessageCircle className={`${isMobile ? 'mr-1 h-3 w-3' : 'mr-2 h-4 w-4'}`} />
                AI Assistant
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calculators">
              <div className={`grid grid-cols-1 ${isMobile ? 'gap-3' : 'lg:grid-cols-2 gap-6'}`}>
                <Card className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className={`${isMobile ? 'pb-2' : 'pb-4'}`}>
                    <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold flex items-center text-gray-900`}>
                      <Target className={`${isMobile ? 'mr-2 h-4 w-4' : 'mr-3 h-5 w-5'} text-gray-600`} />
                      BMI Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BMICalculator />
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className={`${isMobile ? 'pb-2' : 'pb-4'}`}>
                    <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold flex items-center text-gray-900`}>
                      <Zap className={`${isMobile ? 'mr-2 h-4 w-4' : 'mr-3 h-5 w-5'} text-gray-600`} />
                      Calorie Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CalorieCalculator />
                  </CardContent>
                </Card>
              </div>

              {/* Coming Soon Section */}
              <div className={`${isMobile ? 'mt-8' : 'mt-16'}`}>
                <div className={`text-center ${isMobile ? 'mb-4' : 'mb-8'}`}>
                  <h3 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-semibold text-gray-900 ${isMobile ? 'mb-1' : 'mb-2'}`}>
                    Coming Soon
                  </h3>
                  <p className={`text-gray-600 ${isMobile ? 'text-sm' : ''}`}>More advanced tools to enhance your fitness journey</p>
                </div>
                
                <div className={`grid grid-cols-1 ${isMobile ? 'gap-3' : 'md:grid-cols-3 gap-6'}`}>
                  <Card className="border border-gray-200 bg-white/50 shadow-sm">
                    <CardContent className={`${isMobile ? 'p-4' : 'p-6'} text-center`}>
                      <div className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} bg-gray-100 rounded-lg mx-auto ${isMobile ? 'mb-2' : 'mb-4'} flex items-center justify-center`}>
                        <TrendingUp className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} text-gray-500`} />
                      </div>
                      <h4 className={`font-semibold text-gray-900 ${isMobile ? 'mb-1 text-sm' : 'mb-2'}`}>Progress Tracker</h4>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 leading-relaxed`}>
                        Advanced analytics for your fitness journey
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200 bg-white/50 shadow-sm">
                    <CardContent className={`${isMobile ? 'p-4' : 'p-6'} text-center`}>
                      <div className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} bg-gray-100 rounded-lg mx-auto ${isMobile ? 'mb-2' : 'mb-4'} flex items-center justify-center`}>
                        <Clock className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} text-gray-500`} />
                      </div>
                      <h4 className={`font-semibold text-gray-900 ${isMobile ? 'mb-1 text-sm' : 'mb-2'}`}>Workout Timer</h4>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 leading-relaxed`}>
                        Precision timing for interval training
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200 bg-white/50 shadow-sm">
                    <CardContent className={`${isMobile ? 'p-4' : 'p-6'} text-center`}>
                      <div className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} bg-gray-100 rounded-lg mx-auto ${isMobile ? 'mb-2' : 'mb-4'} flex items-center justify-center`}>
                        <Target className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'} text-gray-500`} />
                      </div>
                      <h4 className={`font-semibold text-gray-900 ${isMobile ? 'mb-1 text-sm' : 'mb-2'}`}>Goal Planner</h4>
                      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 leading-relaxed`}>
                        Strategic planning for your fitness goals
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="chat">
              <Card className="border border-gray-200 bg-white shadow-sm">
                <CardHeader className={`${isMobile ? 'pb-2' : 'pb-4'}`}>
                  <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold flex items-center text-gray-900`}>
                    <MessageCircle className={`${isMobile ? 'mr-2 h-4 w-4' : 'mr-3 h-5 w-5'} text-gray-600`} />
                    AI Fitness Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ExerciseChat />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Features Section */}
      <section className={`${isMobile ? 'py-8' : 'py-16'} bg-white border-t border-gray-100`}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-semibold text-gray-900 ${isMobile ? 'mb-6' : 'mb-12'}`}>
              Why Our Tools Stand Out
            </h3>
            
            <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-3 gap-8'}`}>
              <div className="text-center">
                <div className={`${isMobile ? 'w-10 h-10' : 'w-14 h-14'} bg-black rounded-lg mx-auto ${isMobile ? 'mb-3' : 'mb-6'} flex items-center justify-center`}>
                  <Zap className={`${isMobile ? 'h-5 w-5' : 'h-7 w-7'} text-white`} />
                </div>
                <h4 className={`font-semibold text-gray-900 ${isMobile ? 'mb-2 text-sm' : 'mb-3 text-lg'}`}>Instant Results</h4>
                <p className={`text-gray-600 leading-relaxed ${isMobile ? 'text-xs' : ''}`}>
                  Get immediate, accurate calculations and insights for your fitness goals
                </p>
              </div>
              
              <div className="text-center">
                <div className={`${isMobile ? 'w-10 h-10' : 'w-14 h-14'} bg-black rounded-lg mx-auto ${isMobile ? 'mb-3' : 'mb-6'} flex items-center justify-center`}>
                  <Target className={`${isMobile ? 'h-5 w-5' : 'h-7 w-7'} text-white`} />
                </div>
                <h4 className={`font-semibold text-gray-900 ${isMobile ? 'mb-2 text-sm' : 'mb-3 text-lg'}`}>Precision Focused</h4>
                <p className={`text-gray-600 leading-relaxed ${isMobile ? 'text-xs' : ''}`}>
                  Science-based algorithms designed for maximum accuracy and reliability
                </p>
              </div>
              
              <div className="text-center">
                <div className={`${isMobile ? 'w-10 h-10' : 'w-14 h-14'} bg-black rounded-lg mx-auto ${isMobile ? 'mb-3' : 'mb-6'} flex items-center justify-center`}>
                  <MessageCircle className={`${isMobile ? 'h-5 w-5' : 'h-7 w-7'} text-white`} />
                </div>
                <h4 className={`font-semibold text-gray-900 ${isMobile ? 'mb-2 text-sm' : 'mb-3 text-lg'}`}>AI-Powered</h4>
                <p className={`text-gray-600 leading-relaxed ${isMobile ? 'text-xs' : ''}`}>
                  Advanced AI assistance providing personalized guidance and recommendations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tools;
