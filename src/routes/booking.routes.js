import express from 'express';
import { createBooking, getUserBookings, cancelBooking } from '../controllers/booking.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', verifyToken, createBooking);
router.get('/me', verifyToken, getUserBookings);
router.delete('/:id', verifyToken, cancelBooking);

export default router;
