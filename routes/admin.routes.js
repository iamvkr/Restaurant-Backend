import { Router } from 'express';
const router = Router();
import { body } from "express-validator";
import { registerAdmin, loginAdmin, getAdminProfile, logoutAdmin } from '../controllers/admin.controller.js';
import { authAdmin } from '../middlewares/auth.middleware.js';
import { getRestaurants,addRestaurants, deleteRestaurants } from '../controllers/restaurants.controller.js';


// should be only available in local env
if (process.env.NODE_ENV === "development") {
    router.post('/register', [
        body('email').isEmail().withMessage('Invalid Email'),
        body('username').isLength({ min: 3 }).withMessage('Username name must be at least 3 characters long'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
        registerAdmin
    )
}

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    loginAdmin
)

router.get('/profile', authAdmin, getAdminProfile)

router.get('/logout', authAdmin, logoutAdmin)


export default router;