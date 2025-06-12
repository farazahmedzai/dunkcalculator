import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Target, 
  Activity, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Zap,
  TrendingUp,
  Users,
  Trophy,
  BookOpen,
  Video
} from "lucide-react";
import PageHeader from "@/components/shared/page-header";
import DunkCard from "@/components/shared/dunk-card";
import { getDunkByName } from "@/components/shared/dunk-types-data";
import SEOPageLayout from "@/components/shared/seo-page-layout";
import { generateHowToSchema, generateArticleSchema, generateWebPageSchema, BreadcrumbItem } from "@/lib/seo";

export default function HowToDunkABasketball() {
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
      <section className="bg-gradient-to-br from-orange-600 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How to Dunk a Basketball: Complete Guide
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
              Master the art of dunking with this comprehensive step-by-step guide covering technique, training, and mental preparation
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => scrollToSection('fundamentals')}
                className="bg-white text-orange-600 px-6 py-3 font-semibold hover:bg-gray-100 border-2 border-white shadow-lg"
              >
                Learn the Fundamentals
              </Button>
              <Button
                onClick={() => scrollToSection('technique')}
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-6 py-3 font-semibold shadow-lg bg-black/20 backdrop-blur-sm"
              >
                Master the Technique
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <button
              onClick={() => scrollToSection('fundamentals')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Fundamentals
            </button>
            <button
              onClick={() => scrollToSection('technique')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Technique
            </button>
            <button
              onClick={() => scrollToSection('training')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Training
            </button>
            <button
              onClick={() => scrollToSection('common-mistakes')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Common Mistakes
            </button>
            <button
              onClick={() => scrollToSection('progression')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Progression
            </button>
          </div>
        </div>
      </section>

      {/* Prerequisites */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Before You Start: Prerequisites</h2>
            <p className="text-xl text-gray-600">Essential requirements for safe and effective dunking practice</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Target className="w-5 h-5 mr-2" />
                  Physical Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• Vertical jump of at least 24-30 inches</li>
                  <li>• Good overall conditioning and mobility</li>
                  <li>• No significant knee, ankle, or back injuries</li>
                  <li>• Basic basketball handling skills</li>
                  <li>• Ability to palm or securely grip a basketball</li>
                </ul>
                <div className="mt-4">
                  <Link href="/">
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                      Check Your Requirements
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Equipment Needed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Regulation basketball (29.5" men's, 28.5" women's)</li>
                  <li>• High-quality basketball shoes with ankle support</li>
                  <li>• 10-foot regulation rim (start lower if needed)</li>
                  <li>• Adequate landing space and safe playing surface</li>
                  <li>• Optional: adjustable rim for progression</li>
                </ul>
                <div className="mt-4 p-3 bg-green-100 rounded-lg">
                  <p className="text-xs text-green-800">
                    <strong>Safety First:</strong> Never practice on uneven surfaces or with inadequate landing space
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-800">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Safety Considerations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-orange-700">
                  <li>• Always warm up thoroughly before dunking attempts</li>
                  <li>• Start with lower rims and progress gradually</li>
                  <li>• Practice proper landing mechanics</li>
                  <li>• Don't attempt when fatigued or injured</li>
                  <li>• Have a spotter when learning new techniques</li>
                </ul>
                <div className="mt-4 p-3 bg-orange-100 rounded-lg">
                  <p className="text-xs text-orange-800">
                    <strong>Warning:</strong> Dunking carries injury risk. Progress gradually and listen to your body
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fundamentals */}
      <section id="fundamentals" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Dunking Fundamentals</h2>
            <p className="text-xl text-gray-600">Master these core concepts before attempting your first dunk</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Play className="w-5 h-5 mr-2 text-basketball-orange" />
                    Understanding the Physics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Dunking is fundamentally about generating enough upward momentum to elevate your hand 
                    above the rim. The minimum clearance needed depends on your hand size and dunking style.
                  </p>
                  
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Key Physics Concepts:</h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Vertical velocity determines maximum height</li>
                      <li>• Ground contact time affects force application</li>
                      <li>• Body position influences energy transfer efficiency</li>
                      <li>• Approach speed adds horizontal momentum for conversion</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                    <p className="mb-2"><strong>Basic Formula:</strong></p>
                    <p>Hand Height = Standing Reach + Vertical Jump</p>
                    <p className="text-xs text-gray-500 mt-2">Must exceed rim height (10 feet) plus desired clearance</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-600" />
                    Types of Dunks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold">Two-Handed Dunk</h4>
                      <p className="text-sm text-gray-600">Safest and most secure. Requires both hands above rim.</p>
                      <Badge variant="secondary" className="mt-1">Beginner Friendly</Badge>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold">One-Handed Dunk</h4>
                      <p className="text-sm text-gray-600">Classic dunk requiring strong grip and control.</p>
                      <Badge variant="secondary" className="mt-1">Intermediate</Badge>
                    </div>
                    
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold">Tomahawk Dunk</h4>
                      <p className="text-sm text-gray-600">Powerful overhead slam with extended arm motion.</p>
                      <Badge variant="secondary" className="mt-1">Advanced</Badge>
                    </div>
                    
                    {(() => {
                      const windmillDunk = getDunkByName("Windmill Dunk");
                      return windmillDunk ? (
                        <DunkCard dunk={windmillDunk} variant="summary" />
                      ) : null;
                    })()}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-success-green" />
                    Approach Methods
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Standing Jump (Two-Foot Takeoff)</h4>
                      <p className="text-sm text-green-700 mb-2">
                        Jump straight up from stationary position. More controlled but typically lower maximum height.
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><strong>Pros:</strong> More control, safer</div>
                        <div><strong>Cons:</strong> Lower max height</div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Running Approach (One-Foot Takeoff)</h4>
                      <p className="text-sm text-blue-700 mb-2">
                        Build momentum with 3-5 step approach, plant one foot and explode upward.
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><strong>Pros:</strong> Higher max height</div>
                        <div><strong>Cons:</strong> More complex timing</div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">Two-Step Approach (Two-Foot Takeoff)</h4>
                      <p className="text-sm text-purple-700 mb-2">
                        Combine momentum with bilateral takeoff power for balanced height and control.
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div><strong>Pros:</strong> Good balance</div>
                        <div><strong>Cons:</strong> Complex coordination</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-purple-600" />
                    Mental Preparation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Mental barriers often prevent athletes from dunking even when they have the physical ability. 
                    Confidence and commitment are crucial for successful dunking.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-xs font-bold">1</div>
                      <div>
                        <h5 className="font-semibold">Visualization</h5>
                        <p className="text-sm text-gray-600">Mentally rehearse successful dunks before attempting</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-xs font-bold">2</div>
                      <div>
                        <h5 className="font-semibold">Commit Fully</h5>
                        <p className="text-sm text-gray-600">Hesitation leads to poor technique and potential injury</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-xs font-bold">3</div>
                      <div>
                        <h5 className="font-semibold">Manage Fear</h5>
                        <p className="text-sm text-gray-600">Start with lower rims to build confidence progressively</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technique */}
      <section id="technique" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Step-by-Step Technique</h2>
            <p className="text-xl text-gray-600">Master the technical aspects of dunking with proper form</p>
          </div>

          <div className="space-y-12">
            {/* Approach Phase */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Phase 1: The Approach</CardTitle>
                <CardDescription>Building momentum and setting up for takeoff</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <div className="bg-blue-100 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Step 1: Starting Position</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Begin 12-15 feet from the basket</li>
                        <li>• Hold ball securely in dominant hand</li>
                        <li>• Body relaxed, eyes focused on rim</li>
                        <li>• Take a deep breath and visualize success</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-green-100 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Step 2: Acceleration</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Take 3-5 controlled, accelerating steps</li>
                        <li>• Maintain low center of gravity</li>
                        <li>• Ball secured close to body</li>
                        <li>• Build speed gradually, don't sprint</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-purple-100 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">Step 3: Penultimate Step</h4>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• Second-to-last step is slightly longer</li>
                        <li>• Begin to lower center of gravity</li>
                        <li>• Prepare for plant foot placement</li>
                        <li>• Start transferring ball to jumping hand</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Takeoff Phase */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Phase 2: The Takeoff</CardTitle>
                <CardDescription>Converting horizontal momentum into vertical lift</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="bg-orange-100 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-800 mb-2">Plant Foot Technique</h4>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• Plant foot 2-3 feet from basket base</li>
                        <li>• Land on heel, roll to toe for maximum force</li>
                        <li>• Keep plant leg slightly bent to absorb force</li>
                        <li>• Drive opposite knee upward explosively</li>
                      </ul>
                    </div>
                    
                    <div className="bg-red-100 rounded-lg p-4">
                      <h4 className="font-semibold text-red-800 mb-2">Arm Action</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Drive free arm upward for momentum</li>
                        <li>• Keep ball secure in jumping hand</li>
                        <li>• Coordinate arm swing with leg drive</li>
                        <li>• Maintain balance throughout motion</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-yellow-100 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-800 mb-2">Body Position</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Slight forward lean to maintain momentum</li>
                        <li>• Core tight for stability</li>
                        <li>• Eyes focused on target (rim)</li>
                        <li>• Shoulders squared to basket</li>
                      </ul>
                    </div>
                    
                    <div className="bg-indigo-100 rounded-lg p-4">
                      <h4 className="font-semibold text-indigo-800 mb-2">Timing Cues</h4>
                      <ul className="text-sm text-indigo-700 space-y-1">
                        <li>• Plant and jump in one fluid motion</li>
                        <li>• Maximum force application in minimum time</li>
                        <li>• Don't pause between plant and jump</li>
                        <li>• Trust your preparation and commit fully</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flight Phase */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Phase 3: Flight & Execution</CardTitle>
                <CardDescription>Completing the dunk at maximum height</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="bg-green-100 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">Ball Control</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Secure grip throughout flight</li>
                        <li>• Bring ball up and back for power</li>
                        <li>• Extend arm fully at maximum height</li>
                        <li>• Release ball forcefully through rim</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-100 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Body Control</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Maintain balance in flight</li>
                        <li>• Keep free arm out for stability</li>
                        <li>• Prepare for landing early</li>
                        <li>• Stay relaxed and fluid</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-purple-100 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">Rim Contact</h4>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• Hand should clear rim by 2-4 inches</li>
                        <li>• Drive ball down through hoop</li>
                        <li>• Follow through with wrist snap</li>
                        <li>• Don't hang on rim unnecessarily</li>
                      </ul>
                    </div>
                    
                    <div className="bg-red-100 rounded-lg p-4">
                      <h4 className="font-semibold text-red-800 mb-2">Landing Safely</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Land on balls of feet, absorb with legs</li>
                        <li>• Bend knees to absorb impact</li>
                        <li>• Keep head up and balanced</li>
                        <li>• Allow natural forward momentum</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section id="training" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Training for Dunking Success</h2>
            <p className="text-xl text-gray-600">Develop the strength, power, and technique needed to dunk consistently</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-basketball-orange" />
                  Physical Development
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold">Vertical Jump Training</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Primary focus on increasing maximum vertical leap through plyometrics and strength work
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Depth jumps, box jumps, reactive work</li>
                      <li>• Squat and deadlift progressions</li>
                      <li>• Single-leg strength development</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold">Power Development</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Explosive power training to maximize force production in minimal time
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Olympic lift variations</li>
                      <li>• Medicine ball throws</li>
                      <li>• Sprint and agility work</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold">Mobility & Flexibility</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Ensure full range of motion for optimal jumping mechanics
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Hip flexor stretching</li>
                      <li>• Ankle mobility work</li>
                      <li>• Thoracic spine mobility</li>
                    </ul>
                  </div>
                </div>
                
                <Link href="/vertical-jump-training">
                  <Button className="w-full">View Complete Training Programs</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  Skill Development
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold">Approach Work</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Practice approach timing and consistency without the ball first
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Approach rhythm drills</li>
                      <li>• Plant foot timing</li>
                      <li>• Vertical jump from approach</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold">Ball Handling</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Develop secure ball control during high-speed approaches
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Palming and grip strength</li>
                      <li>• Ball security in traffic</li>
                      <li>• One-handed control drills</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-semibold">Progressive Dunking</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Start with lower rims and progress to regulation height
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• 8-foot rim progression</li>
                      <li>• 9-foot rim mastery</li>
                      <li>• 10-foot rim attempts</li>
                    </ul>
                  </div>
                </div>
                
                <Link href="/calculators">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Use Training Tools
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section id="common-mistakes" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Common Mistakes to Avoid</h2>
            <p className="text-xl text-gray-600">Learn from these frequent errors to accelerate your progress</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center text-red-800">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Technical Mistakes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="border-l-4 border-red-500 pl-3">
                  <h4 className="font-semibold text-red-800">Taking Off Too Far from Basket</h4>
                  <p className="text-sm text-red-700">Results in forward momentum instead of vertical lift</p>
                </div>
                <div className="border-l-4 border-red-500 pl-3">
                  <h4 className="font-semibold text-red-800">Hesitating at Takeoff</h4>
                  <p className="text-sm text-red-700">Doubt kills momentum and reduces jump height</p>
                </div>
                <div className="border-l-4 border-red-500 pl-3">
                  <h4 className="font-semibold text-red-800">Poor Ball Security</h4>
                  <p className="text-sm text-red-700">Losing control during approach or flight</p>
                </div>
                <div className="border-l-4 border-red-500 pl-3">
                  <h4 className="font-semibold text-red-800">Inadequate Warm-up</h4>
                  <p className="text-sm text-red-700">Cold muscles increase injury risk and reduce performance</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Mental and Training Errors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-semibold text-blue-800">Attempting Too Early</h4>
                  <p className="text-sm text-blue-700">Trying 10-foot dunks before mastering lower heights</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-semibold text-blue-800">Inconsistent Practice</h4>
                  <p className="text-sm text-blue-700">Sporadic training prevents muscle memory development</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-semibold text-blue-800">Neglecting Landing Practice</h4>
                  <p className="text-sm text-blue-700">Poor landing mechanics increase injury risk</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-semibold text-blue-800">Ignoring Fatigue</h4>
                  <p className="text-sm text-blue-700">Practicing when tired leads to poor form and injury</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Dunking Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Calculate your exact requirements and get a personalized training plan to achieve your dunking goals
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/">
              <Button className="bg-white text-orange-600 px-8 py-3 font-semibold hover:bg-gray-100">
                Calculate Your Dunk Requirements
              </Button>
            </Link>
            <Link href="/vertical-jump-training">
              <Button 
                className="border-2 border-white bg-black/30 backdrop-blur-sm text-white hover:bg-white hover:text-orange-600 px-8 py-3 font-semibold shadow-lg"
              >
                View Training Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}