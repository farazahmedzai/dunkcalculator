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
import { Calculator, ArrowLeft, Ruler, Target } from "lucide-react";

const standingReachSchema = z.object({
  calculationType: z.enum(["estimate", "verify"]),
  height: z.number().min(48).max(96),
  standingReach: z.number().min(48).max(120).optional(),
  armSpan: z.number().min(48).max(120).optional(),
  shoulderWidth: z.number().min(12).max(30).optional(),
  gender: z.enum(["male", "female"]),
  sport: z.enum(["basketball", "volleyball", "general"]).optional(),
});

type StandingReachForm = z.infer<typeof standingReachSchema>;

interface ReachResults {
  estimatedReach: number;
  reachToHeightRatio: number;
  comparison: string;
  accuracy: string;
  recommendations: string[];
  dungPotential: string;
}

export default function StandingReachCalculator() {
  const [results, setResults] = useState<ReachResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<StandingReachForm>({
    resolver: zodResolver(standingReachSchema),
    defaultValues: {
      calculationType: "estimate",
      gender: "male",
      sport: "basketball",
    },
  });

  const watchType = form.watch("calculationType");

  const calculateReach = (data: StandingReachForm) => {
    setIsCalculating(true);
    
    setTimeout(() => {
      let estimatedReach = 0;
      let actualReach = data.standingReach || 0;
      
      // Base estimation using height
      if (data.calculationType === "estimate" || !data.standingReach) {
        // Standard ratio is approximately 1.33 for males, 1.31 for females
        const baseRatio = data.gender === "male" ? 1.33 : 1.31;
        
        // Adjust for sport (basketball players tend to have longer reaches)
        let sportModifier = 1.0;
        if (data.sport === "basketball") sportModifier = 1.02;
        else if (data.sport === "volleyball") sportModifier = 1.01;
        
        // Use arm span if available for better accuracy
        if (data.armSpan) {
          estimatedReach = data.armSpan * 0.98; // Reach is typically 98% of arm span
        } else {
          estimatedReach = data.height * baseRatio * sportModifier;
        }
      } else {
        estimatedReach = actualReach;
      }

      // Calculate ratio
      const reachToHeightRatio = estimatedReach / data.height;

      // Determine comparison category
      let comparison = "";
      if (reachToHeightRatio < 1.25) comparison = "Below Average - Shorter reach relative to height";
      else if (reachToHeightRatio < 1.30) comparison = "Average - Typical reach-to-height ratio";
      else if (reachToHeightRatio < 1.35) comparison = "Above Average - Good reach advantage";
      else if (reachToHeightRatio < 1.40) comparison = "Excellent - Significant reach advantage";
      else comparison = "Elite - Exceptional reach-to-height ratio";

      // Calculate accuracy if verifying existing measurement
      let accuracy = "";
      if (data.calculationType === "verify" && data.standingReach) {
        const expectedReach = data.height * (data.gender === "male" ? 1.33 : 1.31);
        const difference = Math.abs(data.standingReach - expectedReach);
        if (difference < 1) accuracy = "Very Accurate - Within expected range";
        else if (difference < 2) accuracy = "Good - Slightly above/below average";
        else if (difference < 4) accuracy = "Notable Difference - Unusual but possible";
        else accuracy = "Significant Difference - Double-check measurement";
      }

      // Generate recommendations
      const recommendations = [];
      if (reachToHeightRatio < 1.30) {
        recommendations.push("Consider flexibility exercises to improve shoulder mobility");
        recommendations.push("Work on posture and core strength for better reach extension");
        recommendations.push("Focus on overhead exercises to maximize your natural reach");
      } else if (reachToHeightRatio < 1.35) {
        recommendations.push("Your reach is above average - leverage this advantage");
        recommendations.push("Practice overhead shooting and rebounding techniques");
        recommendations.push("Maintain flexibility to preserve your reach advantage");
      } else {
        recommendations.push("Excellent reach advantage - maximize this genetic gift");
        recommendations.push("Focus on timing and positioning rather than just jumping");
        recommendations.push("Consider positions that utilize your superior reach");
      }

      // Determine dunk potential
      let dungPotential = "";
      const rimHeight = 120; // Standard 10-foot rim
      const minClearance = 6; // Minimum clearance needed
      const requiredReach = rimHeight + minClearance;
      
      if (estimatedReach >= requiredReach) {
        dungPotential = "You can potentially dunk with minimal vertical jump requirement!";
      } else {
        const neededVertical = requiredReach - estimatedReach;
        if (neededVertical < 12) {
          dungPotential = `You need only ${neededVertical.toFixed(1)}" vertical jump to dunk - very achievable!`;
        } else if (neededVertical < 24) {
          dungPotential = `You need ${neededVertical.toFixed(1)}" vertical jump to dunk - challenging but realistic with training.`;
        } else {
          dungPotential = `You need ${neededVertical.toFixed(1)}" vertical jump to dunk - this will require significant athletic development.`;
        }
      }

      setResults({
        estimatedReach: Math.round(estimatedReach * 10) / 10,
        reachToHeightRatio: Math.round(reachToHeightRatio * 100) / 100,
        comparison,
        accuracy,
        recommendations,
        dungPotential,
      });
      
      setIsCalculating(false);
    }, 600);
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
              <Link href="/calculators/vertical-jump-calculator" className="text-gray-600 hover:text-green-600 transition-colors">
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
            <div className="p-3 bg-green-100 rounded-full">
              <Ruler className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Standing Reach Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your standing reach based on height and body proportions, or verify existing measurements. 
            Essential for accurate dunking assessments.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-green-600" />
                <span>How to Use</span>
              </CardTitle>
              <CardDescription>
                Enter your measurements to estimate standing reach or verify existing measurements for accuracy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(calculateReach)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="calculationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Calculation Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select calculation type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="estimate">Estimate My Standing Reach</SelectItem>
                            <SelectItem value="verify">Verify My Measurement</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                              placeholder="72"
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
                  </div>

                  {watchType === "verify" && (
                    <FormField
                      control={form.control}
                      name="standingReach"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Standing Reach (inches)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="96"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="armSpan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Arm Span (inches, optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="72"
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
                    name="sport"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Sport (optional)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select sport" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="basketball">Basketball</SelectItem>
                            <SelectItem value="volleyball">Volleyball</SelectItem>
                            <SelectItem value="general">General/Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isCalculating}
                  >
                    {isCalculating ? "Calculating..." : "Calculate Standing Reach"}
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
                  <span>Your Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{results.estimatedReach}"</div>
                    <div className="text-sm text-gray-600">Standing Reach</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{results.reachToHeightRatio}</div>
                    <div className="text-sm text-gray-600">Reach/Height Ratio</div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Comparison</h3>
                  <p className="text-gray-700">{results.comparison}</p>
                </div>

                {results.accuracy && (
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Measurement Accuracy</h3>
                    <p className="text-gray-700">{results.accuracy}</p>
                  </div>
                )}

                <div className="p-4 bg-orange-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Dunking Potential</h3>
                  <p className="text-gray-700">{results.dungPotential}</p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Recommendations</h3>
                  <ul className="space-y-2">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <Link href="/">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      Use Dunk Calculator
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
                <h3 className="font-semibold text-gray-900 mb-3">Reach-to-Height Ratios</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>1.25 or less:</span><span className="text-red-600">Below Average</span></div>
                  <div className="flex justify-between"><span>1.25-1.30:</span><span className="text-yellow-600">Average</span></div>
                  <div className="flex justify-between"><span>1.30-1.35:</span><span className="text-blue-600">Above Average</span></div>
                  <div className="flex justify-between"><span>1.35-1.40:</span><span className="text-green-600">Excellent</span></div>
                  <div className="flex justify-between"><span>1.40+:</span><span className="text-purple-600">Elite</span></div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Measurement Tips</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Stand flat-footed against a wall</li>
                  <li>• Keep both feet on the ground</li>
                  <li>• Reach up with your dominant hand</li>
                  <li>• Stretch fingers as high as possible</li>
                  <li>• Have someone else measure for accuracy</li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Improve Your Score</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Improve shoulder and thoracic spine mobility</li>
                  <li>• Practice proper measuring technique</li>
                  <li>• Work on posture and spinal alignment</li>
                  <li>• Strengthen core muscles for better positioning</li>
                  <li>• Consider your proportions are largely genetic</li>
                </ul>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Basketball Applications</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Longer reach = easier rebounds and blocks</li>
                  <li>• Affects required vertical jump for dunking</li>
                  <li>• Important for defensive positioning</li>
                  <li>• Influences shooting release point</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}