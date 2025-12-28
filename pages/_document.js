import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0a0e1a" />
        <meta name="description" content="Senior Full Stack Developer with 3+ years experience building scalable web applications. Expert in React, Next.js, Node.js, AI/ML integration." />
        <meta name="keywords" content="full stack developer, react developer, nextjs expert, nodejs developer, web development, AI integration, machine learning, typescript, javascript, Harun Shaikh" />
        <meta name="author" content="Harun Ilahi Shaikh" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://harun-portfolio.vercel.app" />

        {/* Open Graph */}
        <meta property="og:title" content="Harun Shaikh | Senior Full Stack Developer" />
        <meta property="og:description" content="Expert Full Stack Developer specializing in React, Next.js, and AI/ML integration. 3+ years experience, 50+ projects delivered." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://harun-portfolio.vercel.app" />
        <meta property="og:image" content="https://harun-portfolio.vercel.app/portfolio.jpg" />
        <meta property="og:site_name" content="Harun Shaikh Portfolio" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Harun Shaikh | Senior Full Stack Developer" />
        <meta name="twitter:description" content="Expert Full Stack Developer specializing in React, Next.js, and AI/ML integration" />
        <meta name="twitter:image" content="https://harun-portfolio.vercel.app/portfolio.jpg" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
