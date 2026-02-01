import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HireNextjsExpert() {
    return (
        <div className="bg-black text-white min-h-screen">
            <Head>
                <title>Hire Next.js Expert | Vercel, SSR & App Router Specialist | Harun Shaikh</title>
                <meta name="description" content="Hire a top-rated Next.js expert for high-performance React applications. Harun Shaikh specializes in Next.js 14, Server Actions, and SEO optimization." />
                <meta name="keywords" content="Hire Next.js Expert, Next.js Consultant, React Framework Specialist, Vercel Expert, Harun Shaikh" />
            </Head>

            <Navbar />

            <main className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
                <section className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Next-Level Web with <span className="underline decoration-white/20">Next.js Expert</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                        From migration to the App Router to optimizing Core Web Vitals, I ensure your application is fast, accessible, and ranks on Google.
                    </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800">
                        <h3 className="text-2xl font-bold mb-3">App Router Mastery</h3>
                        <p className="text-gray-400">Leveraging Server Components and Suspense for superior user experience and data fetching performance.</p>
                    </div>
                    <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800">
                        <h3 className="text-2xl font-bold mb-3">SEO & Performance</h3>
                        <p className="text-gray-400">Static site generation (SSG) and Incremental Static Regeneration (ISR) to keep your content fresh and search-ready.</p>
                    </div>
                    <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800">
                        <h3 className="text-2xl font-bold mb-3">Full-Stack Capability</h3>
                        <p className="text-gray-400">Native integration with Server Actions, Middleware, and API routes for a seamless full-stack development experience.</p>
                    </div>
                </section>

                <section className="bg-zinc-900 py-16 px-8 rounded-3xl border border-zinc-800 mb-20">
                    <h2 className="text-4xl font-bold mb-12 text-center">Comprehensive Next.js Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
                        <div className="flex gap-4">
                            <div className="text-white bg-white/10 w-12 h-12 flex items-center justify-center rounded-lg shrink-0">1</div>
                            <div>
                                <h4 className="text-xl font-bold mb-2">Code Transformation</h4>
                                <p className="text-gray-400">Migrating legacy React apps or Next.js Pages router projects to the high-performance App Router.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-white bg-white/10 w-12 h-12 flex items-center justify-center rounded-lg shrink-0">2</div>
                            <div>
                                <h4 className="text-xl font-bold mb-2">Performance Audit</h4>
                                <p className="text-gray-400">Solving layout shifts, slow hydration, and optimizing images to hit 100/100 Lighthouse scores.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-white bg-white/10 w-12 h-12 flex items-center justify-center rounded-lg shrink-0">3</div>
                            <div>
                                <h4 className="text-xl font-bold mb-2">E-commerce Solutions</h4>
                                <p className="text-gray-400">Building lighting-fast stores with Next.js, Stripe, and modern headless CMS like Sanity or Contentful.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-white bg-white/10 w-12 h-12 flex items-center justify-center rounded-lg shrink-0">4</div>
                            <div>
                                <h4 className="text-xl font-bold mb-2">Enterprise Scaling</h4>
                                <p className="text-gray-400">Implementing robust architectures and testing strategies for large-scale production deployments.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="text-center">
                    <Link href="/contact" className="inline-block bg-white text-black text-lg font-bold py-5 px-12 rounded-full hover:invert transition-all">
                        Start Your Next.js Project Today
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
