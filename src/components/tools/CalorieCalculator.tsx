
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface CalorieResultProps {
  bmr: number;
  tdee: number;
  goal: string;
  targetCalories: number;
}

const CalorieResult = ({ bmr, tdee, goal, targetCalories }: CalorieResultProps) => {
  const macros = {
    protein: Math.round((targetCalories * 0.3) / 4), // 30% protein, 4 calories per gram
    carbs: Math.round((targetCalories * 0.4) / 4), // 40% carbs, 4 calories per gram
    fat: Math.round((targetCalories * 0.3) / 9), // 30% fat, 9 calories per gram
  };

  return (
    <div className="mt-6 p-4 bg-background rounded-lg border border-border">
      <h3 className="font-semibold text-lg mb-4">Your Calorie Results</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Basal Metabolic Rate (BMR)</span>
            <span className="font-semibold">{Math.round(bmr)} calories/day</span>
          </div>
          <Progress value={100} className="h-2" />
          <p className="text-xs text-foreground/70 mt-1">
            Calories your body needs at complete rest
          </p>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Total Daily Energy Expenditure (TDEE)</span>
            <span className="font-semibold">{Math.round(tdee)} calories/day</span>
          </div>
          <Progress value={100} className="h-2" />
          <p className="text-xs text-foreground/70 mt-1">
            Calories your body burns throughout the day
          </p>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Target Calories for {goal}</span>
            <span className="font-semibold">{Math.round(targetCalories)} calories/day</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="font-medium mb-2">Suggested Macronutrients</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <div className="font-semibold text-green-600">{macros.protein}g</div>
            <div className="text-xs text-foreground/70">Protein</div>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <div className="font-semibold text-blue-600">{macros.carbs}g</div>
            <div className="text-xs text-foreground/70">Carbs</div>
          </div>
          <div className="text-center p-2 bg-yellow-50 rounded-lg">
            <div className="font-semibold text-yellow-600">{macros.fat}g</div>
            <div className="text-xs text-foreground/70">Fat</div>
          </div>
        </div>
      </div>
      
      <p className="mt-4 text-sm text-foreground/70">
        These calculations are estimates based on the Mifflin-St Jeor equation. 
        Individual requirements may vary.
      </p>
    </div>
  );
};

const CalorieCalculator = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [goal, setGoal] = useState("maintain");
  const [unit, setUnit] = useState("metric"); // metric or imperial
  const [result, setResult] = useState<CalorieResultProps | null>(null);

  const activityMultipliers = {
    sedentary: 1.2, // Little or no exercise
    light: 1.375, // Light exercise 1-3 days/week
    moderate: 1.55, // Moderate exercise 3-5 days/week
    active: 1.725, // Hard exercise 6-7 days/week
    veryActive: 1.9, // Very hard exercise & physical job
  };

  const goalAdjustments = {
    lose: -500, // Caloric deficit for weight loss
    maintain: 0, // Maintain current weight
    gain: 500, // Caloric surplus for weight gain
  };

  const calculateCalories = () => {
    if (!age || !height || !weight) return;

    // Convert imperial to metric if needed
    const heightInCm = unit === "imperial" ? parseFloat(height) * 2.54 : parseFloat(height);
    const weightInKg = unit === "imperial" ? parseFloat(weight) * 0.453592 : parseFloat(weight);
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === "male") {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * parseFloat(age) + 5;
    } else {
      bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * parseFloat(age) - 161;
    }
    
    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers];
    
    // Adjust calories based on goal
    const targetCalories = tdee + goalAdjustments[goal as keyof typeof goalAdjustments];
    
    setResult({
      bmr,
      tdee,
      goal,
      targetCalories,
    });
  };

  const handleUnitChange = (newUnit: string) => {
    setUnit(newUnit);
    // Reset height and weight inputs when changing units
    setHeight("");
    setWeight("");
    setResult(null);
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle>Calorie Calculator</CardTitle>
        <CardDescription>
          Estimate your daily calorie needs based on your profile and goals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Units Selection */}
          <div className="mb-4">
            <Label className="mb-2 block">Units</Label>
            <RadioGroup
              value={unit}
              onValueChange={handleUnitChange}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="metric" id="metricCal" />
                <Label htmlFor="metricCal">Metric (cm, kg)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="imperial" id="imperialCal" />
                <Label htmlFor="imperialCal">Imperial (in, lbs)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="calAge">Age</Label>
              <Input
                id="calAge"
                placeholder="Years"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
                min="0"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Activity Level</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (office job)</SelectItem>
                  <SelectItem value="light">Light Exercise (1-3 days/week)</SelectItem>
                  <SelectItem value="moderate">Moderate Exercise (3-5 days/week)</SelectItem>
                  <SelectItem value="active">Heavy Exercise (6-7 days/week)</SelectItem>
                  <SelectItem value="veryActive">Athlete (2x per day)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Height and Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="calHeight">
                Height ({unit === "metric" ? "cm" : "inches"})
              </Label>
              <Input
                id="calHeight"
                placeholder={unit === "metric" ? "Centimeters" : "Inches"}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                type="number"
                min="0"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="calWeight">
                Weight ({unit === "metric" ? "kg" : "lbs"})
              </Label>
              <Input
                id="calWeight"
                placeholder={unit === "metric" ? "Kilograms" : "Pounds"}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                type="number"
                min="0"
                className="mt-1"
              />
            </div>
          </div>

          {/* Goal */}
          <div>
            <Label>Your Goal</Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lose">Weight Loss</SelectItem>
                <SelectItem value="maintain">Maintain Weight</SelectItem>
                <SelectItem value="gain">Weight Gain / Muscle Building</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={calculateCalories} className="w-full mt-4">
            Calculate Calories
          </Button>

          {result && <CalorieResult {...result} />}
        </div>
      </CardContent>
    </Card>
  );
};

export default CalorieCalculator;
