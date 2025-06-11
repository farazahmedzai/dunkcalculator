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
    <div data-results-section className="space-y-6">
      {/* Results Cards */}
      <div className="space-y-4">
        <Card className="bg-gradient-to-r from-basketball-orange to-red-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold mb-2">Required Vertical Jump</h4>
                <p className="text-3xl font-bold">
                  {results.requiredVertical > 0 ? `${results.requiredVertical.toFixed(1)}"` : "You can already dunk!"}
                </p>
              </div>
              <svg className="w-10 h-10 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </div>
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card className="bg-court-blue text-white">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold mb-2">Hang Time</h4>
              <p className="text-2xl font-bold">{results.hangTime.toFixed(2)}s</p>
            </CardContent>
          </Card>
          <Card className="bg-success-green text-white">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold mb-2">Power Required</h4>
              <p className="text-2xl font-bold">{results.power.toLocaleString()}W</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Assessment */}
      <Card className={`border rounded-xl ${getAssessmentStyle()}`}>
        <CardContent className="p-6">
          <div className="flex items-start">
            <div className="mr-3 mt-1">
              {getAssessmentIcon()}
            </div>
            <div>
              <h4 className="font-semibold mb-2">Quick Assessment</h4>
              <p className="leading-relaxed">{results.assessment}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
