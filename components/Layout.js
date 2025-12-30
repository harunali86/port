import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// Dynamic import for Navbar to defer GSAP loading
const Navbar = dynamic(() => import('./Navbar'), { ssr: false });

export default function Layout({ children }) {
  const router = useRouter();
  const isAdmin = router.pathname.startsWith('/admin');

  if (isAdmin) {
    return <div className="min-h-screen bg-black text-white">{children}</div>;
  }

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#0a0e1a] via-[#131629] to-[#181f3a] text-white flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
    </div>
  );
}
