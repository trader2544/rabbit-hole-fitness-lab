
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calculator, MessageSquare, ArrowRight } from "lucide-react";

const ToolsPreview = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-light text-gray-900 mb-6">
            Intelligent Tools
          </h2>
          <p className="text-lg text-gray-600">
            Precision metrics and AI-powered recommendations for optimal results
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <div className="text-center lg:text-left">
            <div className="w-16 h-16 border border-gray-200 flex items-center justify-center mb-8 mx-auto lg:mx-0">
              <Calculator className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">Advanced Calculators</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Calculate BMI, daily caloric needs, macro distributions, and training loads with scientific precision tailored to your specific goals.
            </p>
            <Button 
              onClick={() => navigate("/tools/calculators")}
              variant="outline"
              className="border-2 border-gray-300 text-gray-700 hover:border-black hover:text-black rounded-none px-6 py-3"
            >
              Access Calculators
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="text-center lg:text-left">
            <div className="w-16 h-16 border border-gray-200 flex items-center justify-center mb-8 mx-auto lg:mx-0">
              <MessageSquare className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">AI Exercise Coach</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Get instant, personalized workout recommendations based on your fitness level, available equipment, and specific objectives.
            </p>
            <Button 
              onClick={() => navigate("/tools/chat")}
              variant="outline"
              className="border-2 border-gray-300 text-gray-700 hover:border-black hover:text-black rounded-none px-6 py-3"
            >
              Start Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsPreview;
