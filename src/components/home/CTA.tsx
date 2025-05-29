
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl lg:text-5xl font-light mb-6">
            Begin Your Transformation
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join our exclusive community of high-performers who demand excellence in every aspect of their fitness journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg"
              className="bg-white text-black hover:bg-gray-100 rounded-none px-8 py-6 text-lg font-normal"
              onClick={() => navigate("/trainers")}
            >
              Start Premium Training
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-black rounded-none px-8 py-6 text-lg font-normal"
              onClick={() => navigate("/resources")}
            >
              Explore Resources
            </Button>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm">
              Trusted by 500+ clients • 4.9/5 average rating • Premium support included
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
