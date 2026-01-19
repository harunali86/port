import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
    try {
        const { data, error } = await supabase
            .storage
            .from('portfolio-assets')
            .list();

        if (error) throw error;

        // Find the resume file
        const file = data.find(f => f.name.toLowerCase().startsWith('resume'));

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
