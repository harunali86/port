
import { useState } from 'react';
import { Bold, Italic, Link, Code, Image, List, Type } from 'lucide-react';

export default function RichEditor({ value, onChange }) {
    const [preview, setPreview] = useState(false);

    const tools = [
        { icon: Bold, label: 'Bold', token: '**text**' },
        { icon: Italic, label: 'Italic', token: '*text*' },
        { icon: Type, label: 'Heading', token: '\n# ' },
        { icon: Code, label: 'Code', token: '```\ncode\n```' },
        { icon: Link, label: 'Link', token: '[text](url)' },
        { icon: Image, label: 'Image', token: '![alt](url)' },
    ];

    const insertToken = (token) => {
        const textarea = document.getElementById('md-editor');
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const before = text.substring(0, start);
        const after = text.substring(end, text.length);

        const newValue = before + token + after;
        onChange(newValue);

        // Restore focus (basic)
        setTimeout(() => textarea.focus(), 0);
    };

    return (
        <div className="border border-white/10 rounded-xl overflow-hidden bg-[#050505]">
            <div className="flex items-center justify-between bg-white/5 border-b border-white/10 px-4 py-2">
                <div className="flex items-center gap-1">
                    {tools.map((t, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => insertToken(t.token)}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition"
                            title={t.label}
                        >
                            <t.icon className="w-4 h-4" />
                        </button>
                    ))}
                </div>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setPreview(false)}
                        className={`text-xs font-bold px-3 py-1 rounded ${!preview ? 'bg-[#00ff41] text-black' : 'text-gray-500 hover:text-white'}`}
                    >
                        WRITE
                    </button>
                    <button
                        type="button"
                        onClick={() => setPreview(true)}
                        className={`text-xs font-bold px-3 py-1 rounded ${preview ? 'bg-[#00ff41] text-black' : 'text-gray-500 hover:text-white'}`}
                    >
                        PREVIEW
                    </button>
                </div>
            </div>

            {preview ? (
                <div className="h-[500px] p-6 overflow-y-auto prose prose-invert max-w-none">
                    <div className="text-gray-400 italic text-sm text-center mt-10">Preview Mode Active (Markdown Rendered)</div>
                    {/* In a real app, use react-markdown here */}
                    <pre className="whitespace-pre-wrap font-sans text-gray-300 mt-4">{value}</pre>
                </div>
            ) : (
                <textarea
                    id="md-editor"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-[500px] bg-[#050505] p-6 font-mono text-sm text-gray-300 outline-none resize-none focus:bg-[#0a0a0a] transition"
                    placeholder="# Start writing your masterpiece..."
                    spellCheck={false}
                />
            )}

            <div className="bg-white/5 px-4 py-2 border-t border-white/10 flex justify-between items-center text-xs text-gray-500">
                <span>Markdown Supported</span>
                <span>{value.length} chars</span>
            </div>
        </div>
    );
}
