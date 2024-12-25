import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Get all videos
export const getVideos = async (req: Request, res: Response) => {
  try {
    const videos = await prisma.video.findMany();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};

// Create a new video
export const createVideo = async (req: Request, res: Response) => {
  const { title, description, publicId, originalSize, compressedSize, duration } = req.body;

  try {
    const video = await prisma.video.create({
      data: {
        title,
        description,
        publicId,
        originalSize,
        compressedSize,
        duration,
      },
    });
    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create video' });
  }
};
