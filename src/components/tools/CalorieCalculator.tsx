
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

  const goalLabels = {
    lose: "Weight Loss",
    maintain: "Maintain Weight", 
    gain: "Weight Gain"
  };

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Calorie Results</h3>
      
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-900">Basal Metabolic Rate (BMR)</span>
            <span className="text-lg font-semibold text-gray-900">{Math.round(bmr)} cal/day</span>
          </div>
          <Progress value={100} className="h-2 mb-2" />
          <p className="text-sm text-gray-600">
            Calories your body needs at complete rest
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-900">Total Daily Energy Expenditure (TDEE)</span>
            <span className="text-lg font-semibold text-gray-900">{Math.round(tdee)} cal/day</span>
          </div>
          <Progress value={100} className="h-2 mb-2" />
          <p className="text-sm text-gray-600">
            Calories your body burns throughout the day
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-900">
              Target Calories for {goalLabels[goal as keyof typeof goalLabels]}
            </span>
            <span className="text-lg font-semibold text-black">{Math.round(targetCalories)} cal/day</span>
          </div>
          <Progress value={100} className="h-2" />
        </div>
      </div>
      
      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Suggested Macronutrients</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-100 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{macros.protein}g</div>
            <div className="text-sm font-medium text-gray-600">Protein (30%)</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{macros.carbs}g</div>
            <div className="text-sm font-medium text-gray-600">Carbs (40%)</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">{macros.fat}g</div>
            <div className="text-sm font-medium text-gray-600">Fat (30%)</div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-white p-4 rounded-lg border border-gray-100">
        <p className="text-sm text-gray-600 leading-relaxed">
          <strong>Important:</strong> These calculations are estimates based on the Mifflin-St Jeor equation. 
          Individual requirements may vary. Consult with a healthcare provider or nutritionist for personalized advice.
        </p>
      </div>
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
    <div className="space-y-6">
      {/* Units Selection */}
      <div>
        <Label className="text-base font-medium text-gray-900 mb-3 block">
          Measurement Units
        </Label>
        <RadioGroup
          value={unit}
          onValueChange={handleUnitChange}
          className="flex space-x-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="metric" id="metricCal" className="border-gray-300" />
            <Label htmlFor="metricCal" className="text-gray-700 cursor-pointer">
              Metric (cm, kg)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="imperial" id="imperialCal" className="border-gray-300" />
            <Label htmlFor="imperialCal" className="text-gray-700 cursor-pointer">
              Imperial (in, lbs)
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="calAge" className="text-base font-medium text-gray-900 mb-2 block">
            Age
          </Label>
          <Input
            id="calAge"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            min="0"
            className="h-12 border-gray-300 focus:border-black focus:ring-black"
          />
        </div>
        <div>
          <Label className="text-base font-medium text-gray-900 mb-2 block">
            Gender
          </Label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger className="h-12 border-gray-300 focus:border-black focus:ring-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-base font-medium text-gray-900 mb-2 block">
            Activity Level
          </Label>
          <Select value={activityLevel} onValueChange={setActivityLevel}>
            <SelectTrigger className="h-12 border-gray-300 focus:border-black focus:ring-black">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="calHeight" className="text-base font-medium text-gray-900 mb-2 block">
            Height ({unit === "metric" ? "cm" : "inches"})
          </Label>
          <Input
            id="calHeight"
            placeholder={unit === "metric" ? "Enter height in cm" : "Enter height in inches"}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            type="number"
            min="0"
            className="h-12 border-gray-300 focus:border-black focus:ring-black"
          />
        </div>
        <div>
          <Label htmlFor="calWeight" className="text-base font-medium text-gray-900 mb-2 block">
            Weight ({unit === "metric" ? "kg" : "lbs"})
          </Label>
          <Input
            id="calWeight"
            placeholder={unit === "metric" ? "Enter weight in kg" : "Enter weight in lbs"}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            type="number"
            min="0"
            className="h-12 border-gray-300 focus:border-black focus:ring-black"
          />
        </div>
      </div>

      {/* Goal */}
      <div>
        <Label className="text-base font-medium text-gray-900 mb-2 block">
          Your Goal
        </Label>
        <Select value={goal} onValueChange={setGoal}>
          <SelectTrigger className="h-12 border-gray-300 focus:border-black focus:ring-black">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lose">Weight Loss</SelectItem>
            <SelectItem value="maintain">Maintain Weight</SelectItem>
            <SelectItem value="gain">Weight Gain / Muscle Building</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        onClick={calculateCalories} 
        className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium"
        disabled={!age || !height || !weight}
      >
        Calculate Calories
      </Button>

      {result && <CalorieResult {...result} />}
    </div>
  );
};

export default CalorieCalculator;
