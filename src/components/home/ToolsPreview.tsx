
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calculator, Chat } from "lucide-react";

const ToolsPreview = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 opacity-0 animate-fade-in">
            Interactive Tools
          </h2>
          <p className="text-lg text-foreground/80 opacity-0 animate-fade-in animate-delay-100">
            Calculate your metrics and get personalized recommendations to optimize your fitness journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* BMI & Calorie Calculator Preview */}
          <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center text-center shadow-sm opacity-0 animate-fade-in animate-delay-200">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">BMI & Calorie Calculator</h3>
            <p className="text-foreground/70 mb-6">
              Understand your body mass index and daily caloric needs based on your profile, activity level, and goals.
            </p>
            <Button 
              onClick={() => navigate("/tools/calculators")}
              className="font-medium"
            >
              Try Calculators
            </Button>
          </div>

          {/* Exercise Chat Preview */}
          <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center text-center shadow-sm opacity-0 animate-fade-in animate-delay-300">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Chat className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">Exercise Recommendation Chat</h3>
            <p className="text-foreground/70 mb-6">
              Get personalized workout recommendations based on your fitness level, goals, and available equipment.
            </p>
            <Button 
              onClick={() => navigate("/tools/chat")}
              className="font-medium"
            >
              Start Chatting
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsPreview;
