import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BlogList({ posts }) {
    return (
        <>
            <Head>
                <title>Engineering Blog | Harun Shaikh</title>
                <meta name="description" content="Technical articles on Full Stack Development, AI, and Performance by Harun Shaikh." />
            </Head>

            <Navbar />

            <main className="min-h-screen bg-[#050505] pt-32 pb-20 font-['Outfit']">
                <div className="container mx-auto px-6 max-w-6xl">

                    <div className="text-center mb-16">
                        <span className="text-[#00ff41] font-mono tracking-widest text-sm mb-4 block">KNOWLEDGE BASE</span>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff41] to-[#00d4ff]">Insights</span>
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Deep dives into modern web architecture, performance optimization, and AI integration.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map(post => (
                            <Link href={`/blog/${post.slug}`} key={post.id} className="group h-full">
                                <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-[#00ff41]/50 transition-all duration-300 h-full flex flex-col">
                                    {/* Blog Cover Image */}
                                    {post.image_url && (
                                        <div className="h-48 w-full overflow-hidden relative">
                                            <Image
                                                src={post.image_url}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                        </div>
                                    )}

                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="text-[#00ff41] text-xs font-mono mb-3">
                                            {format(new Date(post.created_at), 'MMM dd, yyyy')}
                                        </div>
                                        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#00ff41] transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center text-white text-xs font-bold mt-auto uppercase tracking-wider">
                                            Read Article <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {posts.length === 0 && (
                        <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
                            <p className="text-gray-500">No articles published yet.</p>
                        </div>
                    )}

                </div>
            </main>

            <Footer />
        </>
    );
}

export async function getServerSideProps() {
    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

    return {
        props: {
            posts: posts || [],
        },
    };
}
