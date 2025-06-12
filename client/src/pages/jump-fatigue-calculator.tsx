import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { jumpFatigueCalculatorSchema, type JumpFatigueCalculatorForm } from "@/lib/validation-schemas";
import { ArrowLeft, Zap, TrendingDown, Clock, AlertTriangle } from "lucide-react";
import SEOPageLayout from "@/components/shared/seo-page-layout";
import { generateCalculatorSchema, generateWebPageSchema, BreadcrumbItem } from "@/lib/seo";

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

  const form = useForm<JumpFatigueCalculatorForm>({
    resolver: zodResolver(jumpFatigueCalculatorSchema),
    defaultValues: {
      activityType: "practice",
      intensityLevel: "moderate",
      restTime: 5,
      bodyWeight: 170,
      age: 20,
      fitnessLevel: "intermediate",
    },
  });

  const calculateFatigue = (data: JumpFatigueCalculatorForm) => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const performanceDrop = ((data.restingJump - data.fatigueJump) / data.restingJump) * 100;
      const fatigueIndex = Math.min(100, Math.max(0, performanceDrop));

      let fatigueLevel = "";
      if (fatigueIndex < 5) fatigueLevel = "Minimal Fatigue - Excellent recovery";
      else if (fatigueIndex < 10) fatigueLevel = "Low Fatigue - Good conditioning";
      else if (fatigueIndex < 15) fatigueLevel = "Moderate Fatigue - Normal response";
      else if (fatigueIndex < 25) fatigueLevel = "High Fatigue - Needs attention";
      else fatigueLevel = "Severe Fatigue - Recovery required";

      let baseRecovery = fatigueIndex * 0.8;
      const intensityModifiers = { low: 0.7, moderate: 1.0, high: 1.3, maximal: 1.6 };
      baseRecovery *= intensityModifiers[data.intensityLevel];

      if (data.durationMinutes > 120) baseRecovery *= 1.2;
      else if (data.durationMinutes < 30) baseRecovery *= 0.8;

      const fitnessModifiers = { beginner: 1.4, intermediate: 1.0, advanced: 0.8, elite: 0.6 };
      baseRecovery *= fitnessModifiers[data.fitnessLevel || "intermediate"];

      const recoveryTime = Math.round(baseRecovery);

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

      const recommendations = [];
      if (fatigueIndex < 10) {
        recommendations.push("Excellent fatigue resistance - maintain current training load");
        recommendations.push("Consider increasing training intensity for continued adaptation");
        recommendations.push("Focus on skill development during low fatigue periods");
      } else if (fatigueIndex < 20) {
        recommendations.push("Normal fatigue response - monitor recovery closely");
        recommendations.push("Ensure adequate rest between high-intensity sessions");
        recommendations.push("Consider light active recovery activities");
      } else if (fatigueIndex < 30) {
        recommendations.push("Elevated fatigue - reduce training volume temporarily");
        recommendations.push("Focus on recovery protocols (sleep, nutrition, hydration)");
        recommendations.push("Incorporate more rest days into training schedule");
      } else {
        recommendations.push("High fatigue levels - immediate recovery focus needed");
        recommendations.push("Consider 24-48 hour complete rest period");
        recommendations.push("Evaluate training program for overreaching signs");
      }

      const trainingAdjustments = [];
      if (fatigueIndex > 15) {
        trainingAdjustments.push("Reduce plyometric volume by 30-50%");
        trainingAdjustments.push("Increase rest periods between sets");
        trainingAdjustments.push("Focus on technique rather than intensity");
      } else {
        trainingAdjustments.push("Current training load appears appropriate");
        trainingAdjustments.push("Can maintain or slightly increase volume");
        trainingAdjustments.push("Good recovery between sessions");
      }

      const nextTestTime = new Date();
      nextTestTime.setHours(nextTestTime.getHours() + recoveryTime);

      setResults({
        fatigueIndex: Math.round(fatigueIndex * 10) / 10,
        fatigueLevel,
        performanceDrop: Math.round(performanceDrop * 10) / 10,
        recoveryTime,
        fatigueType,
        recommendations,
        trainingAdjustments,
        nextTestTime: nextTestTime.toLocaleString(),
      });
      
      setIsCalculating(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
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
              <Link href="/calculators/vertical-jump-calculator" className="text-gray-600 hover:text-red-600 transition-colors">
                Vertical Jump Calculator
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <Zap className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Jump Fatigue Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track how fatigue affects your jumping performance and get recovery recommendations for optimal training adaptation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingDown className="w-5 h-5 text-red-600" />
                <span>Fatigue Analysis</span>
              </CardTitle>
              <CardDescription>
                Compare your rested vs fatigued jump performance to analyze fatigue impact and recovery needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(calculateFatigue)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="restingJump"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rested Jump (inches)</FormLabel>
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
                      name="fatigueJump"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fatigued Jump (inches)</FormLabel>
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
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                              <SelectItem value="training">Training</SelectItem>
                              <SelectItem value="testing">Testing</SelectItem>
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
                              placeholder="90"
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
                              <SelectItem value="low">Low (Recovery)</SelectItem>
                              <SelectItem value="moderate">Moderate (Training)</SelectItem>
                              <SelectItem value="high">High (Competition)</SelectItem>
                              <SelectItem value="maximal">Maximal (Testing)</SelectItem>
                            </SelectContent>
                          </Select>
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
                    className="w-full bg-red-600 hover:bg-red-700" 
                    disabled={isCalculating}
                  >
                    {isCalculating ? "Analyzing..." : "Analyze Fatigue"}
                    <Zap className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {results && (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <span>Fatigue Analysis Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg">
                    <div className="text-3xl font-bold">{results.fatigueIndex}%</div>
                    <div className="text-sm opacity-90">Fatigue Index</div>
                    <div className="text-sm mt-2">{results.fatigueLevel}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">{results.performanceDrop}%</div>
                      <div className="text-sm text-gray-600">Performance Drop</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">{results.recoveryTime}h</div>
                      <div className="text-sm text-gray-600">Recovery Time</div>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">Fatigue Type</h4>
                    <p className="text-orange-800">{results.fatigueType}</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Recommendations</h4>
                    <ul className="text-blue-800 space-y-1">
                      {results.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm">• {rec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Training Adjustments</h4>
                    <ul className="text-green-800 space-y-1">
                      {results.trainingAdjustments.map((adj, index) => (
                        <li key={index} className="text-sm">• {adj}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Next Test</h4>
                    <p className="text-purple-800">{results.nextTestTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}