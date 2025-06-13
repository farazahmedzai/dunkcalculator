import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Sitemap.xml route
  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('host');
    
    const pages = [
      { url: '/', priority: '1.0', changefreq: 'weekly' },
      { url: '/calculators', priority: '0.9', changefreq: 'weekly' },
      { url: '/calculators/vertical-jump-calculator', priority: '0.8', changefreq: 'monthly' },
      { url: '/calculators/standing-reach-calculator', priority: '0.8', changefreq: 'monthly' },
      { url: '/calculators/approach-vs-standing-jump-calculator', priority: '0.8', changefreq: 'monthly' },
      { url: '/calculators/jump-fatigue-calculator', priority: '0.8', changefreq: 'monthly' },
      { url: '/calculators/max-potential-jump-calculator', priority: '0.8', changefreq: 'monthly' },
      { url: '/calculators/ideal-body-weight-jump-calculator', priority: '0.8', changefreq: 'monthly' },
      { url: '/can-i-dunk', priority: '0.7', changefreq: 'monthly' },
      { url: '/how-to-dunk-a-basketball', priority: '0.7', changefreq: 'monthly' },
      { url: '/vertical-jump-training', priority: '0.7', changefreq: 'monthly' },
      { url: '/athletic-performance', priority: '0.7', changefreq: 'monthly' },
      { url: '/dunking-requirements-by-height', priority: '0.6', changefreq: 'monthly' }
    ];

    const currentDate = new Date().toISOString().split('T')[0];
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    pages.forEach(page => {
      sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.send(sitemap);
  });

  // Robots.txt route
  app.get('/robots.txt', (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('host');
    const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;

    res.set('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });

  const httpServer = createServer(app);

  return httpServer;
}
