import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Activity, 
  Award,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  Video,
  TrendingUp
} from "lucide-react";
import PageHeader from "@/components/shared/page-header";
import DunkCard from "@/components/shared/dunk-card";
import { dunkTypes, getDunksByStyle } from "@/components/shared/dunk-types-data";

export default function TypesOfDunksExplained() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader currentPage="guides" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Types of Dunks Explained: Master Every Style
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
              Complete guide to basketball dunking styles from basic power slams to advanced windmills and 360s
            </p>
            <Button
              onClick={() => scrollToSection('dunk-styles')}
              className="bg-white text-purple-600 px-8 py-4 font-semibold text-lg hover:bg-gray-100"
            >
              Explore All Dunking Styles
            </Button>
          </div>
        </div>
      </section>

      {/* Dunk Styles Grid */}
      <section id="dunk-styles" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Dunk Style Breakdown</h2>
            <p className="text-xl text-gray-600">From beginner power slams to expert-level creativity</p>
          </div>

          <div className="space-y-12">
            {dunkTypes.map((dunk, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300">
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
            ))}
          </div>
        </div>
      </section>

      {/* Training Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Training Requirements by Dunk Type</h2>
            <p className="text-xl text-gray-600">Specific athletic development needed for each style</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Zap className="w-7 h-7 mr-3 text-basketball-orange" />
                  Power-Based Dunks
                </CardTitle>
                <CardDescription className="text-lg">One-hand slam, Two-hand power, Tomahawk</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-bold mb-3 text-lg">Athletic Requirements</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-success-green mr-3" />
                      <span>24-36 inch vertical jump ability</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-success-green mr-3" />
                      <span>Strong two-foot takeoff power</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-success-green mr-3" />
                      <span>Excellent hand-eye coordination</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-success-green mr-3" />
                      <span>Secure ball grip and control</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-3 text-lg">Key Training Focus</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Explosive leg strength development (squats, deadlifts)</li>
                    <li>• Plyometric exercises (depth jumps, box jumps)</li>
                    <li>• Approach speed and timing practice</li>
                    <li>• Ball handling and grip strength work</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Activity className="w-7 h-7 mr-3 text-purple-600" />
                  Finesse-Based Dunks
                </CardTitle>
                <CardDescription className="text-lg">Windmill, 360-degree, Between-the-legs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-bold mb-3 text-lg">Athletic Requirements</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-success-green mr-3" />
                      <span>32-42 inch vertical jump ability</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-success-green mr-3" />
                      <span>Extended hang time capabilities</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-success-green mr-3" />
                      <span>Superior body control and awareness</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-success-green mr-3" />
                      <span>Advanced ball handling skills</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-3 text-lg">Key Training Focus</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Single-leg plyometric development</li>
                    <li>• Core strength and stability training</li>
                    <li>• Balance and coordination exercises</li>
                    <li>• Motion practice on adjustable rims</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Master Your Signature Dunk?</h2>
          <p className="text-xl mb-8 opacity-90">
            Calculate your requirements and start training with the right progression for your skill level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" variant="secondary" className="text-gray-900">
                Calculate Dunk Requirements
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