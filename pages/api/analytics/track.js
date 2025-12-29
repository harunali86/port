
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { type } = req.body; // 'visit' or 'resume'

    if (!['visit', 'resume'].includes(type)) {
        return res.status(400).json({ error: 'Invalid tracking type' });
    }

    try {
        const stat = await prisma.analytics.upsert({
            where: { name: type },
            update: { count: { increment: 1 } },
            create: { name: type, count: 1 }
        });
        res.status(200).json(stat);
    } catch (error) {
        console.error("Analytics Error:", error);
        res.status(500).json({ error: 'Database error' });
    }
}
