
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        const stats = await prisma.analytics.findMany();
        const postsCount = await prisma.posts.count();

        // Convert list to object for easy lookup
        const data = {
            visits: stats.find(s => s.name === 'visit')?.count || 0,
            resume: stats.find(s => s.name === 'resume')?.count || 0,
            blogs: postsCount
        };

        res.status(200).json(data);
    } catch (error) {
        console.error("Stats Error:", error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
}
