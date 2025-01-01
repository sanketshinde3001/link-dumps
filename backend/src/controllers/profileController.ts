import axios from 'axios';
import { Request, Response } from 'express';

export const getProfile = async (req: Request, res: Response): Promise<void> => {
    const githubAccessToken = req.cookies.accessToken;

    if (!githubAccessToken) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const response = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${githubAccessToken}`
            }
        });

        res.json({ user: response.data });  // Send the response directly
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Failed to fetch profile' });
    }
};
