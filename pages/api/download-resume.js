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

        // Find file starting with "resume"
        // Priority: PDF > DOCX > DOC
        let file = data.find(f => f.name === 'resume.pdf');
        if (!file) file = data.find(f => f.name === 'resume.docx');
        if (!file) file = data.find(f => f.name === 'resume.doc');

        // If still not found, try any file with "resume" in name
        if (!file) file = data.find(f => f.name.toLowerCase().startsWith('resume'));

        if (!file) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        // Get public URL
        const { data: publicUrlData } = supabase
            .storage
            .from('portfolio-assets')
            .getPublicUrl(file.name);

        // Redirect to the actual file
        res.redirect(publicUrlData.publicUrl);

    } catch (err) {
        console.error('Download handler error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
