
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminSidebar from '@/components/AdminSidebar';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Eye, Clock, Trash2, Edit, Download } from 'lucide-react';

export default function AdminDashboard() {
    const { authorized, loading: authLoading } = useAdminAuth();
    const [posts, setPosts] = useState([]);
    const [stats, setStats] = useState({ visits: 0, resume: 0, blogs: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authorized) {
            fetchData();
        }
    }, [authorized]);

    async function fetchData() {
        setLoading(true);
        try {
            const [postsRes, statsRes] = await Promise.all([
                fetch('/api/admin/posts'),
                fetch('/api/admin/stats')
            ]);

            if (postsRes.ok) setPosts(await postsRes.json());
            if (statsRes.ok) setStats(await statsRes.json());
        } catch (e) {
            console.error("Network error:", e);
        }
        setLoading(false);
    }

    async function handleDelete(id) {
        if (!confirm("Are you sure you want to purge this record?")) return;
        const res = await fetch(`/api/admin/posts?id=${id}`, {
            method: 'DELETE',
            headers: { 'x-admin-pin': 'HARRY@123' }
        });
        if (res.ok) setPosts(posts.filter(p => p.id !== id));
    }

    if (authLoading || !authorized) return <div className="min-h-screen bg-black text-[#00ff41] flex items-center justify-center font-mono">AUTHENTICATING...</div>;

    return (
        <div className="min-h-screen bg-black text-white font-sans flex">
            {/* SIDEBAR */}
            <AdminSidebar active="Dashboard" />

            {/* MAIN CONTENT */}
            <div className="flex-1 ml-64 p-10 relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{ backgroundImage: 'linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />

                <header className="flex justify-between items-center mb-12 relative z-10">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Command Center</h1>
                        <p className="text-gray-400">Welcome back, Administrator.</p>
                    </div>

                    {/* RESUME UPLOAD WIDGET */}
                    <div className="flex gap-4 items-center bg-[#111] border border-white/10 p-2 rounded-xl backdrop-blur-md">
                        <div className="px-4 border-r border-white/10">
                            <span className="text-xs text-gray-500 block">CURRENT VERSION</span>
                            <span className="text-sm font-mono text-[#00ff41]">v2.4.0 (Live)</span>
                        </div>
                        <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition flex items-center gap-2">
                            <Download className="w-4 h-4" /> Update Resume
                            <input
                                type="file"
                                className="hidden"
                                accept="application/pdf"
                                onChange={async (e) => {
                                    if (!e.target.files?.[0]) return;
                                    const file = e.target.files[0];
                                    const formData = new FormData();
                                    formData.append('resume', file);
                                    const res = await fetch('/api/admin/upload-resume', { method: 'POST', body: formData });
                                    if (res.ok) alert("Resume Sync Complete");
                                }}
                            />
                        </label>
                    </div>
                </header>

                {/* STATS ROW */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
                    {[
                        { label: 'Total Blogs', val: stats.blogs, color: 'text-[#00ff41]' },
                        { label: 'Total Views', val: stats.visits, color: 'text-purple-400' },
                        { label: 'Resume Downloads', val: stats.resume, color: 'text-blue-400' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl hover:border-white/10 transition group">
                            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">{stat.label}</h3>
                            <p className={`text-4xl font-black ${stat.color} font-mono group-hover:blur-[0.5px] transition-all`}>{stat.val}</p>
                        </div>
                    ))}
                </div>

                {/* BLOG TABLE */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden relative z-10 shadow-2xl">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <h2 className="text-xl font-bold">Content Registry</h2>
                        <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">PRISMA CONNECTED</span>
                    </div>

                    {loading ? (
                        <div className="p-12 text-center text-gray-500 animate-pulse">Scanning database...</div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="p-6 font-medium">Title</th>
                                    <th className="p-6 font-medium">Published</th>
                                    <th className="p-6 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {posts.map(post => (
                                    <tr key={post.id} className="hover:bg-white/[0.02] transition group">
                                        <td className="p-6">
                                            <p className="font-bold text-white mb-1 group-hover:text-[#00ff41] transition-colors">{post.title}</p>
                                            <p className="text-gray-600 text-sm font-mono truncate max-w-sm">{post.slug}</p>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-gray-600" />
                                                <span className="text-gray-400 text-sm">{new Date(post.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-full transition"
                                                title="Delete Post"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {posts.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="p-12 text-center text-gray-500">
                                            No packets found in the stream. <br />
                                            <button onClick={() => window.location.href = '/admin/create'} className="mt-4 text-[#00ff41] hover:underline">Initialize New Entry</button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
