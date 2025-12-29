
import Link from 'next/link';
import { LayoutDashboard, FileText, Upload, Settings, LogOut } from 'lucide-react';
import { useRouter } from 'next/router';

export default function AdminSidebar({ active }) {
    const router = useRouter();

    const menu = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
        { name: 'New Post', icon: FileText, href: '/admin/create' },
    ];

    return (
        <div className="w-64 bg-[#0a0a0a] border-r border-white/10 flex flex-col h-screen fixed left-0 top-0 z-50">
            <div className="p-8">
                <h1 className="text-2xl font-bold text-white">
                    ADMIN<span className="text-[#00ff41]">PANEL</span>
                </h1>
                <p className="text-xs text-gray-500 mt-1 tracking-widest">PORTFOLIO CMS</p>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {menu.map((item) => {
                    const isActive = active === item.name || router.pathname === item.href;
                    return (
                        <Link key={item.name} href={item.href}>
                            <div className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group cursor-pointer ${isActive ? 'bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/20 shadow-[0_0_15px_rgba(0,255,65,0.1)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                                <item.icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                                <span className="font-mono text-sm font-medium">{item.name}</span>
                            </div>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-white/10 space-y-2">
                <button
                    onClick={() => window.location.href = '/'}
                    className="flex w-full items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-mono text-sm">Exit to Website</span>
                </button>
            </div>
        </div>
    );
}
