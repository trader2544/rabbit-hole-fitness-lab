
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Fitness = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Fitness Modalities</h1>
        <p className="text-lg text-foreground/70 mb-8">
          Explore different training approaches and understand the science behind their effectiveness
        </p>

        <Tabs defaultValue="calisthenics">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-8">
            <TabsTrigger value="calisthenics">Calisthenics</TabsTrigger>
            <TabsTrigger value="strength">Strength</TabsTrigger>
            <TabsTrigger value="functional">Functional</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calisthenics">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-semibold mb-4">The Art and Science of Calisthenics</h2>
                  
                  <p className="mb-4">
                    Calisthenics, derived from the Greek words "kalos" (beauty) and "sthenos" (strength), uses bodyweight exercises to develop strength, endurance, flexibility, and coordination.
                  </p>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Fundamental Principles</h3>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1"><strong>Progressive Overload:</strong> Advancing to harder variations rather than adding weight</li>
                    <li className="mb-1"><strong>Relative Strength:</strong> Developing high strength-to-weight ratio</li>
                    <li className="mb-1"><strong>Full Body Integration:</strong> Engaging multiple muscle groups in coordinated movements</li>
                    <li className="mb-1"><strong>Gradual Progression:</strong> Following systematic progressions toward advanced skills</li>
                  </ul>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Key Movement Patterns and Progressions</h3>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">Push Pattern</h4>
                    <ul className="list-disc pl-6 mb-2">
                      <li>Progression: Wall push-up → Incline push-up → Regular push-up → Diamond push-up → Decline push-up → One-arm push-up progressions</li>
                      <li>Advanced Skills: Planche progressions, One-arm push-ups</li>
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">Pull Pattern</h4>
                    <ul className="list-disc pl-6 mb-2">
                      <li>Progression: Assisted pull-ups → Negative pull-ups → Full pull-ups → Wide grip pull-ups → Weighted pull-ups → One-arm pull-up progressions</li>
                      <li>Advanced Skills: Muscle-ups, Front lever progressions</li>
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">Squat Pattern</h4>
                    <ul className="list-disc pl-6 mb-2">
                      <li>Progression: Assisted squat → Bodyweight squat → Split squat → Bulgarian split squat → Pistol squat progressions</li>
                      <li>Advanced Skills: Full pistol squat, Shrimp squat</li>
                    </ul>
                  </div>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Biomechanical Advantages</h3>
                  
                  <p className="mb-4">
                    Calisthenics offers several biomechanical advantages compared to traditional weight training:
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1">Develops kinesthetic awareness and proprioception through complex movements</li>
                    <li className="mb-1">Emphasizes controlled eccentrics, improving tendon strength and joint stability</li>
                    <li className="mb-1">Trains the body as an integrated unit rather than isolating muscles</li>
                    <li className="mb-1">Creates strength through full ranges of motion, enhancing mobility and flexibility</li>
                  </ul>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Sample Beginner Calisthenics Routine</h3>
                  
                  <div className="border rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Full-Body Circuit (3 rounds, 60s rest between rounds)</h4>
                    <ul className="list-disc pl-6">
                      <li>Push-ups: 8-12 reps (adjust variation to ability)</li>
                      <li>Bodyweight rows or assisted pull-ups: 8-12 reps</li>
                      <li>Bodyweight squats: 15-20 reps</li>
                      <li>Plank: 30-60 seconds</li>
                      <li>Mountain climbers: 30 seconds</li>
                    </ul>
                  </div>
                  
                  <p>
                    The beauty of calisthenics lies in its scalability for all fitness levels and minimal equipment requirements while offering virtually limitless room for progression and skill development.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="strength">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-semibold mb-4">Strength Training Fundamentals</h2>
                  
                  <p className="mb-4">
                    Strength training focuses on developing muscular force production through progressive resistance, whether using external weights or bodyweight leverage.
                  </p>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Physiological Mechanisms</h3>
                  
                  <p className="mb-4">
                    Strength gains occur through several adaptations:
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1"><strong>Neural Adaptations:</strong> Improved motor unit recruitment, firing rate, and intermuscular coordination</li>
                    <li className="mb-1"><strong>Structural Changes:</strong> Increased muscle cross-sectional area and architectural changes to muscle fibers</li>
                    <li className="mb-1"><strong>Biochemical Adaptations:</strong> Enhanced energy substrate availability and enzyme activity</li>
                    <li className="mb-1"><strong>Connective Tissue Strengthening:</strong> Improved tendon and ligament strength and bone density</li>
                  </ul>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Training Variables for Strength Development</h3>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1"><strong>Intensity:</strong> 80-95% of 1RM for maximal strength; 65-80% for strength-endurance</li>
                    <li className="mb-1"><strong>Volume:</strong> 2-6 sets of 2-6 reps for maximal strength; 3-5 sets of 6-12 reps for hypertrophy</li>
                    <li className="mb-1"><strong>Rest Periods:</strong> 2-5 minutes between sets for complete recovery</li>
                    <li className="mb-1"><strong>Frequency:</strong> Training each movement pattern or muscle group 2-3 times weekly</li>
                    <li className="mb-1"><strong>Progressive Overload:</strong> Gradually increasing weight, reps, or technical difficulty</li>
                  </ul>

                  <h3 className="text-xl font-medium mt-6 mb-3">Core Strength Movement Patterns</h3>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">Squat Pattern</h4>
                    <p>Primary movers: Quadriceps, glutes, hamstrings, adductors</p>
                    <p>Key exercises: Back squat, front squat, goblet squat</p>
                    <p>Bodyweight variations: Bodyweight squat, pistol squat, shrimp squat</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">Hinge Pattern</h4>
                    <p>Primary movers: Hamstrings, glutes, erector spinae</p>
                    <p>Key exercises: Deadlift, Romanian deadlift, good morning</p>
                    <p>Bodyweight variations: Glute bridge, single-leg deadlift</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">Push Pattern</h4>
                    <p>Primary movers: Pectorals, anterior deltoids, triceps</p>
                    <p>Key exercises: Bench press, overhead press, dips</p>
                    <p>Bodyweight variations: Push-ups, handstand push-ups</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-lg font-medium mb-2">Pull Pattern</h4>
                    <p>Primary movers: Latissimus dorsi, rhomboids, biceps</p>
                    <p>Key exercises: Rows, pull-ups, chin-ups</p>
                    <p>Bodyweight variations: Inverted rows, pull-ups</p>
                  </div>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Strength vs. Hypertrophy Training</h3>
                  
                  <table className="min-w-full border-collapse border border-gray-300 mb-4">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Variable</th>
                        <th className="border border-gray-300 p-2">Strength Focus</th>
                        <th className="border border-gray-300 p-2">Hypertrophy Focus</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-2">Load</td>
                        <td className="border border-gray-300 p-2">Heavy (85-95% 1RM)</td>
                        <td className="border border-gray-300 p-2">Moderate (65-80% 1RM)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Reps</td>
                        <td className="border border-gray-300 p-2">1-5</td>
                        <td className="border border-gray-300 p-2">8-12</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Rest</td>
                        <td className="border border-gray-300 p-2">3-5 minutes</td>
                        <td className="border border-gray-300 p-2">1-2 minutes</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Volume</td>
                        <td className="border border-gray-300 p-2">Lower</td>
                        <td className="border border-gray-300 p-2">Higher</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">Tempo</td>
                        <td className="border border-gray-300 p-2">Explosive concentric</td>
                        <td className="border border-gray-300 p-2">Controlled, time under tension</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <p>
                    Effective strength training programs typically incorporate elements of both strength and hypertrophy protocols, with periodization to optimize long-term progress.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="functional">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-semibold mb-4">Functional Fitness and Performance</h2>
                  
                  <p className="mb-4">
                    Functional fitness focuses on training movements rather than muscles, emphasizing real-world applications of strength, mobility, and conditioning.
                  </p>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Core Principles of Functional Training</h3>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1"><strong>Multi-planar Movement:</strong> Training in all three planes (sagittal, frontal, transverse)</li>
                    <li className="mb-1"><strong>Multi-joint Exercises:</strong> Prioritizing compound movements over isolation</li>
                    <li className="mb-1"><strong>Movement Quality:</strong> Emphasizing proper mechanics and motor control</li>
                    <li className="mb-1"><strong>Core Integration:</strong> Engaging the core as both a stabilizer and prime mover</li>
                    <li className="mb-1"><strong>Balance and Proprioception:</strong> Challenging stability and body awareness</li>
                  </ul>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Functional Movement Patterns</h3>
                  
                  <p className="mb-4">
                    Functional training typically focuses on these seven fundamental movement patterns:
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1"><strong>Squat:</strong> Lowering and raising the body through hip and knee flexion/extension</li>
                    <li className="mb-1"><strong>Hinge:</strong> Bending at the hips while maintaining spinal neutrality</li>
                    <li className="mb-1"><strong>Lunge:</strong> Stepping and lowering the body with forward, lateral, or rotational components</li>
                    <li className="mb-1"><strong>Push:</strong> Moving resistance away from the body horizontally or vertically</li>
                    <li className="mb-1"><strong>Pull:</strong> Moving resistance toward the body horizontally or vertically</li>
                    <li className="mb-1"><strong>Rotate:</strong> Turning or resisting turning through the core</li>
                    <li className="mb-1"><strong>Carry:</strong> Holding and moving with external loads</li>
                  </ul>

                  <h3 className="text-xl font-medium mt-6 mb-3">Benefits for Daily Life and Athletic Performance</h3>
                  
                  <p className="mb-4">
                    Functional training offers distinct advantages for both everyday activities and sports:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Daily Life Benefits</h4>
                      <ul className="list-disc pl-6">
                        <li>Improved posture and reduced back pain</li>
                        <li>Enhanced balance and reduced fall risk</li>
                        <li>Greater ease in daily tasks (lifting, carrying, climbing)</li>
                        <li>Increased energy and reduced fatigue</li>
                      </ul>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">Athletic Performance Benefits</h4>
                      <ul className="list-disc pl-6">
                        <li>Improved force transfer and power output</li>
                        <li>Enhanced agility and reaction time</li>
                        <li>Better coordination and body control</li>
                        <li>Reduced injury risk through balanced development</li>
                      </ul>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Sample Functional Training Circuit</h3>
                  
                  <div className="border rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Complete 3-4 rounds with 60-90 seconds rest between rounds:</h4>
                    <ul className="list-disc pl-6">
                      <li>Goblet Squat with Rotation: 10-12 reps</li>
                      <li>Single-Leg Romanian Deadlift: 8-10 reps each leg</li>
                      <li>Push-up with Rotation: 8-10 reps</li>
                      <li>TRX or Inverted Row: 10-12 reps</li>
                      <li>Lateral Lunge with Reach: 8-10 reps each side</li>
                      <li>Farmer's Carry: 30-40 yards</li>
                    </ul>
                  </div>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Assessment and Programming</h3>
                  
                  <p className="mb-4">
                    Effective functional training begins with movement assessment to identify limitations and imbalances:
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1"><strong>Mobility Screening:</strong> Evaluating joint range of motion and movement quality</li>
                    <li className="mb-1"><strong>Stability Assessment:</strong> Testing core and joint stability during movement</li>
                    <li className="mb-1"><strong>Movement Pattern Analysis:</strong> Observing fundamental patterns for compensations</li>
                  </ul>
                  
                  <p>
                    From these assessments, programs can be designed to address specific limitations while systematically progressing toward more challenging functional movements.
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

export default Fitness;
