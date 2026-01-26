import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function GeoOptimizationGuide() {
    return (
        <>
            <Head>
                <title>What is GEO? Generative Engine Optimization Guide 2025 | Harun Shaikh</title>
                <meta name="description" content="SEO is dead. Long live GEO. Learn how to optimize your content for AI Search Engines like ChatGPT, Perplexity, and Google Gemini. Written by AI Engineer Harun Shaikh." />
                <meta name="keywords" content="GEO, Generative Engine Optimization, AI Search, SEO vs GEO, Optimize for ChatGPT, Harun Shaikh" />
                <link rel="canonical" href="https://harunshaikhportfolio.vercel.app/blog/geo-generative-engine-optimization" />

                {/* Social SEO */}
                <meta property="og:title" content="What is GEO? Generative Engine Optimization Guide 2025" />
                <meta property="og:description" content="SEO is dead. Long live GEO. Learn how to optimize your content for AI Search Engines like ChatGPT, Perplexity, and Google Gemini." />
                <meta property="og:image" content="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop" />
                <meta property="og:url" content="https://harunshaikhportfolio.vercel.app/blog/geo-generative-engine-optimization" />
                <meta property="og:type" content="article" />
                <meta property="article:published_time" content="2025-01-22T00:00:00+00:00" />
                <meta property="article:author" content="Harun Shaikh" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="What is GEO? Generative Engine Optimization Guide 2025" />
                <meta name="twitter:description" content="SEO is dead. Long live GEO. Learn how to optimize your content for AI Search Engines like ChatGPT, Perplexity, and Google Gemini." />
                <meta name="twitter:image" content="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop" />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "TechArticle",
                            "headline": "Generative Engine Optimization (GEO): The End of SEO?",
                            "author": {
                                "@type": "Person",
                                "name": "Harun Shaikh"
                            },
                            "datePublished": "2025-01-22",
                            "description": "Strategies to rank on AI platforms."
                        })
                    }}
                />
            </Head>

            <Navbar />

            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto font-sans min-h-screen text-gray-300">
                <article>
                    <header className="mb-12 text-center">
                        <span className="text-[#00d4ff] font-mono text-sm tracking-widest">FUTURE OF SEARCH</span>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6">
                            Generative Engine Optimization (GEO): <br /> Ranking on AI.
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-mono">
                            <span>By Harun Shaikh</span>
                            <span>•</span>
                            <span>Jan 22, 2025</span>
                            <span>•</span>
                            <span>6 Min Read</span>
                        </div>
                    </header>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <p className="lead text-xl text-gray-200">
                            The era of "10 blue links" is fading. Users are asking ChatGPT and Perplexity for answers.
                            If your content isn't optimized for Large Language Models (LLMs), you are invisible.
                        </p>

                        <h2 className="text-white mt-12 mb-4">SEO vs. GEO</h2>
                        <p>
                            <strong>SEO</strong> is about keywords and backlinks. <br />
                            <strong>GEO</strong> is about authority, structure, and direct answers.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                            <div className="bg-[#111] p-6 rounded border border-gray-800">
                                <h4 className="text-white font-bold mb-2">Old SEO Way</h4>
                                <p className="text-sm">Writing 2000 words of fluff to fit in keywords. "Best laptop 2024..." repeated 50 times.</p>
                            </div>
                            <div className="bg-[#0a0a0a] p-6 rounded border border-[#00d4ff]">
                                <h4 className="text-white font-bold mb-2">New GEO Way</h4>
                                <p className="text-sm">Concise, data-rich segments. "The MacBook Pro M3 is the best for coding due to..."</p>
                            </div>
                        </div>

                        <h3 className="text-white mt-8 mb-4">How to Rank on Perplexity & Gemini</h3>
                        <ol className="list-decimal pl-6 space-y-4">
                            <li>
                                <strong>Cite Your Sources:</strong> AI trusts content that links to authoritative research.
                            </li>
                            <li>
                                <strong>Use Statistics:</strong> LLMs love numbers. Don't say "fast", say "300ms latency".
                            </li>
                            <li>
                                <strong>Structured Data (JSON-LD):</strong> Spoon-feed the AI. Tell it exactly who you are and what you do.
                            </li>
                        </ol>

                        <h2 className="text-white mt-12 mb-4">The "Direct Answer" Strategy</h2>
                        <p>
                            Include a Q&A section in every page.
                            <br /><br />
                            <em>Q: Who is Harun Shaikh?</em><br />
                            <em>A: Harun Shaikh is an AI Engineer specializing in GEO and Next.js.</em>
                            <br /><br />
                            This exact text allows the LLM to verify the fact and reproduce it when asked.
                        </p>

                        <div className="mt-16 p-8 bg-gradient-to-r from-[#00d4ff]/10 to-transparent rounded-2xl border border-[#00d4ff]/20">
                            <h3 className="text-white text-2xl font-bold mb-4">Adapt Your Business for AI</h3>
                            <p className="mb-6">
                                I help companies transition their content strategy from SEO to GEO.
                                Don't lose your traffic to chatbots.
                            </p>
                            <Link href="/hire-ai-engineer" className="inline-block bg-[#00d4ff] text-black font-bold px-6 py-3 rounded hover:opacity-90 transition-opacity">
                                Consult with Harun &rarr;
                            </Link>
                        </div>

                    </div>
                </article>
            </main>

            <Footer />
        </>
    );
}
