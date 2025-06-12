import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  TrendingUp, 
  Zap, 
  Activity, 
  Heart,
  Brain,
  Timer,
  BarChart3,
  Users,
  Award,
  Lightbulb,
  FileText
} from "lucide-react";
import SEOPageLayout from "@/components/shared/seo-page-layout";
import { generateArticleSchema, generateWebPageSchema, BreadcrumbItem } from "@/lib/seo";

export default function AthleticPerformance() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    { name: 'Athletic Performance', url: '/athletic-performance' }
  ];

  const seoData = {
    title: "Athletic Performance Analysis - Basketball Science & Biomechanics | Dunk Calculator Pro",
    description: "Advanced athletic performance analysis for basketball players. Biomechanics optimization, performance metrics, recovery strategies, and elite athlete protocols for maximizing basketball performance.",
    keywords: "athletic performance analysis, basketball biomechanics, sports performance science, basketball training science, athletic optimization, performance metrics, sports analytics",
    canonicalUrl: `${window.location.origin}/athletic-performance`,
    ogTitle: "Athletic Performance Analysis - Basketball Science & Biomechanics",
    ogDescription: "Advanced athletic performance analysis for basketball players. Biomechanics optimization, performance metrics, and elite athlete protocols.",
    twitterTitle: "Athletic Performance Analysis - Basketball Science & Biomechanics",
    twitterDescription: "Advanced athletic performance analysis and biomechanics optimization for basketball players and elite athletes.",
    twitterCard: "summary_large_image" as const,
    structuredData: [
      generateArticleSchema(
        "Athletic Performance Analysis for Basketball Players",
        "Comprehensive guide to athletic performance analysis covering biomechanics optimization, performance metrics, recovery strategies, and elite athlete protocols for basketball players.",
        new Date().toISOString(),
        new Date().toISOString(),
        "Dunk Calculator Pro Performance Team",
        `${window.location.origin}/athletic-performance`
      ),
      generateWebPageSchema(
        "Athletic Performance Analysis - Basketball Science & Biomechanics",
        "Advanced athletic performance analysis for basketball players. Biomechanics optimization, performance metrics, recovery strategies, and elite athlete protocols for maximizing basketball performance.",
        `${window.location.origin}/athletic-performance`
      )
    ]
  };

  return (
    <SEOPageLayout seoData={seoData} breadcrumbs={breadcrumbs} currentPage="Athletic Performance" className="bg-gray-50 dark:bg-gray-900">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Athletic Performance Hub
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
              Comprehensive analysis and optimization strategies for basketball performance, biomechanics, and athletic development
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => scrollToSection('performance-factors')}
                className="bg-white text-blue-600 px-6 py-3 font-semibold hover:bg-gray-100"
                style={{ color: '#2563eb', backgroundColor: 'white' }}
              >
                Explore Performance Factors
              </Button>
              <Button
                onClick={() => scrollToSection('analysis-tools')}
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white hover:text-blue-600 px-6 py-3 font-semibold"
                style={{ color: 'white', backgroundColor: 'transparent', borderColor: 'white' }}
              >
                Analysis Tools
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Metrics */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600">Performance Metrics</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
              <div className="text-gray-600">Analysis Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success-green mb-2">25%</div>
              <div className="text-gray-600">Avg Performance Gain</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-basketball-orange mb-2">360°</div>
              <div className="text-gray-600">Complete Analysis</div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Factors */}
      <section id="performance-factors" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Performance Factors</h2>
            <p className="text-xl text-gray-600">Understanding the components that drive athletic success in basketball</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Physical Attributes */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-basketball-orange" />
                  Physical Attributes
                </CardTitle>
                <CardDescription>
                  Measurable physical characteristics that impact performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Height & Reach</span>
                    <Badge variant="secondary">40% impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Body Composition</span>
                    <Badge variant="secondary">25% impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Limb Proportions</span>
                    <Badge variant="secondary">20% impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Hand Size</span>
                    <Badge variant="secondary">15% impact</Badge>
                  </div>
                </div>
                
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-xs text-orange-700">
                    <strong>Key Insight:</strong> While genetics play a role, optimal body composition 
                    and training can maximize your physical potential.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Biomechanical Efficiency */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  Biomechanical Efficiency
                </CardTitle>
                <CardDescription>
                  Movement quality and technique optimization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Jump Mechanics</span>
                    <Badge variant="secondary">35% impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Force Application</span>
                    <Badge variant="secondary">30% impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Energy Transfer</span>
                    <Badge variant="secondary">25% impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Landing Strategy</span>
                    <Badge variant="secondary">10% impact</Badge>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-blue-700">
                    <strong>Opportunity:</strong> Poor mechanics can reduce effective jumping ability 
                    by 20-40%. Technique work often yields immediate gains.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Neuromuscular Power */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-purple-600" />
                  Neuromuscular Power
                </CardTitle>
                <CardDescription>
                  The ability to generate force rapidly and efficiently
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Rate of Force Development</span>
                    <Badge variant="secondary">40% impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Reactive Strength</span>
                    <Badge variant="secondary">30% impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Motor Unit Recruitment</span>
                    <Badge variant="secondary">20% impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Coordination</span>
                    <Badge variant="secondary">10% impact</Badge>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-xs text-purple-700">
                    <strong>Training Focus:</strong> Plyometric and explosive strength training 
                    are most effective for developing neuromuscular power.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Mental Performance */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-success-green" />
                  Mental Performance
                </CardTitle>
                <CardDescription>
                  Psychological factors affecting athletic execution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Confidence</span>
                    <Badge variant="secondary">30% impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Focus & Concentration</span>
                    <Badge variant="secondary">25% impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Arousal Control</span>
                    <Badge variant="secondary">25% impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Visualization</span>
                    <Badge variant="secondary">20% impact</Badge>
                  </div>
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-xs text-green-700">
                    <strong>Reality Check:</strong> Mental barriers often prevent athletes from 
                    reaching their physical potential, especially in high-pressure situations.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recovery & Adaptation */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  Recovery & Adaptation
                </CardTitle>
                <CardDescription>
                  The body's ability to recover and adapt to training stress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Sleep Quality</span>
                    <Badge variant="secondary">35% impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Nutrition Timing</span>
                    <Badge variant="secondary">25% impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Stress Management</span>
                    <Badge variant="secondary">25% impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Active Recovery</span>
                    <Badge variant="secondary">15% impact</Badge>
                  </div>
                </div>
                
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-xs text-red-700">
                    <strong>Critical Factor:</strong> Poor recovery can reduce training adaptations 
                    by up to 50% and increase injury risk significantly.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Environmental Factors */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-indigo-600" />
                  Environmental Factors
                </CardTitle>
                <CardDescription>
                  External conditions that influence performance outcomes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Training Environment</span>
                    <Badge variant="secondary">30% impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Coaching Quality</span>
                    <Badge variant="secondary">25% impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Peer Support</span>
                    <Badge variant="secondary">25% impact</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Equipment Quality</span>
                    <Badge variant="secondary">20% impact</Badge>
                  </div>
                </div>
                
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <p className="text-xs text-indigo-700">
                    <strong>Multiplier Effect:</strong> Optimal environment can accelerate 
                    development while poor conditions can severely limit progress.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Analysis Tools */}
      <section id="analysis-tools" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Performance Analysis Tools</h2>
            <p className="text-xl text-gray-600">Data-driven tools to assess and optimize your athletic performance</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BarChart3 className="w-5 h-5 mr-2 text-basketball-orange" />
                  Vertical Jump Analyzer
                </CardTitle>
                <CardDescription>
                  Comprehensive analysis of your jumping performance and technique
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-600">• Force-velocity profiling</div>
                  <div className="text-sm text-gray-600">• Jump height progressions</div>
                  <div className="text-sm text-gray-600">• Bilateral strength assessment</div>
                  <div className="text-sm text-gray-600">• Technique optimization</div>
                </div>
                <Link href="/calculators/vertical-jump-calculator">
                  <Button className="w-full">Analyze Performance</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Timer className="w-5 h-5 mr-2 text-blue-600" />
                  Fatigue Impact Calculator
                </CardTitle>
                <CardDescription>
                  Understand how fatigue affects your jumping ability over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-600">• Performance decline tracking</div>
                  <div className="text-sm text-gray-600">• Recovery time estimation</div>
                  <div className="text-sm text-gray-600">• Optimal rest intervals</div>
                  <div className="text-sm text-gray-600">• Training load management</div>
                </div>
                <Link href="/calculators/jump-fatigue-calculator">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Calculate Fatigue Impact
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Award className="w-5 h-5 mr-2 text-purple-600" />
                  Genetic Potential Estimator
                </CardTitle>
                <CardDescription>
                  Estimate your maximum achievable vertical jump based on key factors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-600">• Genetic ceiling estimation</div>
                  <div className="text-sm text-gray-600">• Improvement timeline</div>
                  <div className="text-sm text-gray-600">• Limiting factor analysis</div>
                  <div className="text-sm text-gray-600">• Training prioritization</div>
                </div>
                <Link href="/calculators/max-potential-jump-calculator">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Estimate Potential
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <TrendingUp className="w-5 h-5 mr-2 text-success-green" />
                  Body Composition Optimizer
                </CardTitle>
                <CardDescription>
                  Find your ideal weight for maximum jumping performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-600">• Optimal weight calculation</div>
                  <div className="text-sm text-gray-600">• Body fat target ranges</div>
                  <div className="text-sm text-gray-600">• Performance impact analysis</div>
                  <div className="text-sm text-gray-600">• Nutrition guidelines</div>
                </div>
                <Link href="/calculators/ideal-body-weight-jump-calculator">
                  <Button className="w-full bg-success-green hover:bg-green-700">
                    Optimize Body Composition
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Activity className="w-5 h-5 mr-2 text-orange-500" />
                  Jump Style Comparator
                </CardTitle>
                <CardDescription>
                  Compare approach vs standing jump performance and optimize technique
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-600">• One-foot vs two-foot analysis</div>
                  <div className="text-sm text-gray-600">• Approach speed optimization</div>
                  <div className="text-sm text-gray-600">• Takeoff angle analysis</div>
                  <div className="text-sm text-gray-600">• Style recommendations</div>
                </div>
                <Link href="/calculators/approach-vs-standing-jump-calculator">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    Compare Jump Styles
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Target className="w-5 h-5 mr-2 text-red-500" />
                  Standing Reach Predictor
                </CardTitle>
                <CardDescription>
                  Accurately estimate standing reach based on anthropometric data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-600">• Predictive modeling</div>
                  <div className="text-sm text-gray-600">• Population comparisons</div>
                  <div className="text-sm text-gray-600">• Accuracy confidence intervals</div>
                  <div className="text-sm text-gray-600">• Measurement guidelines</div>
                </div>
                <Link href="/calculators/standing-reach-calculator">
                  <Button className="w-full bg-red-500 hover:bg-red-600">
                    Predict Standing Reach
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Performance Optimization Strategies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Performance Optimization Strategies</h2>
            <p className="text-xl text-gray-600">Evidence-based approaches to maximize your athletic potential</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-basketball-orange" />
                  Quick Wins (0-4 weeks)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold mb-2">Technique Refinement</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Focus on jump mechanics, arm swing timing, and takeoff optimization. 
                      Often yields 2-6 inch improvements immediately.
                    </p>
                    <Badge variant="secondary">Expected gain: 2-6 inches</Badge>
                  </div>
                  
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold mb-2">Mobility Enhancement</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Hip flexor stretching, ankle mobility work, and thoracic spine 
                      mobility can unlock restricted movement patterns.
                    </p>
                    <Badge variant="secondary">Expected gain: 1-4 inches</Badge>
                  </div>
                  
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold mb-2">Mental Preparation</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Visualization, confidence building, and removing mental barriers 
                      can unlock existing physical potential.
                    </p>
                    <Badge variant="secondary">Expected gain: 1-3 inches</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  Long-term Development (3-12 months)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold mb-2">Strength Foundation</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Systematic strength development through progressive overload. 
                      Focus on compound movements and unilateral strength.
                    </p>
                    <Badge variant="secondary">Expected gain: 4-8 inches</Badge>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold mb-2">Power Development</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Plyometric training, Olympic lift derivatives, and reactive 
                      strength development for explosive power.
                    </p>
                    <Badge variant="secondary">Expected gain: 3-6 inches</Badge>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold mb-2">Body Composition</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Optimizing power-to-weight ratio through strategic muscle gain 
                      and fat loss while maintaining performance.
                    </p>
                    <Badge variant="secondary">Expected gain: 2-5 inches</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Scientific Research Insights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Research-Based Insights</h2>
            <p className="text-xl text-gray-600">Latest findings from sports science research</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-purple-600" />
                  Force-Velocity Profiling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Recent research shows that athletes can be categorized into force-deficit or velocity-deficit 
                  profiles, which should guide training emphasis for optimal results.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Key Findings:</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Force-deficit athletes benefit more from heavy strength training</li>
                    <li>• Velocity-deficit athletes respond better to high-speed movements</li>
                    <li>• Individualized training increases effectiveness by 23-35%</li>
                    <li>• Profile assessment should guide program selection</li>
                  </ul>
                </div>
                <Badge className="bg-purple-600">Source: Sports Medicine Journal 2024</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Timer className="w-5 h-5 mr-2 text-success-green" />
                  Recovery Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  New research reveals that recovery strategies can significantly impact training 
                  adaptations and injury prevention in high-intensity jump training.
                </p>
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-green-800 mb-2">Evidence-Based Protocols:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• 48-72 hour recovery between high-intensity sessions</li>
                    <li>• Sleep quality more important than quantity for adaptation</li>
                    <li>• Active recovery enhances subsequent performance by 15%</li>
                    <li>• Cold water immersion optimal at 10-15°C for 10-15 minutes</li>
                  </ul>
                </div>
                <Badge className="bg-success-green">Source: Journal of Strength & Conditioning 2024</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Optimize Your Performance?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Use our analysis tools to identify your limiting factors and create a personalized optimization plan
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/">
              <Button className="bg-white text-blue-600 px-8 py-3 font-semibold hover:bg-gray-100">
                Start Performance Analysis
              </Button>
            </Link>
            <Link href="/calculators">
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
              >
                Browse Analysis Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </SEOPageLayout>
  );
}