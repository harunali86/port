import Head from 'next/head';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import rehypeHighlight from 'rehype-highlight';

export default function BlogPost({ post }) {
    if (!post) return <div className="text-white text-center py-40">Post not found</div>;

    const readingTime = Math.ceil(post.content.split(' ').length / 200);

    return (
        <>
            <Head>
                <title>{post.title} | Harun Shaikh</title>
                <meta name="description" content={post.excerpt} />
                {/* Highlight.js CSS */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css" />
            </Head>

            <Navbar />

            <main className="min-h-screen bg-[#050505] pt-32 pb-20 font-['Outfit']">
                <article className="container mx-auto px-6 max-w-4xl">

                    <header className="mb-12 text-center">
                        <div className="flex justify-center gap-4 text-[#00ff41] font-mono text-sm mb-6">
                            <span>{format(new Date(post.created_at), 'MMMM dd, yyyy')}</span>
                            <span>•</span>
                            <span>{readingTime} min read</span>
                        </div>

                        <h1 className="text-3xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tight uppercase">
                            {post.title}
                        </h1>

                        {post.image_url && (
                            <div className="w-full h-[400px] mb-10 overflow-hidden rounded-xl border border-white/10 relative group">
                                <Image
                                    src={post.image_url}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                            </div>
                        )}

                        <div className="w-20 h-1 bg-[#00ff41] mx-auto rounded-full mb-10"></div>
                    </header>

                    <div className="prose prose-invert prose-lg max-w-none prose-pre:bg-[#111] prose-pre:border prose-pre:border-white/10 prose-headings:text-white prose-a:text-[#00ff41] prose-strong:text-white">
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{post.content}</ReactMarkdown>
                    </div>

                </article>
            </main>

            <Footer />
        </>
    );
}

export async function getServerSideProps({ params }) {
    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', params.slug)
        .single();

    if (!post) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            post,
        },
    };
}
