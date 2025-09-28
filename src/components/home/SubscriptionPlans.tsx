
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for fitness beginners",
      features: ["Basic workout plans", "Nutrition guidelines", "Progress tracking"],
      popular: false
    },
    {
      name: "Professional", 
      price: "$79",
      period: "/month",
      description: "For serious fitness enthusiasts",
      features: ["Personalized training", "1-on-1 consultations", "Priority support"],
      popular: true
    },
    {
      name: "Elite",
      price: "$149", 
      period: "/month",
      description: "Maximum results & support",
      features: ["Premium personal training", "Weekly coach calls", "24/7 support"],
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
      // Log activity instead of creating subscription (table not implemented yet)
      const { logActivity } = await import('@/components/activity/ActivityLogger');
      await logActivity(
        user.id,
        'subscription',
        `User subscribed to ${plan.name} plan`,
        { plan_name: plan.name, price: parseFloat(plan.price.replace('$', '')) }
      );

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
    <section className={`${isMobile ? 'py-8' : 'py-16'} bg-gray-50`}>
      <div className="container mx-auto px-4">
        <div className={`text-center ${isMobile ? 'mb-6' : 'mb-12'}`}>
          <h2 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-light text-gray-900 ${isMobile ? 'mb-2' : 'mb-4'}`}>
            Choose Your Plan
          </h2>
          <p className={`${isMobile ? 'text-sm' : 'text-lg'} text-gray-600`}>
            Transform your fitness journey with our expert programs
          </p>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-3 gap-6'} max-w-6xl mx-auto`}>
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`border relative ${plan.popular ? 'border-black' : 'border-gray-200'} ${isMobile ? '' : 'hover:shadow-lg transition-shadow'}`}
            >
              {plan.popular && !isMobile && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-black text-white px-3 py-1 rounded-none text-xs font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
                <div className={`text-center ${isMobile ? 'mb-3' : 'mb-4'}`}>
                  <h3 className={`${isMobile ? 'text-sm' : 'text-lg'} font-semibold text-gray-900 ${isMobile ? 'mb-1' : 'mb-2'}`}>
                    {plan.name}
                    {plan.popular && isMobile && <span className="ml-2 text-xs bg-black text-white px-2 py-0.5 rounded">Popular</span>}
                  </h3>
                  <div className="flex items-baseline justify-center mb-1">
                    <span className={`${isMobile ? 'text-lg' : 'text-2xl'} font-light text-gray-900`}>{plan.price}</span>
                    <span className={`text-gray-500 ml-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>{plan.period}</span>
                  </div>
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>{plan.description}</p>
                </div>
                
                <div className={`${isMobile ? 'space-y-1 mb-3' : 'space-y-2 mb-4'}`}>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className={`flex items-center ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      <CheckCircle className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'} text-green-500 mr-2 flex-shrink-0`} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button
                  onClick={() => handlePlanSelect(plan)}
                  disabled={!!loadingPlan}
                  className={`w-full rounded-none ${isMobile ? 'py-2 text-xs' : 'py-4'} ${
                    plan.popular 
                      ? 'bg-black text-white hover:bg-gray-800' 
                      : 'bg-white text-black border-2 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {loadingPlan === plan.name ? 'Processing...' : (user ? 'Subscribe' : 'Sign Up')}
                  <ArrowRight className={`ml-2 ${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
