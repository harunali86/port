// pages/sitemap.xml.js - Dynamic Sitemap Generation
import { siteConfig } from '../lib/schema';

const SITE_URL = siteConfig.url;

function generateSiteMap() {
    const currentDate = new Date().toISOString().split('T')[0];

    // Define all pages/sections
    const pages = [
        { url: '', priority: '1.0', changefreq: 'weekly' },
        { url: '#about', priority: '0.9', changefreq: 'monthly' },
        { url: '#skills', priority: '0.8', changefreq: 'monthly' },
        { url: '#projects', priority: '0.9', changefreq: 'weekly' },
        { url: '#services', priority: '0.9', changefreq: 'monthly' },
        { url: '#contact', priority: '0.8', changefreq: 'monthly' },
    ];

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages.map(page => `  <url>
    <loc>${SITE_URL}/${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
  
  <!-- Image sitemap for portfolio image -->
  <url>
    <loc>${SITE_URL}/</loc>
    <image:image>
      <image:loc>${SITE_URL}/portfolio.jpg</image:loc>
      <image:title>Harun Shaikh - Full Stack Developer</image:title>
      <image:caption>Professional portfolio image of Harun Shaikh, Senior Full Stack Developer</image:caption>
    </image:image>
  </url>
</urlset>`;
}

export async function getServerSideProps({ res }) {
    const sitemap = generateSiteMap();

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default function Sitemap() {
    return null;
}
