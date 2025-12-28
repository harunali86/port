import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Senior Full Stack Developer with 3+ years experience building scalable web applications. Expert in React, Next.js, Node.js, AI/ML integration." />
        <meta name="keywords" content="full stack developer, react developer, nextjs expert, nodejs developer, web development, AI integration, machine learning, typescript, javascript" />
        <meta name="author" content="Harun Ilahi Shaikh" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://harun-portfolio.vercel.app" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Harun Shaikh | Senior Full Stack Developer" />
        <meta property="og:description" content="Expert Full Stack Developer specializing in React, Next.js, and AI/ML integration" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://harun-portfolio.vercel.app" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Harun Shaikh | Senior Full Stack Developer" />
        <meta name="twitter:description" content="Expert Full Stack Developer specializing in React, Next.js, and AI/ML integration" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
