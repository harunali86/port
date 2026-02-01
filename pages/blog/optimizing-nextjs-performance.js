import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PerformanceGuide() {
    return (
        <div className="bg-black text-white min-h-screen">
            <Head>
                <title>Optimizing Next.js for 100/100 Lighthouse Scores | Harun Shaikh</title>
                <meta name="description" content="Master Next.js performance optimization. Learn how to achieve perfect Core Web Vitals, optimize images, and reduce bundle size." />
                <meta name="keywords" content="Next.js Performance, Lighthouse Score, Web Vitals, Next.js Optimization, Harun Shaikh" />
            </Head>

            <Navbar />

            <main className="pt-32 pb-16 px-4 max-w-4xl mx-auto">
                <article className="prose prose-invert lg:prose-xl">
                    <h1 className="text-5xl font-bold mb-8">The Ultimate Guide to Next.js Performance Optimization</h1>
                    <p className="text-gray-400 text-sm mb-12 uppercase tracking-widest">Published Jan 30, 2026 • 12 min read</p>

                    <p>
                        Speed is a feature. In 2026, a slow website isn't just a bad user experience—it's an SEO disaster. Google's Core Web Vitals are more important than ever. Here is how I consistently achieve 100/100 scores on Next.js projects.
                    </p>

                    <h2>1. Use Next/Image Religiously</h2>
                    <p>
                        One of the biggest causes of slow LCP (Largest Contentful Paint) is unoptimized images. The <code>next/image</code> component handles resizing, lazy loading, and serving modern formats like WebP or AVIF automatically.
                    </p>

                    <h2>2. Strategic Dynamic Imports</h2>
                    <p>
                        Don't load what you don't need. Use <code>next/dynamic</code> to split your code. Only load heavy components (like 3D models or complex charts) when they are actually needed on the client.
                    </p>

                    <pre className="bg-zinc-900 p-4 rounded-xl text-green-400">
                        {`const HeavyChart = dynamic(() => import('./Chart'), { 
  ssr: false, 
  loading: () => <Skeleton /> 
});`}
                    </pre>

                    <h2>3. Font Optimization</h2>
                    <p>
                        Layout shifts (CLS) often happen because of font loading. Use <code>next/font</code> to automatically optimize your Google Fonts or local fonts without extra network requests.
                    </p>

                    <h2>4. Analyze Your Bundle</h2>
                    <p>
                        Use <code>@next/bundle-analyzer</code> to visualize what is bloating your client-side JavaScript. Often, a single library like <code>moment.js</code> or <code>lodash</code> can be replaced with lighter alternatives.
                    </p>

                    <h2>Summary</h2>
                    <p>
                        Performance is an ongoing process. By following these foundational steps, you set your Next.js application up for success in both user satisfaction and search engine rankings.
                    </p>
                </article>
            </main>

            <Footer />
        </div>
    );
}
