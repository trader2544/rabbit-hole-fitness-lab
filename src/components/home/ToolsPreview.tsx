
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Calculator, MessageSquare, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ToolsPreview = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <section className={`${isMobile ? 'py-6' : 'py-24'} bg-white`}>
      <div className="container mx-auto px-4">
        <div className={`text-center max-w-3xl mx-auto ${isMobile ? 'mb-4' : 'mb-16'}`}>
          <h2 className={`${isMobile ? 'text-lg' : 'text-4xl'} font-light text-gray-900 ${isMobile ? 'mb-2' : 'mb-6'}`}>
            Intelligent Tools
          </h2>
          <p className={`${isMobile ? 'text-xs' : 'text-lg'} text-gray-600`}>
            Precision metrics and AI-powered recommendations for optimal results
          </p>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-1 lg:grid-cols-2 gap-16'} max-w-5xl mx-auto`}>
          <div className={`${isMobile ? 'text-center' : 'text-center lg:text-left'}`}>
            <div className={`${isMobile ? 'w-8 h-8 mb-2' : 'w-16 h-16 mb-8'} border border-gray-200 flex items-center justify-center mx-auto ${!isMobile ? 'lg:mx-0' : ''}`}>
              <Calculator className={`${isMobile ? 'h-4 w-4' : 'h-8 w-8'} text-gray-600`} />
            </div>
            <h3 className={`${isMobile ? 'text-sm' : 'text-2xl'} font-semibold ${isMobile ? 'mb-1' : 'mb-6'} text-gray-900`}>Advanced Calculators</h3>
            <p className={`text-gray-600 ${isMobile ? 'mb-2 text-xs' : 'mb-8'} leading-relaxed`}>
              {isMobile ? 'Calculate BMI, calories, macros with precision' : 'Calculate BMI, daily caloric needs, macro distributions, and training loads with scientific precision tailored to your specific goals.'}
            </p>
            <Button 
              onClick={() => navigate("/tools/calculators")}
              variant="outline"
              size={isMobile ? "sm" : "default"}
              className={`border-2 border-gray-300 text-gray-700 hover:border-black hover:text-black rounded-none ${isMobile ? 'px-2 py-1 text-xs' : 'px-6 py-3'}`}
            >
              {isMobile ? 'Calculators' : 'Access Calculators'}
              <ArrowRight className={`ml-1 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
            </Button>
          </div>

          <div className={`${isMobile ? 'text-center' : 'text-center lg:text-left'}`}>
            <div className={`${isMobile ? 'w-8 h-8 mb-2' : 'w-16 h-16 mb-8'} border border-gray-200 flex items-center justify-center mx-auto ${!isMobile ? 'lg:mx-0' : ''}`}>
              <MessageSquare className={`${isMobile ? 'h-4 w-4' : 'h-8 w-8'} text-gray-600`} />
            </div>
            <h3 className={`${isMobile ? 'text-sm' : 'text-2xl'} font-semibold ${isMobile ? 'mb-1' : 'mb-6'} text-gray-900`}>AI Exercise Coach</h3>
            <p className={`text-gray-600 ${isMobile ? 'mb-2 text-xs' : 'mb-8'} leading-relaxed`}>
              {isMobile ? 'Get instant, personalized workout recommendations' : 'Get instant, personalized workout recommendations based on your fitness level, available equipment, and specific objectives.'}
            </p>
            <Button 
              onClick={() => navigate("/tools/chat")}
              variant="outline"
              size={isMobile ? "sm" : "default"}
              className={`border-2 border-gray-300 text-gray-700 hover:border-black hover:text-black rounded-none ${isMobile ? 'px-2 py-1 text-xs' : 'px-6 py-3'}`}
            >
              {isMobile ? 'AI Coach' : 'Start Consultation'}
              <ArrowRight className={`ml-1 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsPreview;
