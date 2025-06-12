import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Target } from "lucide-react";
import { DunkType } from "./dunk-types-data";

interface DunkCardProps {
  dunk: DunkType;
  variant?: "full" | "compact" | "summary";
}

export default function DunkCard({ dunk, variant = "full" }: DunkCardProps) {
  if (variant === "summary") {
    return (
      <div className="border-l-4 border-red-500 pl-4">
        <h4 className="font-semibold">{dunk.name}</h4>
        <p className="text-sm text-gray-600">{dunk.description}</p>
        <Badge variant="secondary" className="mt-1">{dunk.difficulty}</Badge>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center mb-3">
            <h3 className="text-xl font-bold mr-3">{dunk.name}</h3>
            <Badge variant="outline" className={`text-${dunk.color}-700 border-${dunk.color}-300`}>
              {dunk.difficulty}
            </Badge>
          </div>
          <p className="text-gray-600 mb-4">{dunk.description}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Required Vertical:</span>
              <div className="font-bold text-basketball-orange">{dunk.requiredVertical}</div>
            </div>
            <div>
              <span className="text-gray-500">Style:</span>
              <div className="font-semibold">{dunk.style}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className={`h-2 bg-${dunk.color}-500`}></div>
      <CardContent className="p-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <h3 className="text-2xl font-bold mr-3">{dunk.name}</h3>
              <Badge variant="outline" className={`text-${dunk.color}-700 border-${dunk.color}-300`}>
                {dunk.difficulty}
              </Badge>
            </div>
            <p className="text-gray-600 mb-6 text-lg">{dunk.description}</p>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Required Vertical Jump</div>
                <div className="text-xl font-bold text-basketball-orange">{dunk.requiredVertical}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Style Category</div>
                <div className="font-semibold text-lg">{dunk.style}</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-4 text-gray-900">Step-by-Step Technique</h4>
            <ol className="space-y-3">
              {dunk.technique.map((step, stepIndex) => (
                <li key={stepIndex} className="flex items-start">
                  <span className={`w-6 h-6 bg-${dunk.color}-100 text-${dunk.color}-700 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0`}>
                    {stepIndex + 1}
                  </span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-lg font-bold mb-4 text-gray-900">Key Advantages</h4>
            <ul className="space-y-3 mb-6">
              {dunk.advantages.map((advantage, advIndex) => (
                <li key={advIndex} className="flex items-start">
                  <CheckCircle className={`w-5 h-5 text-${dunk.color}-500 mr-3 mt-0.5 flex-shrink-0`} />
                  <span className="text-gray-700">{advantage}</span>
                </li>
              ))}
            </ul>
            
            <div className={`bg-${dunk.color}-50 border border-${dunk.color}-200 rounded-lg p-4`}>
              <h5 className={`font-bold text-${dunk.color}-800 mb-2 flex items-center`}>
                <Target className="w-4 h-4 mr-2" />
                Pro Training Tip
              </h5>
              <p className={`text-sm text-${dunk.color}-700 leading-relaxed`}>{dunk.tips}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}