import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Ruler, 
  Target, 
  TrendingUp, 
  Activity, 
  CheckCircle,
  AlertTriangle,
  Users,
  BarChart3
} from "lucide-react";

const heightRequirements = [
  {
    heightRange: "5'0\" - 5'3\" (152-160cm)",
    standingReach: "6'3\" - 6'6\"",
    requiredVertical: "42-48 inches",
    difficulty: "Extremely Challenging",
    timeframe: "3-5 years",
    successRate: "< 1%",
    color: "red",
    tips: [
      "Focus on maximum vertical jump development",
      "Consider lower rim training (8-9 feet)",
      "Develop exceptional leg strength and power",
      "Master perfect jumping technique"
    ]
  },
  {
    heightRange: "5'4\" - 5'7\" (163-170cm)",
    standingReach: "6'7\" - 6'10\"",
    requiredVertical: "38-42 inches",
    difficulty: "Very Challenging",
    timeframe: "2-4 years",
    successRate: "2-5%",
    color: "orange",
    tips: [
      "Intensive plyometric training required",
      "Perfect approach jump technique",
      "Significant strength training needed",
      "Consider body weight optimization"
    ]
  },
  {
    heightRange: "5'8\" - 5'11\" (173-180cm)",
    standingReach: "6'11\" - 7'2\"",
    requiredVertical: "34-38 inches",
    difficulty: "Challenging",
    timeframe: "1-3 years",
    successRate: "5-15%",
    color: "yellow",
    tips: [
      "Focus on explosive power development",
      "Master running approach techniques",
      "Consistent training over 12+ months",
      "Technique refinement crucial"
    ]
  },
  {
    heightRange: "6'0\" - 6'3\" (183-190cm)",
    standingReach: "7'3\" - 7'6\"",
    requiredVertical: "30-34 inches",
    difficulty: "Moderate",
    timeframe: "6 months - 2 years",
    successRate: "15-35%",
    color: "blue",
    tips: [
      "Achievable with dedicated training",
      "Focus on jump technique and timing",
      "Build explosive leg strength",
      "Practice approach and takeoff"
    ]
  },
  {
    heightRange: "6'4\" - 6'7\" (193-200cm)",
    standingReach: "7'7\" - 7'10\"",
    requiredVertical: "26-30 inches",
    difficulty: "Achievable",
    timeframe: "3-12 months",
    successRate: "35-60%",
    color: "green",
    tips: [
      "Natural advantage with training",
      "Focus on jump consistency",
      "Develop ball handling skills",
      "Practice different dunk styles"
    ]
  },
  {
    heightRange: "6'8\"+ (203cm+)",
    standingReach: "7'11\"+",
    requiredVertical: "18-26 inches",
    difficulty: "Natural Ability",
    timeframe: "1-6 months",
    successRate: "60-90%",
    color: "emerald",
    tips: [
      "Focus on coordination and timing",
      "Develop various dunk techniques",
      "Work on game-speed dunking",
      "Master different approach angles"
    ]
  }
];

export default function DunkingRequirementsByHeight() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-basketball-orange rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1" fill="none"/>
                    <path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth="1"/>
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900">Dunk Calculator</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-basketball-orange transition-colors">
                Calculator
              </Link>
              <Link href="/calculators" className="text-gray-700 hover:text-basketball-orange transition-colors">
                Tools
              </Link>
              <Link href="/vertical-jump-training" className="text-gray-700 hover:text-basketball-orange transition-colors">
                Training
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Dunking Requirements by Height: Complete Analysis
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
              Discover exactly what vertical jump you need to dunk based on your height, plus realistic timelines and success rates
            </p>
            <Button
              onClick={() => scrollToSection('height-breakdown')}
              className="bg-white text-orange-600 px-8 py-4 font-semibold text-lg hover:bg-gray-100"
            >
              Find Your Requirements
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-basketball-orange mb-2">6</div>
              <div className="text-gray-600">Height Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-court-blue mb-2">18-48"</div>
              <div className="text-gray-600">Vertical Range</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success-green mb-2">90%</div>
              <div className="text-gray-600">Max Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">3mo-5yr</div>
              <div className="text-gray-600">Training Timeline</div>
            </div>
          </div>
        </div>
      </section>

      {/* Height Breakdown */}
      <section id="height-breakdown" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Height-Based Dunking Requirements</h2>
            <p className="text-xl text-gray-600">Detailed breakdown by height category with realistic expectations</p>
          </div>

          <div className="space-y-8">
            {heightRequirements.map((requirement, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`h-2 bg-${requirement.color}-500`}></div>
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-1">
                      <h3 className="text-xl font-bold mb-2">{requirement.heightRange}</h3>
                      <Badge variant="outline" className={`text-${requirement.color}-700 border-${requirement.color}-300`}>
                        {requirement.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="lg:col-span-1 space-y-3">
                      <div>
                        <div className="text-sm text-gray-500">Standing Reach</div>
                        <div className="font-semibold">{requirement.standingReach}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Required Vertical</div>
                        <div className="font-semibold text-basketball-orange">{requirement.requiredVertical}</div>
                      </div>
                    </div>

                    <div className="lg:col-span-1 space-y-3">
                      <div>
                        <div className="text-sm text-gray-500">Timeline</div>
                        <div className="font-semibold">{requirement.timeframe}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Success Rate</div>
                        <div className="font-semibold text-court-blue">{requirement.successRate}</div>
                      </div>
                    </div>

                    <div className="lg:col-span-1">
                      <div className="text-sm text-gray-500 mb-2">Training Focus</div>
                      <ul className="space-y-1 text-sm">
                        {requirement.tips.slice(0, 2).map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start">
                            <CheckCircle className="w-3 h-3 text-success-green mr-2 mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Factors That Influence Success */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Beyond Height: Key Success Factors</h2>
            <p className="text-xl text-gray-600">Height is just one piece of the dunking puzzle</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Ruler className="w-6 h-6 mr-2 text-basketball-orange" />
                  Body Proportions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Standing reach relative to height matters more than height alone. Players with longer arms and torsos have significant advantages.
                </p>
                <ul className="text-sm space-y-2">
                  <li>• Standing reach typically 1.3x height</li>
                  <li>• Elite players often 1.35x or higher</li>
                  <li>• Arm span usually equals height</li>
                  <li>• Longer legs = higher jump potential</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-6 h-6 mr-2 text-court-blue" />
                  Athletic Ability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Natural athleticism, power, and coordination can overcome height disadvantages with proper training.
                </p>
                <ul className="text-sm space-y-2">
                  <li>• Fast-twitch muscle fiber dominance</li>
                  <li>• Power-to-weight ratio optimization</li>
                  <li>• Jumping technique mastery</li>
                  <li>• Coordination and timing</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-success-green" />
                  Training Commitment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Consistent, progressive training can add 6-15 inches to your vertical jump over time.
                </p>
                <ul className="text-sm space-y-2">
                  <li>• Plyometric exercise progression</li>
                  <li>• Strength training consistency</li>
                  <li>• Technique refinement</li>
                  <li>• Recovery and nutrition</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reality Check Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Reality of Height and Dunking</h2>
            <p className="text-xl text-gray-600">Honest expectations based on physiological limitations</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-800">
                  <AlertTriangle className="w-6 h-6 mr-2" />
                  Challenging Heights (Under 5'8")
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700 mb-4">
                  While not impossible, dunking at shorter heights requires exceptional athleticism and years of dedicated training.
                </p>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Key Challenges</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Requires 38+ inch vertical jump</li>
                      <li>• 3-5 years of intensive training</li>
                      <li>• Less than 5% success rate</li>
                      <li>• High injury risk without proper progression</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Alternative Goals</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Train on 8-9 foot rims initially</li>
                      <li>• Focus on overall athleticism</li>
                      <li>• Develop exceptional ball skills</li>
                      <li>• Consider other basketball achievements</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <CheckCircle className="w-6 h-6 mr-2" />
                  Favorable Heights (6'0"+)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 mb-4">
                  With dedicated training, most athletes 6 feet and taller can achieve dunking ability within 6 months to 2 years.
                </p>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Natural Advantages</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Requires only 18-34 inch vertical</li>
                      <li>• Achievable in 3 months to 2 years</li>
                      <li>• 35-90% success rate with training</li>
                      <li>• Lower injury risk</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Training Focus</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Technique and timing refinement</li>
                      <li>• Moderate strength and power gains</li>
                      <li>• Consistency and confidence building</li>
                      <li>• Style and approach development</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Dunking Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get your exact requirements and personalized training plan based on your height and current ability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" variant="secondary" className="text-gray-900">
                Calculate Your Requirements
              </Button>
            </Link>
            <Link href="/vertical-jump-training">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                Start Training Program
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}