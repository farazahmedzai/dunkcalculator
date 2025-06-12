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
import { Weight, ArrowLeft, TrendingUp, Target } from "lucide-react";

const idealWeightSchema = z.object({
  height: z.number().min(48).max(96),
  currentWeight: z.number().min(80).max(400),
  currentVertical: z.number().min(6).max(50),
  bodyFatPercentage: z.number().min(3).max(40).optional(),
  gender: z.enum(["male", "female"]),
  age: z.number().min(12).max(60),
  sport: z.enum(["basketball", "volleyball", "general"]),
  trainingGoal: z.enum(["power", "endurance", "balanced"]),
  muscleType: z.enum(["lean", "average", "muscular"]),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very_active"]),
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
      
      if (weightChange < 0) { // Weight loss
        const fatLossComponent = (fatLossNeeded / 5) * 0.7; // Positive effect
        const muscleLossRisk = Math.max(0, (-weightChange - fatLossNeeded) / 5) * -0.3; // Negative effect
        verticalChange = fatLossComponent + muscleLossRisk;
      } else { // Weight gain
        const muscleGainComponent = (muscleGainNeeded / 5) * 0.4; // Moderate positive effect
        const excessWeightPenalty = Math.max(0, (weightChange - muscleGainNeeded) / 5) * -0.2;
        verticalChange = muscleGainComponent + excessWeightPenalty;
      }
      
      const projectedVertical = data.currentVertical + verticalChange;
      
      // Calculate strength to weight ratio
      const strengthToWeightRatio = (data.currentVertical * data.currentWeight) / 1000;
      
      // Time estimation (conservative)
      let timeToReach = 6; // Base 6 months
      if (Math.abs(weightChange) > 20) timeToReach = 12;
      else if (Math.abs(weightChange) > 10) timeToReach = 8;
      
      if (data.age > 30) timeToReach *= 1.2;
      if (muscleGainNeeded > 10) timeToReach *= 1.3;
      
      // Generate recommendations
      const recommendations = [];
      if (weightChange < -10) {
        recommendations.push("Focus on gradual fat loss while preserving muscle mass");
        recommendations.push("Maintain strength training throughout weight loss");
        recommendations.push("Consider working with a sports nutritionist");
      } else if (weightChange > 10) {
        recommendations.push("Emphasize lean muscle gain through progressive strength training");
        recommendations.push("Increase protein intake to support muscle growth");
        recommendations.push("Monitor body composition, not just weight");
      } else {
        recommendations.push("You're close to optimal weight - focus on body composition");
        recommendations.push("Prioritize strength and power development");
        recommendations.push("Fine-tune nutrition for performance");
      }
      
      if (data.currentVertical < 20) {
        recommendations.push("Combine weight optimization with jump-specific training");
      }
      
      // Nutrition guidelines
      const nutritionGuidelines = [];
      const proteinNeeds = idealWeight * 0.8; // grams per day
      
      if (weightChange < 0) {
        nutritionGuidelines.push(`Target ${Math.round(proteinNeeds)} grams protein daily to preserve muscle`);
        nutritionGuidelines.push("Create moderate caloric deficit of 300-500 calories daily");
        nutritionGuidelines.push("Time carbohydrates around training sessions");
        nutritionGuidelines.push("Maintain adequate fat intake for hormone production");
      } else if (weightChange > 0) {
        nutritionGuidelines.push(`Consume ${Math.round(proteinNeeds * 1.2)} grams protein daily for muscle growth`);
        nutritionGuidelines.push("Eat in slight caloric surplus of 200-400 calories");
        nutritionGuidelines.push("Focus on nutrient-dense, whole foods");
        nutritionGuidelines.push("Stay hydrated and prioritize post-workout nutrition");
      } else {
        nutritionGuidelines.push("Maintain current caloric intake with improved food quality");
        nutritionGuidelines.push(`Aim for ${Math.round(proteinNeeds)} grams protein daily`);
        nutritionGuidelines.push("Focus on meal timing around training");
      }
      
      // Training modifications
      const trainingModifications = [];
      if (fatLossNeeded > 5) {
        trainingModifications.push("Add 2-3 cardio sessions per week");
        trainingModifications.push("Increase training volume while monitoring recovery");
        trainingModifications.push("Consider circuit training for conditioning");
      }
      
      if (muscleGainNeeded > 5) {
        trainingModifications.push("Emphasize heavy compound movements");
        trainingModifications.push("Increase training frequency for major muscle groups");
        trainingModifications.push("Allow adequate recovery between intense sessions");
      }
      
      trainingModifications.push("Continue jump-specific plyometric training");
      trainingModifications.push("Monitor strength-to-weight ratio improvements");
      
      // Risk factors
      const riskFactors = [];
      if (Math.abs(weightChange) > 15) {
        riskFactors.push("Significant weight change - monitor health markers");
      }
      if (targetBodyFat < 8 && data.gender === "male") {
        riskFactors.push("Very low body fat target - consider hormone impacts");
      }
      if (targetBodyFat < 12 && data.gender === "female") {
        riskFactors.push("Low body fat target - monitor menstrual health");
      }
      if (data.age > 35 && Math.abs(weightChange) > 10) {
        riskFactors.push("Age factor - prioritize gradual changes");
      }

      setResults({
        idealWeight: Math.round(idealWeight * 10) / 10,
        weightChange: Math.round(weightChange * 10) / 10,
        projectedVertical: Math.round(projectedVertical * 10) / 10,
        verticalChange: Math.round(verticalChange * 10) / 10,
        bodyFatTarget: Math.round(targetBodyFat * 10) / 10,
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ideal Body Weight Jump Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find your optimal weight for maximum jumping performance with personalized body composition targets
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Weight Optimization</CardTitle>
              <CardDescription>
                Calculate your ideal weight for jumping performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(calculateIdealWeight)} className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height (inches)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 72"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
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
                              placeholder="e.g., 180"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="currentVertical"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Vertical (inches)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.5"
                              placeholder="e.g., 24"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Demographics */}
                  <div className="grid md:grid-cols-3 gap-4">
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
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 22"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bodyFatPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Body Fat % (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              placeholder="e.g., 15"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Sport & Goals */}
                  <div className="grid md:grid-cols-2 gap-4">
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
                              <SelectItem value="endurance">Power Endurance</SelectItem>
                              <SelectItem value="balanced">Balanced Performance</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Physical Characteristics */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="muscleType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Muscle Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="lean">Lean/Ectomorphic</SelectItem>
                              <SelectItem value="average">Average Build</SelectItem>
                              <SelectItem value="muscular">Naturally Muscular</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="activityLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Activity Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="sedentary">Sedentary</SelectItem>
                              <SelectItem value="light">Light Activity</SelectItem>
                              <SelectItem value="moderate">Moderate Activity</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="very_active">Very Active</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                    disabled={isCalculating}
                  >
                    {isCalculating ? "Calculating..." : "Calculate Ideal Weight"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Results */}
          {results && (
            <div className="space-y-6">
              {/* Target Weight */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <Target className="w-5 h-5 mr-2" />
                    Optimal Weight
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {results.idealWeight} lbs
                    </div>
                    <div className="text-lg text-gray-700 mb-4">
                      Target Weight
                    </div>
                    <div className={`text-lg font-semibold ${results.weightChange > 0 ? 'text-blue-600' : 'text-red-600'}`}>
                      {results.weightChange > 0 ? '+' : ''}{results.weightChange} lbs change
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Body Composition Target</h4>
                    <p className="text-sm text-green-700">{results.bodyFatTarget}% body fat</p>
                  </div>
                </CardContent>
              </Card>

              {/* Projected Performance */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-700">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Performance Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {results.projectedVertical}"
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      Projected Vertical Jump
                    </div>
                    <div className={`text-lg font-semibold ${results.verticalChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {results.verticalChange > 0 ? '+' : ''}{results.verticalChange}" change
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Timeline</h4>
                    <p className="text-sm text-blue-700">{results.timeToReach} months to reach target</p>
                  </div>
                </CardContent>
              </Card>

              {/* Body Composition */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-800">Body Composition Changes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {results.muscleGainNeeded > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Muscle Gain Needed:</span>
                      <span className="font-semibold text-green-600">+{results.muscleGainNeeded} lbs</span>
                    </div>
                  )}
                  {results.fatLossNeeded > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Fat Loss Needed:</span>
                      <span className="font-semibold text-red-600">-{results.fatLossNeeded} lbs</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Strength/Weight Ratio:</span>
                    <span className="font-semibold text-purple-600">{results.strengthToWeightRatio}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Detailed Recommendations */}
        {results && (
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {/* Nutrition */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">Nutrition Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {results.nutritionGuidelines.map((guideline, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{guideline}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Training */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">Training Modifications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {results.trainingModifications.map((mod, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{mod}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recommendations & Risks */}
        {results && (
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">General Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {results.riskFactors.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-yellow-800">Important Considerations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {results.riskFactors.map((risk, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}