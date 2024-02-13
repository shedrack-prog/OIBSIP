import { Router } from 'express';
import { getCurrentUser } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authmiddleware.js';

const router = Router();

router.route('/get-current-user').get(authMiddleware, getCurrentUser);

export default router;
