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
import { TrendingUp, ArrowLeft, Target, Star } from "lucide-react";

const maxPotentialSchema = z.object({
  currentVertical: z.number().min(6).max(50),
  height: z.number().min(48).max(96),
  age: z.number().min(12).max(45),
  trainingExperience: z.enum(["beginner", "intermediate", "advanced", "elite"]),
  athleticBackground: z.enum(["none", "recreational", "high_school", "college", "professional"]),
  bodyType: z.enum(["ectomorph", "mesomorph", "endomorph", "mixed"]),
  legLength: z.enum(["short", "average", "long"]),
  fastTwitchDominance: z.enum(["low", "moderate", "high", "unknown"]),
  injuryHistory: z.enum(["none", "minor", "moderate", "significant"]),
  trainingTime: z.number().min(1).max(40),
  currentWeight: z.number().min(80).max(400).optional(),
  optimalWeight: z.number().min(80).max(400).optional(),
});

type MaxPotentialForm = z.infer<typeof maxPotentialSchema>;

interface PotentialResults {
  maxPotential: number;
  currentGap: number;
  percentageIncrease: number;
  timeToReach: number;
  confidenceLevel: string;
  limitingFactors: string[];
  strengthAreas: string[];
  trainingPhases: Array<{
    phase: string;
    duration: string;
    focus: string;
    expectedGain: number;
  }>;
  geneticFactors: string;
  recommendations: string[];
}

export default function MaxPotentialJumpCalculator() {
  const [results, setResults] = useState<PotentialResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<MaxPotentialForm>({
    resolver: zodResolver(maxPotentialSchema),
    defaultValues: {
      trainingExperience: "intermediate",
      athleticBackground: "recreational",
      bodyType: "mesomorph",
      legLength: "average",
      fastTwitchDominance: "moderate",
      injuryHistory: "none",
      trainingTime: 12,
      currentWeight: 170,
    },
  });

  const calculateMaxPotential = (data: MaxPotentialForm) => {
    setIsCalculating(true);
    
    setTimeout(() => {
      // Base potential calculation
      let basePotential = data.currentVertical;

      // Age factor (younger athletes have more potential)
      let ageFactor = 1.0;
      if (data.age < 18) ageFactor = 1.8;
      else if (data.age < 22) ageFactor = 1.6;
      else if (data.age < 26) ageFactor = 1.4;
      else if (data.age < 30) ageFactor = 1.2;
      else if (data.age < 35) ageFactor = 1.0;
      else ageFactor = 0.8;

      // Training experience factor
      const experienceFactors = {
        beginner: 2.0,
        intermediate: 1.5,
        advanced: 1.2,
        elite: 1.05
      };

      // Athletic background factor
      const backgroundFactors = {
        none: 1.0,
        recreational: 1.1,
        high_school: 1.2,
        college: 1.3,
        professional: 1.4
      };

      // Body type factor
      const bodyTypeFactors = {
        ectomorph: 1.3, // Natural jumpers
        mesomorph: 1.2,
        endomorph: 0.9,
        mixed: 1.1
      };

      // Leg length factor
      const legLengthFactors = {
        short: 0.9,
        average: 1.0,
        long: 1.2
      };

      // Fast twitch dominance
      const fastTwitchFactors = {
        low: 0.8,
        moderate: 1.0,
        high: 1.4,
        unknown: 1.0
      };

      // Injury history factor
      const injuryFactors = {
        none: 1.0,
        minor: 0.95,
        moderate: 0.85,
        severe: 0.7
      };

      // Calculate potential gain
      const totalFactor = ageFactor * 
        experienceFactors[data.trainingExperience] * 
        backgroundFactors[data.athleticBackground] * 
        bodyTypeFactors[data.bodyType] * 
        legLengthFactors[data.legLength] * 
        fastTwitchFactors[data.fastTwitchDominance] * 
        injuryFactors[data.injuryHistory];

      const potentialGain = Math.min(24, basePotential * (totalFactor - 1));
      const maxPotential = basePotential + potentialGain;
      const currentGap = maxPotential - basePotential;
      const percentageIncrease = (currentGap / basePotential) * 100;

      // Time to reach calculation
      const monthsPerInch = data.trainingExperience === "beginner" ? 1.5 : 
                           data.trainingExperience === "intermediate" ? 2.0 : 3.0;
      const timeToReach = Math.max(6, currentGap * monthsPerInch);

      // Confidence level
      let confidenceLevel = "";
      if (totalFactor > 1.8) confidenceLevel = "Very High - Excellent genetic and training potential";
      else if (totalFactor > 1.5) confidenceLevel = "High - Good combination of factors";
      else if (totalFactor > 1.2) confidenceLevel = "Moderate - Realistic with consistent training";
      else confidenceLevel = "Conservative - Limited by current factors";

      // Limiting factors
      const limitingFactors = [];
      if (data.age > 30) limitingFactors.push("Age - Peak athletic years behind");
      if (data.trainingExperience === "advanced") limitingFactors.push("Training plateau - Diminishing returns");
      if (data.injuryHistory !== "none") limitingFactors.push("Injury history - Reduced capacity");
      if (data.bodyType === "endomorph") limitingFactors.push("Body type - Less favorable for jumping");
      if (data.fastTwitchDominance === "low") limitingFactors.push("Muscle fiber type - Limited explosive potential");

      // Training phases
      const trainingPhases = [
        {
          phase: "Foundation (Months 1-3)",
          duration: "12 weeks",
          focus: "Build base strength and movement quality",
          expectedGain: currentGap * 0.3
        },
        {
          phase: "Power Development (Months 4-8)",
          duration: "20 weeks", 
          focus: "Plyometrics and explosive strength",
          expectedGain: currentGap * 0.4
        },
        {
          phase: "Peak Performance (Months 9-12)",
          duration: "16 weeks",
          focus: "Sport-specific power and technique",
          expectedGain: currentGap * 0.3
        }
      ];

      setResults({
        maxPotential: Math.round(maxPotential * 10) / 10,
        currentGap: Math.round(currentGap * 10) / 10,
        percentageIncrease: Math.round(percentageIncrease * 10) / 10,
        timeToReach: Math.round(timeToReach),
        confidenceLevel,
        limitingFactors,
        strengthAreas: ["Explosive leg strength", "Reactive ability", "Movement efficiency"],
        trainingPhases,
        geneticFactors: totalFactor > 1.5 ? "Above average genetic potential" : "Average genetic potential",
        recommendations: ["Follow structured periodized training", "Focus on consistency over intensity", "Monitor progress monthly"]
      });
      
      setIsCalculating(false);
    }, 900);
  };
      
      const maxPotential = basePotential + (
        gainPotential * 
        ageFactor * 
        experienceFactors[data.trainingExperience] * 
        backgroundFactors[data.athleticBackground] * 
        bodyTypeFactors[data.bodyType] * 
        legLengthFactors[data.legLength] * 
        fastTwitchFactors[data.fastTwitchDominance] * 
        injuryFactors[data.injuryHistory]
      );

      const finalMaxPotential = Math.min(50, Math.max(data.currentVertical + 2, maxPotential));
      const currentGap = finalMaxPotential - data.currentVertical;
      const percentageIncrease = (currentGap / data.currentVertical) * 100;

      // Calculate time to reach potential
      let timeToReach = data.trainingTime;
      if (data.trainingExperience === "beginner") timeToReach *= 0.6;
      else if (data.trainingExperience === "advanced") timeToReach *= 1.4;
      else if (data.trainingExperience === "elite") timeToReach *= 2.0;

      // Confidence level
      let confidenceLevel = "";
      if (data.age < 20 && data.trainingExperience === "beginner") {
        confidenceLevel = "Very High - Optimal age and training status";
      } else if (data.age < 25 && currentGap < 12) {
        confidenceLevel = "High - Good potential for improvement";
      } else if (data.age < 30 && currentGap < 8) {
        confidenceLevel = "Moderate - Realistic gains possible";
      } else {
        confidenceLevel = "Conservative - Improvements may be limited";
      }

      // Identify limiting factors
      const limitingFactors = [];
      if (data.age > 30) limitingFactors.push("Age-related recovery limitations");
      if (data.trainingExperience === "elite") limitingFactors.push("Already near genetic ceiling");
      if (data.injuryHistory !== "none") limitingFactors.push("Previous injury complications");
      if (data.bodyType === "endomorph") limitingFactors.push("Body composition challenges");
      if (data.fastTwitchDominance === "low") limitingFactors.push("Fiber type limitations");

      // Identify strength areas
      const strengthAreas = [];
      if (data.age < 25) strengthAreas.push("Young age for neuroplasticity");
      if (data.trainingExperience === "beginner") strengthAreas.push("High adaptation potential");
      if (data.bodyType === "ectomorph") strengthAreas.push("Natural jumping biomechanics");
      if (data.legLength === "long") strengthAreas.push("Favorable limb proportions");
      if (data.fastTwitchDominance === "high") strengthAreas.push("Explosive muscle fibers");

      // Training phases
      const trainingPhases = [];
      if (data.trainingExperience === "beginner") {
        trainingPhases.push({
          phase: "Foundation Phase",
          duration: "3-4 months",
          focus: "Basic strength and movement patterns",
          expectedGain: Math.round(currentGap * 0.4)
        });
        trainingPhases.push({
          phase: "Development Phase",
          duration: "4-6 months",
          focus: "Power development and plyometrics",
          expectedGain: Math.round(currentGap * 0.35)
        });
        trainingPhases.push({
          phase: "Optimization Phase",
          duration: "3-4 months",
          focus: "Peak power and sport-specific training",
          expectedGain: Math.round(currentGap * 0.25)
        });
      } else {
        trainingPhases.push({
          phase: "Intensity Phase",
          duration: "2-3 months",
          focus: "High-intensity strength training",
          expectedGain: Math.round(currentGap * 0.5)
        });
        trainingPhases.push({
          phase: "Power Phase",
          duration: "3-4 months",
          focus: "Explosive power development",
          expectedGain: Math.round(currentGap * 0.5)
        });
      }

      // Genetic factors assessment
      let geneticFactors = "";
      if (data.fastTwitchDominance === "high" && data.bodyType === "ectomorph") {
        geneticFactors = "Excellent genetic profile for jumping - natural explosive power";
      } else if (data.legLength === "long" && data.bodyType === "mesomorph") {
        geneticFactors = "Good genetic foundation - favorable body structure";
      } else if (data.fastTwitchDominance === "low" || data.bodyType === "endomorph") {
        geneticFactors = "Average genetic profile - improvements possible through training";
      } else {
        geneticFactors = "Balanced genetic profile - consistent training will yield results";
      }

      // Recommendations
      const recommendations = [];
      if (currentGap > 10) {
        recommendations.push("Start with foundational strength training for 2-3 months");
        recommendations.push("Focus on technique improvement alongside strength gains");
      }
      if (data.age > 25) {
        recommendations.push("Emphasize recovery and injury prevention protocols");
        recommendations.push("Consider longer training cycles for adaptation");
      }
      if (data.injuryHistory !== "none") {
        recommendations.push("Work with a qualified trainer for safe progression");
        recommendations.push("Include comprehensive warm-up and mobility work");
      }
      recommendations.push("Track progress monthly to adjust training intensity");
      recommendations.push("Maintain consistency over quick fixes for best results");

      setResults({
        maxPotential: Math.round(finalMaxPotential * 10) / 10,
        currentGap: Math.round(currentGap * 10) / 10,
        percentageIncrease: Math.round(percentageIncrease * 10) / 10,
        timeToReach: Math.round(timeToReach),
        confidenceLevel,
        limitingFactors,
        strengthAreas,
        trainingPhases,
        geneticFactors,
        recommendations,
      });
      
      setIsCalculating(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/calculators">
              <Button variant="ghost" className="text-purple-600 hover:text-purple-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Calculators
              </Button>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors">
                Dunk Calculator
              </Link>
              <Link href="/vertical-jump-training" className="text-gray-600 hover:text-purple-600 transition-colors">
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
            <div className="p-3 bg-purple-100 rounded-full">
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Max Potential Jump Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your theoretical maximum vertical jump based on genetics, training status, and biological factors
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Potential Analysis</CardTitle>
              <CardDescription>
                Comprehensive assessment of your jumping potential
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(calculateMaxPotential)} className="space-y-6">
                  {/* Current Status */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="currentVertical"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Vertical Jump (inches)</FormLabel>
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
                  </div>

                  {/* Training Background */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="trainingExperience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Training Experience</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                              <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                              <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                              <SelectItem value="elite">Elite (Professional level)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="athleticBackground"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Athletic Background</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select background" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">No Organized Sports</SelectItem>
                              <SelectItem value="recreational">Recreational Sports</SelectItem>
                              <SelectItem value="high_school">High School Sports</SelectItem>
                              <SelectItem value="college">College Sports</SelectItem>
                              <SelectItem value="professional">Professional Sports</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Physical Characteristics */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="bodyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Body Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ectomorph">Ectomorph (Lean/Tall)</SelectItem>
                              <SelectItem value="mesomorph">Mesomorph (Muscular)</SelectItem>
                              <SelectItem value="endomorph">Endomorph (Stocky)</SelectItem>
                              <SelectItem value="mixed">Mixed Type</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="legLength"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Leg Length (Relative)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select length" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="short">Short</SelectItem>
                              <SelectItem value="average">Average</SelectItem>
                              <SelectItem value="long">Long</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fastTwitchDominance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fast-Twitch Dominance</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select dominance" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low (Endurance athlete)</SelectItem>
                              <SelectItem value="moderate">Moderate (Balanced)</SelectItem>
                              <SelectItem value="high">High (Natural sprinter)</SelectItem>
                              <SelectItem value="unknown">Unknown</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Additional Factors */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="injuryHistory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Injury History</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select history" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">No Major Injuries</SelectItem>
                              <SelectItem value="minor">Minor Injuries</SelectItem>
                              <SelectItem value="moderate">Moderate Injuries</SelectItem>
                              <SelectItem value="significant">Significant Injuries</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="trainingTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Training Time Available (months)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 12"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Optional Weight Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="currentWeight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Weight (lbs)</FormLabel>
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
                      name="optimalWeight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Weight (lbs) - Optional</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 165"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
                    disabled={isCalculating}
                  >
                    {isCalculating ? "Calculating Potential..." : "Calculate Max Potential"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Results */}
          {results && (
            <div className="space-y-6">
              {/* Max Potential */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-700">
                    <Star className="w-5 h-5 mr-2" />
                    Maximum Potential
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {results.maxPotential}"
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      Theoretical Maximum Vertical
                    </div>
                    <div className="text-lg text-green-600 font-semibold">
                      +{results.currentGap}" possible gain
                    </div>
                    <div className="text-sm text-gray-600">
                      ({results.percentageIncrease}% increase)
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Confidence Level</h4>
                    <p className="text-sm text-purple-700">{results.confidenceLevel}</p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Timeline</h4>
                    <p className="text-sm text-blue-700">{results.timeToReach} months of focused training</p>
                  </div>
                </CardContent>
              </Card>

              {/* Genetic Factors */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-800">Genetic Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-4">{results.geneticFactors}</p>
                  
                  {results.strengthAreas.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-green-800 mb-2">Natural Advantages</h4>
                      <ul className="space-y-1">
                        {results.strengthAreas.map((strength, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {results.limitingFactors.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-red-800 mb-2">Limiting Factors</h4>
                      <ul className="space-y-1">
                        {results.limitingFactors.map((factor, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{factor}</span>
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

        {/* Training Phases */}
        {results && (
          <div className="mt-12">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Training Progression Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.trainingPhases.map((phase, index) => (
                    <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg">
                      <h3 className="font-semibold text-gray-800 mb-2">{phase.phase}</h3>
                      <div className="space-y-2 text-sm">
                        <div><strong>Duration:</strong> {phase.duration}</div>
                        <div><strong>Focus:</strong> {phase.focus}</div>
                        <div className="text-purple-600 font-semibold">
                          Expected Gain: +{phase.expectedGain}"
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recommendations */}
        {results && (
          <div className="mt-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">Personalized Recommendations</CardTitle>
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
          </div>
        )}
      </div>
    </div>
  );
}