
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminSidebar from '@/components/AdminSidebar';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Eye, Clock, Trash2, Edit, Download, Menu } from 'lucide-react';

export default function AdminDashboard() {
    const { authorized, loading: authLoading, login } = useAdminAuth();
    const [posts, setPosts] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [stats, setStats] = useState({ visits: 0, resume: 0, blogs: 0 });
    const [curResume, setCurResume] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [pinInput, setPinInput] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (authorized) {
            fetchData();
        }
    }, [authorized]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (login(pinInput)) {
            setError('');
        } else {
            setError('Invalid PIN');
        }
    };

    async function fetchData() {
        setLoading(true);
        try {
            const [postsRes, statsRes, resumeRes] = await Promise.all([
                fetch('/api/admin/posts'),
                fetch('/api/admin/stats'),
                fetch('/api/admin/get-resume')
            ]);

            if (postsRes.ok) setPosts(await postsRes.json());
            if (statsRes.ok) setStats(await statsRes.json());
            if (resumeRes.ok) setCurResume(await resumeRes.json());
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

    if (authLoading) return <div className="min-h-screen bg-black text-[#00ff41] flex items-center justify-center font-mono animate-pulse">LOADING SYSTEM...</div>;

    if (!authorized) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">
                <form onSubmit={handleLogin} className="flex flex-col gap-4 border border-[#00ff41] p-8 bg-black/50 backdrop-blur rounded-xl shadow-[0_0_20px_rgba(0,255,65,0.2)]">
                    <h1 className="text-2xl text-[#00ff41] font-bold text-center tracking-wider">ADMIN ACCESS</h1>
                    <div className="h-px bg-[#00ff41]/50 w-full my-2"></div>
                    <input
                        type="password"
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        placeholder="ENTER SECURITY PIN"
                        className="bg-black/50 border border-gray-700 p-3 text-white focus:border-[#00ff41] outline-none text-center rounded transition-all focus:shadow-[0_0_10px_rgba(0,255,65,0.3)]"
                        autoFocus
                    />
                    {error && <p className="text-red-500 text-sm text-center font-bold animate-pulse">{error}</p>}
                    <button type="submit" className="bg-[#00ff41] text-black p-3 font-bold hover:bg-[#00cc33] rounded transition-all shadow-lg hover:shadow-[0_0_15px_#00ff41]">
                        UNLOCK SYSTEM
                    </button>
                    <a href="/" className="text-xs text-gray-500 text-center hover:text-white mt-4 hover:underline">Return to Portfolio</a>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans flex">
            {/* SIDEBAR */}
            <AdminSidebar
                active="Dashboard"
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* MAIN CONTENT */}
            <div className="flex-1 md:ml-64 ml-0 p-4 md:p-10 relative overflow-hidden transition-all duration-300">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{ backgroundImage: 'linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />

                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 relative z-10 gap-4">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-[#00ff41] p-2 hover:bg-white/10 rounded"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <div>
                            <h1 className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">Command Center</h1>
                            <p className="text-xs md:text-base text-gray-400">Welcome back, Administrator.</p>
                        </div>
                    </div>

                    {/* RESUME UPLOAD WIDGET */}
                    <div className="flex gap-4 items-center bg-[#111] border border-white/10 p-2 rounded-xl backdrop-blur-md">
                        <div className="px-4 border-r border-white/10 text-right">
                            <span className="text-xs text-gray-500 block">CURRENT RESUME</span>
                            {curResume?.exists ? (
                                <a href={curResume.url} target="_blank" className="text-sm font-mono text-[#00ff41] hover:underline flex items-center justify-end gap-2 group">
                                    {curResume.name} <Eye className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            ) : (
                                <span className="text-sm font-mono text-gray-500">Not Uploaded</span>
                            )}
                        </div>
                        <label className={`cursor-pointer bg-white text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition flex items-center gap-2 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <Download className="w-4 h-4" /> {uploading ? 'Syncing...' : 'Update Resume'}
                            <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.docx,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
                                disabled={uploading}
                                onChange={async (e) => {
                                    if (!e.target.files?.[0]) return;
                                    setUploading(true);
                                    const file = e.target.files[0];
                                    const formData = new FormData();
                                    formData.append('resume', file);

                                    try {
                                        const res = await fetch('/api/admin/upload-resume', { method: 'POST', body: formData });
                                        const data = await res.json();
                                        if (res.ok) {
                                            alert("Resume Sync Complete!");
                                            fetchData(); // Refresh info
                                        } else {
                                            alert("Upload Failed: " + (data.error || res.statusText));
                                        }
                                    } catch (err) {
                                        alert("Network Error: " + err.message);
                                    } finally {
                                        setUploading(false);
                                        e.target.value = null;
                                    }
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
