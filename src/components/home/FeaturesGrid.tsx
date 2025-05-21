
import { Heart, Dumbbell, Book, Calculator } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Deep Biology",
    description:
      "Understand the science behind muscle growth, metabolism, hormonal responses, and recovery at the cellular level.",
    icon: Heart,
    delay: "animate-delay-100",
  },
  {
    title: "Fitness Modalities",
    description:
      "Explore calisthenics, sport-specific training, aesthetic weightlifting, functional fitness, and more.",
    icon: Dumbbell,
    delay: "animate-delay-200",
  },
  {
    title: "Holistic Nutrition",
    description:
      "Learn about macronutrients, micronutrients, gut health, meal timing, and evidence-based dietary approaches.",
    icon: Book,
    delay: "animate-delay-300",
  },
  {
    title: "Interactive Tools",
    description:
      "Calculate your BMI, estimate caloric needs, and get personalized exercise recommendations through our chat feature.",
    icon: Calculator,
    delay: "animate-delay-400",
  },
];

const FeaturesGrid = () => {
  return (
    <section id="content" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 opacity-0 animate-fade-in animate-delay-100">
            Go Down the Rabbit Hole
          </h2>
          <p className="text-lg text-foreground/80 opacity-0 animate-fade-in animate-delay-200">
            Discover the "why" behind fitness and nutrition with our comprehensive resources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className={`border border-border bg-card shadow-sm opacity-0 animate-fade-in ${feature.delay}`}>
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
