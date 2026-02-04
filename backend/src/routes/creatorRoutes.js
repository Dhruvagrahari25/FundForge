import express from 'express';
import { getCreatorProfile, createCreatorProfile } from '../controllers/creatorController.js';
import { protect, artistOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/profile').get(protect, artistOnly, getCreatorProfile).post(protect, artistOnly, createCreatorProfile);

export default router;
