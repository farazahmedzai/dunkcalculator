import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Weight, Target, TrendingUp, Clock } from "lucide-react";

const idealWeightSchema = z.object({
  height: z.number().min(48).max(96),
  currentWeight: z.number().min(80).max(400),
  currentVertical: z.number().min(5).max(60),
  age: z.number().min(12).max(60),
  gender: z.enum(["male", "female"]),
  bodyFatPercentage: z.number().min(5).max(50).optional(),
  sport: z.enum(["basketball", "volleyball", "general"]),
  trainingGoal: z.enum(["power", "endurance", "balanced"]),
  muscleType: z.enum(["lean", "average", "muscular"]),
  activityLevel: z.enum(["sedentary", "lightly_active", "active", "very_active"]),
});

type IdealWeightForm = z.infer<typeof idealWeightSchema>;

interface WeightResults {
  idealWeight: number;
  weightChange: number;
  projectedVertical: number;
  verticalChange: number;
  bodyFatTarget: number;
  muscleGainNeeded: number;
  fatLossNeeded: number;
  timeToReach: number;
  strengthToWeightRatio: number;
  recommendations: string[];
  nutritionGuidelines: string[];
  trainingModifications: string[];
  riskFactors: string[];
}

export default function IdealBodyWeightJumpCalculator() {
  const [results, setResults] = useState<WeightResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<IdealWeightForm>({
    resolver: zodResolver(idealWeightSchema),
    defaultValues: {
      gender: "male",
      sport: "basketball",
      trainingGoal: "power",
      muscleType: "average",
      activityLevel: "active",
    },
  });

  const calculateIdealWeight = (data: IdealWeightForm) => {
    setIsCalculating(true);
    
    setTimeout(() => {
      // Calculate baseline ideal weight using multiple methods
      const heightInches = data.height;
      const heightCm = heightInches * 2.54;
      
      // BMI-based calculation adjusted for athletes
      const athleteBMI = data.gender === "male" ? 23 : 21; // Lower BMI for jumpers
      const bmiBasedWeight = (athleteBMI * heightCm * heightCm) / 10000 * 2.20462;
      
      // Robinson formula adjusted for athletes
      let robinsonWeight;
      if (data.gender === "male") {
        robinsonWeight = 52 + (1.9 * (heightCm - 152.4) / 2.54);
      } else {
        robinsonWeight = 49 + (1.7 * (heightCm - 152.4) / 2.54);
      }
      robinsonWeight *= 2.20462; // Convert to pounds
      
      // Sport-specific adjustments
      let sportModifier = 1.0;
      if (data.sport === "basketball" && data.height > 72) sportModifier = 1.05; // Taller players can carry more weight
      else if (data.sport === "volleyball") sportModifier = 0.98; // Favor lighter build
      
      // Training goal modifier
      const goalModifiers = {
        power: 0.95, // Favor power-to-weight ratio
        endurance: 0.90, // Lighter for endurance
        balanced: 1.0
      };
      
      // Muscle type modifier
      const muscleModifiers = {
        lean: 0.92,
        average: 1.0,
        muscular: 1.08
      };
      
      // Calculate ideal weight
      const baseIdealWeight = (bmiBasedWeight + robinsonWeight) / 2;
      const idealWeight = baseIdealWeight * sportModifier * goalModifiers[data.trainingGoal] * muscleModifiers[data.muscleType];
      
      const weightChange = idealWeight - data.currentWeight;
      
      // Estimate body composition changes
      const currentBodyFat = data.bodyFatPercentage || (data.gender === "male" ? 15 : 20);
      const targetBodyFat = data.gender === "male" ? 
        (data.sport === "basketball" ? 8 : 10) : 
        (data.sport === "basketball" ? 14 : 16);
      
      const currentFatMass = (currentBodyFat / 100) * data.currentWeight;
      const currentLeanMass = data.currentWeight - currentFatMass;
      
      const targetFatMass = (targetBodyFat / 100) * idealWeight;
      const targetLeanMass = idealWeight - targetFatMass;
      
      const fatLossNeeded = Math.max(0, currentFatMass - targetFatMass);
      const muscleGainNeeded = Math.max(0, targetLeanMass - currentLeanMass);
      
      // Project vertical jump improvement
      const currentPowerToWeight = data.currentVertical / data.currentWeight;
      const projectedPowerToWeight = currentPowerToWeight * (idealWeight / data.currentWeight);
      const projectedVertical = projectedPowerToWeight * idealWeight;
      const verticalChange = projectedVertical - data.currentVertical;

      // Calculate strength to weight ratio
      const strengthToWeightRatio = (data.currentVertical * data.currentWeight) / 1000;

      // Time to reach calculation
      const weightChangeRate = Math.abs(weightChange) <= 20 ? 1 : 1.5; // lbs per week
      const timeToReach = Math.abs(weightChange) / weightChangeRate;

      // Generate recommendations
      const recommendations = [];
      if (weightChange > 10) {
        recommendations.push("Focus on lean muscle gain through resistance training");
        recommendations.push("Increase protein intake to 1.2-1.6g per pound of body weight");
        recommendations.push("Progressive overload in compound movements");
      } else if (weightChange < -10) {
        recommendations.push("Create moderate caloric deficit (300-500 calories)");
        recommendations.push("Maintain high protein intake to preserve muscle mass");
        recommendations.push("Combine strength training with moderate cardio");
      } else {
        recommendations.push("Body composition optimization rather than weight change");
        recommendations.push("Focus on improving power-to-weight ratio");
        recommendations.push("Emphasize explosive movement training");
      }

      // Nutrition guidelines
      const nutritionGuidelines = [];
      if (muscleGainNeeded > 5) {
        nutritionGuidelines.push("Slight caloric surplus (200-300 calories above maintenance)");
        nutritionGuidelines.push("Time protein intake around workouts");
        nutritionGuidelines.push("Prioritize complex carbohydrates for energy");
      }
      if (fatLossNeeded > 5) {
        nutritionGuidelines.push("Moderate caloric deficit while preserving muscle");
        nutritionGuidelines.push("Higher protein intake during fat loss phase");
        nutritionGuidelines.push("Strategic carb timing around training");
      }

      // Training modifications
      const trainingModifications = [];
      if (data.trainingGoal === "power") {
        trainingModifications.push("Emphasize explosive movements and plyometrics");
        trainingModifications.push("Lower rep ranges (3-6) for strength");
        trainingModifications.push("Focus on compound movements");
      } else if (data.trainingGoal === "endurance") {
        trainingModifications.push("Higher volume training with moderate weights");
        trainingModifications.push("Circuit training for conditioning");
        trainingModifications.push("Progressive overload in endurance metrics");
      }

      // Risk factors
      const riskFactors = [];
      if (Math.abs(weightChange) > 30) {
        riskFactors.push("Large weight change may affect performance temporarily");
      }
      if (targetBodyFat < (data.gender === "male" ? 8 : 15)) {
        riskFactors.push("Very low body fat may impact hormone production");
      }
      if (timeToReach > 52) {
        riskFactors.push("Extended timeline may affect motivation and consistency");
      }

      setResults({
        idealWeight: Math.round(idealWeight * 10) / 10,
        weightChange: Math.round(weightChange * 10) / 10,
        projectedVertical: Math.round(projectedVertical * 10) / 10,
        verticalChange: Math.round(verticalChange * 10) / 10,
        bodyFatTarget: targetBodyFat,
        muscleGainNeeded: Math.round(muscleGainNeeded * 10) / 10,
        fatLossNeeded: Math.round(fatLossNeeded * 10) / 10,
        timeToReach: Math.round(timeToReach),
        strengthToWeightRatio: Math.round(strengthToWeightRatio * 100) / 100,
        recommendations,
        nutritionGuidelines,
        trainingModifications,
        riskFactors,
      });
      
      setIsCalculating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/calculators">
              <Button variant="ghost" className="text-green-600 hover:text-green-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Calculators
              </Button>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors">
                Dunk Calculator
              </Link>
              <Link href="/vertical-jump-training" className="text-gray-600 hover:text-green-600 transition-colors">
                Training Programs
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Weight className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ideal Body Weight Jump Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your optimal body weight for maximum jumping performance and get personalized recommendations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-600" />
                <span>Body Composition Analysis</span>
              </CardTitle>
              <CardDescription>
                Enter your current metrics to calculate your ideal weight for optimal jumping performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(calculateIdealWeight)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (inches)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="70"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currentWeight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Weight (lbs)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="170"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="currentVertical"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Vertical (inches)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="24"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="20"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sport"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Sport</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select sport" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="basketball">Basketball</SelectItem>
                              <SelectItem value="volleyball">Volleyball</SelectItem>
                              <SelectItem value="general">General Athletics</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="trainingGoal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Training Goal</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select goal" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="power">Maximum Power</SelectItem>
                              <SelectItem value="endurance">Endurance</SelectItem>
                              <SelectItem value="balanced">Balanced</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="muscleType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Build</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select build" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="lean">Lean</SelectItem>
                              <SelectItem value="average">Average</SelectItem>
                              <SelectItem value="muscular">Muscular</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="bodyFatPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Body Fat % (optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="15"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700" 
                    disabled={isCalculating}
                  >
                    {isCalculating ? "Calculating..." : "Calculate Ideal Weight"}
                    <Weight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {results && (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span>Weight Optimization Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg">
                    <div className="text-3xl font-bold">{results.idealWeight} lbs</div>
                    <div className="text-sm opacity-90">Ideal Weight</div>
                    <div className="text-sm mt-2">
                      {results.weightChange > 0 ? '+' : ''}{results.weightChange} lbs change needed
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">{results.projectedVertical}"</div>
                      <div className="text-sm text-gray-600">Projected Vertical</div>
                      <div className="text-xs text-green-600">+{results.verticalChange}" improvement</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">{results.timeToReach}</div>
                      <div className="text-sm text-gray-600">Weeks to Reach</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-lg font-bold text-blue-900">{results.muscleGainNeeded} lbs</div>
                      <div className="text-sm text-blue-600">Muscle to Gain</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg text-center">
                      <div className="text-lg font-bold text-red-900">{results.fatLossNeeded} lbs</div>
                      <div className="text-sm text-red-600">Fat to Lose</div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Recommendations</h4>
                    <ul className="text-green-800 space-y-1">
                      {results.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm">• {rec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Nutrition Guidelines</h4>
                    <ul className="text-blue-800 space-y-1">
                      {results.nutritionGuidelines.map((guide, index) => (
                        <li key={index} className="text-sm">• {guide}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Training Modifications</h4>
                    <ul className="text-purple-800 space-y-1">
                      {results.trainingModifications.map((mod, index) => (
                        <li key={index} className="text-sm">• {mod}</li>
                      ))}
                    </ul>
                  </div>

                  {results.riskFactors.length > 0 && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-900 mb-2">Risk Factors</h4>
                      <ul className="text-yellow-800 space-y-1">
                        {results.riskFactors.map((risk, index) => (
                          <li key={index} className="text-sm">• {risk}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}