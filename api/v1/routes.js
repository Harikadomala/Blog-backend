import express from 'express';
import authRoutes from './auth/routes.js';
import blogRoutes from './blogs/routes.js';
import contactRoutes from './contact/routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/blogs',blogRoutes)
router.use('/contact',contactRoutes);


export default router;


