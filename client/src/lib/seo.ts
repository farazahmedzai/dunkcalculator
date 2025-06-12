import { useEffect } from 'react';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  structuredData?: object[];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function useSEO(seoData: SEOData) {
  useEffect(() => {
    // Set document title
    document.title = seoData.title;

    // Remove existing meta tags
    const existingMetas = document.querySelectorAll('meta[data-seo]');
    existingMetas.forEach(meta => meta.remove());

    // Remove existing structured data
    const existingStructuredData = document.querySelectorAll('script[type="application/ld+json"][data-seo]');
    existingStructuredData.forEach(script => script.remove());

    // Create meta tags
    const metaTags: Array<{ name?: string; property?: string; content: string }> = [
      { name: 'description', content: seoData.description },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    ];

    if (seoData.keywords) {
      metaTags.push({ name: 'keywords', content: seoData.keywords });
    }

    // Open Graph tags
    metaTags.push(
      { property: 'og:title', content: seoData.ogTitle || seoData.title },
      { property: 'og:description', content: seoData.ogDescription || seoData.description },
      { property: 'og:type', content: seoData.ogType || 'website' },
      { property: 'og:url', content: seoData.canonicalUrl || window.location.href },
      { property: 'og:site_name', content: 'Dunk Calculator Pro' }
    );

    if (seoData.ogImage) {
      metaTags.push({ property: 'og:image', content: seoData.ogImage });
    }

    // Twitter Card tags
    metaTags.push(
      { name: 'twitter:card', content: seoData.twitterCard || 'summary_large_image' },
      { name: 'twitter:title', content: seoData.twitterTitle || seoData.title },
      { name: 'twitter:description', content: seoData.twitterDescription || seoData.description }
    );

    if (seoData.twitterImage) {
      metaTags.push({ name: 'twitter:image', content: seoData.twitterImage });
    }

    // Add meta tags to document
    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.setAttribute('data-seo', 'true');
      if (tag.name) meta.setAttribute('name', tag.name);
      if (tag.property) meta.setAttribute('property', tag.property);
      meta.setAttribute('content', tag.content);
      document.head.appendChild(meta);
    });

    // Add canonical URL
    if (seoData.canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', seoData.canonicalUrl);
    }

    // Add structured data
    if (seoData.structuredData && seoData.structuredData.length > 0) {
      seoData.structuredData.forEach(data => {
        const script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('data-seo', 'true');
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }
  }, [seoData]);
}

export function generateBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${window.location.origin}${crumb.url}`
    }))
  };
}

export function generateWebPageSchema(title: string, description: string, url?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url || window.location.href,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Dunk Calculator Pro",
      "url": window.location.origin
    }
  };
}

export function generateCalculatorSchema(
  name: string, 
  description: string, 
  url?: string,
  inputFields?: string[],
  outputFields?: string[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "url": url || window.location.href,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": inputFields,
    "softwareHelp": {
      "@type": "CreativeWork",
      "about": description
    }
  };
}

export function generateArticleSchema(
  headline: string,
  description: string,
  datePublished?: string,
  dateModified?: string,
  author?: string,
  url?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "datePublished": datePublished || new Date().toISOString(),
    "dateModified": dateModified || new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": author || "Dunk Calculator Pro Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Dunk Calculator Pro",
      "url": window.location.origin
    },
    "url": url || window.location.href,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url || window.location.href
    }
  };
}

export function generateFAQSchema(faqData: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string; image?: string }>,
  totalTime?: string,
  estimatedCost?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "totalTime": totalTime,
    "estimatedCost": estimatedCost,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "image": step.image
    }))
  };
}

// URL optimization utilities
export function optimizeUrl(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Keyword density checker
export function checkKeywordDensity(content: string, keyword: string): number {
  const words = content.toLowerCase().split(/\s+/);
  const keywordWords = keyword.toLowerCase().split(/\s+/);
  let count = 0;
  
  for (let i = 0; i <= words.length - keywordWords.length; i++) {
    const phrase = words.slice(i, i + keywordWords.length).join(' ');
    if (phrase === keyword.toLowerCase()) {
      count++;
    }
  }
  
  return (count / words.length) * 100;
}

// Reading time calculator
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}