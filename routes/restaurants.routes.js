import { Router } from 'express';
const router = Router();
import { getRestaurants,addRestaurants, deleteRestaurants } from '../controllers/restaurants.controller.js';
import { authAdmin, authUser } from '../middlewares/auth.middleware.js';

// user
router.get('/', authUser, getRestaurants);
/** ADMIN restaurants operations: */
router.get('/list', authAdmin, getRestaurants)
router.post('/create', authAdmin, addRestaurants)
router.delete('/delete/:id', authAdmin, deleteRestaurants);

export default router;