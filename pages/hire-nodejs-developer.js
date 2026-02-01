import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HireNodejsDeveloper() {
    return (
        <div className="bg-black text-white min-h-screen">
            <Head>
                <title>Hire Node.js Developer | Expert Backend Engineering | Harun Shaikh</title>
                <meta name="description" content="Looking to hire a professional Node.js developer? Harun Shaikh specializes in building scalable, real-time backend systems using Node.js, Express, and NestJS." />
                <meta name="keywords" content="Hire Node.js Developer, Backend Engineer, Scalable Node.js Apps, Real-time APIs, Harun Shaikh" />
                <script type="application/ld+json">
                    {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Hire Node.js Developer - Harun Shaikh",
              "description": "Expert Node.js development services for scalable and high-performance backend systems.",
              "mainEntity": {
                "@type": "Service",
                "serviceType": "Node.js Development",
                "provider": {
                  "@type": "Person",
                  "name": "Harun Shaikh"
                },
                "offers": {
                  "@type": "Offer",
                  "description": "Custom Node.js Backend Solutions"
                }
              }
            }
          `}
                </script>
            </Head>

            <Navbar />

            <main className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
                <section className="text-center mb-16 animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-6">
                        Hire an Expert Node.js Developer
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Build lightning-fast, scalable backends and real-time applications with production-grade Node.js engineering.
                    </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 hover:border-green-500/50 transition-all">
                        <h2 className="text-3xl font-bold mb-4">Scalable Backend Systems</h2>
                        <p className="text-gray-400 mb-6">
                            I specialize in architecting systems that handle thousands of concurrent connections using event-driven, non-blocking I/O.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-gray-300">
                                <span className="text-green-500">✓</span> Microservices Architectures
                            </li>
                            <li className="flex items-center gap-2 text-gray-300">
                                <span className="text-green-500">✓</span> RESTful & GraphQL API Design
                            </li>
                            <li className="flex items-center gap-2 text-gray-300">
                                <span className="text-green-500">✓</span> Real-time WebSocket Integration
                            </li>
                        </ul>
                    </div>
                    <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 hover:border-green-500/50 transition-all">
                        <h2 className="text-3xl font-bold mb-4">Database Mastery</h2>
                        <p className="text-gray-400 mb-6">
                            Optimized data modeling and querying for both SQL and NoSQL databases ensures your app remains fast as it grows.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-gray-300">
                                <span className="text-green-500">✓</span> PostgreSQL & Prisma ORM
                            </li>
                            <li className="flex items-center gap-2 text-gray-300">
                                <span className="text-green-500">✓</span> MongoDB & Mongoose
                            </li>
                            <li className="flex items-center gap-2 text-gray-300">
                                <span className="text-green-500">✓</span> Redis Caching & Queues
                            </li>
                        </ul>
                    </div>
                </section>

                <section className="bg-gradient-to-br from-zinc-900 to-black p-12 rounded-3xl border border-zinc-800 text-center">
                    <h2 className="text-4xl font-bold mb-6">Why Choose My Node.js Services?</h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        I don't just write code; I build infrastructure. From security-first authentication to automated CI/CD pipelines, I ensure your Node.js app is battle-ready.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link href="/contact" className="bg-green-500 hover:bg-green-600 text-black font-bold py-4 px-10 rounded-full transition-transform hover:scale-105">
                            Get a Free Consultation
                        </Link>
                        <Link href="/projects" className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-10 rounded-full transition-transform hover:scale-105">
                            View My Portfolio
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
