
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BMIResultProps {
  bmi: number;
}

const BMIResult = ({ bmi }: BMIResultProps) => {
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-600" };
    if (bmi < 24.9) return { category: "Healthy Weight", color: "text-green-600" };
    if (bmi < 29.9) return { category: "Overweight", color: "text-yellow-600" };
    return { category: "Obesity", color: "text-red-600" };
  };

  const { category, color } = getBMICategory(bmi);

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Your BMI Result</h3>
      <div className="flex items-center justify-between mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-1">{bmi.toFixed(1)}</div>
          <div className="text-sm text-gray-600">BMI Score</div>
        </div>
        <div className="text-center">
          <div className={`text-lg font-semibold ${color} mb-1`}>{category}</div>
          <div className="text-sm text-gray-600">Category</div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="bg-gray-200 h-3 rounded-full overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              bmi < 18.5
                ? "bg-blue-500"
                : bmi < 24.9
                ? "bg-green-500"
                : bmi < 29.9
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{
              width: `${Math.min(100, (bmi / 40) * 100)}%`,
            }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Underweight</span>
          <span>Normal</span>
          <span>Overweight</span>
          <span>Obesity</span>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-100">
        <p className="text-sm text-gray-600 leading-relaxed">
          <strong>Important:</strong> BMI is a screening tool but doesn't diagnose body fatness or health.
          Consult a healthcare provider for proper evaluation.
        </p>
      </div>
    </div>
  );
};

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [unit, setUnit] = useState("metric"); // metric or imperial
  const [bmi, setBMI] = useState<number | null>(null);

  const calculateBMI = () => {
    if (!height || !weight) return;

    let bmiValue: number;
    
    if (unit === "metric") {
      // Height in cm, weight in kg
      const heightInM = parseFloat(height) / 100;
      bmiValue = parseFloat(weight) / (heightInM * heightInM);
    } else {
      // Height in inches, weight in pounds
      bmiValue = (parseFloat(weight) * 703) / (parseFloat(height) * parseFloat(height));
    }
    
    setBMI(bmiValue);
  };

  const handleUnitChange = (newUnit: string) => {
    setUnit(newUnit);
    // Reset inputs when changing units
    setHeight("");
    setWeight("");
    setBMI(null);
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
            <RadioGroupItem value="metric" id="metric" className="border-gray-300" />
            <Label htmlFor="metric" className="text-gray-700 cursor-pointer">
              Metric (cm, kg)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="imperial" id="imperial" className="border-gray-300" />
            <Label htmlFor="imperial" className="text-gray-700 cursor-pointer">
              Imperial (in, lbs)
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="age" className="text-base font-medium text-gray-900 mb-2 block">
            Age
          </Label>
          <Input
            id="age"
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
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Height and Weight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="height" className="text-base font-medium text-gray-900 mb-2 block">
            Height ({unit === "metric" ? "cm" : "inches"})
          </Label>
          <Input
            id="height"
            placeholder={unit === "metric" ? "Enter height in cm" : "Enter height in inches"}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            type="number"
            min="0"
            className="h-12 border-gray-300 focus:border-black focus:ring-black"
          />
        </div>
        <div>
          <Label htmlFor="weight" className="text-base font-medium text-gray-900 mb-2 block">
            Weight ({unit === "metric" ? "kg" : "lbs"})
          </Label>
          <Input
            id="weight"
            placeholder={unit === "metric" ? "Enter weight in kg" : "Enter weight in lbs"}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            type="number"
            min="0"
            className="h-12 border-gray-300 focus:border-black focus:ring-black"
          />
        </div>
      </div>

      <Button 
        onClick={calculateBMI} 
        className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium"
        disabled={!height || !weight}
      >
        Calculate BMI
      </Button>

      {bmi !== null && <BMIResult bmi={bmi} />}
    </div>
  );
};

export default BMICalculator;
