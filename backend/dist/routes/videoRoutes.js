import express from 'express';
import { getLink, addLink } from '../controllers/videoController.js';
const router = express.Router();
router.get('/link', getLink);
router.post('/link', addLink);
export default router;
