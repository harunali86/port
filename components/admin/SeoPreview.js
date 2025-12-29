
export default function SeoPreview({ title, slug, excerpt }) {
    return (
        <div className="bg-[#111] p-6 rounded-xl border border-white/10">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">Search Engine Preview (Google)</h3>
            <div className="bg-white p-4 rounded max-w-xl font-sans">
                <div className="flex items-center gap-2 mb-1">
                    <div className="bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">H</div>
                    <div>
                        <div className="text-xs text-black">harun.dev</div>
                        <div className="text-[10px] text-gray-500">https://harun.dev/blog/{slug || 'url-slug'}</div>
                    </div>
                </div>
                <h4 className="text-[#1a0dab] text-xl hover:underline cursor-pointer truncate">{title || 'Your Post Title'}</h4>
                <p className="text-[#4d5156] text-sm mt-1 line-clamp-2">
                    {excerpt || 'This is how your post description will appear in search results. Make it catchy and relevant to improve your click-through rate...'}
                </p>
            </div>
        </div>
    );
}
