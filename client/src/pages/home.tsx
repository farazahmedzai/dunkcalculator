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
                onClick={() => scrollToSection('how-it-works')}
                className="text-gray-700 hover:text-basketball-orange transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('physics')}
                className="text-gray-700 hover:text-basketball-orange transition-colors"
              >
                Physics
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
      <section className="bg-gradient-to-br from-basketball-orange to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Dunk Calculator – See Exactly What You Need to Fly
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto">
            Calculate your exact vertical jump requirements, hang-time, and power needed to dunk with scientific precision
          </p>
          <Button
            onClick={() => scrollToSection('calculator')}
            className="bg-white text-basketball-orange px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all transform hover:scale-105"
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

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How the Dunk Calculator Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to calculate your dunking requirements</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-basketball-orange text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Enter Standing Reach & Height</h3>
                <p className="text-gray-600">
                  Measure your height and standing reach. Standing reach is how high you can reach with your arm fully extended while standing flat-footed.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-court-blue text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Set Rim Height & Clearance</h3>
                <p className="text-gray-600">
                  Choose your target rim height and desired clearance above the rim. More clearance allows for more aggressive dunking styles.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-success-green text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Get Vertical, Hang-Time & Energy</h3>
                <p className="text-gray-600">
                  Instantly see your required vertical jump, hang-time in the air, and power output needed to achieve your dunking goals.
                </p>
              </CardContent>
            </Card>
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
