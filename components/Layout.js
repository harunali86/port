import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#0a0e1a] via-[#131629] to-[#181f3a] text-white flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full px-2 sm:px-8">{children}</main>
    </div>
  );
}
