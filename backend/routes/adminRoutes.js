import { Router } from 'express';
import {
  createCheese,
  createSauce,
  createVeggie,
  getAllCheese,
  getAllSauces,
  getAllVeggies,
} from '../controllers/adminController.js';
import { authMiddleware } from '../middleware/authmiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = Router();

router
  .route('/sauces')
  .get(authMiddleware, getAllSauces)
  .post(authMiddleware, createSauce);
router
  .route('/veggies')
  .get(authMiddleware, getAllVeggies)
  .post(authMiddleware, createVeggie);
router
  .route('/cheeses')
  .get(authMiddleware, getAllCheese)
  .post(authMiddleware, createCheese);

export default router;
