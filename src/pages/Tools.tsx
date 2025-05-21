
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BMICalculator from "@/components/tools/BMICalculator";
import CalorieCalculator from "@/components/tools/CalorieCalculator";
import ExerciseChat from "@/components/tools/ExerciseChat";
import { useLocation } from "react-router-dom";

const Tools = () => {
  const location = useLocation();
  const defaultTab = location.pathname.includes("/chat") ? "chat" : "calculators";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Interactive Fitness Tools</h1>
        <p className="text-lg text-foreground/70 mb-8">
          Calculate your metrics and get personalized recommendations to optimize your fitness journey
        </p>
        
        <Tabs defaultValue={defaultTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="calculators">BMI & Calorie Calculators</TabsTrigger>
            <TabsTrigger value="chat">Exercise Chat</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculators" className="space-y-8">
            <div className="grid grid-cols-1 gap-8">
              <BMICalculator />
              <CalorieCalculator />
            </div>
          </TabsContent>
          
          <TabsContent value="chat">
            <ExerciseChat />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Tools;
