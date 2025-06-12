import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Zap, Activity } from "lucide-react";
import { TrainingRequirement } from "./training-requirements-data";

interface TrainingRequirementsCardProps {
  requirement: TrainingRequirement;
}

export default function TrainingRequirementsCard({ requirement }: TrainingRequirementsCardProps) {
  const IconComponent = requirement.icon === "Zap" ? Zap : Activity;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <IconComponent className={`w-7 h-7 mr-3 text-${requirement.color}`} />
          {requirement.name}
        </CardTitle>
        <CardDescription className="text-lg">{requirement.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-bold mb-3 text-lg">Athletic Requirements</h4>
          <ul className="space-y-2">
            {requirement.athleticRequirements.map((req, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="w-5 h-5 text-success-green mr-3" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-3 text-lg">Key Training Focus</h4>
          <ul className="space-y-2 text-gray-700">
            {requirement.trainingFocus.map((focus, index) => (
              <li key={index}>• {focus}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}