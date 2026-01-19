
import Link from 'next/link';
import { LayoutDashboard, FileText, Upload, Settings, LogOut, Power, X } from 'lucide-react';
import { useRouter } from 'next/router';

export default function AdminSidebar({ active, isOpen, onClose }) {
    const router = useRouter();

    const menu = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
        { name: 'New Post', icon: FileText, href: '/admin/create' },
    ];

    const logout = () => {
        sessionStorage.removeItem('admin_auth');
        window.location.reload();
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed top-0 left-0 h-screen w-64 bg-[#0a0a0a] border-r border-white/10 flex flex-col z-50 transition-transform duration-300
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
            `}>
                <div className="p-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            ADMIN<span className="text-[#00ff41]">PANEL</span>
                        </h1>
                        <p className="text-xs text-gray-500 mt-1 tracking-widest">PORTFOLIO CMS</p>
                    </div>
                    {/* Close Button (Mobile Only) */}
                    <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
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
                    <button
                        onClick={logout}
                        className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition"
                    >
                        <Power className="w-5 h-5" />
                        <span className="font-mono text-sm">Logout System</span>
                    </button>
                </div>
            </div>
        </>
    );
}
