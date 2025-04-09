import { Router } from 'express';
const router = Router();
import { reserveTable, getReservedTables, cancelReservation } from '../controllers/reserve.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';

router.post('/reserve', authUser, reserveTable);
router.get('/', authUser, getReservedTables);
router.delete('/:id', authUser, cancelReservation);

export default router;