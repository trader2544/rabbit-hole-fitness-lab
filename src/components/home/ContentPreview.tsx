
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ContentPreview = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const contentSections = [
    {
      title: "Exercise Biology",
      description: "Understanding adaptation at the cellular level",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/biology",
      category: "Science"
    },
    {
      title: "Advanced Calisthenics",
      description: "Master complex bodyweight movements",
      image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/fitness", 
      category: "Training"
    },
    {
      title: "Precision Nutrition",
      description: "Optimize performance through strategic eating",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "/nutrition",
      category: "Nutrition"
    },
  ];

  return (
    <section className={`${isMobile ? 'py-6' : 'py-12 md:py-24'} bg-gray-50`}>
      <div className="container mx-auto px-4">
        <div className={`text-center max-w-3xl mx-auto ${isMobile ? 'mb-4' : 'mb-8 md:mb-16'}`}>
          <h2 className={`${isMobile ? 'text-lg' : 'text-2xl md:text-4xl'} font-light text-gray-900 ${isMobile ? 'mb-2' : 'mb-3 md:mb-6'}`}>
            Educational Excellence
          </h2>
          <p className={`${isMobile ? 'text-xs' : 'text-sm md:text-lg'} text-gray-600`}>
            Deep-dive into the science and methodology behind elite performance
          </p>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-1 lg:grid-cols-3 gap-8'} max-w-7xl mx-auto ${isMobile ? 'mb-4' : 'mb-6 md:mb-12'}`}>
          {contentSections.map((section, index) => (
            <div key={index} className="bg-white group cursor-pointer" onClick={() => navigate(section.link)}>
              <div className={`${isMobile ? 'aspect-[4/3]' : 'aspect-[4/3]'} overflow-hidden`}>
                <img 
                  src={section.image} 
                  alt={section.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className={`${isMobile ? 'p-2' : 'p-4 md:p-8'}`}>
                <div className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-500 ${isMobile ? 'mb-1' : 'mb-2 md:mb-3'} uppercase tracking-wide`}>{section.category}</div>
                <h3 className={`${isMobile ? 'text-sm' : 'text-base md:text-xl'} font-semibold ${isMobile ? 'mb-1' : 'mb-2 md:mb-3'} text-gray-900`}>{section.title}</h3>
                <p className={`text-gray-600 ${isMobile ? 'mb-2 text-xs' : 'text-sm md:text-base mb-3 md:mb-6'}`}>{section.description}</p>
                <div className={`flex items-center ${isMobile ? 'text-xs' : 'text-xs md:text-sm'} text-gray-900 group-hover:text-black`}>
                  <span className="mr-1">Learn More</span>
                  <ArrowRight className={`${isMobile ? 'h-3 w-3' : 'h-3 w-3 md:h-4 md:w-4'} group-hover:translate-x-1 transition-transform`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size={isMobile ? "sm" : "default"}
            onClick={() => navigate("/resources")}
            className={`border-2 border-gray-300 text-gray-700 hover:border-black hover:text-black rounded-none ${isMobile ? 'px-4 py-1 text-xs' : 'px-6 py-2 text-sm md:px-8 md:py-6'}`}
          >
            View All Resources
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContentPreview;
