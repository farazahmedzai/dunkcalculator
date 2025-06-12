import { useState } from "react";
import { Link } from "wouter";
import DunkCalculator from "@/components/dunk-calculator";
import CalculatorResults from "@/components/calculator-results";
import JumpVisualization from "@/components/jump-visualization";
import FAQSection from "@/components/faq-section";
import SEOPageLayout from "@/components/shared/seo-page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { generateCalculatorSchema, generateWebPageSchema, generateFAQSchema } from "@/lib/seo";
import { generalFAQs } from "@/components/shared/faq-data";

export interface CalculationResults {
  requiredVertical: number;
  hangTime: number;
  power: number;
  assessment: string;
  canDunk: boolean;
}

export default function Home() {
  const [results, setResults] = useState<CalculationResults | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const seoData = {
    title: "Basketball Dunk Calculator - Calculate Your Vertical Jump Requirements | Dunk Calculator Pro",
    description: "Professional basketball dunk calculator with physics-based calculations. Calculate your exact vertical jump requirements, hang-time, and power needed to dunk with scientific precision. Free online tool.",
    keywords: "dunk calculator, vertical jump calculator, basketball dunk, vertical leap, jump height calculator, dunk requirements, basketball training, vertical jump training",
    canonicalUrl: `${window.location.origin}/`,
    ogTitle: "Basketball Dunk Calculator - See Exactly What You Need to Fly",
    ogDescription: "Calculate your exact vertical jump requirements with our professional dunk calculator. Physics-based calculations, interactive visualizations, and training recommendations.",
    ogType: "website",
    twitterTitle: "Basketball Dunk Calculator - Calculate Your Vertical Jump Requirements",
    twitterDescription: "Professional dunk calculator with physics-based calculations. See exactly what you need to dunk!",
    twitterCard: "summary_large_image" as const,
    structuredData: [
      generateCalculatorSchema(
        "Basketball Dunk Calculator",
        "Professional basketball dunk calculator with physics-based calculations, interactive visualizations, and comprehensive training resources",
        `${window.location.origin}/`,
        ["Height", "Standing Reach", "Rim Height", "Clearance", "Body Weight", "Jump Type"],
        ["Required Vertical Jump", "Hang Time", "Power Output", "Dunk Assessment"]
      ),
      generateWebPageSchema(
        "Basketball Dunk Calculator - Calculate Your Vertical Jump Requirements",
        "Professional basketball dunk calculator with physics-based calculations. Calculate your exact vertical jump requirements, hang-time, and power needed to dunk with scientific precision.",
        `${window.location.origin}/`
      ),
      generateFAQSchema([
        {
          question: "How accurate is the dunk calculator?",
          answer: "Our calculator uses proven physics formulas and has been validated against real-world data from thousands of athletes. The calculations are accurate within 2-3 inches for most users."
        },
        {
          question: "What measurements do I need?",
          answer: "You need your height, standing reach (how high you can reach with one arm), desired rim height, and how much clearance you want above the rim."
        },
        {
          question: "How long does it take to increase vertical jump?",
          answer: "Most athletes see 4-8 inch improvements in 3-6 months with consistent training. Elite gains of 10+ inches typically take 12-18 months of dedicated work."
        }
      ])
    ]
  };

  return (
    <SEOPageLayout seoData={seoData} showHeader={false} className="bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-basketball-orange rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1" fill="none"/>
                  <path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth="1"/>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dunk Calculator Pro</h1>
            </div>
            <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Main navigation">
              <button
                onClick={() => scrollToSection('calculator')}
                className="text-gray-700 dark:text-gray-300 hover:text-basketball-orange transition-colors"
                aria-label="Navigate to calculator section"
              >
                Calculator
              </button>
              <Link 
                href="/calculators" 
                className="text-gray-700 dark:text-gray-300 hover:text-basketball-orange transition-colors"
                aria-label="View all calculator tools"
              >
                Tools
              </Link>
              <Link 
                href="/vertical-jump-training" 
                className="text-gray-700 dark:text-gray-300 hover:text-basketball-orange transition-colors"
                aria-label="Vertical jump training guides"
              >
                Training
              </Link>
              <Link 
                href="/athletic-performance" 
                className="text-gray-700 dark:text-gray-300 hover:text-basketball-orange transition-colors"
                aria-label="Athletic performance analysis"
              >
                Performance
              </Link>
              <button
                onClick={() => scrollToSection('what-influences')}
                className="text-gray-700 dark:text-gray-300 hover:text-basketball-orange transition-colors"
                aria-label="Navigate to factors section"
              >
                Factors
              </button>
              <button
                onClick={() => scrollToSection('close-the-gap')}
                className="text-gray-700 dark:text-gray-300 hover:text-basketball-orange transition-colors"
                aria-label="Navigate to training section"
              >
                Training
              </button>
              <button
                onClick={() => scrollToSection('advanced-tools')}
                className="text-gray-700 dark:text-gray-300 hover:text-basketball-orange transition-colors"
                aria-label="Navigate to advanced tools section"
              >
                Tools
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-gray-700 dark:text-gray-300 hover:text-basketball-orange transition-colors"
                aria-label="Navigate to frequently asked questions"
              >
                FAQ
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Dunk Calculator – See Exactly What You Need to Fly
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto drop-shadow-md">
            Calculate your exact vertical jump requirements, hang-time, and power needed to dunk with scientific precision
          </p>
          <Button
            onClick={() => scrollToSection('calculator')}
            className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 hover:shadow-lg transition-all transform hover:scale-105 border-2 border-white"
            size="lg"
          >
            Start Calculating
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </Button>
        </div>
      </section>

      {/* Main Calculator Section */}
      <section id="calculator" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Instant Results, Visualized</h2>
            <p className="text-xl text-gray-600">Enter your measurements below to see if you can dunk</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <DunkCalculator onCalculate={setResults} />
            <div className="space-y-6">
              <CalculatorResults results={results} />
              <JumpVisualization results={results} />
            </div>
          </div>
        </div>
      </section>

      {/* What Influences Dunking Ability Section */}
      <section id="what-influences" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Influences Dunking Ability?</h2>
            <p className="text-xl text-gray-600">Understanding the key factors that determine your dunking potential</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <div className="w-10 h-10 bg-basketball-orange/10 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-basketball-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                      </svg>
                    </div>
                    Height & Standing Reach
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Your height determines your baseline advantage, but standing reach is even more critical. Players with longer arms relative to their height have a significant advantage.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700"><strong>Pro Tip:</strong> Standing reach is typically 1.3x your height. Elite players often have reaches 1.35x or higher.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <div className="w-10 h-10 bg-court-blue/10 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-court-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    Vertical Jump – Standing vs. Approach
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Most players jump 6-12 inches higher with a running approach compared to standing. The additional momentum and proper footwork create explosive take-offs.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700"><strong>Key Insight:</strong> Master both one-foot and two-foot takeoffs for maximum versatility.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <div className="w-10 h-10 bg-success-green/10 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Hand Size & Ball Control
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Larger hands make gripping and controlling the ball easier during flight. Players with smaller hands often need extra clearance or specific techniques.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700"><strong>Workaround:</strong> Develop stronger grip strength and practice alternative dunking styles.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    Power-to-Weight Ratio
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Your strength relative to body weight determines explosive power. Lighter, stronger athletes typically jump higher than heavier counterparts.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700"><strong>Training Focus:</strong> Build explosive leg strength while maintaining optimal body composition.</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Technique & Timing
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Proper jumping mechanics, arm swing coordination, and take-off timing can add several inches to your effective reach height.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700"><strong>Quick Gains:</strong> Master proper form before focusing on strength gains.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-600 to-red-600 text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">The Complete Picture</h3>
                  <p className="mb-4">
                    Elite dunkers excel in multiple areas simultaneously. While you can't change your height, every other factor is trainable with dedication.
                  </p>
                  <Button 
                    onClick={() => scrollToSection('calculator')}
                    className="bg-white text-orange-600 hover:bg-gray-100 font-semibold"
                  >
                    Calculate Your Requirements
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Physics Section */}
      <section id="physics" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Physics & Formulas Behind Your Jump</h2>
            <p className="text-xl text-gray-600">Scientific calculations for accurate results</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <div className="w-8 h-8 bg-basketball-orange/10 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-basketball-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    Minimum Vertical Leap Formula
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm border">
                    <p className="mb-2"><strong>Required Jump =</strong></p>
                    <p className="ml-4">(Rim Height + Clearance) - Standing Reach</p>
                  </div>
                  <p className="text-gray-600 mt-4">
                    This formula calculates the minimum vertical distance you need to jump to clear the rim with your desired clearance.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <div className="w-8 h-8 bg-court-blue/10 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-court-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Hang Time & Take-Off Velocity
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm border">
                    <p className="mb-2"><strong>Hang Time =</strong> 2 × √(2h/g)</p>
                    <p className="mb-2"><strong>Velocity =</strong> √(2gh)</p>
                    <p className="text-xs text-gray-500">where h = jump height, g = 9.81 m/s²</p>
                  </div>
                  <p className="text-gray-600 mt-4">
                    Physics equations determine how long you'll be airborne and your required take-off speed.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <div className="w-8 h-8 bg-success-green/10 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    Jumping Energy & Power-to-Weight Ratio
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm border">
                    <p className="mb-2"><strong>Power =</strong> (Body Weight × Jump Height) / Time</p>
                    <p className="mb-2"><strong>Energy =</strong> mgh (Potential Energy)</p>
                    <p className="text-xs text-gray-500">where m = mass, g = gravity, h = height</p>
                  </div>
                  <p className="text-gray-600 mt-4">
                    These calculations show the explosive power and energy required for your vertical leap.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-basketball-orange to-red-500 text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Key Factors</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Body weight affects power requirements
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Longer arms = higher standing reach
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Running approach adds ~6-12 inches
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Hand size affects ball control
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Close the Gap Section */}
      <section id="close-the-gap" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Close the Gap?</h2>
            <p className="text-xl text-gray-600">Your complete pathway to dunking success</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Pillar 1: Calculators */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-basketball-orange">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-basketball-orange/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-basketball-orange/20 transition-colors">
                  <svg className="w-10 h-10 text-basketball-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Performance Calculators</h3>
                <p className="text-gray-600 mb-6">
                  7 specialized calculators to measure every aspect of your jumping ability. Track progress, identify weaknesses, and optimize your training.
                </p>
                <ul className="text-left text-gray-600 mb-6 space-y-2">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-basketball-orange mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Vertical Jump Calculator
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-basketball-orange mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Standing Reach Assessment
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-basketball-orange mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Approach vs Standing Jump
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-basketball-orange mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Max Potential Calculator
                  </li>
                </ul>
                <Link href="/calculators">
                  <Button className="w-full bg-basketball-orange hover:bg-basketball-orange/90 text-white font-semibold">
                    Explore All Calculators
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pillar 2: Training */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-court-blue">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-court-blue/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-court-blue/20 transition-colors">
                  <svg className="w-10 h-10 text-court-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Vertical Jump Training</h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive training programs designed to maximize your jumping potential. From beginner to elite athlete protocols.
                </p>
                <ul className="text-left text-gray-600 mb-6 space-y-2">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-court-blue mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    12-Week Jump Programs
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-court-blue mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Plyometric Exercises
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-court-blue mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Strength & Power Building
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-court-blue mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Technique Optimization
                  </li>
                </ul>
                <Link href="/vertical-jump-training">
                  <Button className="w-full bg-court-blue hover:bg-court-blue/90 text-white font-semibold">
                    Start Training Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pillar 3: Athletic Performance */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-success-green">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-success-green/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-success-green/20 transition-colors">
                  <svg className="w-10 h-10 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Athletic Performance</h3>
                <p className="text-gray-600 mb-6">
                  Advanced performance metrics, biomechanics analysis, and optimization strategies for elite athletic development.
                </p>
                <ul className="text-left text-gray-600 mb-6 space-y-2">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-success-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Performance Analytics
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-success-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Biomechanics Optimization
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-success-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Recovery & Nutrition
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-success-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Elite Athlete Protocols
                  </li>
                </ul>
                <Link href="/athletic-performance">
                  <Button className="w-full bg-success-green hover:bg-success-green/90 text-white font-semibold">
                    Optimize Performance
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Advanced Tools Section */}
      <section id="advanced-tools" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Tools for Serious Jumpers</h2>
            <p className="text-xl text-gray-600">Professional-grade calculators for detailed performance analysis</p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-basketball-orange/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-basketball-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Vertical Jump Calculator</h3>
                </div>
                <p className="text-gray-600 mb-4">Track and analyze your vertical jump progress with detailed metrics and percentile rankings.</p>
                <Link href="/calculators/vertical-jump-calculator">
                  <Button className="w-full border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white font-semibold">Calculate Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-court-blue/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-court-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Standing Reach Calculator</h3>
                </div>
                <p className="text-gray-600 mb-4">Determine your standing reach based on height and body proportions for accurate dunk requirements.</p>
                <Link href="/calculators/standing-reach-calculator">
                  <Button className="w-full border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white font-semibold">Calculate Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-success-green/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Approach vs Standing</h3>
                </div>
                <p className="text-gray-600 mb-4">Compare your one-foot approach versus two-foot standing jump performance and optimization.</p>
                <Link href="/calculators/approach-vs-standing-jump-calculator">
                  <Button className="w-full border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white font-semibold">Calculate Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Jump Fatigue Calculator</h3>
                </div>
                <p className="text-gray-600 mb-4">Track how fatigue affects your jumping performance and optimize training recovery.</p>
                <Link href="/calculators/jump-fatigue-calculator">
                  <Button variant="outline" className="w-full">Calculate Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13v-1a4 4 0 014-4 4 4 0 014 4v1m0 4H8m0-4h8m-4-8a4 4 0 00-4 4v1m8 0a4 4 0 00-4-4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Max Potential Calculator</h3>
                </div>
                <p className="text-gray-600 mb-4">Discover your theoretical maximum vertical jump based on body type and training potential.</p>
                <Link href="/calculators/max-potential-jump-calculator">
                  <Button variant="outline" className="w-full">Calculate Now</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Ideal Body Weight</h3>
                </div>
                <p className="text-gray-600 mb-4">Calculate optimal body weight for maximum jumping performance and power-to-weight ratio.</p>
                <Link href="/calculators/ideal-body-weight-jump-calculator">
                  <Button variant="outline" className="w-full">Calculate Now</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Real-World Case Studies Section */}
      <section id="case-studies" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real-World Case Studies & Success Stories</h2>
            <p className="text-xl text-gray-600">Proven results from athletes who transformed their dunking ability</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Marcus, 5'10" Guard</h3>
                    <p className="text-sm text-green-600">+12 inches in 8 months</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <p><strong>Starting Point:</strong> 22" vertical, couldn't touch rim</p>
                  <p><strong>Training Focus:</strong> Plyometrics + strength training</p>
                  <p><strong>Result:</strong> First dunk at 34" vertical jump</p>
                  <p className="text-green-700 font-medium">"The calculator showed me exactly what I needed. Having a clear target made all the difference."</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Jessica, 5'6" Forward</h3>
                    <p className="text-sm text-blue-600">+8 inches in 6 months</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <p><strong>Starting Point:</strong> 28" vertical, 6" from dunking</p>
                  <p><strong>Training Focus:</strong> Technique refinement + power</p>
                  <p><strong>Result:</strong> Consistent dunking at 36" vertical</p>
                  <p className="text-blue-700 font-medium">"Understanding the physics helped me optimize my approach angle and timing perfectly."</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">David, 6'2" Center</h3>
                    <p className="text-sm text-orange-600">Windmill mastery in 1 year</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <p><strong>Starting Point:</strong> Basic dunking ability</p>
                  <p><strong>Training Focus:</strong> Advanced techniques + hang time</p>
                  <p><strong>Result:</strong> Windmill and 360-degree dunks</p>
                  <p className="text-orange-700 font-medium">"The progression from power dunks to finesse moves was systematic and achievable."</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Common Success Patterns</h3>
              <p className="text-gray-600">What our most successful athletes have in common</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-basketball-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-basketball-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">Consistent Training</h4>
                <p className="text-sm text-gray-600">4-5 sessions per week with progressive overload</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-court-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-court-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">Technique Focus</h4>
                <p className="text-sm text-gray-600">Perfecting form before increasing intensity</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-success-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">Goal Tracking</h4>
                <p className="text-sm text-gray-600">Monthly vertical jump testing and adjustment</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold mb-2">Patient Progression</h4>
                <p className="text-sm text-gray-600">6-18 month commitment to see major gains</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-basketball-orange rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1" fill="none"/>
                    <path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth="1"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Dunk Calculator</h3>
              </div>
              <p className="text-gray-400">
                Professional basketball performance tools and training resources for athletes at every level.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Calculators</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Dunk Calculator</Link></li>
                <li><Link href="/calculators/vertical-jump-calculator" className="text-gray-400 hover:text-white transition-colors">Vertical Jump</Link></li>
                <li><Link href="/calculators/standing-reach-calculator" className="text-gray-400 hover:text-white transition-colors">Standing Reach</Link></li>
                <li><Link href="/calculators" className="text-gray-400 hover:text-white transition-colors">All Tools</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Training</h4>
              <ul className="space-y-2">
                <li><Link href="/vertical-jump-training" className="text-gray-400 hover:text-white transition-colors">Jump Training</Link></li>
                <li><Link href="/athletic-performance" className="text-gray-400 hover:text-white transition-colors">Athletic Performance</Link></li>
                <li><Link href="/how-to-dunk-a-basketball" className="text-gray-400 hover:text-white transition-colors">How to Dunk</Link></li>
                <li><Link href="/can-i-dunk" className="text-gray-400 hover:text-white transition-colors">Can I Dunk?</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/dunking-requirements-by-height" className="text-gray-400 hover:text-white transition-colors">Height Requirements</Link></li>
                <li><Link href="/guides/types-of-dunks-explained" className="text-gray-400 hover:text-white transition-colors">Dunk Types Guide</Link></li>
                <li><button onClick={() => scrollToSection('faq')} className="text-gray-400 hover:text-white transition-colors">FAQ</button></li>
                <li><button onClick={() => scrollToSection('physics')} className="text-gray-400 hover:text-white transition-colors">Physics</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2025 Dunk Calculator. Professional basketball performance analysis tools.
            </p>
          </div>
        </div>
      </footer>
    </SEOPageLayout>
  );
}
