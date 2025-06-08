
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, MessageCircle, Target, Zap, TrendingUp, Clock } from "lucide-react";
import BMICalculator from "@/components/tools/BMICalculator";
import CalorieCalculator from "@/components/tools/CalorieCalculator";
import ExerciseChat from "@/components/tools/ExerciseChat";

const Tools = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Advanced Fitness Tools
            </div>
            
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-gray-900 leading-tight">
              Precision Tools for
              <br />
              <span className="font-semibold">Peak Performance</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Advanced calculators and AI-powered assistance to optimize your fitness journey with data-driven insights.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="calculators" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto rounded-none">
                <TabsTrigger value="calculators" className="rounded-none">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculators
                </TabsTrigger>
                <TabsTrigger value="chat" className="rounded-none">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  AI Assistant
                </TabsTrigger>
              </TabsList>

              <TabsContent value="calculators">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="border border-gray-200">
                    <CardHeader>
                      <CardTitle className="font-light flex items-center">
                        <Target className="mr-2 h-5 w-5 text-gray-400" />
                        BMI Calculator
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <BMICalculator />
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200">
                    <CardHeader>
                      <CardTitle className="font-light flex items-center">
                        <Zap className="mr-2 h-5 w-5 text-gray-400" />
                        Calorie Calculator
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CalorieCalculator />
                    </CardContent>
                  </Card>
                </div>

                {/* Additional Tools Preview */}
                <div className="mt-12">
                  <h3 className="text-2xl font-light text-gray-900 mb-8 text-center">
                    Coming Soon
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border border-gray-200 opacity-75">
                      <CardContent className="p-6 text-center">
                        <TrendingUp className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                        <h4 className="font-semibold text-gray-900 mb-2">Progress Tracker</h4>
                        <p className="text-sm text-gray-600">
                          Advanced analytics for your fitness journey
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border border-gray-200 opacity-75">
                      <CardContent className="p-6 text-center">
                        <Clock className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                        <h4 className="font-semibold text-gray-900 mb-2">Workout Timer</h4>
                        <p className="text-sm text-gray-600">
                          Precision timing for interval training
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border border-gray-200 opacity-75">
                      <CardContent className="p-6 text-center">
                        <Target className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                        <h4 className="font-semibold text-gray-900 mb-2">Goal Planner</h4>
                        <p className="text-sm text-gray-600">
                          Strategic planning for your fitness goals
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="chat">
                <Card className="border border-gray-200">
                  <CardHeader>
                    <CardTitle className="font-light flex items-center">
                      <MessageCircle className="mr-2 h-5 w-5 text-gray-400" />
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
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-light text-gray-900 mb-12">
              Why Our Tools Stand Out
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="w-12 h-12 bg-black rounded-none mx-auto mb-4 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Instant Results</h4>
                <p className="text-sm text-gray-600">
                  Get immediate, accurate calculations and insights
                </p>
              </div>
              
              <div>
                <div className="w-12 h-12 bg-black rounded-none mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Precision Focused</h4>
                <p className="text-sm text-gray-600">
                  Science-based algorithms for maximum accuracy
                </p>
              </div>
              
              <div>
                <div className="w-12 h-12 bg-black rounded-none mx-auto mb-4 flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">AI-Powered</h4>
                <p className="text-sm text-gray-600">
                  Advanced AI assistance for personalized guidance
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
