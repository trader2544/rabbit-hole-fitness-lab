
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Book, Dumbbell, Heart } from "lucide-react";

const freeResources = [
  {
    title: "The Biology of Muscle Growth and Calisthenics",
    description: "Learn how muscles adapt to calisthenics training at the cellular level",
    icon: Heart,
    cta: "Download PDF",
  },
  {
    title: "Nutrition for Performance and Recovery",
    description: "Evidence-based nutrition strategies to fuel your workouts and maximize recovery",
    icon: Book,
    cta: "Download PDF",
  },
  {
    title: "Beginner's Guide to Calisthenics",
    description: "Start your bodyweight training journey with proper progressions and form",
    icon: Dumbbell,
    cta: "Download PDF",
  },
  {
    title: "Understanding BMI and Caloric Needs",
    description: "Learn how to interpret your BMI and calculate your nutritional requirements",
    icon: Book,
    cta: "Download PDF",
  },
];

const premiumCourses = [
  {
    title: "Advanced Exercise Physiology: From Cells to Systems",
    description: "Deep dive into the science of how your body adapts to exercise. 12 modules with video lectures and quizzes.",
    price: "$89",
    features: ["12 Video Modules", "Interactive Quizzes", "Downloadable Resources", "Forum Access"],
  },
  {
    title: "Mastering Calisthenics: Strength and Skill Progressions",
    description: "Progress from basics to advanced calisthenics movements with detailed progressions and technique analysis.",
    price: "$79",
    features: ["10 Video Modules", "Exercise Libraries", "Progress Tracking Tools", "Expert Feedback"],
  },
  {
    title: "Sport-Specific Program Design",
    description: "Learn how to design training programs for specific sports performance enhancement.",
    price: "$99",
    features: ["15 Video Modules", "Sport-Specific Routines", "Case Studies", "Programming Templates"],
  },
];

const Resources = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Free Resources</h1>
        <p className="text-lg text-foreground/70 mb-8">
          Access our collection of free guides and educational materials to start your fitness journey
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {freeResources.map((resource, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <resource.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button variant="outline">
                  {resource.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      
      <section id="premium">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Premium Courses</h2>
        <p className="text-lg text-foreground/70 mb-8">
          In-depth educational courses for those who want to master the science and practice of fitness
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {premiumCourses.map((course, index) => (
            <Card key={index} className="overflow-hidden border-border shadow-md flex flex-col">
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-2xl font-bold text-primary mb-4">{course.price}</div>
                <ul className="space-y-2">
                  {course.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Enroll Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Resources;
