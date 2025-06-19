
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Award, Download, Heart, Dumbbell, Apple, AlertTriangle, Sparkles, Brain } from "lucide-react";

const Education = () => {
  const navigate = useNavigate();

  const educationTopics = [
    {
      title: "Exercise Biology",
      description: "Understanding adaptation at the cellular level",
      icon: Heart,
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/biology",
      category: "Science Foundation"
    },
    {
      title: "Men's Weightlifting & Aesthetics",
      description: "Build muscle mass and achieve the classic physique",
      icon: Dumbbell,
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/education/mens-weightlifting",
      category: "Specialized Training"
    },
    {
      title: "Women's Strength & Aesthetics",
      description: "Feminine strength training and body composition",
      icon: Sparkles,
      image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/education/womens-training",
      category: "Specialized Training"
    },
    {
      title: "Steroid Education & Awareness",
      description: "Biology, risks, and informed decision-making",
      icon: AlertTriangle,
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/education/steroid-education",
      category: "Awareness & Safety"
    },
  ];

  const fitnessContent = [
    {
      title: "Advanced Calisthenics",
      description: "Master complex bodyweight movements",
      icon: Award,
      image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/fitness", 
      category: "Movement Mastery"
    },
    {
      title: "Strength Training Fundamentals",
      description: "Build a solid foundation for progressive overload",
      icon: Dumbbell,
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/fitness",
      category: "Movement Mastery"
    },
  ];

  const nutritionContent = [
    {
      title: "Precision Nutrition",
      description: "Optimize performance through strategic eating",
      icon: Apple,
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/nutrition",
      category: "Nutrition Science"
    },
    {
      title: "Macro & Micronutrients",
      description: "Understanding the building blocks of nutrition",
      icon: Apple,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/nutrition",
      category: "Nutrition Science"
    },
  ];

  const freeResources = [
    {
      title: "Beginner's Training Template",
      description: "12-week progressive program",
      downloadLink: "#",
      type: "PDF"
    },
    {
      title: "Macro Calculator",
      description: "Calculate daily nutritional needs",
      downloadLink: "#",
      type: "Excel"
    },
    {
      title: "Exercise Form Videos",
      description: "Proper technique demos",
      downloadLink: "#",
      type: "Video"
    },
    {
      title: "Recovery Protocol",
      description: "Optimize rest and recovery",
      downloadLink: "#",
      type: "PDF"
    },
    {
      title: "Supplement Guide",
      description: "Evidence-based recommendations",
      downloadLink: "#",
      type: "PDF"
    },
    {
      title: "Home Workouts",
      description: "No-equipment sessions",
      downloadLink: "#",
      type: "Plans"
    },
  ];

  const allTopics = [...educationTopics, ...fitnessContent, ...nutritionContent];
  const groupedTopics = allTopics.reduce((acc, topic) => {
    if (!acc[topic.category]) {
      acc[topic.category] = [];
    }
    acc[topic.category].push(topic);
    return acc;
  }, {} as Record<string, typeof allTopics>);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-xs md:text-sm text-gray-600 mb-4 md:mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Educational Excellence
            </div>
            
            <h1 className="text-2xl md:text-4xl font-light mb-3 md:mb-4 text-gray-900 leading-tight">
              Master the Science of
              <br />
              <span className="font-semibold">Fitness Excellence</span>
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
              Evidence-based training, nutrition science, and performance optimization
            </p>
          </div>
        </div>
      </section>

      {/* Education Topics by Category */}
      <section className="pb-8 md:pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {Object.entries(groupedTopics).map(([category, topics]) => (
              <div key={category} className="mb-8 md:mb-12">
                <div className="text-center mb-4 md:mb-6">
                  <h2 className="text-lg md:text-2xl font-light text-gray-900 mb-2">{category}</h2>
                  <div className="w-16 h-px bg-gray-300 mx-auto"></div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                  {topics.map((topic, index) => (
                    <div key={index} className="bg-white border border-gray-200 group cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={() => navigate(topic.link)}>
                      <div className="aspect-square md:aspect-[4/3] overflow-hidden">
                        <img 
                          src={topic.image} 
                          alt={topic.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-2 md:p-4">
                        <div className="flex items-center mb-1 md:mb-2">
                          <topic.icon className="h-3 w-3 md:h-4 md:w-4 text-gray-400 mr-1 md:mr-2" />
                          <span className="text-xs text-gray-500 uppercase tracking-wide">{topic.category}</span>
                        </div>
                        <h3 className="text-xs md:text-base font-semibold mb-1 md:mb-2 text-gray-900 line-clamp-2">{topic.title}</h3>
                        <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">{topic.description}</p>
                        <div className="flex items-center text-xs md:text-sm text-gray-900 group-hover:text-black">
                          <span className="mr-1 md:mr-2">Learn</span>
                          <ArrowRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Resources Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-xl md:text-3xl font-light text-gray-900 mb-2 md:mb-4">
                Free Resources
              </h2>
              <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
                Guides, templates, and tools to accelerate your journey
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
              {freeResources.map((resource, index) => (
                <div key={index} className="bg-white p-2 md:p-4 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex flex-col">
                    <div className="flex-1 mb-2 md:mb-3">
                      <h3 className="font-semibold text-gray-900 mb-1 text-xs md:text-sm line-clamp-2">{resource.title}</h3>
                      <p className="text-gray-600 text-xs mb-1 md:mb-2 line-clamp-2">{resource.description}</p>
                      <span className="text-xs bg-gray-100 text-gray-600 px-1 md:px-2 py-1 rounded">{resource.type}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 rounded-none text-xs h-7 md:h-8"
                      onClick={() => {/* Handle download */}}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6 md:mt-8">
              <Button 
                onClick={() => navigate("/resources")}
                className="bg-black text-white hover:bg-gray-800 rounded-none px-4 md:px-6 py-2 text-sm md:text-base"
              >
                View All Resources
                <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Education Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gray-50 p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-light text-gray-900 mb-3 md:mb-4">
                Advanced Programs
              </h2>
              <p className="text-sm md:text-lg text-gray-600 mb-4 md:mb-6">
                Premium curriculum with courses, certifications, and mentorship
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="text-center">
                  <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-gray-400 mx-auto mb-1 md:mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-1 text-xs md:text-sm">Courses</h4>
                  <p className="text-xs text-gray-600">20+ hours content</p>
                </div>
                <div className="text-center">
                  <Award className="h-5 w-5 md:h-6 md:w-6 text-gray-400 mx-auto mb-1 md:mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-1 text-xs md:text-sm">Certifications</h4>
                  <p className="text-xs text-gray-600">Industry credentials</p>
                </div>
                <div className="text-center">
                  <Users className="h-5 w-5 md:h-6 md:w-6 text-gray-400 mx-auto mb-1 md:mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-1 text-xs md:text-sm">Mentorship</h4>
                  <p className="text-xs text-gray-600">Expert access</p>
                </div>
              </div>
              
              <Button 
                onClick={() => navigate("/resources#premium")}
                className="bg-black text-white hover:bg-gray-800 rounded-none px-4 md:px-6 py-2 md:py-3 text-sm md:text-base"
              >
                Upgrade - $29/month
                <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Education;
