import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function HireReactDeveloper() {
    return (
        <>
            <Head>
                <title>Hire Top React Developer | Harun Shaikh | React.js Specialist</title>
                <meta name="description" content="Looking for a React.js expert? Harun Shaikh builds high-performance, interactive frontends using React, Redux, and Tailwind CSS. Hire for your next project." />
                <meta name="keywords" content="Hire React Developer, React.js Expert, Frontend Developer, UI Engineer, React Native Developer, Harun Shaikh" />
                <link rel="canonical" href="https://harunshaikhportfolio.vercel.app/hire-react-developer" />

                {/* Social SEO */}
                <meta property="og:title" content="Hire Top React Developer | Harun Shaikh" />
                <meta property="og:description" content="Looking for a React.js expert? Harun Shaikh builds high-performance, interactive frontends using React, Redux, and Tailwind CSS." />
                <meta property="og:image" content="https://harunshaikhportfolio.vercel.app/avatar.png" />
                <meta property="og:url" content="https://harunshaikhportfolio.vercel.app/hire-react-developer" />
                <meta property="og:type" content="profile" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Hire Top React Developer | Harun Shaikh" />
                <meta name="twitter:description" content="Looking for a React.js expert? Harun Shaikh builds high-performance, interactive frontends using React, Redux, and Tailwind CSS." />
                <meta name="twitter:image" content="https://harunshaikhportfolio.vercel.app/avatar.png" />

                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ProfilePage",
                            "mainEntity": {
                                "@type": "Person",
                                "name": "Harun Shaikh",
                                "jobTitle": "React Developer",
                                "knowsAbout": ["React.js", "Redux", "Zustand", "Tailwind CSS", "Framer Motion", "Frontend Performance"],
                                "url": "https://harunshaikhportfolio.vercel.app"
                            }
                        })
                    }}
                />
            </Head>

            <div className="pt-24 pb-12 px-6 max-w-5xl mx-auto font-sans">

                <div className="text-center mb-16">
                    <span className="text-[#61dafb] font-mono tracking-widest text-sm mb-4 block">FRONTEND EXPERT</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Hire a <span className="text-[#61dafb]">React Developer</span> <br /> Who Obsesses Over Details.
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                        Pixel-perfect UIs, smooth animations (60fps), and complex state management.
                        I build interfaces that users love to touch.
                    </p>
                    <Link href="/#contact" className="inline-block bg-[#61dafb] text-black font-bold font-mono px-8 py-4 rounded hover:bg-white transition-all transform hover:scale-105">
                        GET A QUOTE &rarr;
                    </Link>
                </div>

                <div className="bg-[#0f0f0f] border border-gray-800 p-8 rounded-2xl mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6">Expertise in React Ecosystem</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300">
                        <div>
                            <h3 className="text-xl text-white font-bold mb-2">Performance First</h3>
                            <p>
                                I optimize re-renders using `useMemo` and `useCallback`. My React apps score 95+ on Core Web Vitals (INP/LCP).
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl text-white font-bold mb-2">Complex State</h3>
                            <p>
                                Whether it's Redux Toolkit, Zustand, or React Query, I know how to manage global state without spaghetti code.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="prose prose-invert max-w-none text-gray-400">
                    <h2 className="text-3xl text-white">Why Harun Shaikh?</h2>
                    <p>
                        Most React developers just copy components. I understand the Virtual DOM, hydration, and the React lifecycle deeply.
                        This ensures your application scales without becoming sluggish as you add features field by field.
                    </p>
                </div>

            </div>
            <Footer />
        </>
    );
}
