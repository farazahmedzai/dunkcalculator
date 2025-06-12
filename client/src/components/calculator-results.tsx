import { Card, CardContent } from "@/components/ui/card";
import type { CalculationResults } from "@/pages/home";

interface CalculatorResultsProps {
  results: CalculationResults | null;
}

export default function CalculatorResults({ results }: CalculatorResultsProps) {
  if (!results) {
    return (
      <div data-results-section className="space-y-4">
        <Card className="bg-gradient-to-r from-gray-100 to-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold mb-2 text-gray-500">Required Vertical Jump</h4>
                <p className="text-3xl font-bold text-gray-400">--"</p>
              </div>
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </div>
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-r from-gray-100 to-gray-200">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold mb-2 text-gray-500">Hang Time</h4>
              <p className="text-2xl font-bold text-gray-400">--s</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-gray-100 to-gray-200">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold mb-2 text-gray-500">Power Required</h4>
              <p className="text-2xl font-bold text-gray-400">--W</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getAssessmentStyle = () => {
    if (results.canDunk) {
      return "bg-green-50 border-green-200 text-green-800";
    } else if (results.requiredVertical <= 12) {
      return "bg-yellow-50 border-yellow-200 text-yellow-800";
    } else {
      return "bg-orange-50 border-orange-200 text-orange-800";
    }
  };

  const getAssessmentIcon = () => {
    if (results.canDunk) {
      return (
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    }
  };

  return (
    <div data-results-section className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Dunk Analysis Results</h3>
        <p className="text-gray-600">Based on your measurements and selected parameters</p>
      </div>

      {/* Main Result Card */}
      <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-2xl border-0 rounded-2xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xl font-bold mb-3 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Required Vertical Jump
              </h4>
              <p className="text-4xl font-black">
                {results.requiredVertical > 0 ? `${results.requiredVertical.toFixed(1)}"` : "You can already dunk!"}
              </p>
              {results.requiredVertical > 0 && (
                <p className="text-white/80 mt-2">Additional inches needed to reach the rim</p>
              )}
            </div>
            <div className="bg-white/20 p-4 rounded-full">
              <svg className="w-12 h-12 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supporting Metrics */}
      <div className="grid sm:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl border-0 rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Hang Time
                </h4>
                <p className="text-3xl font-bold">{results.hangTime.toFixed(2)}s</p>
                <p className="text-blue-100 text-sm mt-1">Time in the air</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-700 text-white shadow-xl border-0 rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Power Output
                </h4>
                <p className="text-3xl font-bold">{results.power.toLocaleString()}W</p>
                <p className="text-green-100 text-sm mt-1">Required leg power</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assessment Card */}
      <Card className={`border-2 rounded-2xl shadow-lg ${getAssessmentStyle()}`}>
        <CardContent className="p-8">
          <div className="flex items-start">
            <div className="mr-4 mt-1 p-3 rounded-full bg-white/50">
              {getAssessmentIcon()}
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold mb-3 flex items-center">
                Assessment & Recommendations
              </h4>
              <p className="text-lg leading-relaxed">{results.assessment}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
