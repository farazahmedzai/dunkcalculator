import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useSEO, generateBreadcrumbSchema, BreadcrumbItem } from '@/lib/seo';
import { useEffect } from 'react';

interface BreadcrumbNavigationProps {
  customBreadcrumbs?: BreadcrumbItem[];
}

export default function BreadcrumbNavigation({ customBreadcrumbs }: BreadcrumbNavigationProps) {
  const [location] = useLocation();
  
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    if (customBreadcrumbs) return customBreadcrumbs;
    
    const pathSegments = location.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [{ name: 'Home', url: '/' }];
    
    let currentPath = '';
    
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;
      
      // Map URL segments to readable names
      const segmentNames: Record<string, string> = {
        'calculators': 'Calculators',
        'vertical-jump-calculator': 'Vertical Jump Calculator',
        'standing-reach-calculator': 'Standing Reach Calculator',
        'approach-vs-standing-jump-calculator': 'Approach vs Standing Jump Calculator',
        'jump-fatigue-calculator': 'Jump Fatigue Calculator',
        'max-potential-jump-calculator': 'Max Potential Jump Calculator',
        'ideal-body-weight-jump-calculator': 'Ideal Body Weight Jump Calculator',
        'vertical-jump-training': 'Vertical Jump Training',
        'athletic-performance': 'Athletic Performance',
        'can-i-dunk': 'Can I Dunk?',
        'how-to-dunk-a-basketball': 'How to Dunk a Basketball',
        'dunking-requirements-by-height': 'Dunking Requirements by Height',
        'guides': 'Guides',
        'types-of-dunks-explained': 'Types of Dunks Explained'
      };
      
      const name = segmentNames[segment] || segment.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      breadcrumbs.push({ name, url: currentPath });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = getBreadcrumbs();
  
  // Add breadcrumb schema to page
  useEffect(() => {
    if (breadcrumbs.length > 1) {
      const schema = generateBreadcrumbSchema(breadcrumbs);
      
      // Remove existing breadcrumb schema
      const existingBreadcrumbSchema = document.querySelector('script[data-breadcrumb-schema]');
      if (existingBreadcrumbSchema) {
        existingBreadcrumbSchema.remove();
      }
      
      // Add new breadcrumb schema
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-breadcrumb-schema', 'true');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [breadcrumbs]);
  
  if (breadcrumbs.length <= 1) return null;
  
  return (
    <nav 
      aria-label="Breadcrumb" 
      className="flex items-center space-x-1 text-sm text-muted-foreground mb-4 py-2"
      itemScope 
      itemType="https://schema.org/BreadcrumbList"
    >
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const isHome = index === 0;
        
        return (
          <div key={crumb.url} className="flex items-center">
            <div
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={String(index + 1)} />
              {isLast ? (
                <span 
                  className="flex items-center font-medium text-foreground"
                  itemProp="name"
                  aria-current="page"
                >
                  {isHome && <Home className="w-4 h-4 mr-1" />}
                  {crumb.name}
                </span>
              ) : (
                <Link 
                  href={crumb.url}
                  className="flex items-center hover:text-foreground transition-colors"
                  itemProp="item"
                >
                  {isHome && <Home className="w-4 h-4 mr-1" />}
                  <span itemProp="name">{crumb.name}</span>
                </Link>
              )}
            </div>
            {!isLast && (
              <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground/50" />
            )}
          </div>
        );
      })}
    </nav>
  );
}