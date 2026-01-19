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
            maxFileSize: 10 * 1024 * 1024, // 10MB (increased from 5MB)
        });

        const [fields, files] = await form.parse(req);
        const file = files.resume?.[0];

        if (!file) {
            return res.status(400).json({ error: 'No resume file uploaded' });
        }

        // Validate file type - accept PDF, DOCX, DOC
        const allowedTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
            'application/msword', // .doc
        ];

        const allowedExtensions = ['.pdf', '.docx', '.doc'];
        const fileExtension = file.originalFilename?.toLowerCase().match(/\.[^.]+$/)?.[0] || '';

        if (!allowedTypes.includes(file.mimetype) && !allowedExtensions.includes(fileExtension)) {
            return res.status(400).json({
                error: 'Invalid file type. Only PDF, DOCX, and DOC files are allowed.',
                received: file.mimetype
            });
        }

        // Read file buffer
        const fileBuffer = fs.readFileSync(file.filepath);

        // Determine file extension for storage
        const storageFilename = `resume${fileExtension}`;

        // Upload to Supabase Storage
        const { data, error } = await supabase
            .storage
            .from('portfolio-assets')
            .upload(storageFilename, fileBuffer, {
                contentType: file.mimetype,
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
            .getPublicUrl(storageFilename);

        // Cleanup temp file
        try { fs.unlinkSync(file.filepath); } catch (e) { }

        res.status(200).json({
            message: 'Resume uploaded successfully!',
            url: publicUrlData.publicUrl,
            filename: storageFilename
        });

    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: 'Failed to process file' });
    }
}
