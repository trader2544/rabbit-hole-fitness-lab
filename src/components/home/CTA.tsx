
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 bg-gradient-to-r from-fitness-600 to-fitness-400">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Fitness Journey?</h2>
          <p className="text-lg mb-8 opacity-90">
            Access our free resources or try our interactive tools to take the first step toward evidence-based fitness and nutrition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="default" 
              size="lg"
              className="bg-white text-fitness-600 hover:bg-white/90 font-medium"
              onClick={() => navigate("/resources")}
            >
              Explore Free Resources
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10 font-medium"
              onClick={() => navigate("/tools")}
            >
              Try Our Tools
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
