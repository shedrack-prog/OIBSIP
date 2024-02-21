import { Router } from 'express';
import {
  createCheese,
  createSauce,
  createVeggie,
  editOrderStatus,
  getAllCheese,
  getAllOrders,
  getAllSauces,
  getAllUsers,
  getAllVeggies,
} from '../controllers/adminController.js';
import { authMiddleware } from '../middleware/authmiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = Router();
router.route('/users').get(authMiddleware, adminMiddleware, getAllUsers);

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
router.route('/orders').get(authMiddleware, adminMiddleware, getAllOrders);
router
  .route('/orders/:orderId')
  .post(authMiddleware, adminMiddleware, editOrderStatus);

export default router;
