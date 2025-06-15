import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Star, Target, Zap, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const CTA = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for fitness beginners",
      features: [
        "Basic workout plans",
        "Nutrition guidelines",
        "Progress tracking",
        "Community access"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$79",
      period: "/month",
      description: "For serious fitness enthusiasts",
      features: [
        "Personalized training",
        "Advanced nutrition plans",
        "1-on-1 consultations",
        "Priority support",
        "Performance analytics"
      ],
      popular: true
    },
    {
      name: "Elite",
      price: "$149",
      period: "/month",
      description: "Maximum results & support",
      features: [
        "Premium personal training",
        "Custom meal planning",
        "Weekly coach calls",
        "24/7 priority support",
        "Supplement recommendations",
        "Body composition analysis"
      ],
      popular: false
    }
  ];

  const handlePlanSelect = async (plan: any) => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setLoadingPlan(plan.name);
    try {
      const price = parseFloat(plan.price.replace('$', ''));
      const { error } = await supabase.from('subscriptions').insert({
        user_id: user.id,
        plan_name: plan.name,
        plan_price: price,
        status: 'active',
      });

      if (error) throw error;

      toast({
        title: "Subscription Successful!",
        description: `You've subscribed to the ${plan.name} plan.`,
      });
      navigate('/profile?tab=subscriptions');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe to plan.",
        variant: "destructive",
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-600 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Accelerate Your Fitness Journey
            </div>
            
            <h2 className="text-3xl md:text-4xl font-light mb-6 text-gray-900 leading-tight">
              Choose Your
              <br />
              <span className="font-semibold">Transformation Plan</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Join thousands who've achieved their fitness goals with our science-backed programs and expert guidance.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`border relative ${plan.popular ? 'border-black shadow-lg scale-105' : 'border-gray-200'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-black text-white px-4 py-1 rounded-none text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-3xl font-light text-gray-900">{plan.price}</span>
                      <span className="text-gray-500 ml-1">{plan.period}</span>
                    </div>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    onClick={() => handlePlanSelect(plan)}
                    disabled={!!loadingPlan}
                    className={`w-full rounded-none py-6 ${
                      plan.popular 
                        ? 'bg-black text-white hover:bg-gray-800' 
                        : 'bg-white text-black border-2 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {loadingPlan === plan.name ? 'Processing...' : (user ? 'Subscribe (mock)' : 'Sign Up to Start')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-black rounded-none mx-auto mb-4 flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Personalized Approach</h4>
              <p className="text-sm text-gray-600">
                Tailored programs designed for your unique goals and lifestyle
              </p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-black rounded-none mx-auto mb-4 flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Expert Guidance</h4>
              <p className="text-sm text-gray-600">
                Learn from certified professionals with proven track records
              </p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-black rounded-none mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Proven Results</h4>
              <p className="text-sm text-gray-600">
                Science-backed methods that deliver measurable outcomes
              </p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-6">
              Ready to transform your life? Join our community today.
            </p>
            <Button
              onClick={() => user ? navigate("/resources") : navigate("/auth")}
              size="lg"
              className="bg-black text-white hover:bg-gray-800 rounded-none px-12 py-6 text-lg"
            >
              {user ? "Explore Plans" : "Start Your Journey"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
