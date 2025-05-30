
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Sparkles, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WomensTraining = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/education")} 
            className="mb-6 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Education
          </Button>
          
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-gray-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-light text-gray-900">
                Women's Strength & <span className="font-semibold">Aesthetics</span>
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Build lean muscle, enhance feminine curves, and achieve optimal body composition through specialized training approaches
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="fundamentals" className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8">
                <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
                <TabsTrigger value="programming">Programming</TabsTrigger>
                <TabsTrigger value="aesthetics">Body Composition</TabsTrigger>
                <TabsTrigger value="hormones">Hormonal Considerations</TabsTrigger>
              </TabsList>

              <TabsContent value="fundamentals">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                      <Target className="w-6 h-6 mr-2 text-gray-600" />
                      Training Fundamentals for Women
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-medium mb-3">Strength Training Benefits</h3>
                        <p className="text-gray-600 mb-4">
                          Resistance training provides unique benefits for women beyond just aesthetics.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-pink-50 p-4 rounded">
                            <h4 className="font-semibold text-pink-900 mb-2">Physical Benefits</h4>
                            <ul className="text-pink-700 text-sm space-y-1">
                              <li>• Increased bone density</li>
                              <li>• Enhanced metabolic rate</li>
                              <li>• Improved insulin sensitivity</li>
                              <li>• Better functional strength</li>
                              <li>• Reduced injury risk</li>
                            </ul>
                          </div>
                          <div className="bg-purple-50 p-4 rounded">
                            <h4 className="font-semibold text-purple-900 mb-2">Aesthetic Benefits</h4>
                            <ul className="text-purple-700 text-sm space-y-1">
                              <li>• Lean muscle development</li>
                              <li>• Enhanced curves</li>
                              <li>• Improved posture</li>
                              <li>• Toned appearance</li>
                              <li>• Better body composition</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Myth: "Bulking Up"</h3>
                        <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
                          <p className="text-yellow-800 mb-2">
                            <strong>Reality:</strong> Women have significantly lower testosterone levels than men, making it physiologically difficult to build large amounts of muscle mass.
                          </p>
                          <ul className="text-yellow-700 text-sm space-y-1">
                            <li>• Women produce 15-20x less testosterone than men</li>
                            <li>• Strength training creates lean, toned muscle</li>
                            <li>• Higher rep ranges emphasize muscle endurance and definition</li>
                            <li>• Progressive overload can be achieved through various methods</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Key Movement Patterns</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Lower Body Focus</h4>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Squats (all variations)</li>
                              <li>• Deadlifts and RDLs</li>
                              <li>• Lunges and step-ups</li>
                              <li>• Hip thrusts and bridges</li>
                              <li>• Single-leg movements</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Upper Body Balance</h4>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Push-ups and variations</li>
                              <li>• Pull-ups and assisted variations</li>
                              <li>• Shoulder-friendly pressing</li>
                              <li>• Rowing movements</li>
                              <li>• Core integration</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Rep Ranges & Programming</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-green-50 p-4 rounded">
                            <h4 className="font-semibold text-green-900 mb-2">Strength (4-6 reps)</h4>
                            <p className="text-green-700 text-sm">Build base strength for progression</p>
                          </div>
                          <div className="bg-blue-50 p-4 rounded">
                            <h4 className="font-semibold text-blue-900 mb-2">Hypertrophy (8-12 reps)</h4>
                            <p className="text-blue-700 text-sm">Optimal for lean muscle development</p>
                          </div>
                          <div className="bg-pink-50 p-4 rounded">
                            <h4 className="font-semibold text-pink-900 mb-2">Endurance (12-20 reps)</h4>
                            <p className="text-pink-700 text-sm">Muscle definition and conditioning</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="programming">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-6">Training Programs</h2>
                    
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-medium mb-4">Beginner Program (3 days/week)</h3>
                        <div className="bg-gray-50 p-6 rounded">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Day 1 - Full Body</h4>
                              <ul className="space-y-2 text-gray-600">
                                <li>• Goblet Squats: 3x10-12</li>
                                <li>• Push-ups: 3x8-12</li>
                                <li>• Bent-over Row: 3x10-12</li>
                                <li>• Glute Bridges: 3x12-15</li>
                                <li>• Plank: 3x30-45s</li>
                                <li>• Dead Bug: 2x8/side</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Day 2 - Full Body</h4>
                              <ul className="space-y-2 text-gray-600">
                                <li>• Romanian Deadlift: 3x8-10</li>
                                <li>• Overhead Press: 3x8-10</li>
                                <li>• Assisted Pull-ups: 3x5-8</li>
                                <li>• Lunges: 3x10/leg</li>
                                <li>• Side Plank: 3x20-30s</li>
                                <li>• Glute Clamshells: 2x12/side</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Day 3 - Full Body</h4>
                              <ul className="space-y-2 text-gray-600">
                                <li>• Step-ups: 3x10/leg</li>
                                <li>• Incline Push-ups: 3x8-12</li>
                                <li>• Lat Pulldown: 3x10-12</li>
                                <li>• Single-leg RDL: 2x8/leg</li>
                                <li>• Bicycle Crunches: 3x15/side</li>
                                <li>• Wall Sits: 2x30-45s</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-4">Intermediate Program (4 days/week)</h3>
                        <p className="text-gray-600 mb-4">Upper/Lower split with emphasis on glute and leg development</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-pink-50 p-4 rounded">
                            <h4 className="font-semibold text-pink-900 mb-3">Upper Body Day 1</h4>
                            <ul className="text-pink-700 text-sm space-y-1">
                              <li>• Push-ups/Bench Press: 4x8-10</li>
                              <li>• Pull-ups/Rows: 4x6-10</li>
                              <li>• Overhead Press: 3x8-10</li>
                              <li>• Lat Pulldown: 3x10-12</li>
                              <li>• Tricep Dips: 3x8-12</li>
                              <li>• Bicep Curls: 3x10-12</li>
                              <li>• Face Pulls: 3x12-15</li>
                            </ul>
                          </div>
                          
                          <div className="bg-purple-50 p-4 rounded">
                            <h4 className="font-semibold text-purple-900 mb-3">Lower Body Day 1</h4>
                            <ul className="text-purple-700 text-sm space-y-1">
                              <li>• Squats: 4x8-10</li>
                              <li>• Romanian Deadlifts: 4x8-10</li>
                              <li>• Bulgarian Split Squats: 3x10/leg</li>
                              <li>• Hip Thrusts: 3x12-15</li>
                              <li>• Leg Curls: 3x12-15</li>
                              <li>• Calf Raises: 3x15-20</li>
                              <li>• Plank: 3x45-60s</li>
                            </ul>
                          </div>
                          
                          <div className="bg-blue-50 p-4 rounded">
                            <h4 className="font-semibold text-blue-900 mb-3">Upper Body Day 2</h4>
                            <ul className="text-blue-700 text-sm space-y-1">
                              <li>• Incline DB Press: 4x8-10</li>
                              <li>• Cable Rows: 4x8-10</li>
                              <li>• Lateral Raises: 3x12-15</li>
                              <li>• Cable Flyes: 3x10-12</li>
                              <li>• Hammer Curls: 3x10-12</li>
                              <li>• Overhead Extensions: 3x10-12</li>
                              <li>• Reverse Flyes: 3x12-15</li>
                            </ul>
                          </div>
                          
                          <div className="bg-green-50 p-4 rounded">
                            <h4 className="font-semibold text-green-900 mb-3">Lower Body Day 2</h4>
                            <ul className="text-green-700 text-sm space-y-1">
                              <li>• Sumo Deadlifts: 4x6-8</li>
                              <li>• Goblet Squats: 3x12-15</li>
                              <li>• Step-ups: 3x12/leg</li>
                              <li>• Glute Bridges: 3x15-20</li>
                              <li>• Lateral Lunges: 3x10/leg</li>
                              <li>• Leg Extensions: 3x12-15</li>
                              <li>• Russian Twists: 3x20</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="aesthetics">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                      <Heart className="w-6 h-6 mr-2 text-gray-600" />
                      Body Composition & Aesthetics
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-medium mb-3">Glute Development</h3>
                        <p className="text-gray-600 mb-4">
                          The glutes are often a priority for women's aesthetic goals and functional movement.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-2">Primary Glute Exercises</h4>
                            <ul className="text-gray-600 space-y-2">
                              <li>• <strong>Hip Thrusts:</strong> Maximum glute activation</li>
                              <li>• <strong>Squats:</strong> Overall glute and quad development</li>
                              <li>• <strong>Romanian Deadlifts:</strong> Glute-ham tie-in</li>
                              <li>• <strong>Bulgarian Split Squats:</strong> Unilateral strength</li>
                              <li>• <strong>Lateral Lunges:</strong> Glute medius activation</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Progressive Overload for Glutes</h4>
                            <ul className="text-gray-600 space-y-2">
                              <li>• Start with bodyweight variations</li>
                              <li>• Add resistance bands</li>
                              <li>• Progress to weighted movements</li>
                              <li>• Focus on mind-muscle connection</li>
                              <li>• Vary rep ranges (8-20 reps)</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Core & Waist Definition</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-pink-50 p-4 rounded">
                            <h4 className="font-semibold text-pink-900 mb-2">Stability Focus</h4>
                            <ul className="text-pink-700 text-sm space-y-1">
                              <li>• Planks and variations</li>
                              <li>• Dead bugs</li>
                              <li>• Bird dogs</li>
                              <li>• Pallof press</li>
                            </ul>
                          </div>
                          <div className="bg-purple-50 p-4 rounded">
                            <h4 className="font-semibold text-purple-900 mb-2">Strength Focus</h4>
                            <ul className="text-purple-700 text-sm space-y-1">
                              <li>• Weighted planks</li>
                              <li>• Hanging knee raises</li>
                              <li>• Ab wheel rollouts</li>
                              <li>• Cable crunches</li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-4 rounded">
                            <h4 className="font-semibold text-blue-900 mb-2">Definition Focus</h4>
                            <ul className="text-blue-700 text-sm space-y-1">
                              <li>• Bicycle crunches</li>
                              <li>• Russian twists</li>
                              <li>• Mountain climbers</li>
                              <li>• High-rep circuits</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Upper Body Proportion</h3>
                        <p className="text-gray-600 mb-4">
                          Balanced upper body development complements lower body strength and creates overall aesthetic appeal.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-semibold mb-2">Shoulder Definition</h4>
                            <ul className="text-gray-600 text-sm space-y-1">
                              <li>• Lateral raises for width</li>
                              <li>• Rear delt flyes for posture</li>
                              <li>• Pike push-ups for strength</li>
                              <li>• Face pulls for stability</li>
                            </ul>
                          </div>
                          <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-semibold mb-2">Back Development</h4>
                            <ul className="text-gray-600 text-sm space-y-1">
                              <li>• Pull-ups for strength</li>
                              <li>• Rows for thickness</li>
                              <li>• Lat pulldowns for width</li>
                              <li>• Reverse flyes for balance</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Body Fat Guidelines</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="bg-green-50 p-4 rounded">
                            <h4 className="font-semibold text-green-900 mb-2">Athletic</h4>
                            <p className="text-green-700 text-sm">16-20% - Visible abs, muscle definition</p>
                          </div>
                          <div className="bg-blue-50 p-4 rounded">
                            <h4 className="font-semibold text-blue-900 mb-2">Fit</h4>
                            <p className="text-blue-700 text-sm">21-24% - Lean, healthy appearance</p>
                          </div>
                          <div className="bg-purple-50 p-4 rounded">
                            <h4 className="font-semibold text-purple-900 mb-2">Average</h4>
                            <p className="text-purple-700 text-sm">25-31% - Healthy range</p>
                          </div>
                          <div className="bg-pink-50 p-4 rounded">
                            <h4 className="font-semibold text-pink-900 mb-2">Essential</h4>
                            <p className="text-pink-700 text-sm">10-13% - Minimum for health</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="hormones">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-6">Hormonal Considerations</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-medium mb-3">Menstrual Cycle Training</h3>
                        <p className="text-gray-600 mb-4">
                          Understanding how hormonal fluctuations affect training can optimize performance and recovery.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-red-50 p-4 rounded">
                            <h4 className="font-semibold text-red-900 mb-2">Follicular Phase (Days 1-14)</h4>
                            <p className="text-red-700 text-sm mb-2">Higher estrogen, improved recovery</p>
                            <ul className="text-red-700 text-sm space-y-1">
                              <li>• Higher intensity training</li>
                              <li>• Strength and power focus</li>
                              <li>• Better pain tolerance</li>
                              <li>• Increased motivation</li>
                            </ul>
                          </div>
                          <div className="bg-orange-50 p-4 rounded">
                            <h4 className="font-semibold text-orange-900 mb-2">Luteal Phase (Days 15-28)</h4>
                            <p className="text-orange-700 text-sm mb-2">Higher progesterone, slower recovery</p>
                            <ul className="text-orange-700 text-sm space-y-1">
                              <li>• Moderate intensity training</li>
                              <li>• Endurance and flexibility focus</li>
                              <li>• Longer warm-ups needed</li>
                              <li>• Extra rest may be beneficial</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Hormonal Benefits of Strength Training</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Metabolic Hormones</h4>
                            <ul className="text-gray-600 space-y-2">
                              <li>• <strong>Growth Hormone:</strong> Increased during resistance training</li>
                              <li>• <strong>Insulin Sensitivity:</strong> Improved glucose handling</li>
                              <li>• <strong>Thyroid Function:</strong> Enhanced metabolic rate</li>
                              <li>• <strong>Cortisol Regulation:</strong> Better stress response</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Reproductive Health</h4>
                            <ul className="text-gray-600 space-y-2">
                              <li>• Improved menstrual regularity</li>
                              <li>• Reduced PMS symptoms</li>
                              <li>• Better bone density</li>
                              <li>• Enhanced mood stability</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Special Considerations</h3>
                        <div className="space-y-4">
                          <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
                            <h4 className="font-semibold text-yellow-900 mb-2">Pregnancy & Postpartum</h4>
                            <p className="text-yellow-800 text-sm">
                              Exercise during and after pregnancy requires modifications. Always consult healthcare providers for personalized guidance.
                            </p>
                          </div>
                          
                          <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-400">
                            <h4 className="font-semibold text-blue-900 mb-2">Menopause</h4>
                            <p className="text-blue-800 text-sm">
                              Strength training becomes even more important for bone health, metabolic function, and quality of life during menopause.
                            </p>
                          </div>
                          
                          <div className="bg-purple-50 p-4 rounded border-l-4 border-purple-400">
                            <h4 className="font-semibold text-purple-900 mb-2">PCOS</h4>
                            <p className="text-purple-800 text-sm">
                              Resistance training can improve insulin sensitivity and hormonal balance in women with PCOS.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Recovery Optimization</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-green-50 p-4 rounded">
                            <h4 className="font-semibold text-green-900 mb-2">Sleep</h4>
                            <p className="text-green-700 text-sm">7-9 hours for hormonal balance and recovery</p>
                          </div>
                          <div className="bg-blue-50 p-4 rounded">
                            <h4 className="font-semibold text-blue-900 mb-2">Stress Management</h4>
                            <p className="text-blue-700 text-sm">Meditation, yoga, or relaxation techniques</p>
                          </div>
                          <div className="bg-pink-50 p-4 rounded">
                            <h4 className="font-semibold text-pink-900 mb-2">Nutrition</h4>
                            <p className="text-pink-700 text-sm">Adequate calories and micronutrients</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WomensTraining;
