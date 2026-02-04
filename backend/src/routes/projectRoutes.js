import express from 'express';
import { getProjects, getProjectById, createProject } from '../controllers/projectController.js';
import { protect, artistOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProjects).post(protect, artistOnly, createProject);
router.route('/:id').get(getProjectById);

export default router;
