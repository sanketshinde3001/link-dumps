import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// Get all videos
export const getLink = async (req, res) => {
    try {
        const links = await prisma.link.findMany();
        res.json(links);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch links.' });
    }
};
// Create a new video
export const addLink = async (req, res) => {
    const { title, url, description } = req.body;
    try {
        const link = await prisma.link.create({
            data: {
                title,
                url,
                description
            },
        });
        res.status(201).json(link);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add link.' });
    }
};
