import { ReactNode } from 'react';
import { useSEO, SEOData, BreadcrumbItem } from '@/lib/seo';
import BreadcrumbNavigation from './breadcrumb-navigation';
import PageHeader from './page-header';

interface SEOPageLayoutProps {
  children: ReactNode;
  seoData: SEOData;
  breadcrumbs?: BreadcrumbItem[];
  showHeader?: boolean;
  currentPage?: string;
  className?: string;
}

export default function SEOPageLayout({ 
  children, 
  seoData, 
  breadcrumbs, 
  showHeader = true,
  currentPage,
  className = ""
}: SEOPageLayoutProps) {
  useSEO(seoData);
  
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {showHeader && <PageHeader currentPage={currentPage} />}
      <main className="container mx-auto px-4 py-6">
        <BreadcrumbNavigation customBreadcrumbs={breadcrumbs} />
        {children}
      </main>
    </div>
  );
}