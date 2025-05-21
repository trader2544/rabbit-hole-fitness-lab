
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Nutrition = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Holistic Nutrition</h1>
        <p className="text-lg text-foreground/70 mb-8">
          Evidence-based nutrition principles for optimal health and performance
        </p>

        <Tabs defaultValue="macros">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="macros">Macronutrients</TabsTrigger>
            <TabsTrigger value="timing">Meal Timing</TabsTrigger>
            <TabsTrigger value="approaches">Dietary Approaches</TabsTrigger>
          </TabsList>
          
          <TabsContent value="macros">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-semibold mb-4">Understanding Macronutrients</h2>
                  
                  <p className="mb-4">
                    Macronutrients are the nutrients your body needs in large amounts to function optimally and fuel performance. Each plays distinct and important roles.
                  </p>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Protein</h3>
                  
                  <p className="mb-4">
                    Protein is essential for muscle repair, growth, and numerous cellular functions.
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1"><strong>Functions:</strong> Tissue repair, enzyme and hormone production, immune function, muscle protein synthesis</li>
                    <li className="mb-1"><strong>Recommended Intake:</strong> 1.6-2.2g per kg of bodyweight for active individuals and those engaged in resistance training</li>
                    <li className="mb-1"><strong>Protein Quality:</strong> Consider both quantity and amino acid profile (especially leucine content for muscle protein synthesis)</li>
                    <li className="mb-1"><strong>Timing:</strong> Distribution throughout the day (3-5 meals containing 20-40g) appears more beneficial than the same amount in fewer meals</li>
                  </ul>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mb-4">
                    <h4 className="font-medium mb-2">Quality Protein Sources</h4>
                    <ul className="grid grid-cols-2 gap-2 list-disc pl-6">
                      <li>Lean meats (chicken, turkey)</li>
                      <li>Fish and seafood</li>
                      <li>Eggs</li>
                      <li>Dairy (Greek yogurt, cottage cheese)</li>
                      <li>Legumes (lentils, beans)</li>
                      <li>Tofu and tempeh</li>
                      <li>Quinoa</li>
                      <li>Hemp and chia seeds</li>
                    </ul>
                  </div>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Carbohydrates</h3>
                  
                  <p className="mb-4">
                    Carbohydrates are the body's preferred energy source, especially for high-intensity exercise and brain function.
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1"><strong>Functions:</strong> Primary energy source, spares protein, fuels the central nervous system, enables high-intensity exercise</li>
                    <li className="mb-1"><strong>Recommended Intake:</strong> Highly variable based on activity (3-10g/kg/day); higher for intensive training</li>
                    <li className="mb-1"><strong>Carb Types:</strong> Simple (fast-digesting) vs. complex (slower-digesting with fiber)</li>
                    <li className="mb-1"><strong>Fiber:</strong> 25-35g daily for digestive health, blood sugar regulation, and satiety</li>
                  </ul>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md mb-4">
                    <h4 className="font-medium mb-2">Quality Carbohydrate Sources</h4>
                    <ul className="grid grid-cols-2 gap-2 list-disc pl-6">
                      <li>Whole grains (oats, brown rice)</li>
                      <li>Starchy vegetables (potatoes, sweet potatoes)</li>
                      <li>Fruits (berries, apples, bananas)</li>
                      <li>Legumes (beans, lentils)</li>
                      <li>Whole grain pasta and bread</li>
                      <li>Quinoa and other ancient grains</li>
                    </ul>
                  </div>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Fats</h3>
                  
                  <p className="mb-4">
                    Dietary fats are essential for hormone production, cell membrane integrity, and nutrient absorption.
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1"><strong>Functions:</strong> Hormone production, cell membrane structure, vitamin absorption, energy storage, inflammation regulation</li>
                    <li className="mb-1"><strong>Recommended Intake:</strong> 0.5-1.5g/kg/day (20-35% of daily calories)</li>
                    <li className="mb-1"><strong>Fat Types:</strong> Focus on balance between saturated, monounsaturated, and polyunsaturated fats</li>
                    <li className="mb-1"><strong>Essential Fatty Acids:</strong> Omega-3 and Omega-6 must be obtained through diet</li>
                  </ul>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md mb-4">
                    <h4 className="font-medium mb-2">Quality Fat Sources</h4>
                    <ul className="grid grid-cols-2 gap-2 list-disc pl-6">
                      <li>Olive oil and avocados</li>
                      <li>Nuts and seeds</li>
                      <li>Fatty fish (salmon, mackerel)</li>
                      <li>Eggs (whole)</li>
                      <li>Grass-fed butter/ghee</li>
                      <li>Coconut (oil, milk)</li>
                    </ul>
                  </div>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Balancing Macronutrients for Different Goals</h3>
                  
                  <table className="min-w-full border-collapse border border-gray-300 mb-4">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Goal</th>
                        <th className="border border-gray-300 p-2">Protein</th>
                        <th className="border border-gray-300 p-2">Carbohydrate</th>
                        <th className="border border-gray-300 p-2">Fat</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-2">Fat Loss</td>
                        <td className="border border-gray-300 p-2">High (1.8-2.2g/kg)</td>
                        <td className="border border-gray-300 p-2">Moderate to Low (3-5g/kg)</td>
                        <td className="border border-gray-300 p-2">Moderate (0.5-0.8g/kg)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Muscle Gain</td>
                        <td className="border border-gray-300 p-2">High (1.6-2.2g/kg)</td>
                        <td className="border border-gray-300 p-2">High (5-8g/kg)</td>
                        <td className="border border-gray-300 p-2">Moderate (0.8-1g/kg)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Endurance</td>
                        <td className="border border-gray-300 p-2">Moderate (1.4-1.6g/kg)</td>
                        <td className="border border-gray-300 p-2">Very High (6-10g/kg)</td>
                        <td className="border border-gray-300 p-2">Moderate (0.8-1.2g/kg)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Maintenance</td>
                        <td className="border border-gray-300 p-2">Moderate (1.4-1.8g/kg)</td>
                        <td className="border border-gray-300 p-2">Moderate (4-6g/kg)</td>
                        <td className="border border-gray-300 p-2">Moderate (0.8-1g/kg)</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <p>
                    Remember that these are general guidelines and individual needs may vary based on metabolism, activity level, and specific health conditions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="timing">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-semibold mb-4">Meal Timing and Nutrient Timing</h2>
                  
                  <p className="mb-4">
                    Strategic timing of meals and nutrients can optimize performance, recovery, and metabolic health, though overall intake remains the primary factor.
                  </p>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Pre-Workout Nutrition</h3>
                  
                  <p className="mb-4">
                    Proper pre-workout nutrition provides fuel for your session and can enhance performance.
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1"><strong>Timing:</strong> Ideally 1-3 hours before exercise, adjusted based on individual tolerance and digestion</li>
                    <li className="mb-1"><strong>Composition:</strong> Moderate protein (15-30g) and carbohydrates (30-60g), low fat and fiber</li>
                    <li className="mb-1"><strong>Carbohydrate Type:</strong> Mix of simple and complex carbs for sustained energy</li>
                    <li className="mb-1"><strong>Hydration:</strong> 5-7ml/kg of body weight 2-3 hours before exercise</li>
                  </ul>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mb-4">
                    <h4 className="font-medium mb-2">Sample Pre-Workout Meals</h4>
                    <p className="italic mb-2">2-3 hours before exercise:</p>
                    <ul className="list-disc pl-6 mb-2">
                      <li>Chicken breast, sweet potato, and steamed vegetables</li>
                      <li>Turkey and avocado sandwich on whole grain bread</li>
                      <li>Oatmeal with whey protein, banana, and almond butter</li>
                    </ul>
                    <p className="italic mb-2">30-60 minutes before exercise:</p>
                    <ul className="list-disc pl-6">
                      <li>Greek yogurt with berries</li>
                      <li>Protein smoothie with banana</li>
                      <li>Rice cake with nut butter</li>
                    </ul>
                  </div>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Intra-Workout Nutrition</h3>
                  
                  <p className="mb-4">
                    Nutrition during exercise becomes increasingly important as session duration increases.
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1"><strong>Hydration:</strong> 7-10ml/kg/hour, with electrolytes for sessions {'>'}60 minutes</li>
                    <li className="mb-1"><strong>Carbohydrates:</strong> 30-60g/hour for sessions {'>'}90 minutes (from easily digestible sources)</li>
                    <li className="mb-1"><strong>Protein:</strong> Generally unnecessary except for ultra-endurance events ({'>'}3 hours)</li>
                  </ul>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Post-Workout Nutrition</h3>
                  
                  <p className="mb-4">
                    The post-exercise period presents an opportunity to optimize recovery and adaptation.
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1"><strong>Timing:</strong> The "anabolic window" is wider than once thought (0-2 hours post-exercise)</li>
                    <li className="mb-1"><strong>Protein:</strong> 20-40g high-quality protein to stimulate muscle protein synthesis</li>
                    <li className="mb-1"><strong>Carbohydrates:</strong> 0.8-1.2g/kg body weight for glycogen replenishment (higher priority for endurance athletes)</li>
                    <li className="mb-1"><strong>Leucine Threshold:</strong> 2.5-3g leucine to maximize muscle protein synthesis</li>
                  </ul>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md mb-4">
                    <h4 className="font-medium mb-2">Sample Post-Workout Meals</h4>
                    <ul className="list-disc pl-6">
                      <li>Whey protein shake with banana and honey</li>
                      <li>Salmon, rice, and roasted vegetables</li>
                      <li>Egg white omelet with vegetables and toast</li>
                      <li>Greek yogurt with berries and granola</li>
                    </ul>
                  </div>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Daily Meal Distribution</h3>
                  
                  <p className="mb-4">
                    How you distribute nutrients throughout the day can impact appetite, energy levels, and muscle protein synthesis.
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1"><strong>Protein Distribution:</strong> 3-5 evenly spaced meals containing 20-40g protein maximizes muscle protein synthesis</li>
                    <li className="mb-1"><strong>Carbohydrate Timing:</strong> Higher around workouts, potentially lower at other times for fat loss goals</li>
                    <li className="mb-1"><strong>Meal Frequency:</strong> 3-6 meals per day based on preference and schedule; minimal metabolic difference between frequencies if calories and nutrients match</li>
                  </ul>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Chrononutrition: Timing and Circadian Rhythms</h3>
                  
                  <p className="mb-4">
                    Emerging research suggests aligning meal timing with our circadian rhythm may offer metabolic benefits.
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1"><strong>Time-Restricted Feeding:</strong> Consuming all meals within an 8-12 hour window may improve metabolic health</li>
                    <li className="mb-1"><strong>Early vs. Late Eating:</strong> Some evidence suggests greater metabolic benefits from consuming more calories earlier in the day</li>
                    <li className="mb-1"><strong>Consistency:</strong> Regular meal patterns appear beneficial for metabolic health and appetite regulation</li>
                  </ul>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md mb-4">
                    <h4 className="font-medium mb-2">Key Takeaways on Meal Timing</h4>
                    <ol className="list-decimal pl-6">
                      <li>Total daily intake is more important than precise timing for most goals</li>
                      <li>Protein distribution throughout the day matters for muscle protein synthesis</li>
                      <li>Carbohydrate timing becomes more important for performance in intensive training</li>
                      <li>Individual preferences and schedule should guide meal frequency and timing</li>
                      <li>Consistency in timing may offer metabolic benefits beyond specific meal timing protocols</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="approaches">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-semibold mb-4">Evidence-Based Dietary Approaches</h2>
                  
                  <p className="mb-4">
                    Various dietary approaches can support health and fitness goals when implemented correctly. Here we examine several evidence-based approaches, their mechanisms, benefits, and considerations.
                  </p>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Plant-Based Nutrition</h3>
                  
                  <p className="mb-4">
                    Plant-based diets range from flexible (plant-forward) to strict vegetarian or vegan approaches.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium mb-2">Benefits</h4>
                      <ul className="list-disc pl-6">
                        <li>Higher fiber intake</li>
                        <li>Rich in antioxidants and phytonutrients</li>
                        <li>Lower saturated fat intake</li>
                        <li>Associated with reduced inflammation</li>
                        <li>Potential environmental benefits</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Considerations</h4>
                      <ul className="list-disc pl-6">
                        <li>Need for protein complementation</li>
                        <li>Potential nutrient gaps (B12, iron, zinc, omega-3)</li>
                        <li>Higher food volume may limit calorie intake</li>
                        <li>May require more planning for athletes</li>
                      </ul>
                    </div>
                  </div>
                  
                  <p className="mb-4">
                    <strong>Athletic Considerations:</strong> Plant-based athletes should pay particular attention to protein quality and quantity, iron, zinc, calcium, vitamin B12, and creatine intake or supplementation.
                  </p>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Ketogenic Approach</h3>
                  
                  <p className="mb-4">
                    The ketogenic diet is a very low-carbohydrate, high-fat approach that induces a state of nutritional ketosis.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium mb-2">Benefits</h4>
                      <ul className="list-disc pl-6">
                        <li>Appetite regulation through ketones</li>
                        <li>Stable blood glucose levels</li>
                        <li>Enhanced fat oxidation</li>
                        <li>Potential therapeutic applications</li>
                        <li>May benefit certain endurance activities</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Considerations</h4>
                      <ul className="list-disc pl-6">
                        <li>Initial adaptation period ("keto flu")</li>
                        <li>Reduced glycolytic capacity</li>
                        <li>May impair high-intensity performance</li>
                        <li>Micronutrient considerations</li>
                        <li>Sustainability challenges</li>
                      </ul>
                    </div>
                  </div>
                  
                  <p className="mb-4">
                    <strong>Athletic Considerations:</strong> The ketogenic approach may be less suitable for sports requiring repeated high-intensity efforts but can work for certain endurance activities after adaptation.
                  </p>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Intermittent Fasting</h3>
                  
                  <p className="mb-4">
                    Intermittent fasting involves cycling between periods of eating and fasting, with several common approaches:
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1"><strong>16:8:</strong> 16 hour fast, 8 hour eating window daily</li>
                    <li className="mb-1"><strong>5:2:</strong> 5 days normal eating, 2 non-consecutive days of restricted intake (500-600 calories)</li>
                    <li className="mb-1"><strong>Alternate-Day Fasting:</strong> Alternating between normal eating and very low-calorie days</li>
                    <li className="mb-1"><strong>24-hour Fast:</strong> 1-2 24-hour fasting periods per week</li>
                  </ul>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium mb-2">Benefits</h4>
                      <ul className="list-disc pl-6">
                        <li>Improved insulin sensitivity</li>
                        <li>Enhanced cellular autophagy</li>
                        <li>Simplified meal planning</li>
                        <li>May reduce inflammation markers</li>
                        <li>Potential metabolic benefits</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Considerations</h4>
                      <ul className="list-disc pl-6">
                        <li>Training timing and performance</li>
                        <li>Potential impact on hormone balance</li>
                        <li>May affect appetite regulation</li>
                        <li>Protein distribution challenges</li>
                        <li>Not suitable for everyone</li>
                      </ul>
                    </div>
                  </div>
                  
                  <p className="mb-4">
                    <strong>Athletic Considerations:</strong> Athletes using intermittent fasting should carefully coordinate feeding windows with training sessions and ensure adequate total nutrition within the eating window.
                  </p>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Mediterranean Diet</h3>
                  
                  <p className="mb-4">
                    Based on traditional eating patterns of Mediterranean regions, this approach emphasizes whole foods, healthy fats, and moderate protein intake.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium mb-2">Key Components</h4>
                      <ul className="list-disc pl-6">
                        <li>Abundant plant foods</li>
                        <li>Olive oil as primary fat</li>
                        <li>Moderate fish and seafood</li>
                        <li>Limited red meat</li>
                        <li>Moderate dairy (mostly yogurt, cheese)</li>
                        <li>Moderate wine consumption</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Benefits</h4>
                      <ul className="list-disc pl-6">
                        <li>Strong cardiovascular health evidence</li>
                        <li>Anti-inflammatory properties</li>
                        <li>Rich in micronutrients</li>
                        <li>Balance of all macronutrients</li>
                        <li>Highly sustainable long-term</li>
                        <li>Adaptable to athletic needs</li>
                      </ul>
                    </div>
                  </div>
                  
                  <p className="mb-4">
                    <strong>Athletic Considerations:</strong> The Mediterranean approach can be easily adapted to support athletic performance by adjusting carbohydrate and protein quantities while maintaining the overall food quality principles.
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md mb-4">
                    <h4 className="font-medium mb-2">Key Principles Across Successful Dietary Approaches</h4>
                    <ol className="list-decimal pl-6">
                      <li>Emphasis on whole, minimally processed foods</li>
                      <li>Abundant intake of vegetables and fruits</li>
                      <li>Adequate protein from quality sources</li>
                      <li>Mindful inclusion of healthy fats</li>
                      <li>Hydration as a fundamental component</li>
                      <li>Sustainable for the individual's lifestyle</li>
                      <li>Flexibility to adapt to changing needs and goals</li>
                    </ol>
                  </div>
                  
                  <p>
                    The most effective dietary approach is one that provides adequate nutrition while being sustainable for the individual's preferences, lifestyle, and cultural background. Rather than strictly adhering to a labeled diet, focus on incorporating evidence-based principles that support your specific health and performance goals.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Nutrition;
