
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Biology = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">The Biology of Fitness</h1>
        <p className="text-lg text-foreground/70 mb-8">
          Understanding the science behind how your body responds and adapts to exercise
        </p>

        <Tabs defaultValue="muscle">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="muscle">Muscle Growth</TabsTrigger>
            <TabsTrigger value="energy">Energy Systems</TabsTrigger>
            <TabsTrigger value="hormones">Hormonal Response</TabsTrigger>
          </TabsList>
          
          <TabsContent value="muscle">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-semibold mb-4">The Science of Muscle Growth</h2>
                  
                  <p className="mb-4">
                    Muscle growth (hypertrophy) occurs through a complex cascade of cellular events triggered by mechanical tension, metabolic stress, and muscle damage.
                  </p>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Protein Synthesis & Muscle Adaptation</h3>
                  
                  <p className="mb-4">
                    When you perform resistance exercise, especially calisthenics movements like push-ups and pull-ups, you create microscopic damage to muscle fibers. This triggers a repair process where:
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1">Satellite cells (muscle stem cells) are activated and fuse to damaged muscle fibers</li>
                    <li className="mb-1">mTOR pathway activation increases protein synthesis</li>
                    <li className="mb-1">Growth factors like IGF-1 are released to promote tissue repair</li>
                    <li className="mb-1">Myonuclei increase, improving the muscle cell's capacity to synthesize more proteins</li>
                  </ul>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Calisthenics and Muscle Fiber Types</h3>
                  
                  <p className="mb-4">
                    Calisthenics exercises recruit different muscle fiber types depending on the intensity and duration:
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1"><strong>Type I (Slow-Twitch):</strong> Recruited during endurance movements and static holds like planks</li>
                    <li className="mb-1"><strong>Type IIa (Fast-Twitch Oxidative):</strong> Recruited during moderate-intensity movements like push-ups</li>
                    <li className="mb-1"><strong>Type IIx (Fast-Twitch Glycolytic):</strong> Recruited during explosive movements like muscle-ups</li>
                  </ul>

                  <p className="mb-4">
                    Calisthenics often creates a balanced recruitment of all fiber types, especially when incorporating both static holds and dynamic movements.
                  </p>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Mechanical Tension vs. Metabolic Stress</h3>
                  
                  <p className="mb-4">
                    In calisthenics, hypertrophy occurs through two primary mechanisms:
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1"><strong>Mechanical Tension:</strong> Created by progressively increasing difficulty (e.g., moving from regular push-ups to one-arm push-up progressions)</li>
                    <li className="mb-1"><strong>Metabolic Stress:</strong> Accumulation of metabolites during high-volume training or isometric holds</li>
                  </ul>
                  
                  <p>
                    Understanding these mechanisms allows you to design optimal calisthenics progressions that continuously challenge your muscles and promote growth.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="energy">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-semibold mb-4">Energy Systems in Exercise</h2>
                  
                  <p className="mb-4">
                    Your body uses three primary energy systems to fuel movement, each dominating at different exercise intensities and durations.
                  </p>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">ATP-PC System (Phosphagen)</h3>
                  
                  <p className="mb-4">
                    This is your body's immediate energy system, providing explosive power for 10-15 seconds:
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1">Uses stored ATP and creatine phosphate in muscles</li>
                    <li className="mb-1">No oxygen required (anaerobic)</li>
                    <li className="mb-1">Powers explosive calisthenics movements like muscle-ups and plyometric push-ups</li>
                    <li className="mb-1">Replenishes within 3-5 minutes of rest</li>
                  </ul>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Glycolytic System</h3>
                  
                  <p className="mb-4">
                    This intermediate energy system dominates during moderate-intensity exercise lasting 30 seconds to 2 minutes:
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1">Breaks down glucose through glycolysis to produce ATP</li>
                    <li className="mb-1">Primarily anaerobic, producing lactate as a byproduct</li>
                    <li className="mb-1">Powers multiple repetitions of calisthenics movements like pull-ups and dips</li>
                    <li className="mb-1">Limited by lactate accumulation and pH changes</li>
                  </ul>

                  <h3 className="text-xl font-medium mt-6 mb-3">Oxidative System</h3>
                  
                  <p className="mb-4">
                    This aerobic energy system provides sustained energy during longer-duration, lower-intensity activities:
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1">Requires oxygen to metabolize carbohydrates, fats, and (rarely) proteins</li>
                    <li className="mb-1">Most efficient ATP production but slower energy release</li>
                    <li className="mb-1">Powers endurance calisthenics circuits and high-rep bodyweight exercises</li>
                    <li className="mb-1">Limited by oxygen delivery and mitochondrial density</li>
                  </ul>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Energy System Development</h3>
                  
                  <p className="mb-4">
                    Different types of calisthenics training target specific energy system adaptations:
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1"><strong>ATP-PC:</strong> Short, explosive movements with full recovery</li>
                    <li className="mb-1"><strong>Glycolytic:</strong> Moderate-intensity intervals with incomplete recovery</li>
                    <li className="mb-1"><strong>Oxidative:</strong> Longer circuits with minimal rest or lower-intensity exercises</li>
                  </ul>
                  
                  <p>
                    Understanding these energy systems helps you design more effective workouts based on your specific fitness goals.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="hormones">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-semibold mb-4">Hormonal Responses to Exercise</h2>
                  
                  <p className="mb-4">
                    Exercise triggers a complex cascade of hormonal changes that influence recovery, adaptation, and overall health.
                  </p>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Anabolic Hormones</h3>
                  
                  <p className="mb-4">
                    These hormones promote tissue growth and repair:
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1">
                      <strong>Testosterone:</strong> Increases in response to compound calisthenics movements that engage large muscle groups. Supports protein synthesis and muscle growth.
                    </li>
                    <li className="mb-1">
                      <strong>Growth Hormone (GH):</strong> Spikes during high-volume calisthenics or metabolically demanding circuits. Promotes fat metabolism and tissue repair.
                    </li>
                    <li className="mb-1">
                      <strong>Insulin-Like Growth Factor 1 (IGF-1):</strong> Released in response to GH and during muscle damage. Mediates many of the growth-promoting effects in tissues.
                    </li>
                  </ul>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Catabolic Hormones</h3>
                  
                  <p className="mb-4">
                    These hormones break down tissues to mobilize energy:
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1">
                      <strong>Cortisol:</strong> Increases during prolonged, intense calisthenics sessions. Mobilizes glucose and fatty acids for energy but can impair recovery when chronically elevated.
                    </li>
                    <li className="mb-1">
                      <strong>Catecholamines (Adrenaline/Noradrenaline):</strong> Spike during high-intensity exercises like plyometrics. Increase heart rate, respiration, and energy availability.
                    </li>
                  </ul>

                  <h3 className="text-xl font-medium mt-6 mb-3">Metabolic Hormones</h3>
                  
                  <p className="mb-4">
                    These hormones regulate energy balance:
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1">
                      <strong>Insulin:</strong> Decreases during exercise to allow energy mobilization. Sensitivity improves with regular calisthenics training.
                    </li>
                    <li className="mb-1">
                      <strong>Glucagon:</strong> Increases to promote liver glycogen breakdown. Important during longer calisthenics sessions.
                    </li>
                    <li className="mb-1">
                      <strong>Leptin and Ghrelin:</strong> Exercise influences these hunger hormones, helping regulate appetite and energy balance.
                    </li>
                  </ul>
                  
                  <h3 className="text-xl font-medium mt-6 mb-3">Optimizing Hormonal Responses</h3>
                  
                  <p className="mb-4">
                    Calisthenics training can be structured to optimize hormonal responses:
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4">
                    <li className="mb-1"><strong>For anabolic effects:</strong> Multi-joint movements, moderate-to-high intensity, compound exercises like dips and pull-ups</li>
                    <li className="mb-1"><strong>For fat loss:</strong> High-intensity intervals, circuit training with minimal rest</li>
                    <li className="mb-1"><strong>For recovery:</strong> Managing training volume and intensity to avoid chronically elevated cortisol</li>
                  </ul>
                  
                  <p>
                    The hormonal responses to calisthenics training play a crucial role in long-term adaptations and results.
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

export default Biology;
