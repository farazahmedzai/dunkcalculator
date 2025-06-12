import { Link } from "wouter";

interface PageHeaderProps {
  currentPage?: string;
}

export default function PageHeader({ currentPage }: PageHeaderProps) {
  return (
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
            <Link 
              href="/" 
              className={`transition-colors ${
                currentPage === 'home' 
                  ? 'text-basketball-orange' 
                  : 'text-gray-700 hover:text-basketball-orange'
              }`}
            >
              Calculator
            </Link>
            <Link 
              href="/calculators" 
              className={`transition-colors ${
                currentPage === 'calculators' 
                  ? 'text-basketball-orange' 
                  : 'text-gray-700 hover:text-basketball-orange'
              }`}
            >
              Tools
            </Link>
            <Link 
              href="/vertical-jump-training" 
              className={`transition-colors ${
                currentPage === 'training' 
                  ? 'text-basketball-orange' 
                  : 'text-gray-700 hover:text-basketball-orange'
              }`}
            >
              Training
            </Link>
            <Link 
              href="/athletic-performance" 
              className={`transition-colors ${
                currentPage === 'performance' 
                  ? 'text-basketball-orange' 
                  : 'text-gray-700 hover:text-basketball-orange'
              }`}
            >
              Performance
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}