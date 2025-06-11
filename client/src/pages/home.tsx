import { useState } from "react";
import DunkCalculator from "@/components/dunk-calculator";
import CalculatorResults from "@/components/calculator-results";
import JumpVisualization from "@/components/jump-visualization";
import FAQSection from "@/components/faq-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-basketball-orange rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1" fill="none"/>
                  <path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth="1"/>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Dunk Calculator</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection('calculator')}
                className="text-gray-700 hover:text-basketball-orange transition-colors"
              >
                Calculator
              </button>
              <button
                onClick={() => scrollToSection('what-influences')}
                className="text-gray-700 hover:text-basketball-orange transition-colors"
              >
                Factors
              </button>
              <button
                onClick={() => scrollToSection('close-the-gap')}
                className="text-gray-700 hover:text-basketball-orange transition-colors"
              >
                Training
              </button>
              <button
                onClick={() => scrollToSection('advanced-tools')}
                className="text-gray-700 hover:text-basketball-orange transition-colors"
              >
                Tools
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-gray-700 hover:text-basketball-orange transition-colors"
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
                    Jump Fatigue Analysis
                  </li>
                </ul>
                <Button className="w-full bg-orange-600 text-white hover:bg-orange-700 font-semibold">
                  Explore All Calculators
                </Button>
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
                <h3 className="text-2xl font-bold mb-4">Training Programs</h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive training programs designed by experts. From beginner bodyweight routines to advanced plyometric protocols.
                </p>
                <ul className="text-left text-gray-600 mb-6 space-y-2">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-court-blue mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    12-Week Gym Program
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-court-blue mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    At-Home Bodyweight Plan
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-court-blue mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Advanced Plyometrics
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-court-blue mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Exercise Video Library
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 font-semibold">
                  Start Training Today
                </Button>
              </CardContent>
            </Card>

            {/* Pillar 3: Performance */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-success-green">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-success-green/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-success-green/20 transition-colors">
                  <svg className="w-10 h-10 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Athletic Performance</h3>
                <p className="text-gray-600 mb-6">
                  Science-backed performance optimization. Nutrition, recovery, biomechanics, and gear recommendations from sports scientists.
                </p>
                <ul className="text-left text-gray-600 mb-6 space-y-2">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-success-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Jumping Biomechanics
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-success-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Nutrition for Explosiveness
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-success-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Injury Prevention
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-success-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Equipment Reviews
                  </li>
                </ul>
                <Button className="w-full bg-green-600 text-white hover:bg-green-700 font-semibold">
                  Optimize Performance
                </Button>
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
            <p className="text-xl text-gray-600">Specialized calculators for comprehensive performance analysis</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-basketball-orange">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-basketball-orange/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-basketball-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Vertical Jump Calculator</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">Measure your maximum vertical leap with precision timing and technique analysis.</p>
                <Button variant="outline" className="w-full text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white font-semibold">
                  Calculate Vertical
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-court-blue">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-court-blue/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-court-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Standing Reach Calculator</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">Determine your optimal standing reach based on height, wingspan, and flexibility.</p>
                <Button variant="outline" className="w-full text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white font-semibold">
                  Measure Reach
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-success-green">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-success-green/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Approach vs Standing</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">Compare your running approach jump to your standing vertical leap performance.</p>
                <Button variant="outline" className="w-full text-success-green border-success-green hover:bg-success-green hover:text-white">
                  Compare Jumps
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Jump Fatigue Calculator</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">Analyze how your vertical decreases with repeated jumps and optimize rest periods.</p>
                <Button variant="outline" className="w-full text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white">
                  Measure Fatigue
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Max Potential Calculator</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">Estimate your maximum achievable vertical jump based on body composition and training.</p>
                <Button variant="outline" className="w-full text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white">
                  Find Max Potential
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold">Ideal Body Weight</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">Calculate your optimal weight for maximum jumping performance and power output.</p>
                <Button variant="outline" className="w-full text-red-500 border-red-500 hover:bg-red-500 hover:text-white">
                  Optimize Weight
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Card className="bg-gradient-to-r from-basketball-orange to-red-500 text-white inline-block">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Professional Analysis Package</h3>
                <p className="mb-4">Get detailed reports from all calculators with personalized training recommendations.</p>
                <Button className="bg-white text-basketball-orange hover:bg-gray-100">
                  Unlock Full Analysis
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-basketball-orange rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1" fill="none"/>
                    <path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth="1"/>
                  </svg>
                </div>
                <span className="text-xl font-bold">Dunk Calculator</span>
              </div>
              <p className="text-gray-400 mb-4">
                The ultimate resource for dunking calculations and vertical jump training.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Calculators</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Dunk Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Vertical Jump Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Standing Reach Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Jump Fatigue Calculator</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Training</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">12-Week Program</a></li>
                <li><a href="#" className="hover:text-white transition-colors">At-Home Workouts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Plyometric Exercises</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Jump Technique</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">How to Dunk</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sports Science</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Nutrition Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Injury Prevention</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Dunk Calculator. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
