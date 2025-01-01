import express from 'express';
import { getLink, addLink, deleteLink } from '../controllers/videoController.js';
const router = express.Router();
router.get('/link', getLink);
router.post('/link', addLink);
router.delete('/link/:id', deleteLink);
export default router;
