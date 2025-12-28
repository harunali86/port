import { Html, Head, Main, NextScript } from 'next/document'
import { getAllSchemas } from '../lib/schema'

export default function Document() {
  const schemas = getAllSchemas();

  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#0a0e1a" />
        <meta name="description" content="Harun Shaikh - Senior Full Stack Developer with 3+ years experience. Expert in React, Next.js, Node.js, Python, AI/ML integration. 50+ projects delivered worldwide." />
        <meta name="keywords" content="Harun Shaikh, full stack developer, react developer, nextjs expert, nodejs developer, web development, AI integration, machine learning, typescript, javascript, portfolio, hire developer, freelance developer" />
        <meta name="author" content="Harun Ilahi Shaikh" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://harun-portfolio.vercel.app" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/portfolio.jpg" />

        {/* Open Graph */}
        <meta property="og:title" content="Harun Shaikh | Senior Full Stack Developer" />
        <meta property="og:description" content="Expert Full Stack Developer specializing in React, Next.js, Node.js, and AI/ML integration. 3+ years experience, 50+ projects delivered. Available for hire." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://harun-portfolio.vercel.app" />
        <meta property="og:image" content="https://harun-portfolio.vercel.app/portfolio.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Harun Shaikh - Full Stack Developer" />
        <meta property="og:site_name" content="Harun Shaikh Portfolio" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Harun Shaikh | Senior Full Stack Developer" />
        <meta name="twitter:description" content="Expert Full Stack Developer specializing in React, Next.js, and AI/ML integration. Available for hire." />
        <meta name="twitter:image" content="https://harun-portfolio.vercel.app/portfolio.jpg" />
        <meta name="twitter:creator" content="@harunshaikh" />

        {/* Additional SEO */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Harun Shaikh" />

        {/* Geo Tags for Local SEO */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Structured Data / JSON-LD Schemas */}
        {schemas.map((schema, index) => (
          <script
            key={`schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>
      <body>
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#00ff41] text-black px-4 py-2 z-50">
          Skip to main content
        </a>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
