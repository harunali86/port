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

        const fileUrl = publicUrlData.publicUrl;

        // FETCH FILE SERVER-SIDE (Hide Origin)
        const fileResponse = await fetch(fileUrl);

        if (!fileResponse.ok) {
            throw new Error(`Failed to fetch file from storage: ${fileResponse.statusText}`);
        }

        // Set Headers for Download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

        // STREAM FILE TO USER
        // This pipes the data directly, so user only sees YOUR domain
        const reader = fileResponse.body.getReader();
        const stream = new ReadableStream({
            start(controller) {
                return pump();
                function pump() {
                    return reader.read().then(({ done, value }) => {
                        if (done) {
                            controller.close();
                            return;
                        }
                        controller.enqueue(value);
                        return pump();
                    });
                }
            }
        });

        // Convert web stream to node stream for Next.js API
        const { Readable } = require('stream');
        const nodeStream = Readable.fromWeb(fileResponse.body);
        nodeStream.pipe(res);

    } catch (err) {
        console.error('Download handler error:', err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
