
import { Heart, Dumbbell, Book, Calculator, Crown, Users, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const features = [
  {
    title: "Deep Science",
    description: "Evidence-based training methods rooted in exercise physiology and biomechanics",
    icon: Heart,
  },
  {
    title: "Expert Trainers",
    description: "Certified professionals with proven track records and specialized expertise",
    icon: Users,
  },
  {
    title: "Premium Content",
    description: "Curated educational resources covering nutrition, recovery, and performance",
    icon: Book,
  },
  {
    title: "Smart Tools",
    description: "Advanced calculators and AI-powered recommendations for optimal results",
    icon: Calculator,
  },
  {
    title: "Elite Programs",
    description: "Exclusive coaching programs designed for serious fitness enthusiasts",
    icon: Crown,
  },
  {
    title: "Proven Methods",
    description: "Time-tested approaches combining traditional and cutting-edge techniques",
    icon: Dumbbell,
  },
];

const FeaturesGrid = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-24 bg-white hidden md:block">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-light text-gray-900 mb-6">
            Why Choose Excellence
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We combine scientific rigor with practical application to deliver transformative results
          </p>
        </div>

        {/* Desktop View - Always Visible */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-gray-200 group-hover:border-black transition-colors duration-300">
                <feature.icon className="h-7 w-7 text-gray-600 group-hover:text-black transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
