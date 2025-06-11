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
import { Zap, ArrowLeft, AlertTriangle, TrendingDown } from "lucide-react";

const jumpFatigueSchema = z.object({
  restingJump: z.number().min(8).max(50),
  fatigueJump: z.number().min(4).max(50),
  activityType: z.enum(["game", "practice", "workout", "tournament"]),
  durationMinutes: z.number().min(10).max(240),
  intensityLevel: z.enum(["low", "moderate", "high", "maximal"]),
  restTime: z.number().min(0).max(60),
  bodyWeight: z.number().min(80).max(400).optional(),
  age: z.number().min(12).max(60).optional(),
  fitnessLevel: z.enum(["beginner", "intermediate", "advanced", "elite"]).optional(),
});

type JumpFatigueForm = z.infer<typeof jumpFatigueSchema>;

interface FatigueResults {
  fatigueIndex: number;
  fatigueLevel: string;
  performanceDrop: number;
  recoveryTime: number;
  fatigueType: string;
  recommendations: string[];
  trainingAdjustments: string[];
  nextTestTime: string;
}

export default function JumpFatigueCalculator() {
  const [results, setResults] = useState<FatigueResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<JumpFatigueForm>({
    resolver: zodResolver(jumpFatigueSchema),
    defaultValues: {
      activityType: "practice",
      intensityLevel: "moderate",
      restTime: 5,
      bodyWeight: 170,
      age: 20,
      fitnessLevel: "intermediate",
    },
  });

  const calculateFatigue = (data: JumpFatigueForm) => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const performanceDrop = ((data.restingJump - data.fatigueJump) / data.restingJump) * 100;
      const fatigueIndex = Math.min(100, Math.max(0, performanceDrop));

      // Determine fatigue level
      let fatigueLevel = "";
      if (fatigueIndex < 5) fatigueLevel = "Minimal Fatigue - Excellent recovery";
      else if (fatigueIndex < 10) fatigueLevel = "Low Fatigue - Good conditioning";
      else if (fatigueIndex < 15) fatigueLevel = "Moderate Fatigue - Normal response";
      else if (fatigueIndex < 25) fatigueLevel = "High Fatigue - Needs attention";
      else fatigueLevel = "Severe Fatigue - Recovery required";

      // Calculate recovery time based on multiple factors
      let baseRecovery = fatigueIndex * 0.8; // Base minutes
      
      // Adjust for activity intensity
      const intensityModifiers = { low: 0.7, moderate: 1.0, high: 1.3, maximal: 1.6 };
      baseRecovery *= intensityModifiers[data.intensityLevel];

      // Adjust for duration
      if (data.durationMinutes > 120) baseRecovery *= 1.2;
      else if (data.durationMinutes < 30) baseRecovery *= 0.8;

      // Adjust for fitness level
      const fitnessModifiers = { beginner: 1.4, intermediate: 1.0, advanced: 0.8, elite: 0.6 };
      baseRecovery *= fitnessModifiers[data.fitnessLevel || "intermediate"];

      const recoveryTime = Math.round(baseRecovery);

      // Determine fatigue type
      let fatigueType = "";
      if (data.durationMinutes < 45 && data.intensityLevel === "maximal") {
        fatigueType = "Neuromuscular Fatigue - High intensity, short duration";
      } else if (data.durationMinutes > 90) {
        fatigueType = "Metabolic Fatigue - Extended activity duration";
      } else if (fatigueIndex > 20) {
        fatigueType = "Combined Fatigue - Both neuromuscular and metabolic";
      } else {
        fatigueType = "Mild Fatigue - Normal training response";
      }

      // Generate recommendations
      const recommendations = [];
      if (fatigueIndex < 10) {
        recommendations.push("Your fatigue resistance is excellent");
        recommendations.push("Consider increasing training intensity gradually");
        recommendations.push("Maintain current recovery protocols");
      } else if (fatigueIndex < 20) {
        recommendations.push("Normal fatigue levels for this activity");
        recommendations.push("Focus on active recovery between sets/games");
        recommendations.push("Ensure adequate hydration and nutrition");
      } else {
        recommendations.push("High fatigue levels indicate need for better conditioning");
        recommendations.push("Extend rest periods between intense activities");
        recommendations.push("Consider reducing training volume temporarily");
      }

      // Training adjustments
      const trainingAdjustments = [];
      if (fatigueIndex > 15) {
        trainingAdjustments.push("Increase aerobic base training");
        trainingAdjustments.push("Add interval training for power endurance");
        trainingAdjustments.push("Focus on proper warm-up and cool-down");
      }
      if (data.intensityLevel === "maximal" && fatigueIndex > 20) {
        trainingAdjustments.push("Reduce maximal intensity session frequency");
        trainingAdjustments.push("Add more recovery days between intense sessions");
      }
      if (recoveryTime > 30) {
        trainingAdjustments.push("Implement active recovery protocols");
        trainingAdjustments.push("Consider massage or foam rolling");
      }

      // Next test recommendation
      let nextTestTime = "";
      if (fatigueIndex < 10) nextTestTime = "Retest in 2-3 weeks";
      else if (fatigueIndex < 20) nextTestTime = "Retest in 1-2 weeks";
      else nextTestTime = "Retest in 3-5 days after recovery";

      setResults({
        fatigueIndex: Math.round(fatigueIndex * 10) / 10,
        fatigueLevel,
        performanceDrop: Math.round(performanceDrop * 10) / 10,
        recoveryTime,
        fatigueType,
        recommendations,
        trainingAdjustments,
        nextTestTime,
      });
      
      setIsCalculating(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/calculators">
              <Button variant="ghost" className="text-red-600 hover:text-red-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Calculators
              </Button>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-red-600 transition-colors">
                Dunk Calculator
              </Link>
              <Link href="/vertical-jump-training" className="text-gray-600 hover:text-red-600 transition-colors">
                Training Programs
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <Zap className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Jump Fatigue Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Measure how fatigue affects your jumping performance and get personalized recovery recommendations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Fatigue Analysis</CardTitle>
              <CardDescription>
                Compare your rested vs fatigued jump performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(calculateFatigue)} className="space-y-6">
                  {/* Jump Measurements */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="restingJump"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rested Jump Height (inches)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              placeholder="e.g., 28.5"
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
                      name="fatigueJump"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fatigued Jump Height (inches)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              placeholder="e.g., 24.0"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Activity Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="activityType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Activity Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select activity" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="practice">Practice</SelectItem>
                              <SelectItem value="game">Game</SelectItem>
                              <SelectItem value="workout">Workout</SelectItem>
                              <SelectItem value="tournament">Tournament</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="durationMinutes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration (minutes)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 90"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="intensityLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Intensity Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select intensity" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="moderate">Moderate</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="maximal">Maximal</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="restTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rest Before Test (minutes)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 5"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Optional Details */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="bodyWeight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Body Weight (lbs)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 170"
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
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 20"
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
                      name="fitnessLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fitness Level</FormLabel>
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
                              <SelectItem value="elite">Elite</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                    disabled={isCalculating}
                  >
                    {isCalculating ? "Analyzing..." : "Analyze Fatigue"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Results */}
          {results && (
            <div className="space-y-6">
              {/* Fatigue Index */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <TrendingDown className="w-5 h-5 mr-2" />
                    Fatigue Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">
                      {results.fatigueIndex}%
                    </div>
                    <div className="text-lg text-gray-700 mb-4">
                      {results.fatigueLevel}
                    </div>
                    <div className="text-sm text-gray-600">
                      Performance Drop: {results.performanceDrop}%
                    </div>
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Fatigue Type</h4>
                    <p className="text-sm text-red-700">{results.fatigueType}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Recovery Time */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-700">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Recovery Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-2">
                      {results.recoveryTime} minutes
                    </div>
                    <div className="text-sm text-gray-600">
                      Estimated recovery time to baseline
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Next Test</h4>
                    <p className="text-sm text-orange-700">{results.nextTestTime}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-800">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Immediate Actions</h4>
                      <ul className="space-y-2">
                        {results.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {results.trainingAdjustments.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Training Adjustments</h4>
                        <ul className="space-y-2">
                          {results.trainingAdjustments.map((adj, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-sm text-gray-700">{adj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* How to Use */}
        <div className="mt-16">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">How to Use This Calculator</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Testing Protocol</h3>
                  <ol className="space-y-2 text-sm text-gray-600">
                    <li>1. Measure your best vertical jump when fully rested</li>
                    <li>2. Complete your training/game activity</li>
                    <li>3. Rest for 5-10 minutes to clear acute fatigue</li>
                    <li>4. Perform 3 maximum vertical jumps and record the best</li>
                    <li>5. Enter both measurements into the calculator</li>
                  </ol>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Interpreting Results</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• <strong>0-5%:</strong> Excellent fatigue resistance</li>
                    <li>• <strong>5-15%:</strong> Normal training response</li>
                    <li>• <strong>15-25%:</strong> High fatigue, adjust training</li>
                    <li>• <strong>25%+:</strong> Severe fatigue, prioritize recovery</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}