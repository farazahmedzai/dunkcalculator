import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { maxPotentialCalculatorSchema, type MaxPotentialCalculatorForm } from "@/lib/validation-schemas";
import { ArrowLeft, Target, TrendingUp, Clock, Star } from "lucide-react";
import SEOPageLayout from "@/components/shared/seo-page-layout";
import { generateCalculatorSchema, generateWebPageSchema, BreadcrumbItem } from "@/lib/seo";

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

  const form = useForm<MaxPotentialCalculatorForm>({
    resolver: zodResolver(maxPotentialCalculatorSchema),
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

  const calculateMaxPotential = (data: MaxPotentialCalculatorForm) => {
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Max Potential Jump Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover your maximum jumping potential based on your genetic factors, training experience, and athletic background.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-purple-600" />
                <span>Potential Analysis</span>
              </CardTitle>
              <CardDescription>
                Enter your current metrics and background to calculate your maximum jumping potential.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(calculateMaxPotential)} className="space-y-6">
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
                              <SelectItem value="elite">Elite (Professional)</SelectItem>
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
                              <SelectItem value="none">No Sports Background</SelectItem>
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

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="bodyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Body Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select body type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ectomorph">Ectomorph (Lean/Tall)</SelectItem>
                              <SelectItem value="mesomorph">Mesomorph (Athletic)</SelectItem>
                              <SelectItem value="endomorph">Endomorph (Stocky)</SelectItem>
                              <SelectItem value="mixed">Mixed</SelectItem>
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
                          <FormLabel>Fast-Twitch Muscle Dominance</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select dominance" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low (Endurance oriented)</SelectItem>
                              <SelectItem value="moderate">Moderate (Balanced)</SelectItem>
                              <SelectItem value="high">High (Explosive)</SelectItem>
                              <SelectItem value="unknown">Unknown</SelectItem>
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
                              <SelectItem value="none">No Injuries</SelectItem>
                              <SelectItem value="minor">Minor Injuries</SelectItem>
                              <SelectItem value="moderate">Moderate Injuries</SelectItem>
                              <SelectItem value="severe">Severe Injuries</SelectItem>
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
                          <FormLabel>Training Timeline (months)</FormLabel>
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
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700" 
                    disabled={isCalculating}
                  >
                    {isCalculating ? "Calculating..." : "Calculate Max Potential"}
                    <Target className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {results && (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Your Potential Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center p-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg">
                    <div className="text-3xl font-bold">{results.maxPotential}"</div>
                    <div className="text-sm opacity-90">Maximum Potential</div>
                    <div className="text-sm mt-2">+{results.currentGap}" improvement ({results.percentageIncrease}%)</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">{results.timeToReach}</div>
                      <div className="text-sm text-gray-600">Months to Reach</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-lg font-bold text-gray-900">{results.geneticFactors}</div>
                      <div className="text-sm text-gray-600">Genetic Profile</div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Confidence Level</h4>
                    <p className="text-green-800">{results.confidenceLevel}</p>
                  </div>

                  {results.limitingFactors.length > 0 && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-900 mb-2">Limiting Factors</h4>
                      <ul className="text-yellow-800 space-y-1">
                        {results.limitingFactors.map((factor, index) => (
                          <li key={index} className="text-sm">• {factor}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Training Phases</h4>
                    <div className="space-y-2">
                      {results.trainingPhases.map((phase, index) => (
                        <div key={index} className="text-blue-800 border-l-2 border-blue-300 pl-3">
                          <div className="font-medium">{phase.phase}</div>
                          <div className="text-sm">
                            {phase.focus} - Expected gain: +{phase.expectedGain.toFixed(1)}"
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Recommendations</h4>
                    <ul className="text-purple-800 space-y-1">
                      {results.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm">• {rec}</li>
                      ))}
                    </ul>
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