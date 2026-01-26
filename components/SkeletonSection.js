import { m } from "framer-motion";

export default function SkeletonSection() {
    return (
        <div className="w-full min-h-[50vh] flex flex-col items-center justify-center p-8 opacity-20">
            {/* Header Skeleton */}
            <div className="w-48 h-8 bg-[#00ff41] rounded mb-12 animate-pulse" />

            {/* Content Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="w-full h-64 border border-[#00ff41] rounded bg-[#00ff41]/5 animate-pulse flex flex-col p-4">
                        <div className="w-2/3 h-4 bg-[#00ff41]/50 rounded mb-4" />
                        <div className="w-full h-32 bg-[#00ff41]/10 rounded mb-4" />
                        <div className="w-1/2 h-4 bg-[#00ff41]/30 rounded" />
                    </div>
                ))}
            </div>
        </div>
    );
}
