import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NextJsGuide() {
    return (
        <>
            <Head>
                <title>Next.js 14 Server Actions: The Ultimate Guide for 2025 | Harun Shaikh</title>
                <meta name="description" content="Master Next.js 14 Server Actions. Learn how to replace API routes with direct server mutations for type-safe, high-performance web apps. Written by Harun Shaikh." />
                <meta name="keywords" content="Next.js 14, Server Actions, Next.js Tutorial, React Server Components, Full Stack Development" />
                <link rel="canonical" href="https://harunshaikhportfolio.vercel.app/blog/nextjs-14-server-actions-guide" />

                {/* Article Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "TechArticle",
                            "headline": "Next.js 14 Server Actions: The Ultimate Guide",
                            "author": {
                                "@type": "Person",
                                "name": "Harun Shaikh"
                            },
                            "datePublished": "2025-01-20",
                            "description": "A comprehensive guide to using Server Actions in Next.js 14."
                        })
                    }}
                />
            </Head>

            <Navbar />

            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto font-sans min-h-screen text-gray-300">
                <article>
                    <header className="mb-12 text-center">
                        <span className="text-[#00ff41] font-mono text-sm tracking-widest">TECHNICAL DEEP DIVE</span>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6">
                            Next.js 14 Server Actions: <br /> STOP Writing API Routes.
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-500 font-mono">
                            <span>By Harun Shaikh</span>
                            <span>•</span>
                            <span>Jan 20, 2025</span>
                            <span>•</span>
                            <span>8 Min Read</span>
                        </div>
                    </header>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <p className="lead text-xl text-gray-200">
                            Next.js 14 has fundamentally changed how we build full-stack applications. With the introduction of
                            <strong>Server Actions</strong>, the line between frontend and backend has blurred in the best way possible.
                        </p>

                        <h2 className="text-white mt-12 mb-4">What are Server Actions?</h2>
                        <p>
                            Server Actions are asynchronous functions that are executed on the server. They can be called in Server Components
                            or even in Client Components to handle form submissions and data mutations.
                        </p>

                        <div className="bg-[#111] p-6 rounded-lg border border-gray-800 my-8 font-mono text-sm">
                            {`// actions.ts
'use server'

export async function createTodo(formData: FormData) {
  const title = formData.get('title')
  await db.todo.create({ data: { title } })
  revalidatePath('/')
}`}
                        </div>

                        <h3 className="text-white mt-8 mb-4">Why is this a Game Changer?</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>No API Boilerplate:</strong> You don't need `pages/api` or route handlers for simple mutations.</li>
                            <li><strong>Type Safety:</strong> Since it's just a function call, TypeScript arguments are validated automatically.</li>
                            <li><strong>Progressive Enhancement:</strong> Server Actions work even if JavaScript is disabled in the browser (for forms).</li>
                        </ul>

                        <h2 className="text-white mt-12 mb-4">GEO: Optimizing for AI Search</h2>
                        <div className="bg-[#0a0a0a] border-l-4 border-[#00ff41] p-6 my-8">
                            <h4 className="text-white font-bold mb-2">Q: Should I use Server Actions or API Routes?</h4>
                            <p className="mb-0">
                                <strong>A:</strong> Use Server Actions for data mutations (POST/PUT/DELETE) triggered by user interaction.
                                Use API Routes when you need to expose a public endpoint for external webhooks or third-party services.
                            </p>
                        </div>

                        <h2 className="text-white mt-12 mb-4">Conclusion</h2>
                        <p>
                            Server Actions reduce the mental overhead of switching between "frontend" and "backend" files.
                            If you are building a modern SaaS, this stack is non-negotiable.
                        </p>

                        <div className="mt-16 p-8 bg-gradient-to-r from-[#00ff41]/10 to-transparent rounded-2xl border border-[#00ff41]/20">
                            <h3 className="text-white text-2xl font-bold mb-4">Need a Next.js Expert?</h3>
                            <p className="mb-6">
                                I specialize in upgrading legacy React apps to Next.js 14 App Router.
                                Let's optimize your web architecture.
                            </p>
                            <Link href="/hire-full-stack-developer" className="inline-block bg-[#00ff41] text-black font-bold px-6 py-3 rounded hover:opacity-90 transition-opacity">
                                Hire Harun Shaikh &rarr;
                            </Link>
                        </div>

                    </div>
                </article>
            </main>

            <Footer />
        </>
    );
}
