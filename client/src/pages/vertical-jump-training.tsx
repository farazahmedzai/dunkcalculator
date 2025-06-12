import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Clock, 
  TrendingUp, 
  Zap, 
  Activity, 
  Calendar,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Play
} from "lucide-react";
import SEOPageLayout from "@/components/shared/seo-page-layout";
import { generateArticleSchema, generateWebPageSchema, generateHowToSchema, BreadcrumbItem } from "@/lib/seo";

export default function VerticalJumpTraining() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleProgramStart = (programType: string) => {
    // For now, scroll to program details or show alert
    alert(`Starting ${programType} program! This would redirect to the program details or sign-up page.`);
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    { name: 'Vertical Jump Training', url: '/vertical-jump-training' }
  ];

  const seoData = {
    title: "Vertical Jump Training Programs - Increase Your Jump Height | Dunk Calculator Pro",
    description: "Science-backed vertical jump training programs, exercises, and techniques to maximize your vertical leap. Complete 12-week programs, plyometric exercises, and dunking guides.",
    keywords: "vertical jump training, jump training program, plyometric exercises, vertical leap training, basketball training, dunk training, jump higher exercises, vertical jump workout",
    canonicalUrl: `${window.location.origin}/vertical-jump-training`,
    ogTitle: "Vertical Jump Training Programs - Increase Your Jump Height",
    ogDescription: "Science-backed vertical jump training programs and exercises to maximize your vertical leap and dunking ability.",
    twitterTitle: "Vertical Jump Training Programs - Increase Your Jump Height",
    twitterDescription: "Complete vertical jump training programs with plyometric exercises and techniques to maximize your vertical leap.",
    twitterCard: "summary_large_image" as const,
    structuredData: [
      generateArticleSchema(
        "Complete Guide to Vertical Jump Training",
        "Comprehensive vertical jump training guide covering science-backed programs, exercises, and techniques to maximize your vertical leap and dunking ability.",
        new Date().toISOString(),
        new Date().toISOString(),
        "Dunk Calculator Pro Training Team",
        `${window.location.origin}/vertical-jump-training`
      ),
      generateWebPageSchema(
        "Vertical Jump Training Programs - Increase Your Jump Height",
        "Science-backed vertical jump training programs, exercises, and techniques to maximize your vertical leap. Complete 12-week programs, plyometric exercises, and dunking guides.",
        `${window.location.origin}/vertical-jump-training`
      ),
      generateHowToSchema(
        "How to Increase Your Vertical Jump",
        "Step-by-step guide to increasing your vertical jump through structured training programs",
        [
          { name: "Assessment Phase", text: "Test your current vertical jump and identify limiting factors" },
          { name: "Foundation Building", text: "Build base strength with squats, deadlifts, and basic plyometrics" },
          { name: "Power Development", text: "Add explosive movements like jump squats and depth jumps" },
          { name: "Skill Integration", text: "Practice sport-specific jumping movements and techniques" },
          { name: "Peak Performance", text: "Fine-tune timing and maximize power output for competition" }
        ],
        "12-16 weeks",
        "Gym membership or basic equipment"
      )
    ]
  };

  return (
    <SEOPageLayout seoData={seoData} breadcrumbs={breadcrumbs} currentPage="Vertical Jump Training" className="bg-gray-50 dark:bg-gray-900">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Vertical Jump Training Hub
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
              Science-backed training programs, exercises, and techniques to maximize your vertical leap and dunking ability
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => scrollToSection('programs')}
                className="bg-white text-orange-600 px-6 py-3 font-semibold hover:bg-gray-100"
                style={{ color: '#ea580c', backgroundColor: 'white' }}
              >
                View Programs
              </Button>
              <Button
                onClick={() => scrollToSection('exercises')}
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white hover:text-orange-600 px-6 py-3 font-semibold"
                style={{ color: 'white', backgroundColor: 'transparent', borderColor: 'white' }}
              >
                Browse Exercises
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-basketball-orange mb-2">12</div>
              <div className="text-gray-600">Week Programs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-court-blue mb-2">50+</div>
              <div className="text-gray-600">Exercises</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success-green mb-2">6-12"</div>
              <div className="text-gray-600">Average Gain</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">3-6</div>
              <div className="text-gray-600">Months Timeline</div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section id="programs" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Training Programs</h2>
            <p className="text-xl text-gray-600">Structured programs designed for different skill levels and goals</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Beginner Program */}
            <Card className="relative">
              <Badge className="absolute top-4 right-4 bg-success-green">Beginner</Badge>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="w-5 h-5 mr-2 text-success-green" />
                  Foundation Builder
                </CardTitle>
                <CardDescription>
                  Perfect for those new to vertical jump training or returning after a break
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    8-12 weeks duration
                  </div>
                  <div className="flex items-center text-sm">
                    <Target className="w-4 h-4 mr-2 text-gray-500" />
                    3-6 inch gain target
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    3-4 sessions per week
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Program Focus:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Proper jumping mechanics</li>
                    <li>• Base strength development</li>
                    <li>• Flexibility and mobility</li>
                    <li>• Injury prevention</li>
                  </ul>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={() => handleProgramStart('Foundation Builder')}
                >
                  Start Foundation Program
                </Button>
              </CardContent>
            </Card>

            {/* Intermediate Program */}
            <Card className="relative border-2 border-basketball-orange">
              <Badge className="absolute top-4 right-4 bg-basketball-orange">Most Popular</Badge>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-basketball-orange" />
                  Power Developer
                </CardTitle>
                <CardDescription>
                  For athletes with solid fundamentals ready to maximize explosive power
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    12-16 weeks duration
                  </div>
                  <div className="flex items-center text-sm">
                    <Target className="w-4 h-4 mr-2 text-gray-500" />
                    6-10 inch gain target
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    4-5 sessions per week
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Program Focus:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Plyometric progression</li>
                    <li>• Olympic lift variations</li>
                    <li>• Jump technique refinement</li>
                    <li>• Power-to-weight optimization</li>
                  </ul>
                </div>
                
                <Button 
                  className="w-full bg-basketball-orange hover:bg-orange-700"
                  onClick={() => handleProgramStart('Power Developer')}
                >
                  Start Power Program
                </Button>
              </CardContent>
            </Card>

            {/* Advanced Program */}
            <Card className="relative">
              <Badge className="absolute top-4 right-4 bg-purple-600">Advanced</Badge>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-purple-600" />
                  Elite Performance
                </CardTitle>
                <CardDescription>
                  High-intensity training for experienced athletes seeking maximum gains
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    16-20 weeks duration
                  </div>
                  <div className="flex items-center text-sm">
                    <Target className="w-4 h-4 mr-2 text-gray-500" />
                    8-15 inch gain target
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    5-6 sessions per week
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Program Focus:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Complex training methods</li>
                    <li>• Advanced plyometrics</li>
                    <li>• Periodization strategies</li>
                    <li>• Competition preparation</li>
                  </ul>
                </div>
                
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => handleProgramStart('Elite Performance')}
                >
                  Start Elite Program
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Exercise Categories */}
      <section id="exercises" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Exercise Library</h2>
            <p className="text-xl text-gray-600">Comprehensive collection of vertical jump training exercises</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Plyometric Exercises */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-basketball-orange" />
                  Plyometric Exercises
                </CardTitle>
                <CardDescription>
                  Explosive movements to develop power and reactive strength
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Depth Jumps</span>
                    <Badge variant="secondary">25 variations</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Box Jumps</span>
                    <Badge variant="secondary">15 variations</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bound Series</span>
                    <Badge variant="secondary">20 variations</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Reactive Jumps</span>
                    <Badge variant="secondary">18 variations</Badge>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  View Plyometrics
                </Button>
              </CardContent>
            </Card>

            {/* Strength Training */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-court-blue" />
                  Strength Training
                </CardTitle>
                <CardDescription>
                  Build the foundation of power with targeted strength exercises
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Squat Variations</span>
                    <Badge variant="secondary">30 variations</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Deadlift Patterns</span>
                    <Badge variant="secondary">20 variations</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Olympic Lifts</span>
                    <Badge variant="secondary">12 variations</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Unilateral Work</span>
                    <Badge variant="secondary">25 variations</Badge>
                  </div>
                </div>
                <Button className="w-full mt-4 border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white font-semibold">
                  View Strength Work
                </Button>
              </CardContent>
            </Card>

            {/* Mobility & Recovery */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-success-green" />
                  Mobility & Recovery
                </CardTitle>
                <CardDescription>
                  Essential movement prep and recovery protocols
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dynamic Warm-up</span>
                    <Badge variant="secondary">15 routines</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Hip Mobility</span>
                    <Badge variant="secondary">20 exercises</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ankle Prep</span>
                    <Badge variant="secondary">12 exercises</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Recovery Work</span>
                    <Badge variant="secondary">18 protocols</Badge>
                  </div>
                </div>
                <Button className="w-full mt-4 border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold">
                  View Mobility Work
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Training Principles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Training Principles</h2>
            <p className="text-xl text-gray-600">Understanding the science behind effective vertical jump training</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-basketball-orange" />
                  Progressive Overload
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Systematically increase training demands to force adaptation. This applies to load, volume, 
                  intensity, and complexity of exercises over time.
                </p>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Implementation:</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Increase box height by 2-4 inches weekly</li>
                    <li>• Add 5-10 lbs to loaded jumps monthly</li>
                    <li>• Progress from bilateral to unilateral exercises</li>
                    <li>• Advance from simple to complex movement patterns</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-court-blue" />
                  Specificity Principle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Training adaptations are specific to the demands placed on the body. Jump training 
                  should closely mirror the movement patterns and energy systems used in dunking.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Application:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Practice both one-foot and two-foot takeoffs</li>
                    <li>• Train at game-speed intensities</li>
                    <li>• Include basketball-specific movement patterns</li>
                    <li>• Simulate game-like fatigue conditions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-success-green" />
                  Recovery & Adaptation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  High-intensity jump training creates significant neuromuscular fatigue. Adequate recovery 
                  is essential for adaptation and injury prevention.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Recovery Guidelines:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Allow 48-72 hours between high-intensity sessions</li>
                    <li>• Prioritize 7-9 hours of quality sleep</li>
                    <li>• Include active recovery and mobility work</li>
                    <li>• Monitor training load and adjust accordingly</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                  Periodization Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Systematic planning of training variables to optimize performance and prevent plateaus. 
                  Periodization helps manage fatigue while maximizing adaptations.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Phase Structure:</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Foundation Phase: Build base strength and movement quality</li>
                    <li>• Strength Phase: Develop maximal force production</li>
                    <li>• Power Phase: Convert strength to explosive power</li>
                    <li>• Peaking Phase: Optimize performance and reduce fatigue</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Training Tools & Calculators</h2>
            <p className="text-xl text-gray-600">Use these tools to optimize your training approach</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Vertical Jump Calculator</CardTitle>
                <CardDescription>
                  Track your progress and analyze jump performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/calculators/vertical-jump-calculator">
                  <Button className="w-full">Use Calculator</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Jump Fatigue Calculator</CardTitle>
                <CardDescription>
                  Monitor how fatigue affects your performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/calculators/jump-fatigue-calculator">
                  <Button className="w-full">Use Calculator</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Max Potential Calculator</CardTitle>
                <CardDescription>
                  Estimate your genetic potential for vertical jumping
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/calculators/max-potential-jump-calculator">
                  <Button className="w-full">Use Calculator</Button>
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
            Ready to Start Your Jump Training Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Calculate your current requirements and get a personalized training recommendation
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/">
              <Button className="bg-white text-orange-600 px-8 py-3 font-semibold hover:bg-gray-100" style={{ color: '#ea580c', backgroundColor: 'white' }}>
                Calculate Your Dunk Requirements
              </Button>
            </Link>
            <Link href="/calculators">
              <Button 
                className="border-2 border-white bg-black/30 backdrop-blur-sm text-white hover:bg-white hover:text-orange-600 px-8 py-3 font-semibold shadow-lg"
              >
                Browse All Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </SEOPageLayout>
  );
}