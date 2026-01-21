import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    try {
        const { data, error } = await supabase
            .storage
            .from('portfolio-assets')
            .list();

        if (error) throw error;

        // Find the resume file - sort by created_at desc to get the latest
        const resumeFiles = (data || [])
            .filter(f => f.name.toLowerCase().startsWith('resume'))
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        const file = resumeFiles[0];

        if (!file) {
            return res.status(200).json({ exists: false });
        }

        const { data: publicUrlData } = supabase
            .storage
            .from('portfolio-assets')
            .getPublicUrl(file.name);

        res.status(200).json({
            exists: true,
            name: file.name,
            url: publicUrlData.publicUrl,
            updated_at: file.updated_at, // useful for "Last Updated"
            size: file.metadata?.size
        });

    } catch (error) {
        console.error("Resume fetch error:", error);
        res.status(500).json({ error: 'Failed to fetch info' });
    }
}
