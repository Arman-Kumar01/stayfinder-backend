
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Global error handler for uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`⚙️ Server is running at port : ${PORT}`);
    });

    process.on('unhandledRejection', (err) => {
      console.error('Unhandled Rejection:', err);
      server.close(() => process.exit(1));
    });
  })
  .catch((err) => {
    console.error('MONGO db connection failed !!! ', err);
    process.exit(1);
  });
