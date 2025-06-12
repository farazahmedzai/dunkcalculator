import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  TrendingUp, 
  Target, 
  Activity, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  Ruler
} from "lucide-react";
import SEOPageLayout from "@/components/shared/seo-page-layout";
import { generateArticleSchema, generateWebPageSchema, generateFAQSchema, BreadcrumbItem } from "@/lib/seo";

export default function CanIDunk() {
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
              Can I Dunk? The Complete Assessment
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
              Get a definitive answer based on your physical measurements, current jumping ability, and realistic improvement potential
            </p>
            <Button
              onClick={() => scrollToSection('quick-assessment')}
              className="bg-white text-orange-600 px-8 py-4 font-semibold text-lg hover:bg-gray-100"
            >
              Find Out Now
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Assessment */}
      <section id="quick-assessment" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Dunking Assessment</h2>
            <p className="text-xl text-gray-600">Answer these key questions to get your personalized dunking potential</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <CheckCircle className="w-6 h-6 mr-2" />
                  High Probability
                </CardTitle>
                <CardDescription className="text-green-700">
                  You likely can dunk with focused training
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h4 className="font-semibold text-green-800">If you meet these criteria:</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Height: 6'0" (183cm) or taller</li>
                  <li>• Current vertical jump: 28+ inches</li>
                  <li>• Standing reach: 7'6" or higher</li>
                  <li>• Age: Under 30 years old</li>
                  <li>• Athletic background or current training</li>
                </ul>
                <div className="bg-green-100 p-3 rounded-lg">
                  <p className="text-xs text-green-800">
                    <strong>Timeline:</strong> 2-6 months with dedicated training
                  </p>
                </div>
                <Link href="/">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Calculate Exact Requirements
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-800">
                  <AlertTriangle className="w-6 h-6 mr-2" />
                  Moderate Probability
                </CardTitle>
                <CardDescription className="text-yellow-700">
                  Possible with significant dedication and time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h4 className="font-semibold text-yellow-800">If you meet these criteria:</h4>
                <ul className="space-y-2 text-sm text-yellow-700">
                  <li>• Height: 5'8" - 6'0" (173-183cm)</li>
                  <li>• Current vertical jump: 20-28 inches</li>
                  <li>• Standing reach: 7'0" - 7'6"</li>
                  <li>• Age: 18-35 years old</li>
                  <li>• Some athletic experience</li>
                </ul>
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <p className="text-xs text-yellow-800">
                    <strong>Timeline:</strong> 6-18 months with intensive training
                  </p>
                </div>
                <Link href="/calculators/max-potential-jump-calculator">
                  <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                    Assess Your Potential
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-800">
                  <XCircle className="w-6 h-6 mr-2" />
                  Low Probability
                </CardTitle>
                <CardDescription className="text-red-700">
                  Challenging but not impossible with optimal conditions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h4 className="font-semibold text-red-800">If you meet these criteria:</h4>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>• Height: Under 5'8" (173cm)</li>
                  <li>• Current vertical jump: Under 20 inches</li>
                  <li>• Standing reach: Under 7'0"</li>
                  <li>• Age: Over 35 years old</li>
                  <li>• Limited athletic background</li>
                </ul>
                <div className="bg-red-100 p-3 rounded-lg">
                  <p className="text-xs text-red-800">
                    <strong>Alternative:</strong> Focus on other basketball skills or lower rim dunking
                  </p>
                </div>
                <Link href="/calculators/ideal-body-weight-jump-calculator">
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Optimize Your Approach
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Height Analysis */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Dunking by Height: What You Need</h2>
            <p className="text-xl text-gray-600">Realistic vertical jump requirements for different heights</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Ruler className="w-5 h-5 mr-2 text-green-600" />
                  6'5"+ (196cm+)
                </CardTitle>
                <CardDescription>Natural dunking height</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Required vertical:</span>
                    <Badge className="bg-green-100 text-green-800">12-18 inches</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Difficulty level:</span>
                    <Badge className="bg-green-100 text-green-800">Easy</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Training time:</span>
                    <Badge className="bg-green-100 text-green-800">1-3 months</Badge>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  Most players this height can dunk with basic athletic ability and minimal training.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Ruler className="w-5 h-5 mr-2 text-blue-600" />
                  6'0" - 6'4" (183-193cm)
                </CardTitle>
                <CardDescription>Ideal dunking range</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Required vertical:</span>
                    <Badge className="bg-blue-100 text-blue-800">20-28 inches</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Difficulty level:</span>
                    <Badge className="bg-blue-100 text-blue-800">Moderate</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Training time:</span>
                    <Badge className="bg-blue-100 text-blue-800">3-8 months</Badge>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  Good balance of height advantage and realistic vertical jump requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Ruler className="w-5 h-5 mr-2 text-yellow-600" />
                  5'8" - 5'11" (173-180cm)
                </CardTitle>
                <CardDescription>Challenging but achievable</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Required vertical:</span>
                    <Badge className="bg-yellow-100 text-yellow-800">32-38 inches</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Difficulty level:</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Hard</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Training time:</span>
                    <Badge className="bg-yellow-100 text-yellow-800">8-18 months</Badge>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  Requires exceptional jumping ability and dedicated training program.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Ruler className="w-5 h-5 mr-2 text-orange-600" />
                  5'5" - 5'7" (165-170cm)
                </CardTitle>
                <CardDescription>Elite athletic requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Required vertical:</span>
                    <Badge className="bg-orange-100 text-orange-800">40-46 inches</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Difficulty level:</span>
                    <Badge className="bg-orange-100 text-orange-800">Very Hard</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Training time:</span>
                    <Badge className="bg-orange-100 text-orange-800">1-3 years</Badge>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  Requires near-elite vertical jumping ability and optimal training conditions.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Ruler className="w-5 h-5 mr-2 text-red-600" />
                  Under 5'5" (165cm)
                </CardTitle>
                <CardDescription>Exceptional cases only</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Required vertical:</span>
                    <Badge className="bg-red-100 text-red-800">48+ inches</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Difficulty level:</span>
                    <Badge className="bg-red-100 text-red-800">Extreme</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Training time:</span>
                    <Badge className="bg-red-100 text-red-800">2+ years</Badge>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  Requires world-class vertical jumping ability. Consider lower rim alternatives.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-100 to-blue-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-700">
                  <Calculator className="w-5 h-5 mr-2" />
                  Your Exact Requirements
                </CardTitle>
                <CardDescription>Get personalized calculations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Use our calculator for precise requirements based on your measurements, including standing reach and rim clearance preferences.
                </p>
                <Link href="/">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Calculate My Requirements
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Success Stories</h2>
            <p className="text-xl text-gray-600">Athletes who achieved their dunking goals despite challenges</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-green-50 to-blue-50">
              <CardHeader>
                <CardTitle>Spud Webb</CardTitle>
                <CardDescription>5'6" NBA Slam Dunk Champion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="text-sm"><strong>Height:</strong> 5'6" (168cm)</div>
                  <div className="text-sm"><strong>Vertical:</strong> 46+ inches</div>
                  <div className="text-sm"><strong>Achievement:</strong> 1986 NBA Slam Dunk Contest Winner</div>
                </div>
                <p className="text-xs text-gray-600">
                  Proved that exceptional dedication and training can overcome significant height disadvantages.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle>Nate Robinson</CardTitle>
                <CardDescription>5'9" Three-time Slam Dunk Champion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="text-sm"><strong>Height:</strong> 5'9" (175cm)</div>
                  <div className="text-sm"><strong>Vertical:</strong> 43+ inches</div>
                  <div className="text-sm"><strong>Achievement:</strong> NBA Slam Dunk Champion 2006, 2009, 2010</div>
                </div>
                <p className="text-xs text-gray-600">
                  Combined explosive athleticism with perfect technique to dominate taller competitors.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle>Isaiah Thomas</CardTitle>
                <CardDescription>5'9" Professional Basketball Player</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="text-sm"><strong>Height:</strong> 5'9" (175cm)</div>
                  <div className="text-sm"><strong>Vertical:</strong> 40+ inches</div>
                  <div className="text-sm"><strong>Achievement:</strong> NBA All-Star, elite level dunker</div>
                </div>
                <p className="text-xs text-gray-600">
                  Demonstrates that consistent training and optimal body composition can enable high-level dunking.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Action Plan */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Dunking Action Plan</h2>
            <p className="text-xl text-gray-600">Step-by-step approach to achieve your dunking goals</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-basketball-orange" />
                  Phase 1: Assessment & Goal Setting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-basketball-orange rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                    <div>
                      <h4 className="font-semibold">Measure Current Abilities</h4>
                      <p className="text-sm text-gray-600">Get accurate measurements of height, standing reach, and current vertical jump</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-basketball-orange rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                    <div>
                      <h4 className="font-semibold">Calculate Requirements</h4>
                      <p className="text-sm text-gray-600">Use our calculator to determine exact vertical jump needed</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-basketball-orange rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                    <div>
                      <h4 className="font-semibold">Set Realistic Timeline</h4>
                      <p className="text-sm text-gray-600">Establish achievable goals based on your starting point</p>
                    </div>
                  </div>
                </div>
                <Link href="/">
                  <Button className="w-full">Start Assessment</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-600" />
                  Phase 2: Training & Development
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                    <div>
                      <h4 className="font-semibold">Choose Training Program</h4>
                      <p className="text-sm text-gray-600">Select appropriate program based on your experience level</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                    <div>
                      <h4 className="font-semibold">Focus on Weak Points</h4>
                      <p className="text-sm text-gray-600">Address limiting factors like strength, power, or technique</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                    <div>
                      <h4 className="font-semibold">Track Progress</h4>
                      <p className="text-sm text-gray-600">Regular testing and program adjustments</p>
                    </div>
                  </div>
                </div>
                <Link href="/vertical-jump-training">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    View Training Programs
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Out If You Can Dunk?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Get your personalized assessment and training recommendations in under 2 minutes
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/">
              <Button className="bg-white text-orange-600 px-8 py-3 font-semibold hover:bg-gray-100">
                Calculate My Dunking Requirements
              </Button>
            </Link>
            <Link href="/calculators">
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3"
              >
                Explore All Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}