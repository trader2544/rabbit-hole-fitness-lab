
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ContentPreview = () => {
  const navigate = useNavigate();
  
  const contentSections = [
    {
      title: "Biology of Exercise",
      description: "Dive into the cellular mechanisms of adaptation, from protein synthesis to mitochondrial biogenesis.",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/biology",
      delay: "animate-delay-100",
    },
    {
      title: "Calisthenics Mastery",
      description: "Learn bodyweight progressions, from basic push-ups to advanced planche and human flag variations.",
      image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/fitness",
      delay: "animate-delay-200",
    },
    {
      title: "Nutrition Science",
      description: "Understand how food affects your body at the biochemical level and optimize your diet accordingly.",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      link: "/nutrition",
      delay: "animate-delay-300",
    },
  ];

  return (
    <section className="py-16 bg-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 opacity-0 animate-fade-in">
            Explore Our Content
          </h2>
          <p className="text-lg text-foreground/80 opacity-0 animate-fade-in animate-delay-100">
            From the molecular level to practical application, our content takes you through every aspect of fitness and health
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {contentSections.map((section, index) => (
            <div 
              key={index} 
              className={`group rounded-xl overflow-hidden shadow-md bg-card border border-border opacity-0 animate-fade-in ${section.delay}`}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={section.image} 
                  alt={section.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                <p className="text-foreground/70 mb-4">{section.description}</p>
                <Button 
                  variant="outline" 
                  onClick={() => navigate(section.link)}
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center opacity-0 animate-fade-in animate-delay-400">
          <Button 
            variant="default" 
            size="lg" 
            onClick={() => navigate("/resources")}
            className="font-medium"
          >
            View All Resources
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContentPreview;
