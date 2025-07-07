import { build } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function generateSitemap() {
  const baseUrl = 'https://dunk-calculator.info';
  const currentDate = new Date().toISOString().split('T')[0];
  
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
    { url: '/dunking-requirements-by-height', priority: '0.6', changefreq: 'monthly' },
    { url: '/privacy-policy', priority: '0.3', changefreq: 'yearly' }
  ];

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

  return sitemap;
}

function generateRobotsTxt() {
  const baseUrl = 'https://dunk-calculator.info';
  
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;
}

async function buildStatic() {
  try {
    await build({
      root: path.resolve(__dirname, 'client'),
      build: {
        outDir: path.resolve(__dirname, 'dist'),
        emptyOutDir: true,
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'client', 'src'),
          '@shared': path.resolve(__dirname, 'shared'),
          '@assets': path.resolve(__dirname, 'attached_assets'),
        },
      },
    });

    // Generate sitemap.xml
    const sitemapContent = generateSitemap();
    writeFileSync(path.resolve(__dirname, 'dist', 'sitemap.xml'), sitemapContent);
    console.log('Sitemap generated successfully!');

    // Generate robots.txt
    const robotsContent = generateRobotsTxt();
    writeFileSync(path.resolve(__dirname, 'dist', 'robots.txt'), robotsContent);
    console.log('Robots.txt generated successfully!');

    console.log('Static build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildStatic();