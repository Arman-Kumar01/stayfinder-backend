import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/auth.routes.js';
import listingRoutes from './src/routes/listing.routes.js';
import bookingRoutes from './src/routes/booking.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/bookings', bookingRoutes);
app.get('/', (req, res) => {
  res.send('StayFinder Backend Running');
});

export default app;
