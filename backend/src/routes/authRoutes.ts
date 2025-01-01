import express from 'express';
import { RedirectToGithub , RefreshToken , HandleCallback } from '../controllers/authController.js';
import { getProfile } from '../controllers/profileController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/github', RedirectToGithub);
router.get('/github/callback', HandleCallback);
router.post('/refresh', RefreshToken);
router.get('/profile', authenticateToken, getProfile);

export default router;
