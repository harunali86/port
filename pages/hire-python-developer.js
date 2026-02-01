import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HirePythonDeveloper() {
    return (
        <div className="bg-black text-white min-h-screen">
            <Head>
                <title>Hire Python Developer | AI, ML & Automation Expert | Harun Shaikh</title>
                <meta name="description" content="Looking for a Python developer who understands AI and Automation? Harun Shaikh builds custom ML models, web scrapers, and automated workflows using Python." />
                <meta name="keywords" content="Hire Python Developer, AI Engineer, Machine Learning Python, Web Scraping, Automation Scripts, Harun Shaikh" />
                <script type="application/ld+json">
                    {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Hire Python Developer - Harun Shaikh",
              "description": "Professional Python development for AI integrations, automation, and data engineering.",
              "mainEntity": {
                "@type": "Service",
                "serviceType": "Python Development",
                "provider": {
                  "@type": "Person",
                  "name": "Harun Shaikh"
                }
              }
            }
          `}
                </script>
            </Head>

            <Navbar />

            <main className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
                <section className="text-center mb-16 animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent mb-6">
                        Hire a Professional Python Developer
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Leverage the power of Python for AI agents, custom automation, and high-performance data processing.
                    </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 hover:border-blue-500/50 transition-all">
                        <h2 className="text-3xl font-bold mb-4">AI & Machine Learning</h2>
                        <p className="text-gray-400 mb-6">
                            From fine-tuning LLMs to building custom computer vision models, I bring intelligence to your software.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-gray-300">
                                <span className="text-blue-500">✓</span> OpenAI & Anthropic Integration
                            </li>
                            <li className="flex items-center gap-2 text-gray-300">
                                <span className="text-blue-500">✓</span> LangChain & RAG Workflows
                            </li>
                            <li className="flex items-center gap-2 text-gray-300">
                                <span className="text-blue-500">✓</span> Pandas & Scikit-Learn
                            </li>
                        </ul>
                    </div>
                    <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 hover:border-yellow-500/50 transition-all">
                        <h2 className="text-3xl font-bold mb-4">Automation & Scraping</h2>
                        <p className="text-gray-400 mb-6">
                            Automate repetitive tasks and extract valuable data from across the web with robust crawling solutions.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-gray-300">
                                <span className="text-yellow-500">✓</span> Playwright & Selenium
                            </li>
                            <li className="flex items-center gap-2 text-gray-300">
                                <span className="text-yellow-500">✓</span> FastAPI & Flask Backends
                            </li>
                            <li className="flex items-center gap-2 text-gray-300">
                                <span className="text-yellow-500">✓</span> Custom RPA (Robotic Process Automation)
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="bg-gradient-to-br from-zinc-900 to-black p-12 rounded-3xl border border-zinc-800 text-center">
                    <h2 className="text-4xl font-bold mb-6">Modern Python Engineering</h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        I deliver clean, maintainable, and highly efficient Python code tailored to your business needs in the AI-first world.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-full transition-transform hover:scale-105">
                            Discuss Your Project
                        </Link>
                        <Link href="/blog" className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-10 rounded-full transition-transform hover:scale-105">
                            Read My Python Guides
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
