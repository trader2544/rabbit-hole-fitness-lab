
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, Shield, Brain, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SteroidEducation = () => {
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
              <AlertTriangle className="w-8 h-8 text-orange-600 mr-3" />
              <h1 className="text-4xl md:text-5xl font-light text-gray-900">
                Steroid Education & <span className="font-semibold">Awareness</span>
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Evidence-based information about anabolic steroids, their effects, risks, and safety considerations for informed decision-making
            </p>
            
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mt-6 text-left">
              <p className="text-orange-800 text-sm">
                <strong>Disclaimer:</strong> This information is for educational purposes only. We do not encourage or promote the use of anabolic steroids. 
                Always consult with qualified medical professionals before making any health-related decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="biology" className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8">
                <TabsTrigger value="biology">Biology & Mechanisms</TabsTrigger>
                <TabsTrigger value="risks">Risks & Side Effects</TabsTrigger>
                <TabsTrigger value="safety">Harm Reduction</TabsTrigger>
                <TabsTrigger value="alternatives">Natural Alternatives</TabsTrigger>
              </TabsList>

              <TabsContent value="biology">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                      <Brain className="w-6 h-6 mr-2 text-gray-600" />
                      How Anabolic Steroids Work
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-medium mb-3">Basic Mechanisms</h3>
                        <p className="text-gray-600 mb-4">
                          Anabolic-androgenic steroids (AAS) are synthetic derivatives of testosterone that affect the body through multiple pathways.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-blue-50 p-4 rounded">
                            <h4 className="font-semibold text-blue-900 mb-2">Anabolic Effects</h4>
                            <ul className="text-blue-700 text-sm space-y-1">
                              <li>• Increased protein synthesis</li>
                              <li>• Enhanced nitrogen retention</li>
                              <li>• Muscle fiber hypertrophy</li>
                              <li>• Improved recovery rates</li>
                              <li>• Increased red blood cell production</li>
                            </ul>
                          </div>
                          <div className="bg-red-50 p-4 rounded">
                            <h4 className="font-semibold text-red-900 mb-2">Androgenic Effects</h4>
                            <ul className="text-red-700 text-sm space-y-1">
                              <li>• Deepening of voice</li>
                              <li>• Increased body hair growth</li>
                              <li>• Acne development</li>
                              <li>• Male pattern baldness</li>
                              <li>• Aggressive behavior changes</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Cellular Mechanisms</h3>
                        <div className="bg-gray-50 p-6 rounded">
                          <p className="text-gray-600 mb-4">
                            Steroids work by binding to androgen receptors in muscle cells, initiating a cascade of events:
                          </p>
                          <ol className="list-decimal pl-6 space-y-2 text-gray-600">
                            <li>Steroid molecules cross cell membranes</li>
                            <li>Bind to androgen receptors in the cytoplasm</li>
                            <li>Steroid-receptor complex moves to the nucleus</li>
                            <li>Binds to DNA and increases gene transcription</li>
                            <li>Enhanced production of proteins involved in muscle growth</li>
                            <li>Increased muscle fiber size and strength</li>
                          </ol>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Types of Anabolic Steroids</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Oral Steroids</h4>
                            <ul className="text-gray-600 space-y-1 text-sm">
                              <li>• Faster acting but shorter half-life</li>
                              <li>• More hepatotoxic (liver toxic)</li>
                              <li>• Examples: Dianabol, Anavar, Winstrol</li>
                              <li>• Typically used for 4-8 week cycles</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Injectable Steroids</h4>
                            <ul className="text-gray-600 space-y-1 text-sm">
                              <li>• Longer acting, more stable blood levels</li>
                              <li>• Less liver stress but injection risks</li>
                              <li>• Examples: Testosterone, Deca, Trenbolone</li>
                              <li>• Cycles typically 8-16 weeks</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Performance Effects</h3>
                        <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
                          <p className="text-yellow-800 mb-2">
                            <strong>Documented Performance Improvements:</strong>
                          </p>
                          <ul className="text-yellow-700 text-sm space-y-1">
                            <li>• 5-20% increase in muscle mass over 10-12 weeks</li>
                            <li>• 5-20% increase in strength</li>
                            <li>• Faster recovery between workouts</li>
                            <li>• Improved training capacity and volume tolerance</li>
                            <li>• Enhanced fat oxidation in some cases</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="risks">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                      <Heart className="w-6 h-6 mr-2 text-red-600" />
                      Health Risks & Side Effects
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="bg-red-50 border border-red-200 p-4 rounded">
                        <p className="text-red-800 font-semibold mb-2">
                          Warning: Anabolic steroid use carries significant health risks, some of which may be irreversible.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Cardiovascular Risks</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-red-50 p-4 rounded">
                            <h4 className="font-semibold text-red-900 mb-2">Immediate Effects</h4>
                            <ul className="text-red-700 text-sm space-y-1">
                              <li>• Increased blood pressure</li>
                              <li>• Elevated heart rate</li>
                              <li>• Changes in cholesterol levels</li>
                              <li>• Increased risk of blood clots</li>
                            </ul>
                          </div>
                          <div className="bg-red-50 p-4 rounded">
                            <h4 className="font-semibold text-red-900 mb-2">Long-term Risks</h4>
                            <ul className="text-red-700 text-sm space-y-1">
                              <li>• Heart disease</li>
                              <li>• Stroke</li>
                              <li>• Cardiomyopathy</li>
                              <li>• Atherosclerosis</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Hormonal Disruption</h3>
                        <div className="space-y-4">
                          <div className="bg-orange-50 p-4 rounded">
                            <h4 className="font-semibold text-orange-900 mb-2">Male-Specific Effects</h4>
                            <ul className="text-orange-700 text-sm space-y-1">
                              <li>• Testicular atrophy and infertility</li>
                              <li>• Gynecomastia (breast tissue development)</li>
                              <li>• Prostate enlargement</li>
                              <li>• Erectile dysfunction post-cycle</li>
                              <li>• Baldness acceleration</li>
                            </ul>
                          </div>
                          <div className="bg-pink-50 p-4 rounded">
                            <h4 className="font-semibold text-pink-900 mb-2">Female-Specific Effects</h4>
                            <ul className="text-pink-700 text-sm space-y-1">
                              <li>• Menstrual irregularities</li>
                              <li>• Voice deepening (often irreversible)</li>
                              <li>• Clitoral enlargement</li>
                              <li>• Increased body hair</li>
                              <li>• Breast size reduction</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Liver and Organ Damage</h3>
                        <div className="bg-yellow-50 p-4 rounded">
                          <h4 className="font-semibold text-yellow-900 mb-2">Hepatotoxicity</h4>
                          <p className="text-yellow-700 text-sm mb-2">
                            Particularly with oral steroids, liver damage can occur:
                          </p>
                          <ul className="text-yellow-700 text-sm space-y-1">
                            <li>• Elevated liver enzymes</li>
                            <li>• Liver tumors (benign and malignant)</li>
                            <li>• Cholestasis</li>
                            <li>• Potential liver failure in extreme cases</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Psychological Effects</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-purple-50 p-4 rounded">
                            <h4 className="font-semibold text-purple-900 mb-2">During Use</h4>
                            <ul className="text-purple-700 text-sm space-y-1">
                              <li>• Increased aggression ("roid rage")</li>
                              <li>• Mood swings</li>
                              <li>• Euphoria and confidence</li>
                              <li>• Sleep disturbances</li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-4 rounded">
                            <h4 className="font-semibold text-blue-900 mb-2">Post-Cycle</h4>
                            <ul className="text-blue-700 text-sm space-y-1">
                              <li>• Depression</li>
                              <li>• Anxiety</li>
                              <li>• Loss of motivation</li>
                              <li>• Body dysmorphia</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Other Health Concerns</h3>
                        <div className="space-y-2">
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-gray-700 text-sm">
                              <strong>Injection Risks:</strong> Infections, nerve damage, scar tissue formation
                            </p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-gray-700 text-sm">
                              <strong>Immune System:</strong> Suppressed immune function
                            </p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-gray-700 text-sm">
                              <strong>Bone Health:</strong> Premature growth plate closure in adolescents
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="safety">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                      <Shield className="w-6 h-6 mr-2 text-gray-600" />
                      Harm Reduction Information
                    </h2>
                    
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-6">
                      <p className="text-blue-800 text-sm">
                        <strong>Important:</strong> This information is provided for harm reduction purposes only. 
                        The safest approach is to avoid anabolic steroid use entirely. Always consult medical professionals.
                      </p>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-medium mb-3">Medical Supervision</h3>
                        <div className="bg-green-50 p-4 rounded">
                          <h4 className="font-semibold text-green-900 mb-2">Essential Monitoring</h4>
                          <ul className="text-green-700 text-sm space-y-1">
                            <li>• Regular blood work (lipids, liver enzymes, hormones)</li>
                            <li>• Blood pressure monitoring</li>
                            <li>• Cardiovascular health assessments</li>
                            <li>• Prostate health checks (males)</li>
                            <li>• Bone density scans</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Safer Use Practices</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Dosage Considerations</h4>
                            <ul className="text-gray-600 text-sm space-y-1">
                              <li>• Start with lowest effective doses</li>
                              <li>• Avoid "megadoses"</li>
                              <li>• Limit cycle lengths</li>
                              <li>• Include rest periods between cycles</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Injection Safety</h4>
                            <ul className="text-gray-600 text-sm space-y-1">
                              <li>• Use sterile needles and syringes</li>
                              <li>• Rotate injection sites</li>
                              <li>• Proper injection technique</li>
                              <li>• Never share equipment</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Post-Cycle Therapy (PCT)</h3>
                        <p className="text-gray-600 mb-4">
                          PCT aims to restore natural hormone production after a steroid cycle.
                        </p>
                        <div className="bg-yellow-50 p-4 rounded">
                          <h4 className="font-semibold text-yellow-900 mb-2">Common PCT Protocols</h4>
                          <ul className="text-yellow-700 text-sm space-y-1">
                            <li>• Selective Estrogen Receptor Modulators (SERMs)</li>
                            <li>• Human Chorionic Gonadotropin (hCG)</li>
                            <li>• Aromatase Inhibitors (when appropriate)</li>
                            <li>• Natural testosterone boosters</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Warning Signs</h3>
                        <div className="bg-red-50 p-4 rounded border-l-4 border-red-400">
                          <h4 className="font-semibold text-red-900 mb-2">Seek Immediate Medical Attention If:</h4>
                          <ul className="text-red-700 text-sm space-y-1">
                            <li>• Chest pain or shortness of breath</li>
                            <li>• Severe mood changes or depression</li>
                            <li>• Yellowing of skin or eyes (jaundice)</li>
                            <li>• Persistent nausea or vomiting</li>
                            <li>• Severe acne or skin changes</li>
                            <li>• Any unusual symptoms</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Support Resources</h3>
                        <div className="space-y-2">
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-gray-700 text-sm">
                              <strong>Medical Support:</strong> Endocrinologists, sports medicine doctors
                            </p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-gray-700 text-sm">
                              <strong>Mental Health:</strong> Counselors experienced with performance-enhancing drugs
                            </p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-gray-700 text-sm">
                              <strong>Addiction Support:</strong> Specialized programs for steroid dependency
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="alternatives">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-6">Natural Alternatives & Optimization</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-medium mb-3">Maximizing Natural Potential</h3>
                        <p className="text-gray-600 mb-4">
                          Most people can achieve impressive results through optimized natural training and lifestyle factors.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-green-50 p-4 rounded">
                            <h4 className="font-semibold text-green-900 mb-2">Training Optimization</h4>
                            <ul className="text-green-700 text-sm space-y-1">
                              <li>• Progressive overload principles</li>
                              <li>• Compound movement focus</li>
                              <li>• Adequate training volume</li>
                              <li>• Proper periodization</li>
                              <li>• Consistent execution</li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-4 rounded">
                            <h4 className="font-semibold text-blue-900 mb-2">Recovery Optimization</h4>
                            <ul className="text-blue-700 text-sm space-y-1">
                              <li>• 7-9 hours quality sleep</li>
                              <li>• Stress management</li>
                              <li>• Adequate rest days</li>
                              <li>• Active recovery methods</li>
                              <li>• Proper hydration</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Nutritional Strategies</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-orange-50 p-4 rounded">
                            <h4 className="font-semibold text-orange-900 mb-2">Protein Optimization</h4>
                            <ul className="text-orange-700 text-sm space-y-1">
                              <li>• 1.6-2.2g per kg body weight</li>
                              <li>• Complete amino acid profiles</li>
                              <li>• Distributed throughout day</li>
                              <li>• Post-workout timing</li>
                            </ul>
                          </div>
                          <div className="bg-purple-50 p-4 rounded">
                            <h4 className="font-semibold text-purple-900 mb-2">Micronutrients</h4>
                            <ul className="text-purple-700 text-sm space-y-1">
                              <li>• Vitamin D optimization</li>
                              <li>• Zinc and magnesium</li>
                              <li>• B-vitamin complex</li>
                              <li>• Antioxidant support</li>
                            </ul>
                          </div>
                          <div className="bg-teal-50 p-4 rounded">
                            <h4 className="font-semibold text-teal-900 mb-2">Meal Timing</h4>
                            <ul className="text-teal-700 text-sm space-y-1">
                              <li>• Pre/post workout nutrition</li>
                              <li>• Caloric cycling</li>
                              <li>• Strategic carbohydrate timing</li>
                              <li>• Consistent meal patterns</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Natural Supplements</h3>
                        <p className="text-gray-600 mb-4">
                          Evidence-based supplements that may support natural performance and recovery.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Performance Support</h4>
                            <ul className="text-gray-600 text-sm space-y-1">
                              <li>• <strong>Creatine Monohydrate:</strong> 3-5g daily</li>
                              <li>• <strong>Beta-Alanine:</strong> 3-5g daily</li>
                              <li>• <strong>Citrulline Malate:</strong> 6-8g pre-workout</li>
                              <li>• <strong>Caffeine:</strong> 3-6mg/kg body weight</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Recovery & Hormone Support</h4>
                            <ul className="text-gray-600 text-sm space-y-1">
                              <li>• <strong>Vitamin D3:</strong> 2000-4000 IU daily</li>
                              <li>• <strong>Zinc:</strong> 15-30mg daily</li>
                              <li>• <strong>Magnesium:</strong> 400-600mg daily</li>
                              <li>• <strong>Ashwagandha:</strong> 300-600mg daily</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Lifestyle Factors</h3>
                        <div className="space-y-4">
                          <div className="bg-blue-50 p-4 rounded">
                            <h4 className="font-semibold text-blue-900 mb-2">Sleep Optimization</h4>
                            <p className="text-blue-700 text-sm">
                              Quality sleep is crucial for natural growth hormone release, testosterone production, and recovery.
                            </p>
                          </div>
                          <div className="bg-green-50 p-4 rounded">
                            <h4 className="font-semibold text-green-900 mb-2">Stress Management</h4>
                            <p className="text-green-700 text-sm">
                              Chronic stress elevates cortisol, which can impair muscle growth and recovery. Practice stress reduction techniques.
                            </p>
                          </div>
                          <div className="bg-purple-50 p-4 rounded">
                            <h4 className="font-semibold text-purple-900 mb-2">Consistency</h4>
                            <p className="text-purple-700 text-sm">
                              Long-term consistency with training, nutrition, and lifestyle factors often produces better results than short-term extremes.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-medium mb-3">Realistic Expectations</h3>
                        <div className="bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
                          <h4 className="font-semibold text-yellow-900 mb-2">Natural Muscle Building Rates</h4>
                          <ul className="text-yellow-700 text-sm space-y-1">
                            <li>• Year 1: 20-25 lbs muscle gain (men), 10-12 lbs (women)</li>
                            <li>• Year 2: 5-10 lbs muscle gain</li>
                            <li>• Year 3+: 2-5 lbs muscle gain per year</li>
                            <li>• These rates vary significantly with genetics, training, and nutrition</li>
                          </ul>
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

export default SteroidEducation;
