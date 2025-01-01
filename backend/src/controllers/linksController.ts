import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Get all videos
export const getLink = async (req: Request, res: Response) => {
  console.log("hi get")
  try {
    const links = await prisma.link.findMany();
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch links.' });
  }
};

// Create a new video
export const addLink = async (req: Request, res: Response) => {
  const { title,url, description } = req.body;

  try {
    const link = await prisma.link.create({
      data: {
        title,
        url,
        description
      },
    });
    res.status(201).json(link);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add link.' });
  }
};
export const deleteLink = async (req: Request, res: Response) => {
  console.log(req.params);
  const id = req.params.id;

  try {
    const link = await prisma.link.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json("Sucessfully deleted");
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete link.' });
  }
};
