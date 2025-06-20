import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Award, Users, Star, Crown, Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const premiumPlans = [
  {
    name: "Essential",
    price: 29,
    description: "Perfect for fitness enthusiasts ready to take their training seriously",
    features: [
      "Access to all premium courses",
      "Monthly live Q&A sessions", 
      "Progress tracking tools",
      "Community forum access",
      "Email support",
      "Mobile app access"
    ],
    popular: false
  },
  {
    name: "Professional", 
    price: 79,
    description: "For serious athletes and fitness professionals seeking mastery",
    features: [
      "Everything in Essential",
      "1-on-1 monthly coaching call",
      "Custom program design",
      "Advanced analytics dashboard",
      "Priority support",
      "Exclusive masterclasses",
      "Nutrition consultation"
    ],
    popular: true
  },
  {
    name: "Elite",
    price: 149,
    description: "Ultimate transformation package with complete personal guidance", 
    features: [
      "Everything in Professional",
      "Weekly 1-on-1 coaching",
      "Personalized meal planning",
      "24/7 trainer access",
      "Custom supplement protocol",
      "Quarterly body composition analysis",
      "Exclusive events access"
    ],
    popular: false
  }
];

const premiumCourses = [
  {
    title: "Advanced Exercise Physiology",
    description: "Master the science of adaptation from cellular to systemic levels",
    duration: "12 hours",
    modules: 8,
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Elite Calisthenics Mastery",
    description: "Progress from basics to advanced movements with expert technique analysis",
    duration: "15 hours", 
    modules: 10,
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Precision Nutrition Science",
    description: "Evidence-based nutrition strategies for optimal performance and body composition",
    duration: "10 hours",
    modules: 6, 
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Program Design Fundamentals",
    description: "Learn to create effective training programs for any goal or population",
    duration: "8 hours",
    modules: 5,
    level: "Intermediate", 
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }
];

const Resources = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className={`${isMobile ? 'py-8' : 'py-16 md:py-24'} bg-white`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex items-center bg-gray-100 rounded-full ${isMobile ? 'px-2 py-1 text-xs' : 'px-4 py-2 text-sm'} text-gray-600 ${isMobile ? 'mb-4' : 'mb-8'}`}>
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Premium Learning Platform
            </div>
            
            <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl md:text-5xl'} font-light ${isMobile ? 'mb-3' : 'mb-6'} text-gray-900 leading-tight`}>
              Accelerate Your
              <br />
              <span className="font-semibold">Fitness Education</span>
            </h1>
            
            <p className={`${isMobile ? 'text-sm' : 'text-lg md:text-xl'} text-gray-600 ${isMobile ? 'mb-6' : 'mb-12'} max-w-2xl mx-auto leading-relaxed`}>
              {isMobile ? 'Comprehensive courses & expert guidance' : 'Access comprehensive courses, expert guidance, and proven methodologies to master every aspect of fitness and performance.'}
            </p>
          </div>
        </div>
      </section>

      {/* Premium Plans */}
      <section className={`${isMobile ? 'pb-8' : 'pb-16'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center ${isMobile ? 'mb-6' : 'mb-12'}`}>
              <h2 className={`${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'} font-light text-gray-900 ${isMobile ? 'mb-2' : 'mb-4'}`}>
                Choose Your Learning Path
              </h2>
              <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-gray-600`}>
                {isMobile ? 'Flexible plans for your goals' : 'Flexible plans designed to match your commitment level and goals'}
              </p>
            </div>

            <div className={`grid grid-cols-1 ${isMobile ? 'gap-3' : 'md:grid-cols-3 gap-6'}`}>
              {premiumPlans.map((plan, index) => (
                <Card key={index} className={`relative border-2 ${plan.popular ? 'border-black' : 'border-gray-200'} hover:shadow-lg transition-shadow`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className={`bg-black text-white rounded-full ${isMobile ? 'px-2 py-1 text-xs' : 'px-4 py-1'}`}>Most Popular</Badge>
                    </div>
                  )}
                  
                  <CardHeader className={`text-center ${isMobile ? 'pb-2 p-3' : 'pb-4'}`}>
                    <CardTitle className={`${isMobile ? 'text-lg' : 'text-xl'} font-light`}>{plan.name}</CardTitle>
                    <div className={`${isMobile ? 'py-2' : 'py-4'}`}>
                      <span className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-light`}>${plan.price}</span>
                      <span className={`text-gray-500 ${isMobile ? 'text-sm' : ''}`}>/month</span>
                    </div>
                    <CardDescription className={`${isMobile ? 'text-xs' : 'text-sm'}`}>{plan.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className={`${isMobile ? 'space-y-2 px-3' : 'space-y-3'}`}>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <Check className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-green-500 mr-2 mt-0.5 flex-shrink-0`} />
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>{feature}</span>
                      </div>
                    ))}
                  </CardContent>
                  
                  <CardFooter className={`${isMobile ? 'px-3 pb-3' : ''}`}>
                    <Button 
                      className={`w-full rounded-none ${isMobile ? 'text-xs h-8' : ''} ${plan.popular ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                    >
                      Start {plan.name}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Courses */}
      <section className={`${isMobile ? 'py-8' : 'py-16'} bg-gray-50`}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center ${isMobile ? 'mb-6' : 'mb-12'}`}>
              <h2 className={`${isMobile ? 'text-lg' : 'text-2xl md:text-3xl'} font-light text-gray-900 ${isMobile ? 'mb-2' : 'mb-4'}`}>
                Featured Courses
              </h2>
              <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-gray-600`}>
                {isMobile ? 'Educational content from experts' : 'In-depth educational content from industry-leading experts'}
              </p>
            </div>

            <div className={`grid grid-cols-1 ${isMobile ? 'gap-3' : 'md:grid-cols-2 lg:grid-cols-4 gap-6'}`}>
              {premiumCourses.map((course, index) => (
                <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                  <div className={`${isMobile ? 'aspect-[4/3]' : 'aspect-[4/3]'} overflow-hidden`}>
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <CardHeader className={`${isMobile ? 'pb-2 p-3' : 'pb-3'}`}>
                    <div className={`flex items-center justify-between ${isMobile ? 'mb-1' : 'mb-2'}`}>
                      <Badge variant="outline" className={`${isMobile ? 'text-xs' : 'text-xs'} rounded-none`}>{course.level}</Badge>
                      <span className={`${isMobile ? 'text-xs' : 'text-xs'} text-gray-500`}>{course.duration}</span>
                    </div>
                    <CardTitle className={`${isMobile ? 'text-sm' : 'text-base'} font-semibold leading-tight`}>{course.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className={`pt-0 ${isMobile ? 'px-3' : ''}`}>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600 ${isMobile ? 'mb-2' : 'mb-3'}`}>{course.description}</p>
                    <div className={`flex items-center ${isMobile ? 'text-xs' : 'text-xs'} text-gray-500`}>
                      <Book className={`${isMobile ? 'h-3 w-3' : 'h-3 w-3'} mr-1`} />
                      {course.modules} modules
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className={`${isMobile ? 'py-8' : 'py-16'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`bg-gray-50 ${isMobile ? 'p-4' : 'p-8'}`}>
              <Crown className={`${isMobile ? 'h-8 w-8' : 'h-12 w-12'} text-gray-400 mx-auto ${isMobile ? 'mb-3' : 'mb-6'}`} />
              <h2 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-light text-gray-900 ${isMobile ? 'mb-2' : 'mb-4'}`}>
                Join the Elite Community
              </h2>
              <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-gray-600 ${isMobile ? 'mb-4' : 'mb-8'}`}>
                {isMobile ? 'Expert guidance & community support' : 'Access exclusive content, connect with like-minded individuals, and accelerate your fitness journey with expert guidance.'}
              </p>
              
              <div className={`grid grid-cols-1 ${isMobile ? 'gap-3 mb-4' : 'md:grid-cols-3 gap-6 mb-8'}`}>
                <div className="text-center">
                  <Star className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-gray-400 mx-auto ${isMobile ? 'mb-2' : 'mb-3'}`} />
                  <h4 className={`font-semibold text-gray-900 ${isMobile ? 'mb-1 text-sm' : 'mb-2'}`}>Expert Instruction</h4>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>Learn from certified professionals</p>
                </div>
                <div className="text-center">
                  <Users className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-gray-400 mx-auto ${isMobile ? 'mb-2' : 'mb-3'}`} />
                  <h4 className={`font-semibold text-gray-900 ${isMobile ? 'mb-1 text-sm' : 'mb-2'}`}>Community Support</h4>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>Connect with thousands of members</p>
                </div>
                <div className="text-center">
                  <Award className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'} text-gray-400 mx-auto ${isMobile ? 'mb-2' : 'mb-3'}`} />
                  <h4 className={`font-semibold text-gray-900 ${isMobile ? 'mb-1 text-sm' : 'mb-2'}`}>Proven Results</h4>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>Evidence-based methodologies</p>
                </div>
              </div>
              
              <Button 
                onClick={() => navigate("/education")}
                className={`bg-black text-white hover:bg-gray-800 rounded-none ${isMobile ? 'px-4 py-2 text-sm' : 'px-8 py-3'}`}
              >
                Start Learning Today
                <ArrowRight className={`ml-2 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
