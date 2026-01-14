import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const form = formidable({
            keepExtensions: true,
            maxFileSize: 5 * 1024 * 1024, // 5MB
        });

        const [fields, files] = await form.parse(req);
        const file = files.resume?.[0];

        if (!file) {
            return res.status(400).json({ error: 'No resume file uploaded' });
        }

        // Read file buffer
        const fileBuffer = fs.readFileSync(file.filepath);

        // Upload to Supabase Storage
        const { data, error } = await supabase
            .storage
            .from('portfolio-assets')
            .upload('resume.pdf', fileBuffer, {
                contentType: 'application/pdf',
                upsert: true
            });

        if (error) {
            console.error("Supabase Upload Error Detailed:", JSON.stringify(error, null, 2));
            return res.status(500).json({ error: 'Failed to upload to Supabase', details: error });
        }

        // Get Public URL
        const { data: publicUrlData } = supabase
            .storage
            .from('portfolio-assets')
            .getPublicUrl('resume.pdf');

        // Cleanup temp file
        try { fs.unlinkSync(file.filepath); } catch (e) { }

        res.status(200).json({
            message: 'Resume uploaded successfully!',
            url: publicUrlData.publicUrl
        });

    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: 'Failed to process file' });
    }
}
