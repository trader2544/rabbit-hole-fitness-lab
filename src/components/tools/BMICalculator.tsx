
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
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500" };
    if (bmi < 24.9) return { category: "Healthy Weight", color: "text-green-500" };
    if (bmi < 29.9) return { category: "Overweight", color: "text-yellow-500" };
    return { category: "Obesity", color: "text-red-500" };
  };

  const { category, color } = getBMICategory(bmi);

  return (
    <div className="mt-6 p-4 bg-background rounded-lg border border-border">
      <h3 className="font-semibold text-lg mb-2">Your BMI Result</h3>
      <div className="flex justify-between items-center">
        <span className="text-3xl font-bold">{bmi.toFixed(1)}</span>
        <span className={`${color} font-medium text-lg`}>{category}</span>
      </div>
      <div className="mt-4 mb-2 bg-gray-200 h-2 rounded-full">
        <div
          className={`h-2 rounded-full ${
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
      <div className="flex justify-between text-xs text-foreground/70">
        <span>Underweight</span>
        <span>Normal</span>
        <span>Overweight</span>
        <span>Obesity</span>
      </div>
      <p className="mt-4 text-sm text-foreground/70">
        BMI is a screening tool but doesn't diagnose body fatness or health.
        Consult a healthcare provider for proper evaluation.
      </p>
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
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle>BMI Calculator</CardTitle>
        <CardDescription>
          Calculate your Body Mass Index based on your height and weight
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
                <RadioGroupItem value="metric" id="metric" />
                <Label htmlFor="metric">Metric (cm, kg)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="imperial" id="imperial" />
                <Label htmlFor="imperial">Imperial (in, lbs)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Age and Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
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
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Height and Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="height">
                Height ({unit === "metric" ? "cm" : "inches"})
              </Label>
              <Input
                id="height"
                placeholder={unit === "metric" ? "Centimeters" : "Inches"}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                type="number"
                min="0"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="weight">
                Weight ({unit === "metric" ? "kg" : "lbs"})
              </Label>
              <Input
                id="weight"
                placeholder={unit === "metric" ? "Kilograms" : "Pounds"}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                type="number"
                min="0"
                className="mt-1"
              />
            </div>
          </div>

          <Button onClick={calculateBMI} className="w-full mt-4">
            Calculate BMI
          </Button>

          {bmi !== null && <BMIResult bmi={bmi} />}
        </div>
      </CardContent>
    </Card>
  );
};

export default BMICalculator;
