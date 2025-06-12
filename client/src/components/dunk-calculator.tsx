import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateDunkRequirements } from "@/lib/calculator";
import { dunkCalculatorSchema, type DunkCalculatorForm } from "@/lib/validation-schemas";
import type { CalculationResults } from "@/pages/home";

interface DunkCalculatorProps {
  onCalculate: (results: CalculationResults) => void;
}

export default function DunkCalculator({ onCalculate }: DunkCalculatorProps) {
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<DunkCalculatorForm>({
    resolver: zodResolver(dunkCalculatorSchema),
    defaultValues: {
      height: 0,
      standingReach: 0,
      rimHeight: 120,
      clearance: 6,
      bodyWeight: 0,
      jumpType: "standing",
      handSize: "average",
      experience: "beginner",
    },
  });

  const onSubmit = async (data: DunkCalculatorForm) => {
    setIsCalculating(true);
    
    try {
      // Validate that standing reach is reasonable compared to height
      if (data.standingReach < data.height) {
        form.setError("standingReach", {
          message: "Standing reach should typically be equal to or greater than height"
        });
        return;
      }

      const results = calculateDunkRequirements(data);
      onCalculate(results);

      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.querySelector('[data-results-section]');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } catch (error) {
      console.error("Calculation error:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
        <h3 className="text-2xl font-bold text-white flex items-center">
          <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Enter Your Measurements
        </h3>
        <p className="text-white/90 mt-2">Provide accurate measurements for precise calculations</p>
      </div>
      
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Measurements Section */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Basic Measurements
              </h4>
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Height (inches)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.5"
                          min="48"
                          max="96"
                          placeholder="Enter your height"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          className="border-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500/20 rounded-lg h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="standingReach"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Standing Reach (inches)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.5"
                          min="60"
                          max="120"
                          placeholder="Enter your standing reach"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          className="border-2 border-gray-300 focus:border-orange-500 focus:ring-orange-500/20 rounded-lg h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Rim Configuration Section */}
            <div className="bg-blue-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Rim Configuration
              </h4>
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="rimHeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Rim Height</FormLabel>
                      <Select onValueChange={(value) => field.onChange(parseFloat(value))} defaultValue="120">
                        <FormControl>
                          <SelectTrigger className="border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg h-12">
                            <SelectValue placeholder="Select rim height" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="120">NBA/College (10 ft)</SelectItem>
                          <SelectItem value="108">Youth (9 ft)</SelectItem>
                          <SelectItem value="96">Kids (8 ft)</SelectItem>
                          <SelectItem value="84">Mini (7 ft)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="clearance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Clearance (inches)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.5"
                          min="2"
                          max="12"
                          placeholder="Desired clearance"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 6)}
                          className="border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Optional Parameters Section */}
            <div className="bg-green-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
                Additional Parameters
              </h4>
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="bodyWeight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Body Weight (lbs) - Optional</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="1"
                          min="80"
                          max="400"
                          placeholder="Enter your weight"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          className="border-2 border-gray-300 focus:border-green-500 focus:ring-green-500/20 rounded-lg h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jumpType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Jump Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue="standing">
                        <FormControl>
                          <SelectTrigger className="border-2 border-gray-300 focus:border-green-500 focus:ring-green-500/20 rounded-lg h-12">
                            <SelectValue placeholder="Select jump type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="standing">Standing Jump</SelectItem>
                          <SelectItem value="approach">Running Approach</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Player Characteristics Section */}
            <div className="bg-purple-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Player Characteristics
              </h4>
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="handSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Hand Size</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue="average">
                        <FormControl>
                          <SelectTrigger className="border-2 border-gray-300 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg h-12">
                            <SelectValue placeholder="Select hand size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="small">Small (under 8.5 inches)</SelectItem>
                          <SelectItem value="average">Average (8.5 - 9.5 inches)</SelectItem>
                          <SelectItem value="large">Large (over 9.5 inches)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Basketball Experience</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue="beginner">
                        <FormControl>
                          <SelectTrigger className="border-2 border-gray-300 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg h-12">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                          <SelectItem value="intermediate">Intermediate (3-5 years)</SelectItem>
                          <SelectItem value="advanced">Advanced (6+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isCalculating}
              className="w-full bg-orange-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors transform hover:scale-105"
              size="lg"
            >
              {isCalculating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calculating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Calculate My Dunk Requirements
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
