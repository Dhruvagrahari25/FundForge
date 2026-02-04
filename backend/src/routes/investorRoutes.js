import express from 'express';
import { getInvestorProfile, createInvestorProfile } from '../controllers/investorController.js';
import { protect, investorOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/profile').get(protect, investorOnly, getInvestorProfile).post(protect, investorOnly, createInvestorProfile);

export default router;
