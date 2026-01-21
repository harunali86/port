import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
    try {
        // List files in the bucket
        const { data, error } = await supabase
            .storage
            .from('portfolio-assets')
            .list();

        if (error) {
            console.error('Storage list error:', error);
            return res.status(500).json({ error: 'Failed to access storage' });
        }

        // Find file starting with "resume" and SORT by created_at desc
        const resumeFiles = (data || [])
            .filter(f => f.name.toLowerCase().startsWith('resume'))
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        const file = resumeFiles[0];

        if (!file) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        // Get public URL
        const { data: publicUrlData } = supabase
            .storage
            .from('portfolio-assets')
            .getPublicUrl(file.name);

        // Prevent Caching
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

        // Redirect to the actual file
        res.redirect(publicUrlData.publicUrl);

    } catch (err) {
        console.error('Download handler error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
