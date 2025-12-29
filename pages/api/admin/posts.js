
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { method } = req;
    const pin = req.headers['x-admin-pin'];

    // Simple security check for Write operations
    if ((method === 'POST' || method === 'DELETE') && pin !== 'HARRY@123') {
        return res.status(401).json({ error: 'Unauthorized: Invalid PIN' });
    }

    try {
        if (method === 'GET') {
            const posts = await prisma.posts.findMany({
                orderBy: { created_at: 'desc' }
            });
            return res.status(200).json(posts);
        }

        if (method === 'POST') {
            const { title, slug, excerpt, content, image } = req.body;
            const post = await prisma.posts.create({
                data: {
                    title,
                    slug,
                    excerpt,
                    content,
                    image_url: image || null,
                    is_published: true
                }
            });
            return res.status(201).json(post);
        }

        if (method === 'DELETE') {
            const { id } = req.query;
            if (!id) return res.status(400).json({ error: 'Missing ID' });

            await prisma.posts.delete({
                where: { id: parseInt(id) }
            });
            return res.status(200).json({ message: 'Deleted successfully' });
        }

        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
