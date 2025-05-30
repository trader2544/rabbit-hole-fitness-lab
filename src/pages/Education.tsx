
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
    {
      title: "Advanced Calisthenics",
      description: "Master complex bodyweight movements",
      icon: Award,
      image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/fitness", 
      category: "Movement Mastery"
    },
    {
      title: "Precision Nutrition",
      description: "Optimize performance through strategic eating",
      icon: Apple,
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      link: "/nutrition",
      category: "Nutrition Science"
    }
  ];

  const freeResources = [
    {
      title: "Beginner's Training Template",
      description: "12-week progressive program for newcomers",
      downloadLink: "#",
      type: "PDF Guide"
    },
    {
      title: "Macro Calculator Spreadsheet",
      description: "Calculate your daily nutritional needs",
      downloadLink: "#",
      type: "Excel File"
    },
    {
      title: "Exercise Form Video Library",
      description: "Proper technique demonstrations",
      downloadLink: "#",
      type: "Video Series"
    },
    {
      title: "Recovery Protocol Checklist",
      description: "Optimize your rest and recovery",
      downloadLink: "#",
      type: "PDF Checklist"
    },
    {
      title: "Supplement Safety Guide",
      description: "Evidence-based supplement recommendations",
      downloadLink: "#",
      type: "PDF Guide"
    },
    {
      title: "Home Workout Routines",
      description: "No-equipment training sessions",
      downloadLink: "#",
      type: "Workout Plans"
    },
    {
      title: "Injury Prevention Manual",
      description: "Movement screens and corrective exercises",
      downloadLink: "#",
      type: "PDF Manual"
    },
    {
      title: "Progress Tracking Templates",
      description: "Track workouts, measurements, and goals",
      downloadLink: "#",
      type: "Spreadsheet"
    },
    {
      title: "Meal Prep Guide",
      description: "Weekly meal planning and preparation",
      downloadLink: "#",
      type: "PDF Guide"
    },
    {
      title: "Sleep Optimization Protocol",
      description: "Improve recovery through better sleep",
      downloadLink: "#",
      type: "PDF Guide"
    },
    {
      title: "Flexibility & Mobility Routines",
      description: "Daily movement maintenance",
      downloadLink: "#",
      type: "Video Series"
    },
    {
      title: "Beginner's Mindset Guide",
      description: "Mental strategies for long-term success",
      downloadLink: "#",
      type: "PDF Guide"
    }
  ];

  const groupedTopics = educationTopics.reduce((acc, topic) => {
    if (!acc[topic.category]) {
      acc[topic.category] = [];
    }
    acc[topic.category].push(topic);
    return acc;
  }, {} as Record<string, typeof educationTopics>);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Educational Excellence
            </div>
            
            <h1 className="text-3xl md:text-4xl font-light mb-4 text-gray-900 leading-tight">
              Master the Science of
              <br />
              <span className="font-semibold">Fitness Excellence</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Deep-dive into evidence-based training methods, nutrition science, and performance optimization through comprehensive educational resources.
            </p>
          </div>
        </div>
      </section>

      {/* Education Topics by Category */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {Object.entries(groupedTopics).map(([category, topics]) => (
              <div key={category} className="mb-12">
                <div className="text-center mb-6">
                  <h2 className="text-xl md:text-2xl font-light text-gray-900 mb-2">{category}</h2>
                  <div className="w-16 h-px bg-gray-300 mx-auto"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {topics.map((topic, index) => (
                    <div key={index} className="bg-white border border-gray-200 group cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={() => navigate(topic.link)}>
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={topic.image} 
                          alt={topic.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center mb-2">
                          <topic.icon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-xs text-gray-500 uppercase tracking-wide">{topic.category}</span>
                        </div>
                        <h3 className="text-base font-semibold mb-2 text-gray-900">{topic.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{topic.description}</p>
                        <div className="flex items-center text-sm text-gray-900 group-hover:text-black">
                          <span className="mr-2">Learn More</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4">
                Free Resources Library
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Access our comprehensive collection of guides, templates, and tools to accelerate your fitness journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {freeResources.map((resource, index) => (
                <div key={index} className="bg-white p-4 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm">{resource.title}</h3>
                      <p className="text-gray-600 text-xs mb-2">{resource.description}</p>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{resource.type}</span>
                    </div>
                    <Download className="h-4 w-4 text-gray-400 ml-2" />
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 rounded-none text-xs"
                    onClick={() => {/* Handle download */}}
                  >
                    Download Free
                  </Button>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button 
                onClick={() => navigate("/resources")}
                className="bg-black text-white hover:bg-gray-800 rounded-none px-6 py-2"
              >
                View All Resources
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Education Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gray-50 p-6 md:p-8">
              <h2 className="text-2xl font-light text-gray-900 mb-4">
                Advanced Education Programs
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Access our premium curriculum with in-depth courses, certifications, and one-on-one mentorship from industry experts.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <BookOpen className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm">Comprehensive Courses</h4>
                  <p className="text-xs text-gray-600">20+ hours of detailed content</p>
                </div>
                <div className="text-center">
                  <Award className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm">Certifications</h4>
                  <p className="text-xs text-gray-600">Industry-recognized credentials</p>
                </div>
                <div className="text-center">
                  <Users className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm">Expert Mentorship</h4>
                  <p className="text-xs text-gray-600">Direct access to professionals</p>
                </div>
              </div>
              
              <Button 
                onClick={() => navigate("/resources#premium")}
                className="bg-black text-white hover:bg-gray-800 rounded-none px-6 py-3"
              >
                Upgrade to Premium - $29/month
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Education;
