// routes/index.js
const router = require('express').Router();
import userRoutes from './api/userRoutes';
import thoughtRoutes from './api/thoughtRoutes';

// Use the routes from userRoutes and thoughtRoutes
router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes);

export default router;
