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
            maxFileSize: 5 * 1024 * 1024, // 5MB limit
        });

        const [fields, files] = await form.parse(req);

        const file = files.resume?.[0];

        if (!file) {
            console.error("No file found in request:", files);
            return res.status(400).json({ error: 'No resume file uploaded' });
        }

        const oldPath = file.filepath;
        const newPath = path.join(process.cwd(), 'public', 'resume.pdf');

        // Use copy + unlink to avoid cross-device rename errors
        fs.copyFileSync(oldPath, newPath);
        fs.unlinkSync(oldPath);

        res.status(200).json({ message: 'Resume uploaded successfully!', url: '/resume.pdf' });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: 'Failed to save file' });
    }
}
