
'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import AdminSidebar from '@/components/AdminSidebar';
import RichEditor from '@/components/admin/RichEditor';
import SeoPreview from '@/components/admin/SeoPreview';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { ArrowLeft, Save, UploadCloud } from 'lucide-react';

export default function CreatePost() {
    const { authorized, loading: authLoading } = useAdminAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        image_url: '',
        tags: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const generateSlug = () => {
        const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        setForm({ ...form, slug });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch('/api/admin/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-pin': 'HARRY@123'
            },
            body: JSON.stringify(form)
        });

        if (!res.ok) {
            const data = await res.json();
            alert("Error: " + (data.error || data.details || "Failed to create"));
            setLoading(false);
        } else {
            router.push('/admin');
        }
    };

    if (authLoading || !authorized) return <div className="min-h-screen bg-black text-[#00ff41] flex items-center justify-center font-mono">AUTHENTICATING...</div>;

    return (
        <div className="min-h-screen bg-black text-white font-sans flex">
            <AdminSidebar active="New Post" />

            <div className="flex-1 ml-64 p-8 relative">
                {/* Top Bar */}
                <header className="flex justify-between items-center mb-8 sticky top-0 bg-black/80 backdrop-blur z-20 py-4 border-b border-white/10">
                    <div className="flex items-center gap-4">
                        <button onClick={() => router.back()} className="p-2 hover:bg-white/10 rounded-full transition"><ArrowLeft className="w-5 h-5" /></button>
                        <div>
                            <h1 className="text-xl font-bold text-white">Create New Post</h1>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                                DRAFT MODE
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2 bg-[#00ff41] text-black font-bold rounded hover:bg-white transition disabled:opacity-50"
                    >
                        {loading ? <UploadCloud className="w-4 h-4 animate-bounce" /> : <Save className="w-4 h-4" />}
                        {loading ? "PUBLISHING..." : "PUBLISH"}
                    </button>
                </header>

                <div className="grid grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* LEFT COL: CONTENT */}
                    <div className="col-span-2 space-y-6">
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            onBlur={generateSlug}
                            className="w-full bg-transparent text-4xl font-bold placeholder-gray-600 outline-none"
                            placeholder="Enter Post Title Here..."
                        />

                        <RichEditor
                            value={form.content}
                            onChange={(val) => setForm({ ...form, content: val })}
                        />
                    </div>

                    {/* RIGHT COL: METADATA & SEO */}
                    <div className="space-y-6">
                        {/* SEO CARD */}
                        <SeoPreview title={form.title} slug={form.slug} excerpt={form.excerpt} />

                        {/* SETTINGS CARD */}
                        <div className="bg-[#111] p-6 rounded-xl border border-white/10 space-y-4">
                            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Configurations</h3>

                            <div>
                                <label className="block text-gray-500 text-xs mb-1">URL SLUG</label>
                                <input
                                    name="slug"
                                    value={form.slug}
                                    onChange={handleChange}
                                    className="w-full bg-black border border-white/10 p-2 rounded text-sm font-mono text-[#00ff41]"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-500 text-xs mb-1">EXCERPT</label>
                                <textarea
                                    name="excerpt"
                                    value={form.excerpt}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full bg-black border border-white/10 p-2 rounded text-sm text-gray-300 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-500 text-xs mb-1">FEATURED IMAGE URL</label>
                                <div className="flex gap-2">
                                    <input
                                        name="image_url"
                                        value={form.image_url}
                                        onChange={handleChange}
                                        className="w-full bg-black border border-white/10 p-2 rounded text-sm text-gray-300"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
