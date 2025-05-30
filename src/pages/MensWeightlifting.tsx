
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Dumbbell, Target, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MensWeightlifting = () => {
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
              <Dumbbell className="w-8 h-8 text-gray-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-light text-gray-900">
                Men's Weightlifting & <span className="font-semibold">Aesthetics</span>
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Build muscle mass, strength, and achieve the classic masculine physique through science-based training principles
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
                <TabsTrigger value="aesthetics">Aesthetics</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="fundamentals">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                      <Target className="w-6 h-6 mr-2 text-gray-600" />
                      Training Fundamentals
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-medium mb-3">Progressive Overload</h3>
                        <p className="text-gray-600 mb-4">
                          The cornerstone of muscle growth. Gradually increase weight, reps, or volume over time to continually challenge your muscles.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                          <li>Increase weight by 2.5-5lbs when you can complete all sets with perfect form</li>
                          <li>Add reps before adding weight (8-12 rep range for hypertrophy)</li>
                          <li>Track all workouts to ensure consistent progression</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Compound Movements Priority</h3>
                        <p className="text-gray-600 mb-4">
                          Focus on multi-joint exercises that work multiple muscle groups simultaneously for maximum efficiency.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-semibold mb-2">Primary Movements</h4>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Squats (Quads, Glutes, Core)</li>
                              <li>• Deadlifts (Posterior Chain)</li>
                              <li>• Bench Press (Chest, Shoulders, Triceps)</li>
                              <li>• Pull-ups/Rows (Back, Biceps)</li>
                            </ul>
                          </div>
                          <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-semibold mb-2">Secondary Movements</h4>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Overhead Press</li>
                              <li>• Dips</li>
                              <li>• Bulgarian Split Squats</li>
                              <li>• Face Pulls</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Rep Ranges & Intensity</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-blue-50 p-4 rounded">
                            <h4 className="font-semibold text-blue-900 mb-2">Strength (1-5 reps)</h4>
                            <p className="text-blue-700 text-sm">85-95% 1RM, 3-5 minute rest periods</p>
                          </div>
                          <div className="bg-green-50 p-4 rounded">
                            <h4 className="font-semibold text-green-900 mb-2">Hypertrophy (6-12 reps)</h4>
                            <p className="text-green-700 text-sm">70-85% 1RM, 2-3 minute rest periods</p>
                          </div>
                          <div className="bg-orange-50 p-4 rounded">
                            <h4 className="font-semibold text-orange-900 mb-2">Endurance (13+ reps)</h4>
                            <p className="text-orange-700 text-sm">50-70% 1RM, 1-2 minute rest periods</p>
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
                        <h3 className="text-xl font-medium mb-4">Beginner Program (3-4 days/week)</h3>
                        <div className="bg-gray-50 p-6 rounded">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3">Day A - Upper Body</h4>
                              <ul className="space-y-2 text-gray-600">
                                <li>• Bench Press: 3x8-10</li>
                                <li>• Bent-over Row: 3x8-10</li>
                                <li>• Overhead Press: 3x8-10</li>
                                <li>• Pull-ups/Lat Pulldown: 3x8-10</li>
                                <li>• Dips: 2x8-12</li>
                                <li>• Barbell Curls: 2x8-12</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Day B - Lower Body</h4>
                              <ul className="space-y-2 text-gray-600">
                                <li>• Squats: 3x8-10</li>
                                <li>• Romanian Deadlifts: 3x8-10</li>
                                <li>• Bulgarian Split Squats: 2x10-12</li>
                                <li>• Leg Curls: 3x10-12</li>
                                <li>• Calf Raises: 3x12-15</li>
                                <li>• Planks: 3x30-60s</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-4">Intermediate Program (4-5 days/week)</h3>
                        <p className="text-gray-600 mb-4">
                          Push/Pull/Legs split allowing for higher volume and frequency per muscle group.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-red-50 p-4 rounded">
                            <h4 className="font-semibold text-red-900 mb-2">Push Day</h4>
                            <ul className="text-red-700 text-sm space-y-1">
                              <li>• Bench Press: 4x6-8</li>
                              <li>• Overhead Press: 3x8-10</li>
                              <li>• Incline DB Press: 3x10-12</li>
                              <li>• Dips: 3x10-12</li>
                              <li>• Close-grip Bench: 3x8-10</li>
                              <li>• Lateral Raises: 3x12-15</li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-4 rounded">
                            <h4 className="font-semibold text-blue-900 mb-2">Pull Day</h4>
                            <ul className="text-blue-700 text-sm space-y-1">
                              <li>• Deadlifts: 4x5-6</li>
                              <li>• Pull-ups: 4x6-10</li>
                              <li>• Barbell Rows: 3x8-10</li>
                              <li>• Cable Rows: 3x10-12</li>
                              <li>• Barbell Curls: 3x8-10</li>
                              <li>• Face Pulls: 3x12-15</li>
                            </ul>
                          </div>
                          <div className="bg-green-50 p-4 rounded">
                            <h4 className="font-semibold text-green-900 mb-2">Legs Day</h4>
                            <ul className="text-green-700 text-sm space-y-1">
                              <li>• Squats: 4x6-8</li>
                              <li>• Romanian Deadlifts: 3x8-10</li>
                              <li>• Leg Press: 3x12-15</li>
                              <li>• Leg Curls: 3x10-12</li>
                              <li>• Walking Lunges: 3x12/leg</li>
                              <li>• Calf Raises: 4x12-15</li>
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
                      <TrendingUp className="w-6 h-6 mr-2 text-gray-600" />
                      Building the Classic Physique
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-medium mb-3">The V-Taper Foundation</h3>
                        <p className="text-gray-600 mb-4">
                          The classic masculine physique emphasizes broad shoulders, wide lats, and a narrow waist.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-2">Shoulder Development</h4>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Overhead Press variations</li>
                              <li>• Lateral raises (all angles)</li>
                              <li>• Rear delt flyes</li>
                              <li>• Upright rows</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Lat Width</h4>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Wide-grip pull-ups</li>
                              <li>• Wide-grip lat pulldowns</li>
                              <li>• Cable pullovers</li>
                              <li>• T-bar rows</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Chest Development</h3>
                        <p className="text-gray-600 mb-4">
                          Build a full, round chest that complements the shoulder development.
                        </p>
                        <div className="bg-gray-50 p-4 rounded">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Upper Chest</h4>
                              <ul className="text-gray-600 text-sm space-y-1">
                                <li>• Incline Bench Press</li>
                                <li>• Incline DB Press</li>
                                <li>• Incline Flyes</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Middle Chest</h4>
                              <ul className="text-gray-600 text-sm space-y-1">
                                <li>• Flat Bench Press</li>
                                <li>• Flat DB Press</li>
                                <li>• Push-ups</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Lower Chest</h4>
                              <ul className="text-gray-600 text-sm space-y-1">
                                <li>• Decline Bench Press</li>
                                <li>• Dips</li>
                                <li>• Cable Crossovers</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Arm Development</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-2">Biceps (Peak & Width)</h4>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Barbell curls (mass)</li>
                              <li>• Hammer curls (thickness)</li>
                              <li>• Concentration curls (peak)</li>
                              <li>• Cable curls (constant tension)</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Triceps (Horseshoe Shape)</h4>
                            <ul className="text-gray-600 space-y-1">
                              <li>• Close-grip bench press</li>
                              <li>• Overhead extensions</li>
                              <li>• Dips</li>
                              <li>• Cable pushdowns</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Body Fat Guidelines</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-blue-50 p-4 rounded">
                            <h4 className="font-semibold text-blue-900 mb-2">Bulk Phase</h4>
                            <p className="text-blue-700 text-sm">12-15% body fat for optimal muscle gain</p>
                          </div>
                          <div className="bg-green-50 p-4 rounded">
                            <h4 className="font-semibold text-green-900 mb-2">Maintenance</h4>
                            <p className="text-green-700 text-sm">10-12% body fat for year-round aesthetics</p>
                          </div>
                          <div className="bg-orange-50 p-4 rounded">
                            <h4 className="font-semibold text-orange-900 mb-2">Cut Phase</h4>
                            <p className="text-orange-700 text-sm">8-10% body fat for peak definition</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-6">Advanced Techniques</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-medium mb-3">Periodization</h3>
                        <p className="text-gray-600 mb-4">
                          Systematically vary training variables to prevent plateaus and maximize long-term progress.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-semibold mb-2">Linear Periodization</h4>
                            <p className="text-gray-600 text-sm mb-2">Progress from high volume/low intensity to low volume/high intensity</p>
                            <ul className="text-gray-600 text-sm space-y-1">
                              <li>• Weeks 1-4: 12-15 reps</li>
                              <li>• Weeks 5-8: 8-10 reps</li>
                              <li>• Weeks 9-12: 4-6 reps</li>
                            </ul>
                          </div>
                          <div className="bg-gray-50 p-4 rounded">
                            <h4 className="font-semibold mb-2">Block Periodization</h4>
                            <p className="text-gray-600 text-sm mb-2">Focus on one quality at a time</p>
                            <ul className="text-gray-600 text-sm space-y-1">
                              <li>• Block 1: Hypertrophy focus</li>
                              <li>• Block 2: Strength focus</li>
                              <li>• Block 3: Power/peaking</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Intensity Techniques</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Drop Sets</h4>
                            <p className="text-gray-600 text-sm">Perform a set to failure, reduce weight by 20-30%, continue</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Rest-Pause</h4>
                            <p className="text-gray-600 text-sm">Set to failure, rest 10-15 seconds, continue for more reps</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Cluster Sets</h4>
                            <p className="text-gray-600 text-sm">Break one set into mini-sets with short rests</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Supersets</h4>
                            <p className="text-gray-600 text-sm">Two exercises back-to-back with no rest</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Recovery Optimization</h3>
                        <div className="space-y-4">
                          <div className="bg-blue-50 p-4 rounded">
                            <h4 className="font-semibold text-blue-900 mb-2">Sleep</h4>
                            <p className="text-blue-700 text-sm">7-9 hours per night for optimal recovery and growth hormone release</p>
                          </div>
                          <div className="bg-green-50 p-4 rounded">
                            <h4 className="font-semibold text-green-900 mb-2">Nutrition Timing</h4>
                            <p className="text-green-700 text-sm">Protein within 2 hours post-workout, adequate carbs for glycogen replenishment</p>
                          </div>
                          <div className="bg-orange-50 p-4 rounded">
                            <h4 className="font-semibold text-orange-900 mb-2">Stress Management</h4>
                            <p className="text-orange-700 text-sm">Chronic stress elevates cortisol, impairing recovery and muscle growth</p>
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

export default MensWeightlifting;
