import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Activity, ArrowLeft, BarChart, Target } from "lucide-react";

const jumpComparisonSchema = z.object({
  standingJump: z.number().min(0).max(60),
  approachJump: z.number().min(0).max(60),
  bodyWeight: z.number().min(80).max(400).optional(),
  dominantLeg: z.enum(["left", "right"]),
  experienceLevel: z.enum(["beginner", "intermediate", "advanced"]),
  sport: z.enum(["basketball", "volleyball", "track", "general"]).optional(),
});

type JumpComparisonForm = z.infer<typeof jumpComparisonSchema>;

interface ComparisonResults {
  approachAdvantage: number;
  percentageIncrease: number;
  jumpingStyle: string;
  strengthProfile: string;
  recommendations: string[];
  optimalStyle: string;
  trainingFocus: string[];
}

export default function ApproachVsStandingJumpCalculator() {
  const [results, setResults] = useState<ComparisonResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<JumpComparisonForm>({
    resolver: zodResolver(jumpComparisonSchema),
    defaultValues: {
      dominantLeg: "right",
      experienceLevel: "intermediate",
      sport: "basketball",
      bodyWeight: 170,
    },
  });

  const calculateComparison = (data: JumpComparisonForm) => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const approachAdvantage = data.approachJump - data.standingJump;
      const percentageIncrease = data.standingJump > 0 ? (approachAdvantage / data.standingJump) * 100 : 0;

      // Determine jumping style preference
      let jumpingStyle = "";
      if (percentageIncrease < 15) {
        jumpingStyle = "Two-Foot Jumper - You rely more on bilateral power and technique";
      } else if (percentageIncrease < 30) {
        jumpingStyle = "Balanced Jumper - You can effectively use both styles";
      } else {
        jumpingStyle = "One-Foot Jumper - You excel at converting horizontal momentum to vertical power";
      }

      // Analyze strength profile
      let strengthProfile = "";
      if (percentageIncrease < 20) {
        strengthProfile = "Strength-Dominant - You likely have good bilateral leg strength and prefer controlled jumping";
      } else if (percentageIncrease < 35) {
        strengthProfile = "Balanced Profile - Good combination of strength and reactive ability";
      } else {
        strengthProfile = "Speed-Dominant - You excel at reactive strength and momentum conversion";
      }

      // Generate recommendations
      const recommendations = [];
      if (percentageIncrease < 15) {
        recommendations.push("Focus on bilateral leg strength training (squats, deadlifts)");
        recommendations.push("Practice single-leg plyometrics to improve approach jumping");
        recommendations.push("Work on stride mechanics and takeoff timing");
      } else if (percentageIncrease < 30) {
        recommendations.push("Continue developing both jumping styles for versatility");
        recommendations.push("Add reactive strength exercises (depth jumps, bounds)");
        recommendations.push("Practice game-specific jumping scenarios");
      } else {
        recommendations.push("Leverage your natural approach jumping ability");
        recommendations.push("Work on bilateral strength to improve standing jump");
        recommendations.push("Focus on takeoff mechanics and timing");
      }

      // Determine optimal style for sport
      let optimalStyle = "";
      if (data.sport === "basketball") {
        if (percentageIncrease > 25) {
          optimalStyle = "Approach jump for dunking and layups, develop standing jump for rebounds";
        } else {
          optimalStyle = "Standing jump for rebounds and put-backs, approach for transition plays";
        }
      } else if (data.sport === "volleyball") {
        if (percentageIncrease > 20) {
          optimalStyle = "Approach jump for attacking, work on standing jump for blocking";
        } else {
          optimalStyle = "Strong blocking potential with standing jump, maintain approach technique";
        }
      } else {
        optimalStyle = percentageIncrease > 25 ? "Focus on approach jumping for maximum height" : "Develop both styles for overall athleticism";
      }

      // Training focus areas
      const trainingFocus = [];
      if (data.standingJump < 20) {
        trainingFocus.push("Bilateral leg strength (squats, Bulgarian split squats)");
      }
      if (approachAdvantage < 6) {
        trainingFocus.push("Single-leg power development (bounds, single-leg hops)");
      }
      if (percentageIncrease > 40) {
        trainingFocus.push("Standing jump technique and bilateral coordination");
      } else if (percentageIncrease < 15) {
        trainingFocus.push("Approach mechanics and momentum conversion");
      }

      setResults({
        approachAdvantage: Math.round(approachAdvantage * 10) / 10,
        percentageIncrease: Math.round(percentageIncrease * 10) / 10,
        jumpingStyle,
        strengthProfile,
        recommendations,
        optimalStyle,
        trainingFocus,
      });
      
      setIsCalculating(false);
    }, 700);
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
              <Link href="/calculators/vertical-jump-calculator" className="text-gray-600 hover:text-purple-600 transition-colors">
                Vertical Jump Calculator
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Activity className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Approach vs Standing Jump Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compare your one-foot approach jump versus two-foot standing jump to understand your athletic profile and optimize training.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart className="w-5 h-5 text-purple-600" />
                <span>How to Use</span>
              </CardTitle>
              <CardDescription>
                Enter your best vertical jump measurements for both jumping styles to analyze your athletic profile.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(calculateComparison)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="standingJump"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Standing Jump (inches)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="24"
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
                      name="approachJump"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Approach Jump (inches)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="30"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                      name="bodyWeight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Body Weight (lbs)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="170"
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
                      name="dominantLeg"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Takeoff Leg</FormLabel>
                          <FormControl>
                            <select 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                            >
                              <option value="left">Left Foot</option>
                              <option value="right">Right Foot</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="experienceLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience Level</FormLabel>
                          <FormControl>
                            <select 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                            >
                              <option value="beginner">Beginner</option>
                              <option value="intermediate">Intermediate</option>
                              <option value="advanced">Advanced</option>
                            </select>
                          </FormControl>
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
                          <FormControl>
                            <select 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                            >
                              <option value="basketball">Basketball</option>
                              <option value="volleyball">Volleyball</option>
                              <option value="track">Track & Field</option>
                              <option value="general">General Fitness</option>
                            </select>
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
                    {isCalculating ? "Analyzing..." : "Compare Jump Styles"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Results */}
          {results && (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  <span>Your Athletic Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">+{results.approachAdvantage}"</div>
                    <div className="text-sm text-gray-600">Approach Advantage</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{results.percentageIncrease}%</div>
                    <div className="text-sm text-gray-600">Improvement</div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Jumping Style</h3>
                  <p className="text-gray-700">{results.jumpingStyle}</p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Strength Profile</h3>
                  <p className="text-gray-700">{results.strengthProfile}</p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Sport-Specific Advice</h3>
                  <p className="text-gray-700">{results.optimalStyle}</p>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Training Focus</h3>
                  <ul className="space-y-2">
                    {results.trainingFocus.map((focus, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700">{focus}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Recommendations</h3>
                  <ul className="space-y-2">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <Link href="/vertical-jump-training">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Get Training Program
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* What Your Result Means Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What Your Result Means</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Approach Advantage Ranges</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>0-3 inches:</span><span className="text-red-600">Minimal Difference</span></div>
                  <div className="flex justify-between"><span>4-6 inches:</span><span className="text-yellow-600">Moderate Advantage</span></div>
                  <div className="flex justify-between"><span>7-10 inches:</span><span className="text-blue-600">Good Advantage</span></div>
                  <div className="flex justify-between"><span>11-15 inches:</span><span className="text-green-600">Strong Advantage</span></div>
                  <div className="flex justify-between"><span>15+ inches:</span><span className="text-purple-600">Exceptional</span></div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Jump Style Applications</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <strong>Standing:</strong> Rebounds, blocks, put-backs</li>
                  <li>• <strong>Approach:</strong> Dunks, layups, spikes</li>
                  <li>• <strong>Basketball:</strong> Both styles needed</li>
                  <li>• <strong>Volleyball:</strong> Approach for attacks, standing for blocks</li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Improve Your Score</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Practice both jumping styles regularly</li>
                  <li>• Strengthen your weaker jumping pattern</li>
                  <li>• Work on takeoff mechanics and timing</li>
                  <li>• Add plyometric exercises for both styles</li>
                  <li>• Focus on sport-specific movement patterns</li>
                </ul>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Training Guidelines</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <strong>Two-foot jumpers:</strong> Add reactive training</li>
                  <li>• <strong>One-foot jumpers:</strong> Build bilateral strength</li>
                  <li>• <strong>Balanced:</strong> Maintain both capabilities</li>
                  <li>• Practice game-specific scenarios</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}