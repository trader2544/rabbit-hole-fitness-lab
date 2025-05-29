
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Zap, Users, BookOpen, Video, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PremiumFeatures = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Crown,
      title: "Premium Membership",
      description: "Unlock exclusive content, advanced tools, and priority support",
      price: "$19.99/month",
      benefits: ["All premium courses", "1-on-1 monthly consultation", "Custom meal plans", "Priority support"],
      color: "from-yellow-400 to-yellow-600"
    },
    {
      icon: Video,
      title: "Master Classes",
      description: "Deep-dive video courses with expert trainers and nutritionists",
      price: "$49.99/course",
      benefits: ["6+ hours of content", "Downloadable resources", "Certificate of completion", "Lifetime access"],
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: Users,
      title: "Group Coaching",
      description: "Join exclusive group sessions with like-minded fitness enthusiasts",
      price: "$89.99/month",
      benefits: ["Weekly group calls", "Private community access", "Shared challenges", "Peer support"],
      color: "from-green-400 to-green-600"
    }
  ];

  return (
    <section className="py-16 bg-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 opacity-0 animate-fade-in">
            Accelerate Your Fitness Journey
          </h2>
          <p className="text-lg text-foreground/80 opacity-0 animate-fade-in animate-delay-100">
            Take your fitness to the next level with our premium offerings designed for serious fitness enthusiasts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className={`relative overflow-hidden opacity-0 animate-fade-in animate-delay-${(index + 2) * 100}`}>
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color}`} />
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.color}`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
                <p className="text-foreground/70">{feature.description}</p>
                <div className="text-2xl font-bold text-primary">{feature.price}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Zap className="h-4 w-4 text-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Nutrition Coaching</CardTitle>
                  <p className="text-sm text-foreground/70">Personalized meal planning and guidance</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">$79.99</p>
                  <p className="text-sm text-foreground/70">per month</p>
                </div>
                <Button variant="outline">Learn More</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-secondary/10 to-secondary/5 border-secondary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <MessageCircle className="h-8 w-8 text-secondary-foreground" />
                <div>
                  <CardTitle>24/7 AI Coach</CardTitle>
                  <p className="text-sm text-foreground/70">Advanced AI-powered fitness guidance</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">$29.99</p>
                  <p className="text-sm text-foreground/70">per month</p>
                </div>
                <Button>Try Free</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PremiumFeatures;
