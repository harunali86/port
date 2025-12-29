import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const form = formidable({
            uploadDir: path.join(process.cwd(), 'public'),
            keepExtensions: true,
            filename: (name, ext, part, form) => {
                return 'resume.pdf'; // Force filename
            }
        });

        const [fields, files] = await form.parse(req);

        // In v3, files.resume is an array
        const file = files.resume?.[0];

        if (!file) {
            console.error("No file found in request:", files);
            return res.status(400).json({ error: 'No resume file uploaded' });
        }

        const oldPath = file.filepath;
        const newPath = path.join(process.cwd(), 'public', 'resume.pdf');

        fs.renameSync(oldPath, newPath);

        // Update DB (Optional, but good for tracking)
        // await prisma.siteConfig.upsert(...) - skipping strict DB enforcement for static file speed

        res.status(200).json({ message: 'Resume uploaded successfully!', url: '/resume.pdf' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save file' });
    }
}
