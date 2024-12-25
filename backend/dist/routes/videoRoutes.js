import express from 'express';
import { getVideos, createVideo } from '../controllers/videoController.js';
const router = express.Router();
router.get('/videos', getVideos);
router.post('/videos', createVideo);
export default router;
