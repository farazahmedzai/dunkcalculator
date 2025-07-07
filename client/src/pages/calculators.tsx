import { Link } from "wouter";
import { Calculator, TrendingUp, Target, Zap, Activity, Weight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEOPageLayout from "@/components/shared/seo-page-layout";
import EzoicAd from "@/components/shared/ezoic-ad";
import { generateWebPageSchema, generateCalculatorSchema, BreadcrumbItem } from "@/lib/seo";

const calculators = [
  {
    id: "dunk-calculator",
    title: "Dunk Calculator",
    description: "Calculate exactly what vertical jump you need to dunk based on your measurements",
    icon: Target,
    url: "/",
    featured: true,
    category: "Core Tools"
  },
  {
    id: "vertical-jump-calculator",
    title: "Vertical Jump Calculator",
    description: "Measure and track your vertical jump progress with detailed analytics",
    icon: TrendingUp,
    url: "/calculators/vertical-jump-calculator",
    featured: true,
    category: "Core Tools"
  },
  {
    id: "standing-reach-calculator",
    title: "Standing Reach Calculator",
    description: "Calculate your standing reach based on height and body proportions",
    icon: Calculator,
    url: "/calculators/standing-reach-calculator",
    featured: true,
    category: "Core Tools"
  },
  {
    id: "approach-vs-standing",
    title: "Approach vs Standing Jump Calculator",
    description: "Compare your one-foot approach jump versus two-foot standing jump performance",
    icon: Activity,
    url: "/calculators/approach-vs-standing-jump-calculator",
    featured: false,
    category: "Performance & Progress Tools"
  },
  {
    id: "jump-fatigue",
    title: "Jump Fatigue Calculator",
    description: "Track how fatigue affects your jumping performance over time",
    icon: Zap,
    url: "/calculators/jump-fatigue-calculator",
    featured: false,
    category: "Performance & Progress Tools"
  },
  {
    id: "max-potential",
    title: "Max Potential Jump Calculator",
    description: "Estimate your theoretical maximum vertical jump based on genetics and training",
    icon: TrendingUp,
    url: "/calculators/max-potential-jump-calculator",
    featured: false,
    category: "Performance & Progress Tools"
  },
  {
    id: "ideal-body-weight",
    title: "Ideal Body Weight Jump Calculator",
    description: "Find your optimal weight for maximum jumping performance",
    icon: Weight,
    url: "/calculators/ideal-body-weight-jump-calculator",
    featured: false,
    category: "Performance & Progress Tools"
  }
];

const coreTools = calculators.filter(calc => calc.category === "Core Tools");
const performanceTools = calculators.filter(calc => calc.category === "Performance & Progress Tools");

export default function Calculators() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    { name: 'Calculators', url: '/calculators' }
  ];

  const seoData = {
    title: "Basketball Jump & Dunk Calculators - Complete Performance Analysis Tools | Dunk Calculator Pro",
    description: "Comprehensive basketball performance calculators to analyze vertical jump, dunk requirements, standing reach, fatigue, and more. Professional tools for athletes and trainers.",
    keywords: "basketball calculators, vertical jump calculator, dunk calculator, standing reach calculator, jump fatigue calculator, basketball performance tools, athletic calculators",
    canonicalUrl: `${window.location.origin}/calculators`,
    ogTitle: "Basketball Jump & Dunk Calculators - Complete Performance Analysis Tools",
    ogDescription: "Professional basketball performance calculators for vertical jump analysis, dunk requirements, and athletic optimization. Free tools for serious athletes.",
    twitterTitle: "Basketball Jump & Dunk Calculators - Performance Analysis Tools",
    twitterDescription: "Complete suite of basketball performance calculators. Analyze your vertical jump, dunk requirements, and optimize your training.",
    twitterCard: "summary_large_image" as const,
    structuredData: [
      generateWebPageSchema(
        "Basketball Jump & Dunk Calculators - Complete Performance Analysis Tools",
        "Comprehensive basketball performance calculators to analyze vertical jump, dunk requirements, standing reach, fatigue, and more. Professional tools for athletes and trainers.",
        `${window.location.origin}/calculators`
      ),
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Basketball Performance Calculators",
        "description": "Complete collection of basketball performance analysis tools and calculators",
        "url": `${window.location.origin}/calculators`,
        "mainEntity": {
          "@type": "ItemList",
          "numberOfItems": calculators.length,
          "itemListElement": calculators.map((calc, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": calc.title,
            "description": calc.description,
            "url": `${window.location.origin}${calc.url}`
          }))
        }
      }
    ]
  };

  return (
    <SEOPageLayout seoData={seoData} breadcrumbs={breadcrumbs} currentPage="Calculators" className="bg-gradient-to-br from-orange-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Jump & Dunk Calculators – Pick Your Weapon
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive basketball performance calculators to analyze, track, and optimize every aspect of your jumping ability. 
            From basic dunk requirements to advanced fatigue analysis, find the perfect tool for your training goals.
          </p>
        </div>

        {/* Ad Placement - After Header */}
        <div className="flex justify-center mb-12">
          <EzoicAd placementId={105} className="text-center" />
        </div>

        {/* Core Tools Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Core Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreTools.map((calculator) => {
              const Icon = calculator.icon;
              return (
                <Card key={calculator.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                        <Icon className="w-6 h-6 text-orange-600" />
                      </div>
                      {calculator.featured && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                          Popular
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-xl group-hover:text-orange-600 transition-colors">
                      {calculator.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {calculator.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Link href={calculator.url}>
                      <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105">
                        Use Calculator
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Performance & Progress Tools Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Performance & Progress Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceTools.map((calculator) => {
              const Icon = calculator.icon;
              return (
                <Card key={calculator.id} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {calculator.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-sm leading-relaxed">
                      {calculator.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Link href={calculator.url}>
                      <Button variant="outline" className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105">
                        Use Tool
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Ad Placement - Between Sections */}
        <div className="flex justify-center mb-16">
          <EzoicAd placementId={106} className="text-center" />
        </div>

        {/* How to Use Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How to Use Each Calculator</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">1. Start with Core Measurements</h3>
                <p className="text-gray-600">Use the Dunk Calculator first to establish baseline requirements, then refine with Standing Reach Calculator for accuracy.</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">2. Analyze Your Jump Style</h3>
                <p className="text-gray-600">Compare one-foot vs two-foot jumping with the Approach vs Standing Calculator to optimize your technique.</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">3. Track Performance Changes</h3>
                <p className="text-gray-600">Monitor progress with Vertical Jump Calculator and assess workout impact with Jump Fatigue Calculator.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">4. Optimize Your Potential</h3>
                <p className="text-gray-600">Discover your ceiling with Max Potential Calculator and find optimal training weight with Body Weight Calculator.</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border-l-4 border-indigo-500">
                <h3 className="font-semibold text-gray-900 mb-2">5. Create Training Plans</h3>
                <p className="text-gray-600">Use results from multiple calculators to design personalized workout routines targeting your specific weaknesses.</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border-l-4 border-red-500">
                <h3 className="font-semibold text-gray-900 mb-2">6. Regular Reassessment</h3>
                <p className="text-gray-600">Re-test monthly to track improvements and adjust training intensity based on performance data.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-orange-500 to-blue-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Numbers?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start with your calculations, then follow proven training programs to reach your dunking goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/vertical-jump-training">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-semibold" style={{ color: '#111827', backgroundColor: 'white' }}>
                Explore Training Programs
              </Button>
            </Link>
            <Link href="/athletic-performance">
              <Button size="lg" className="border-2 border-white bg-black/30 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 font-semibold shadow-lg">
                Learn Performance Science
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </SEOPageLayout>
  );
}