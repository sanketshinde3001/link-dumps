import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
const CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;
const CALLBACK_URL = process.env.GITHUB_CALLBACK_URL!;

// 1. Redirect to GitHub OAuth
export const RedirectToGithub =  (req:Request, res:Response) => {
    const redirectURI = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}&scope=user`;
    console.log("Redirect to the github login page");
    res.redirect(redirectURI);
};

// 2. Handle Callback and Token Exchange
export const HandleCallback =  async (req:Request, res:Response) => {
    const code = req.query.code as string;
    if (!code) {
        res.status(400).send('No code provided');
        return;
    }
    (async () => {
        try {
            const { data } = await axios.post('https://github.com/login/oauth/access_token', {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code,
            }, {
                headers: { Accept: 'application/json' }
            });

            const accessToken = data.access_token;
            console.log("Get access token - ",accessToken);

            const { data: user } = await axios.get('https://api.github.com/user', {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            console.log(user);
            const dbUser = await prisma.user.upsert({
                where: { githubId: String(user.id) },
                update: { accessToken },
                create: {
                    githubId: String(user.id),
                    name: user.name,
                    email: user.email,
                    avatarUrl: user.avatar_url,
                    accessToken,
                }
            });

            const token = jwt.sign({ userId: dbUser.id }, JWT_SECRET, { expiresIn: '15m' });
            const refreshToken = jwt.sign({ userId: dbUser.id }, JWT_SECRET, { expiresIn: '7d' });

            await prisma.user.update({
                where: { id: dbUser.id },
                data: { refreshToken }
            });

            res.cookie('accessToken', token, { httpOnly: true, secure: false });
            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false });
            res.redirect('http://localhost:3000');
        } catch (error) {
            console.error('OAuth error:', error);
            res.status(500).send('Authentication failed');
        }
    })();
};

// 3. Refresh Token Endpoint
export const RefreshToken =  async (req:Request, res:Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        res.status(403).send('Access denied');
        return;
    }

    (async () => {
        try {
            const payload = jwt.verify(refreshToken, JWT_SECRET) as { userId: string };
            const newAccessToken = jwt.sign({ userId: payload.userId }, JWT_SECRET, { expiresIn: '15m' });

            res.cookie('accessToken', newAccessToken, { httpOnly: true });
            res.status(200).json({ token: newAccessToken });
        } catch (err) {
            res.status(403).send('Invalid refresh token');
        }
    })();
};