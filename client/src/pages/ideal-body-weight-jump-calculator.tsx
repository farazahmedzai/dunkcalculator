import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { idealWeightCalculatorSchema, type IdealWeightCalculatorForm } from "@/lib/validation-schemas";
import { ArrowLeft, Scale, TrendingUp, Target, AlertCircle } from "lucide-react";

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

  const form = useForm<IdealWeightCalculatorForm>({
    resolver: zodResolver(idealWeightCalculatorSchema),
    defaultValues: {
      trainingLevel: "intermediate",
      primaryGoal: "vertical",
      timeframe: 12,
    },
  });

  const calculateIdealWeight = (data: IdealWeightCalculatorForm) => {
    setIsCalculating(true);
    
    setTimeout(() => {
      // Calculate BMI and baseline metrics
      const heightInMeters = (data.height * 2.54) / 100;
      const currentBMI = data.currentWeight / (heightInMeters * heightInMeters);
      
      // Estimate ideal weight based on athletic standards
      const athleticBMI = 22; // Optimal BMI for jumping athletes
      const idealWeight = athleticBMI * (heightInMeters * heightInMeters) * 2.20462; // Convert to lbs
      
      const weightChange = idealWeight - data.currentWeight;
      
      // Estimate body fat if not provided
      const estimatedBodyFat = data.bodyFatPercentage || (currentBMI > 25 ? 18 : currentBMI < 20 ? 12 : 15);
      const targetBodyFat = 8; // Optimal for jumping performance
      
      // Calculate composition changes
      const fatLossNeeded = Math.max(0, (estimatedBodyFat - targetBodyFat) * data.currentWeight / 100);
      const muscleGainNeeded = Math.max(0, weightChange + fatLossNeeded);
      
      // Estimate vertical jump improvement (0.5 inches per 5 lbs of optimal weight change)
      const projectedVertical = data.currentVertical + (Math.abs(weightChange) * 0.1);
      const verticalChange = projectedVertical - data.currentVertical;
      
      // Calculate timeframe based on safe rates
      const safeWeeklyWeightLoss = 1.5; // lbs per week
      const safeWeeklyMuscleGain = 0.5; // lbs per week
      const timeToReach = Math.max(
        fatLossNeeded / safeWeeklyWeightLoss,
        muscleGainNeeded / safeWeeklyMuscleGain
      );
      
      const strengthToWeightRatio = data.currentVertical / (data.currentWeight / 100);
      
      // Generate recommendations
      const recommendations = [];
      if (weightChange < -10) recommendations.push("Focus on gradual fat loss while maintaining muscle mass");
      if (weightChange > 10) recommendations.push("Prioritize lean muscle gain with strength training");
      if (muscleGainNeeded > 15) recommendations.push("Consider working with a strength coach for optimal muscle development");
      if (fatLossNeeded > 20) recommendations.push("Implement a structured nutrition plan with moderate caloric deficit");
      
      const nutritionGuidelines = [
        `Target ${Math.round(idealWeight * 0.8)}-${Math.round(idealWeight * 1.0)}g protein daily`,
        "Consume carbohydrates around training sessions for performance",
        "Maintain adequate hydration (0.5-1oz per lb bodyweight)",
        "Focus on whole foods with minimal processing"
      ];
      
      const trainingModifications = [];
      if (weightChange < 0) trainingModifications.push("Increase training volume to preserve muscle during fat loss");
      if (weightChange > 0) trainingModifications.push("Focus on compound movements for efficient muscle gain");
      trainingModifications.push("Prioritize plyometric training for jump-specific adaptations");
      trainingModifications.push("Include periodized strength training 3-4x per week");
      
      const riskFactors = [];
      if (Math.abs(weightChange) > 25) riskFactors.push("Significant weight change may affect performance initially");
      if (timeToReach > 26) riskFactors.push("Extended timeline may require motivation maintenance strategies");
      if (data.currentWeight < 120) riskFactors.push("Monitor for adequate nutrition during muscle gain phase");
      
      setResults({
        idealWeight: Math.round(idealWeight),
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
        riskFactors
      });
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/calculators">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Calculators
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ideal Body Weight Jump Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your optimal body weight for maximum vertical jump performance with personalized nutrition and training recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Body Weight Analysis
              </CardTitle>
              <CardDescription>
                Enter your current measurements and goals to calculate your ideal weight for jumping performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(calculateIdealWeight)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
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
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="currentVertical"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Vertical Jump (inches)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="28"
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
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="trainingLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Training Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="primaryGoal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Goal</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select goal" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="dunk">Dunking</SelectItem>
                              <SelectItem value="vertical">Vertical Jump</SelectItem>
                              <SelectItem value="athletics">Athletic Performance</SelectItem>
                              <SelectItem value="general">General Fitness</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="timeframe"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Timeframe (weeks)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="12"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isCalculating}>
                    {isCalculating ? "Calculating..." : "Calculate Ideal Weight"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Results */}
          {results && (
            <div className="space-y-6">
              {/* Weight Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Weight Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{results.idealWeight} lbs</div>
                      <div className="text-sm text-blue-700">Ideal Weight</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {results.weightChange > 0 ? '+' : ''}{results.weightChange} lbs
                      </div>
                      <div className="text-sm text-green-700">Weight Change</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{results.projectedVertical}"</div>
                      <div className="text-sm text-purple-700">Projected Vertical</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">+{results.verticalChange}"</div>
                      <div className="text-sm text-orange-700">Jump Improvement</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-semibold">{results.fatLossNeeded} lbs</div>
                      <div className="text-gray-600">Fat Loss</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-semibold">{results.muscleGainNeeded} lbs</div>
                      <div className="text-gray-600">Muscle Gain</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-semibold">{results.timeToReach} weeks</div>
                      <div className="text-gray-600">Timeline</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Training Modifications</h4>
                    <ul className="space-y-1 text-sm">
                      {results.trainingModifications.map((mod, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          {mod}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Nutrition Guidelines</h4>
                    <ul className="space-y-1 text-sm">
                      {results.nutritionGuidelines.map((guideline, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          {guideline}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {results.riskFactors.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-orange-700 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Important Considerations
                      </h4>
                      <ul className="space-y-1 text-sm">
                        {results.riskFactors.map((risk, index) => (
                          <li key={index} className="flex items-start gap-2 text-orange-700">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Educational Content */}
        <div className="mt-12 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Understanding Optimal Weight for Jumping
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Body composition significantly impacts jumping performance. Learn how weight optimization can improve your vertical jump.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Power-to-Weight Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Higher power-to-weight ratios typically correlate with better jumping performance. 
                  Reducing excess body fat while maintaining muscle mass optimizes this ratio.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Body Fat Considerations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Elite jumping athletes typically maintain 6-12% body fat. Lower body fat reduces dead weight 
                  while preserving the muscle needed for explosive power.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Muscle Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Fast-twitch muscle fibers are crucial for jumping. Quality strength training builds 
                  the specific muscle types needed for explosive vertical movement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}